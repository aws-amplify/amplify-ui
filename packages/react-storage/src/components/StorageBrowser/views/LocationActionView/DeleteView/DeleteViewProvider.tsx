import React from 'react';

import { ControlsContextProvider } from '../../../controls/context';
import { useDisplayText } from '../../../displayText';

import { getActionViewTableData } from '../getActionViewTableData';
import { DeleteViewProviderProps } from './types';
import { getFolderText } from './utils';

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
    isProcessing,
    isProcessingComplete,
    statusCounts,
    tasks,
    onActionCancel,
    onActionStart,
    onActionExit,
    onTaskRemove,
  } = props;

  const message = isProcessingComplete
    ? getActionCompleteMessage({ counts: statusCounts })
    : undefined;

  const tableData = getActionViewTableData({
    tasks,
    isProcessing,
    displayText,
    getFolderText,
    onTaskRemove,
  });

  return (
    <ControlsContextProvider
      data={{
        actionCancelLabel,
        actionExitLabel,
        actionStartLabel,
        isActionCancelDisabled: !isProcessing || isProcessingComplete,
        isActionExitDisabled: isProcessing,
        isActionStartDisabled: isProcessing || isProcessingComplete,
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
