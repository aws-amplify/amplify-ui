import React from 'react';

import { isMultipartUpload } from '../../../actions';
import { ControlsContextProvider } from '../../../controls/context';
import { useDisplayText } from '../../../displayText';

import { useResolveTableData } from '../../hooks/useResolveTableData';
import { UPLOAD_TABLE_KEYS, UPLOAD_TABLE_RESOLVERS } from '../../utils';

import type { UploadViewProviderProps } from './types';

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
    tasks: items,
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

  const tableData = useResolveTableData(
    UPLOAD_TABLE_KEYS,
    UPLOAD_TABLE_RESOLVERS,
    {
      items,
      props: { displayText, isProcessing, isMultipartUpload, onTaskRemove },
    }
  );

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
        tableData,
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
