import React from 'react';

import { DescriptionList } from '../../../components/DescriptionList';
import { ViewElement } from '../../../context/elements';
import { ActionCancelControl } from '../../../controls/ActionCancelControl';
import { ActionExitControl } from '../../../controls/ActionExitControl';
import { ActionStartControl } from '../../../controls/ActionStartControl';
import { AddFilesControl } from '../../../controls/AddFilesControl';
import { AddFolderControl } from '../../../controls/AddFolderControl';
import { DataTableControl } from '../../../controls/DataTableControl';
import { DropZoneControl } from '../../../controls/DropZoneControl';
import { OverwriteToggleControl } from '../../../controls/OverwriteToggleControl';
import { StatusDisplayControl } from '../../../controls/StatusDisplayControl';
import { TitleControl } from '../../../controls/TitleControl';
import { ControlsContextProvider } from '../../../controls/context';
import { useDisplayText } from '../../../displayText';
import { AMPLIFY_CLASS_BASE, CLASS_BASE } from '../../constants';
import { resolveClassName } from '../../utils';
import { getActionViewTableData } from '../getActionViewTableData';
import { useUploadView } from './useUploadView';
import { UploadViewProps } from './types';

export const ICON_CLASS = `${CLASS_BASE}__action-status`;

export function UploadView({
  className,
  ...props
}: UploadViewProps): React.JSX.Element {
  const {
    UploadView: {
      actionCancelLabel,
      actionDestinationLabel,
      actionExitLabel,
      actionStartLabel,
      addFilesLabel,
      addFolderLabel,
      overwriteToggleLabel,
      title,
    },
  } = useDisplayText();

  const {
    isOverwritingEnabled,
    isProcessing,
    isProcessingComplete,
    location,
    tasks,
    statusCounts,
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

  return (
    <div className={resolveClassName(AMPLIFY_CLASS_BASE, className)}>
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
          statusCounts,
          tableData: getActionViewTableData({
            tasks,
            isProcessing,
            shouldDisplayProgress: true,
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
        <ViewElement className={`${CLASS_BASE}__action-header`}>
          <ViewElement className={`${CLASS_BASE}__upload-destination`}>
            <DescriptionList
              descriptions={[
                {
                  term: `${actionDestinationLabel}:`,
                  details: location.key || '/',
                },
              ]}
            />
            <OverwriteToggleControl
              className={`${CLASS_BASE}__upload-overwrite-toggle`}
            />
          </ViewElement>
          <AddFolderControl
            className={`${CLASS_BASE}__upload-view-add-folder`}
          />
          <AddFilesControl className={`${CLASS_BASE}__upload-view-add-files`} />
        </ViewElement>
        <DropZoneControl>
          <DataTableControl />
        </DropZoneControl>
        <ViewElement className={`${AMPLIFY_CLASS_BASE}__footer`}>
          <StatusDisplayControl />
          <ViewElement className={`${AMPLIFY_CLASS_BASE}__buttons`}>
            <ActionCancelControl />
            <ActionStartControl />
          </ViewElement>
        </ViewElement>
      </ControlsContextProvider>
    </div>
  );
}
