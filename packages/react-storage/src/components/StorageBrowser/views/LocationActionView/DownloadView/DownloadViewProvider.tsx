import React from 'react';

import { ControlsContextProvider } from '../../../controls/context';
import { useDisplayText } from '../../../displayText';

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
  } = displayText;

  const {
    hasNextPage,
    highestPageVisited,
    isProcessing,
    isProcessingComplete,
    onPaginate,
    page,
    pageTasks,
    statusCounts,
    onActionCancel,
    onActionStart,
    onActionExit,
    onTaskRemove,
  } = props;

  const message = isProcessingComplete
    ? getActionCompleteMessage({ counts: statusCounts })
    : undefined;

  const tableData = useResolveTableData(
    DOWNLOAD_TABLE_KEYS,
    DOWNLOAD_TABLE_RESOLVERS,
    {
      items: pageTasks,
      props: { displayText, isProcessing, onTaskRemove },
    }
  );

  return (
    <ControlsContextProvider
      data={{
        actionCancelLabel,
        actionExitLabel,
        actionStartLabel,
        isActionCancelDisabled: !isProcessing || isProcessingComplete,
        isActionExitDisabled: isProcessing,
        isActionStartDisabled: isProcessing || isProcessingComplete,
        paginationData: {
          hasNextPage,
          highestPageVisited,
          page,
        },
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
      onPaginate={onPaginate}
    >
      {children}
    </ControlsContextProvider>
  );
}
