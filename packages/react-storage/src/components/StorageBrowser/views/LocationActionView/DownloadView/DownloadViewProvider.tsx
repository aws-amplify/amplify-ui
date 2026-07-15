import React from 'react';

import { ControlsContextProvider } from '../../../controls/context';
import { useDisplayText } from '../../../displayText';
import type { MessageProps } from '../../../components';

import { useResolveTableData } from '../../hooks/useResolveTableData';
import { DOWNLOAD_TABLE_KEYS, DOWNLOAD_TABLE_RESOLVERS } from '../../utils';

import type { DownloadViewProviderProps } from './types';

export function DownloadViewProvider({
  children,
  ...props
}: DownloadViewProviderProps): React.JSX.Element {
  const { DownloadView: displayText } = useDisplayText();

  const {
    actionCancelLabel,
    actionExitLabel,
    actionStartLabel,
    title,
    statusDisplayCanceledLabel,
    statusDisplayCompletedLabel,
    statusDisplayFailedLabel,
    statusDisplayQueuedLabel,
    getActionCompleteMessage,
    enumeratingMessage,
    enumerationErrorMessage,
    noFilesMessage,
    tooManyFilesMessage,
  } = displayText;

  const {
    isProcessing,
    isProcessingComplete,
    isEnumerating,
    hasNoFilesToDownload,
    hasFilesToDownload,
    hasSelection,
    isEnumerationError,
    isOverFileLimit,
    allFoldersReady,
    statusCounts,
    tasks: items,
    onActionCancel,
    onActionStart,
    onActionExit,
    onTaskRemove,
  } = props;

  // Surface the no-files message in BOTH empty states, not just enumeration:
  //   - `hasNoFilesToDownload`: enumeration found only empty folders.
  //   - `allFoldersReady && !hasFilesToDownload`: the ready set went empty
  //     because the user manually removed every row (mirrors the Start-disable
  //     gate below). Guarded against enumeration/error/over-limit/active
  //     -processing/completion so those states keep ownership of the message
  //     via the precedence order. `hasSelection` scopes both cases to a
  //     selection that is or was non-empty, so a bare mount with an empty
  //     selection (vacuously ready, nothing to download) shows no message.
  const showNoFiles =
    hasSelection &&
    (hasNoFilesToDownload ||
      (allFoldersReady &&
        !hasFilesToDownload &&
        !isEnumerating &&
        !isEnumerationError &&
        !isOverFileLimit &&
        !isProcessing &&
        !isProcessingComplete));

  // Message precedence (most transient/actionable first):
  //   1. isEnumerating       -> "listing folder contents" (info)
  //   2. isEnumerationError  -> failure + retry hint (error)
  //   3. isOverFileLimit     -> selection exceeds the file cap (error)
  //   4. showNoFiles         -> empty folders OR manually-emptied set (info)
  //   5. isProcessingComplete-> post-download summary (existing)
  //   6. otherwise           -> no message
  // Ordering matters: the enumeration states are pre-dispatch and mutually
  // exclusive with a completed download, so an earlier match short-circuits.
  const message: MessageProps | undefined = isEnumerating
    ? { content: enumeratingMessage, type: 'info' }
    : isEnumerationError
    ? { content: enumerationErrorMessage, type: 'error' }
    : isOverFileLimit
    ? { content: tooManyFilesMessage, type: 'error' }
    : showNoFiles
    ? { content: noFilesMessage, type: 'info' }
    : isProcessingComplete
    ? getActionCompleteMessage({ counts: statusCounts })
    : undefined;

  // `allFoldersReady` is the not-ready/partial signal. The readiness/error
  // gating is deliberately NOT added to `isActionStartDisabled`: it is enforced
  // inside the hook's `onActionStart` (guarded dispatch) so the Start button
  // stays CLICKABLE in the idle-not-ready/error state and re-clicking Start acts
  // as the enumeration RETRY trigger. It IS used below purely to scope the
  // empty-set disable to a ready state (so retry isn't blocked while not ready).

  const tableData = useResolveTableData(
    DOWNLOAD_TABLE_KEYS,
    DOWNLOAD_TABLE_RESOLVERS,
    {
      items,
      props: { displayText, isProcessing, onTaskRemove },
    }
  );

  return (
    <ControlsContextProvider
      data={{
        actionCancelLabel,
        actionExitLabel,
        actionStartLabel,
        isActionCancelDisabled:
          (!isProcessing || isProcessingComplete) && !isEnumerating,
        isActionExitDisabled: isProcessing || isEnumerating,
        isActionStartDisabled:
          isProcessing ||
          isProcessingComplete ||
          isEnumerating ||
          hasNoFilesToDownload ||
          // The selection exceeds the file cap: retrying cannot succeed without
          // changing the selection, so Start is hard-disabled (unlike the
          // enumeration-error state, where Start doubles as the retry trigger).
          isOverFileLimit ||
          // Every row was removed (or the ready set is otherwise empty): nothing
          // to download. Scoped to `allFoldersReady` so this NEVER disables Start
          // in the not-ready/error state, where a clickable Start is the
          // enumeration RETRY trigger (empty resolvedItems is expected there).
          (allFoldersReady && !hasFilesToDownload),
        statusDisplayCanceledLabel,
        statusDisplayCompletedLabel,
        statusDisplayFailedLabel,
        statusDisplayQueuedLabel,
        statusCounts,
        tableData,
        title,
        message,
      }}
      onActionStart={onActionStart}
      onActionExit={onActionExit}
      onActionCancel={onActionCancel}
    >
      {children}
    </ControlsContextProvider>
  );
}
