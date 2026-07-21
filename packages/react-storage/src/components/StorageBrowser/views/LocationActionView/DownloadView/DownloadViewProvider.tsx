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
    enumerationStatus,
    hasFilesToDownload,
    hasSelection,
    statusCounts,
    tasks: items,
    onActionCancel,
    onActionStart,
    onTaskRemove,
    onActionExit,
  } = props;

  const isEnumerationPending = enumerationStatus === 'PENDING';
  const isEnumerationSucceeded = enumerationStatus === 'SUCCEEDED';
  const isOverFileLimit = enumerationStatus === 'OVER_LIMIT';

  // Surface the no-files message when the READY set is empty, covering BOTH
  // empty states with one expression:
  //   - enumeration succeeded but found only empty folders, and
  //   - the ready set went empty because the user manually removed every row
  //     (mirrors the Start-disable gate below).
  // `'SUCCEEDED'` keeps the pending/error/over-limit statuses owning the
  // message via the precedence order; the processing guards keep an active or
  // completed download owning it. `hasSelection` scopes the message to a
  // selection that is or was non-empty, so a bare mount with an empty
  // selection (vacuously ready, nothing to download) shows no message.
  const showNoFiles =
    hasSelection &&
    isEnumerationSucceeded &&
    !hasFilesToDownload &&
    !isProcessing &&
    !isProcessingComplete;

  // Message precedence (most transient/actionable first):
  //   1. 'PENDING'           -> "listing folder contents" (info)
  //   2. 'ERROR'             -> failure + retry hint (error)
  //   3. 'OVER_LIMIT'        -> selection exceeds the file cap (error)
  //   4. showNoFiles         -> empty folders OR manually-emptied set (info)
  //   5. isProcessingComplete-> post-download summary (existing)
  //   6. otherwise           -> no message
  // Ordering matters: the enumeration statuses are pre-dispatch and mutually
  // exclusive with a completed download, so an earlier match short-circuits.
  const message: MessageProps | undefined = isEnumerationPending
    ? { content: enumeratingMessage, type: 'info' }
    : enumerationStatus === 'ERROR'
    ? { content: enumerationErrorMessage, type: 'error' }
    : isOverFileLimit
    ? { content: tooManyFilesMessage, type: 'error' }
    : showNoFiles
    ? { content: noFilesMessage, type: 'info' }
    : isProcessingComplete
    ? getActionCompleteMessage({ counts: statusCounts })
    : undefined;

  // `'NOT_STARTED'` and `'ERROR'` are the not-ready/partial statuses. They are
  // deliberately NOT added to `isActionStartDisabled`: the no-partial-dispatch
  // invariant is enforced inside the hook's `onActionStart` (guarded dispatch)
  // so the Start button stays CLICKABLE in those statuses and re-clicking
  // Start acts as the enumeration RETRY trigger.

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
          (!isProcessing || isProcessingComplete) && !isEnumerationPending,
        isActionExitDisabled: isProcessing || isEnumerationPending,
        isActionStartDisabled:
          isProcessing ||
          isProcessingComplete ||
          isEnumerationPending ||
          // The selection exceeds the file cap: retrying cannot succeed without
          // changing the selection, so Start is hard-disabled (unlike the
          // 'ERROR' status, where Start doubles as the retry trigger).
          isOverFileLimit ||
          // Every row was removed (or the ready set is otherwise empty, e.g.
          // only empty folders were selected): nothing to download. Scoped to
          // `'SUCCEEDED'` so this NEVER disables Start in the
          // 'NOT_STARTED'/'ERROR' statuses, where a clickable Start is the
          // enumeration RETRY trigger (empty resolvedItems is expected there).
          (isEnumerationSucceeded && !hasFilesToDownload),
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
