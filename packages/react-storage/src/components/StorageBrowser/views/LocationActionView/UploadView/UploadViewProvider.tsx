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
    acceptedFileTypes,
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
      ? getFilesValidationMessage({ invalidFiles })
      : undefined;

  return (
    <ControlsContextProvider
      data={{
        acceptedFileTypes,
        actionCancelLabel,
        actionDestinationLabel,
        actionExitLabel,
        actionStartLabel,
        addFilesLabel,
        addFolderLabel,
        destination: location,
        isActionCancelDisabled,
        isActionDestinationNavigable: false,
        isActionExitDisabled,
        isActionStartDisabled,
        isAddFilesDisabled,
        isAddFolderDisabled,
        isOverwriteToggleDisabled: isProcessing || isProcessingComplete,
        isOverwritingEnabled,
        message: actionCompleteMessage ?? filesValidationMessage,
        overwriteToggleLabel,
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
