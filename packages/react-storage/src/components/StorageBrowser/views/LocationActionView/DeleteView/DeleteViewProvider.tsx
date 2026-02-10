import React from 'react';

import { ControlsContextProvider } from '../../../controls/context';
import { useDisplayText } from '../../../displayText';

import { useResolveTableData } from '../../hooks/useResolveTableData';
import { FILE_DATA_ITEM_TABLE_KEYS, DELETE_TABLE_RESOLVERS } from '../../utils';

import type { DeleteViewProviderProps } from './types';

export function DeleteViewProvider({
  children,
  ...props
}: DeleteViewProviderProps): React.JSX.Element {
  const { DeleteView: displayText } = useDisplayText();
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
    FILE_DATA_ITEM_TABLE_KEYS,
    DELETE_TABLE_RESOLVERS,
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
