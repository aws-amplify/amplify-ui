import React from 'react';

import { DescriptionList } from '../../../components/DescriptionList';
import { ViewElement } from '../../../context/elements';

import { ActionCancelControl } from '../../../controls/ActionCancelControl';
import { ActionExitControl } from '../../../controls/ActionExitControl';
import { ActionStartControl } from '../../../controls/ActionStartControl';
import { AddFilesControl } from '../../../controls/AddFilesControl';
import { AddFolderControl } from '../../../controls/AddFolderControl';
import { ControlsContextProvider } from '../../../controls/context';
import { DataTableControl } from '../../../controls/DataTableControl';
import { DropZoneControl } from '../../../controls/DropZoneControl';
import { OverwriteToggleControl } from '../../../controls/OverwriteToggleControl';
import { MessageControl } from '../../../controls/MessageControl';
import { StatusDisplayControl } from '../../../controls/StatusDisplayControl';
import { TitleControl } from '../../../controls/TitleControl';

import { useDisplayText } from '../../../displayText';
import { STORAGE_BROWSER_BLOCK } from '../../../constants';
import { resolveClassName } from '../../utils';
import { getActionViewTableData } from '../getActionViewTableData';
import { useUploadView } from './useUploadView';
import { UploadViewProps } from './types';
import { Breadcrumb } from '../../../components/BreadcrumbNavigation';

export function UploadView({
  className,
  ...props
}: UploadViewProps): React.JSX.Element {
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
  } = useUploadView(props);

  const isActionStartDisabled =
    isProcessing || isProcessingComplete || statusCounts.TOTAL === 0;
  const isActionCancelDisabled = !isProcessing || isProcessingComplete;
  const isAddFilesDisabled = isProcessing || isProcessingComplete;
  const isAddFolderDisabled = isProcessing || isProcessingComplete;
  const isActionExitDisabled = isProcessing;
  const destinationList = (location.key || '/').split('/');

  const message = isProcessingComplete
    ? getActionCompleteMessage({
        counts: statusCounts,
      })
    : invalidFiles && !isProcessing
    ? getFilesValidationMessage({ invalidFiles })
    : undefined;

  return (
    <div className={resolveClassName(STORAGE_BROWSER_BLOCK, className)}>
      <ControlsContextProvider
        data={{
          actionCancelLabel,
          actionExitLabel,
          actionStartLabel,
          addFilesLabel,
          addFolderLabel,
          isActionCancelDisabled,
          isActionExitDisabled,
          isActionStartDisabled,
          isAddFilesDisabled,
          isAddFolderDisabled,
          isOverwriteToggleDisabled: isProcessing || isProcessingComplete,
          isOverwritingEnabled,
          overwriteToggleLabel,
          message,
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
        <ActionExitControl />
        <TitleControl />
        <ViewElement className={`${STORAGE_BROWSER_BLOCK}__controls`}>
          <OverwriteToggleControl />
          <ViewElement className={`${STORAGE_BROWSER_BLOCK}__buttons`}>
            <AddFolderControl />
            <AddFilesControl />
          </ViewElement>
        </ViewElement>
        <DropZoneControl>
          <DataTableControl />
        </DropZoneControl>
        <ViewElement className={`${STORAGE_BROWSER_BLOCK}__summary`}>
          <DescriptionList
            className={`${STORAGE_BROWSER_BLOCK}__destination`}
            descriptions={[
              {
                term: `${actionDestinationLabel}:`,
                details: (
                  <>
                    {destinationList.map((key, index) => (
                      <Breadcrumb
                        isCurrent={index === destinationList.length - 1}
                        key={`${key}-${index}`}
                        name={key}
                      />
                    ))}
                  </>
                ),
              },
            ]}
          />
          <StatusDisplayControl />
        </ViewElement>
        <ViewElement className={`${STORAGE_BROWSER_BLOCK}__footer`}>
          <ViewElement className={`${STORAGE_BROWSER_BLOCK}__message`}>
            <MessageControl />
          </ViewElement>
          <ViewElement className={`${STORAGE_BROWSER_BLOCK}__buttons`}>
            <ActionCancelControl />
            <ActionStartControl />
          </ViewElement>
        </ViewElement>
      </ControlsContextProvider>
    </div>
  );
}
