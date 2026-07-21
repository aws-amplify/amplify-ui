import React from 'react';
import { isFunction } from '@aws-amplify/ui';

import type { DownloadHandlerData, LocationItemData } from '../../../actions';
import { createDownloadItem } from '../../../actions';
import type { Task } from '../../../tasks';
import { useLocationItems } from '../../../locationItems/context';
import { hasSelectedFolders } from '../../../locationItems/utils';
import { useStore } from '../../../store';
import { useAction } from '../../../useAction';
import { useGetActionInput } from '../../../configuration/context';

import type {
  DownloadEnumerationStatus,
  DownloadViewState,
  UseDownloadViewOptions,
} from './types';
import {
  expandFolderToFiles,
  FileLimitError,
  resolveArchiveName,
} from './utils';

// assign to constant to ensure referential equality
const EMPTY_ITEMS: LocationItemData[] = [];
// Referentially-stable empty set used as the "no removals" sentinel so a
// selection change can filter with an empty set without allocating.
const EMPTY_SET: ReadonlySet<string> = new Set<string>();

/**
 * Drops rows the user removed via `onTaskRemove`, keyed by the item's stable
 * id. Needed because folder-EXPANDED file rows carry ids minted during
 * enumeration that never exist in `dataItems`, so the REMOVE_LOCATION_ITEM
 * reducer path no-ops for them — this id filter is what actually removes them.
 */
const filterRemoved = (
  items: DownloadHandlerData[],
  removedIds: ReadonlySet<string>
): DownloadHandlerData[] =>
  removedIds.size === 0
    ? items
    : items.filter((item) => !removedIds.has(item.id));

/**
 * Builds the flat list of download items from the current selection:
 * loose files become download items directly; folders contribute their
 * already-expanded files from `cache` (empty until enumeration runs).
 */
const buildDownloadItems = (
  dataItems: LocationItemData[],
  prefix: string,
  cache: Map<string, DownloadHandlerData[]>
): DownloadHandlerData[] => {
  const items: DownloadHandlerData[] = [];
  for (const item of dataItems) {
    if (item.type === 'FILE') {
      items.push(createDownloadItem(item, prefix));
    } else {
      const expanded = cache.get(item.id);
      if (expanded) {
        items.push(...expanded);
      }
    }
  }
  // Name the zip from the SELECTION (computed here, in the view — NOT in the
  // handler) and stamp it uniformly onto every item so the zip handler can
  // read it from `all[0].archiveName`. A single-folder selection is named
  // after that folder; every other shape uses the common ancestor directory
  // of the collected files (see resolveArchiveName).
  const archiveName = resolveArchiveName(
    dataItems,
    items.map((i) => i.key)
  );
  return items.map((i) => ({ ...i, archiveName }));
};

export const useDownloadView = (
  options?: UseDownloadViewOptions
): DownloadViewState => {
  const { onExit: _onExit } = options ?? {};

  const [{ location }, storeDispatch] = useStore();
  const [locationItems, locationItemsDispatch] = useLocationItems();
  const { current } = location;
  const { dataItems = EMPTY_ITEMS } = locationItems;
  const getConfig = useGetActionInput();

  // Cache of folder id -> expanded download items, mirroring DeleteView's
  // `folderCountsRef`. Survives re-renders so re-expanding is avoided.
  // Intentional per-session cache: entries are keyed by the (stable, per-mount)
  // folder id and are never individually invalidated — the whole ref is
  // discarded when the view unmounts on exit (RESET_LOCATION_ITEMS), which is
  // the only path that changes the underlying location. This matches
  // DeleteView's `folderCountsRef` semantics.
  const folderExpansionRef = React.useRef<Map<string, DownloadHandlerData[]>>(
    new Map()
  );
  // AbortController for the in-flight enumeration (cancellable pre-dispatch).
  const enumAbortRef = React.useRef<AbortController | null>(null);
  // Tracks the last selection (dataItems/current) the sync effect ran for, so
  // it can tell a genuine SELECTION change (which resets stale flags and the
  // per-row removal set) apart from a re-run triggered solely by a
  // `removedItemIds` update (which must NOT reset the removals it just applied).
  const prevSelectionRef = React.useRef<{
    dataItems: LocationItemData[];
    current: typeof current;
  }>({ dataItems, current });

  const [resolvedItems, setResolvedItems] = React.useState<
    DownloadHandlerData[]
  >([]);
  // `true` while folder selections are being expanded into their files. Drives
  // the `'PENDING'` enumeration status, which disables Start until enumeration
  // settles.
  const [isEnumerating, setIsEnumerating] = React.useState(false);
  // `true` when the pre-dispatch enumeration failed for a non-abort reason.
  // Surfaced on the view model so the Start control re-enabling isn't the only
  // (silent) feedback the user gets on failure.
  const [isEnumerationError, setIsEnumerationError] = React.useState(false);
  // `true` when the combined expanded file count of the selection exceeded
  // LARGE_DOWNLOAD_FILE_COUNT during enumeration. A truncated zip would be
  // silent data loss, so this state BLOCKS dispatch entirely (same invariant
  // as `allFoldersReady`) and the view surfaces an explanatory message.
  const [isOverFileLimit, setIsOverFileLimit] = React.useState(false);
  // Retry counter; bumping re-runs the enumeration effect for still-uncached
  // folders.
  const [enumAttempt, setEnumAttempt] = React.useState(0);
  // Stable ids of rows the user removed via `onTaskRemove`. Folder-EXPANDED
  // file rows can't be removed through the locationItems reducer (their ids
  // aren't in `dataItems`, so REMOVE_LOCATION_ITEM no-ops), so we track removals
  // here and filter `resolvedItems` by them. Reset on an actual selection change
  // so removals don't leak into a new selection (see the sync effect below).
  const [removedItemIds, setRemovedItemIds] = React.useState<Set<string>>(
    () => new Set()
  );
  // Latest-value mirror of `removedItemIds` so the async enumeration closure can
  // read the current removals WITHOUT `removedItemIds` becoming an enumeration
  // dep (which would abort/re-run enumeration on every row removal). Mirrors the
  // `callbacksRef` pattern in useProcessTasks.
  const removedItemIdsRef = React.useRef(removedItemIds);
  removedItemIdsRef.current = removedItemIds;

  const hasFolders = hasSelectedFolders(dataItems);

  // `true` once the selection has been non-empty at any point in this mount.
  // Sticky on purpose: removing every row empties `dataItems` for a loose-file
  // selection, and the "no files" message must still show in that manually
  // -emptied state, while a bare mount with no selection must NOT show it.
  const hadSelectionRef = React.useRef(false);
  if (dataItems.length > 0) {
    hadSelectionRef.current = true;
  }
  const hasSelection = hadSelectionRef.current;

  // `resolvedItems` (not the raw selection) is what `useAction` turns into
  // tasks. Keep it in sync with the selection + expansion cache so item
  // removal (onTaskRemove) stays consistent. For a file-only selection this
  // fully populates `resolvedItems` on mount (no enumeration needed); for
  // folders it seeds any already-expanded (cached) files and the enumeration
  // effect below fills in the rest.
  React.useEffect(() => {
    const prefix = current?.prefix ?? '';

    // Distinguish a genuine SELECTION change (identity change of dataItems or
    // current) from a re-run triggered solely by a `removedItemIds` update.
    // Only a real selection change should clear stale pre-dispatch flags and the
    // per-row removal set — resetting on a `removedItemIds` change would
    // immediately undo the removal that just triggered this effect.
    //
    // NOTE: the `SET_LOCATION_ITEMS` reducer builds `dataItems` via `.concat`,
    // returning a NEW array reference even when re-selecting the SAME items, so
    // an identity compare reads a re-select as a selection change. Consequence:
    // re-selecting identical items while in DownloadView resets `removedItemIds`
    // (previously-removed rows re-appear). Harmless — it only re-shows removed
    // rows and never produces a partial dispatch (the readiness gate still holds).
    const selectionChanged =
      prevSelectionRef.current.dataItems !== dataItems ||
      prevSelectionRef.current.current !== current;
    prevSelectionRef.current = { dataItems, current };

    // On a selection change no prior removals carry over; otherwise apply the
    // current removal set. (Removing a LOOSE file also mutates dataItems, so it
    // reads as a selection change here — harmless, since the reducer has already
    // pruned that file from dataItems. Removing a folder-EXPANDED file no-ops in
    // the reducer, so dataItems is unchanged and this filter is what removes it.)
    const effectiveRemovedIds = selectionChanged ? EMPTY_SET : removedItemIds;

    setResolvedItems(
      filterRemoved(
        buildDownloadItems(dataItems, prefix, folderExpansionRef.current),
        effectiveRemovedIds
      )
    );

    if (selectionChanged) {
      // Selection changed: clear stale pre-dispatch flags so a prior error
      // /over-limit result doesn't leak into the new selection.
      setIsEnumerationError(false);
      setIsOverFileLimit(false);
      // Clear per-row removals so a prior selection's removals don't hide items
      // in the new selection (no-op when already empty to avoid a needless
      // re-render/effect loop).
      setRemovedItemIds((prev) => (prev.size === 0 ? prev : new Set()));
    }
  }, [dataItems, current, removedItemIds]);

  // Auto-run folder enumeration on mount and whenever the selection changes.
  //
  // WHY ON MOUNT (not gated behind Start): the view renders its rows from
  // `resolvedItems` -> useAction `tasks`. A FOLDER contributes files only from
  // the expansion cache, which is empty on mount, so a folder selection would
  // otherwise render zero rows (and log nothing) until Start was clicked.
  // Expanding eagerly here — mirroring DeleteView's `initializeFolderCounts`
  // mount effect — resolves the files so the rows render as soon as the view
  // opens.
  //
  // WHY DISPATCH IS DECOUPLED FROM ENUMERATION: this effect only populates
  // `resolvedItems`; it MUST NOT auto-start the download. The zip is triggered
  // solely by the user clicking Start (`onActionStart` -> `handleProcess`). By
  // the time Start is enabled, `resolvedItems` has already synced into
  // useAction's `tasksRef`, so the previous "set state + dispatch in one tick"
  // sequencing hack is no longer required.
  React.useEffect(() => {
    if (!hasFolders || !current) {
      // A prior in-flight enumeration may have been aborted by this effect's
      // cleanup (selection change); its catch is now a no-op, so clear the flag
      // defensively here to ensure `isEnumerating` can't stick true (which would
      // also trap Exit). React bails on same-value setState, so this is a no-op
      // in the normal file-only / already-idle paths and can't loop.
      setIsEnumerating(false);
      return;
    }

    // Only expand folders we haven't already cached (cache is keyed by the
    // stable folder id). If every selected folder is already cached, the sync
    // effect above has rebuilt `resolvedItems` from the cache and there's
    // nothing to enumerate — avoids a spurious enumerating flash and re-runs.
    const foldersToExpand = dataItems.filter(
      (item) =>
        item.type === 'FOLDER' && !folderExpansionRef.current.has(item.id)
    );
    if (foldersToExpand.length === 0) {
      // Same defensive clear as above: an aborted prior run can't reset the flag.
      setIsEnumerating(false);
      return;
    }

    const config = getConfig(current);
    const { prefix } = current;
    const controller = new AbortController();
    enumAbortRef.current = controller;
    setIsEnumerationError(false);
    setIsOverFileLimit(false);
    setIsEnumerating(true);

    // Shared running file total for the LARGE_DOWNLOAD_FILE_COUNT cap. Seeded
    // with the files already in the selection (loose files plus previously
    // cached folder expansions) so the cap applies to the COMBINED selection,
    // then passed to every expansion in this run.
    const fileCounter = {
      count: dataItems.reduce((count, item) => {
        if (item.type === 'FILE') return count + 1;
        return count + (folderExpansionRef.current.get(item.id)?.length ?? 0);
      }, 0),
    };

    const runEnumeration = async () => {
      try {
        await Promise.all(
          foldersToExpand.map(async (folder) => {
            const expanded = await expandFolderToFiles({
              folderKey: folder.key,
              config,
              locationPrefix: prefix,
              signal: controller.signal,
              fileCounter,
            });
            folderExpansionRef.current.set(folder.id, expanded);
          })
        );

        // Cancelled mid-flight — `onActionCancel` (or this effect's cleanup on
        // selection change / unmount) already aborted. Leave state alone to
        // avoid a setState race with the newer run.
        if (controller.signal.aborted) return;

        const resolved = buildDownloadItems(
          dataItems,
          prefix,
          folderExpansionRef.current
        );

        // NOTE: `resolved` may be empty (only empty folders selected). The
        // empty folders were still cached above, so the derived enumeration
        // status flips to `'SUCCEEDED'` with `hasFilesToDownload` false — the
        // view surfaces the "no files" message from that combination. No zip
        // is started in this case (Start is disabled on an empty ready set).

        // Apply any per-row removals the user made before enumeration settled
        // (the sync effect re-filters on later removals via its removedItemIds
        // dep, but ref-population here doesn't trigger it, so filter now too).
        setResolvedItems(filterRemoved(resolved, removedItemIdsRef.current));
        setIsEnumerating(false);
      } catch (error) {
        // Abort surfaces here too; distinguish it from real failures.
        if (controller.signal.aborted) {
          // Aborted runs are a no-op: only `onActionCancel` flips
          // `isEnumerating` on user cancel. Cleanup/unmount aborts (and any
          // stale aborted run) must NOT clobber a newer run's flag.
        } else if (error instanceof FileLimitError) {
          // The combined selection exceeds LARGE_DOWNLOAD_FILE_COUNT. Abort the
          // sibling expansions still paginating (their result can never be
          // dispatched) and surface the blocked state. The over-limit folder was
          // never cached, so `allFoldersReady` stays false and dispatch is
          // structurally blocked as well.
          controller.abort();
          setIsOverFileLimit(true);
          setIsEnumerating(false);
        } else {
          // No dedicated package logger exists here; `console.error` matches the
          // convention used elsewhere in StorageBrowser (e.g. validateStoreProps,
          // useAction). AbortError is expected on cancel and handled above, so
          // only genuine failures reach this branch.
          // eslint-disable-next-line no-console
          console.error('Failed to expand folders for download:', error);
          setIsEnumerationError(true);
          setIsEnumerating(false);
        }
      }
    };

    runEnumeration();

    // Abort the in-flight enumeration when the selection changes or the view
    // unmounts, so its `list()` loop stops and no setState-after-unmount occurs.
    return () => {
      controller.abort();
    };
  }, [dataItems, current, hasFolders, getConfig, enumAttempt]);

  // Readiness gate: Start may only dispatch once EVERY selected folder has been
  // expanded into the cache. Files are always ready; a FOLDER is ready only when
  // folderExpansionRef has cached its expanded items. Recomputed each render —
  // state changes from enumeration (setResolvedItems/setIsEnumerating) trigger the
  // re-render that flips this true after the ref is populated.
  const allFoldersReady = dataItems.every(
    (item) => item.type !== 'FOLDER' || folderExpansionRef.current.has(item.id)
  );

  // Public enumeration status, DERIVED from the internal flags each render
  // (never stored — `allFoldersReady` is itself derived from dataItems + the
  // expansion cache, so storing the union would create a second source of
  // truth). Precedence: an in-flight run owns the status; then the terminal
  // error/limit outcomes; then readiness. A file-only selection has no folders
  // to expand, so it is vacuously ready -> `'SUCCEEDED'` immediately on mount.
  const enumerationStatus: DownloadEnumerationStatus = isEnumerating
    ? 'PENDING'
    : isEnumerationError
    ? 'ERROR'
    : isOverFileLimit
    ? 'OVER_LIMIT'
    : allFoldersReady
    ? 'SUCCEEDED'
    : 'NOT_STARTED';

  const [processState, handleProcess] = useAction('download', {
    items: resolvedItems,
    concurrency: 1,
  });

  const { isProcessing, isProcessingComplete, statusCounts, tasks } =
    processState;

  const onActionStart = () => {
    if (!current) return;
    // Enumeration in flight (Start is disabled anyway) — do nothing.
    if (isEnumerating) return;
    // Selection exceeds the file cap: dispatching would produce a truncated
    // zip (silent data loss) and retrying cannot succeed without changing the
    // selection, so do nothing (Start is disabled in this state anyway).
    if (isOverFileLimit) return;
    // RETRY PATH: a prior enumeration was cancelled or failed, so some selected
    // folders are still uncached. NEVER dispatch an incomplete set (CORE
    // INVARIANT). Instead re-trigger enumeration for the uncached folders by
    // bumping enumAttempt; the user retries simply by clicking Start again.
    // Dispatch happens on a later click, once allFoldersReady is true.
    if (!allFoldersReady) {
      setIsEnumerationError(false);
      setEnumAttempt((n) => n + 1);
      return;
    }
    // Every selected folder is expanded and resolvedItems is synced into
    // useAction's tasksRef — safe to dispatch the complete set. Download starts
    // ONLY here (never auto-started on enumeration completion).
    handleProcess();
  };

  const onActionCancel = () => {
    // Cancel during the (mount) pre-dispatch enumeration phase: abort the
    // `list()` loop and return to idle without starting a zip.
    if (isEnumerating) {
      enumAbortRef.current?.abort();
      setIsEnumerating(false);
      return;
    }

    tasks.forEach((task) => {
      // Calling cancel on task works only on queued tasks.
      // In case of download, all download presigned url open at once
      // When certain threshold is reached for queuing inside StorageBrowser, cancel might be possible.
      if (isFunction(task.cancel)) task.cancel();
    });
  };

  const onActionExit = () => {
    // clear files state
    locationItemsDispatch({ type: 'RESET_LOCATION_ITEMS' });
    // clear selected action
    storeDispatch({ type: 'RESET_ACTION_TYPE' });
    if (isFunction(_onExit)) _onExit(current);
  };

  const onTaskRemove = React.useCallback(
    ({ data }: Task) => {
      // Track the removal by the item's STABLE id. Folder-EXPANDED file rows
      // have ids minted in `expandFolderToFiles` (cached in folderExpansionRef)
      // that never live in `dataItems`, so REMOVE_LOCATION_ITEM alone no-ops for
      // them — filtering `resolvedItems` by `removedItemIds` is what removes
      // those rows. For LOOSE selection items the dispatch still prunes the
      // selection state (and is a harmless no-op for expanded ids).
      setRemovedItemIds((prev) => {
        if (prev.has(data.id)) return prev;
        const next = new Set(prev);
        next.add(data.id);
        return next;
      });
      locationItemsDispatch({ type: 'REMOVE_LOCATION_ITEM', id: data.id });
    },
    [locationItemsDispatch]
  );

  // Effective (post-removal) download set is empty -> nothing to download. Used
  // (with a `'SUCCEEDED'` status) to gate Start in a ready/idle state and to
  // surface the "no files" message — covering both empty folders detected
  // during enumeration and a manually-emptied row set (see
  // DownloadViewProvider).
  const hasFilesToDownload = resolvedItems.length > 0;

  return {
    isProcessing,
    isProcessingComplete,
    enumerationStatus,
    hasFilesToDownload,
    hasSelection,
    location,
    statusCounts,
    tasks,
    onActionCancel,
    onActionExit,
    onActionStart,
    onTaskRemove,
  };
};
