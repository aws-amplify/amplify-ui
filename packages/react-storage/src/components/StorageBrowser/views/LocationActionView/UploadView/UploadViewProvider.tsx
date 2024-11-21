import React from 'react';

import { ControlsContextProvider } from '../../../controls/context';
import { useDisplayText } from '../../../displayText';

import { getActionViewTableData } from '../getActionViewTableData';

import { UploadViewProviderProps } from './types';

export function UploadViewProvider({
  children,
  ...props
}: UploadViewProviderProps): React.JSX.Element {
  const { UploadView: displayText } = useDisplayText();
  const {
    actionCancelLabel,
    actionDestinationLabel,
    actionExitLabel,
    actionStartLabel,
    addFilesLabel,
    addFolderLabel,
    statusDisplayCanceledLabel,
    statusDisplayCompletedLabel,
    statusDisplayFailedLabel,
    statusDisplayQueuedLabel,
    overwriteToggleLabel,
    title,
    getActionCompleteMessage,
    getFilesValidationMessage,
  } = displayText;

  const {
    isOverwritingEnabled,
    isProcessing,
    isProcessingComplete,
    location,
    tasks,
    statusCounts,
    invalidFiles,
    onActionStart,
    onActionCancel,
    onDropFiles,
    onActionExit,
    onTaskRemove,
    onSelectFiles,
    onToggleOverwrite,
    handleResetInvalidFiles,
  } = props;

  const isActionStartDisabled =
    isProcessing || isProcessingComplete || statusCounts.TOTAL === 0;
  const isActionCancelDisabled = !isProcessing || isProcessingComplete;
  const isAddFilesDisabled = isProcessing || isProcessingComplete;
  const isAddFolderDisabled = isProcessing || isProcessingComplete;
  const isActionExitDisabled = isProcessing;

  const actionCompleteMessage = isProcessingComplete
    ? getActionCompleteMessage({
        counts: statusCounts,
      })
    : undefined;
  const filesValidationMessage =
    invalidFiles && !isProcessing
      ? {
          ...getFilesValidationMessage({ invalidFiles }),
          onDismiss: handleResetInvalidFiles,
        }
      : undefined;

  return (
    <ControlsContextProvider
      data={{
        actionCancelLabel,
        actionDestinationLabel,
        actionExitLabel,
        actionStartLabel,
        addFilesLabel,
        addFolderLabel,
        isActionCancelDisabled,
        isActionExitDisabled,
        isActionStartDisabled,
        isAddFilesDisabled,
        isAddFolderDisabled,
        isActionDestinationNavigable: false,
        isOverwriteToggleDisabled: isProcessing || isProcessingComplete,
        isOverwritingEnabled,
        overwriteToggleLabel,
        destination: location,
        message: actionCompleteMessage ?? filesValidationMessage,
        statusCounts,
        statusDisplayCanceledLabel,
        statusDisplayCompletedLabel,
        statusDisplayFailedLabel,
        statusDisplayQueuedLabel,
        tableData: getActionViewTableData({
          tasks,
          shouldDisplayProgress: true,
          displayText,
          isProcessing,
          onTaskRemove,
        }),
        title,
      }}
      onActionCancel={onActionCancel}
      onActionExit={onActionExit}
      onActionStart={onActionStart}
      onAddFiles={() => {
        onSelectFiles('FILE');
      }}
      onAddFolder={() => {
        onSelectFiles('FOLDER');
      }}
      onDropFiles={onDropFiles}
      onToggleOverwrite={onToggleOverwrite}
    >
      {children}
    </ControlsContextProvider>
  );
}
