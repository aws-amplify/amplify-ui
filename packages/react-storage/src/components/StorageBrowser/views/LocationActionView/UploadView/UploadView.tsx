import React from 'react';

import { DescriptionList } from '../../../components/DescriptionList';
import { ButtonElement, ViewElement } from '../../../context/elements';
import { ActionCancelControl } from '../../../controls/ActionCancelControl';
import { ActionExitControl } from '../../../controls/ActionExitControl';
import { ActionStartControl } from '../../../controls/ActionStartControl';
import { DataTableControl } from '../../../controls/DataTableControl';
import { DropZoneControl } from '../../../controls/DropZoneControl';
import { StatusDisplayControl } from '../../../controls/StatusDisplayControl';
import { TitleControl } from '../../../controls/TitleControl';
import { ControlsContextProvider } from '../../../controls/context';
import { useDisplayText } from '../../../displayText';
import { Controls } from '../../Controls';
import { CLASS_BASE } from '../../constants';
import { resolveClassName } from '../../utils';
import { getActionViewTableData } from '../getActionViewTableData';
import { useUploadView } from './useUploadView';
import { UploadViewProps } from './types';

const { Overwrite } = Controls;

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
      title,
    },
  } = useDisplayText();

  const {
    isProcessing,
    isProcessingComplete,
    isOverwriteEnabled,
    location,
    tasks,
    statusCounts,
    onActionStart,
    onActionCancel,
    onDropFiles,
    onActionExit,
    onSelectFiles,
    onTaskCancel,
    onToggleOverwrite,
  } = useUploadView(props);

  const isActionStartDisabled =
    isProcessing || isProcessingComplete || statusCounts.TOTAL === 0;
  const isActionCancelDisabled = !isProcessing || isProcessingComplete;
  const isAddFilesDisabled = isProcessing || isProcessingComplete;
  const isAddFolderDisabled = isProcessing || isProcessingComplete;
  const isActionExitDisabled = isProcessing;
  const isOverwriteCheckboxDisabled = isProcessing || isProcessingComplete;

  return (
    <div className={resolveClassName(CLASS_BASE, className)}>
      <ControlsContextProvider
        data={{
          actionCancelLabel,
          actionExitLabel,
          actionStartLabel,
          isActionCancelDisabled,
          isActionExitDisabled,
          isActionStartDisabled,
          isAddFilesDisabled,
          isAddFolderDisabled,
          isOverwriteCheckboxDisabled,
          statusCounts,
          tableData: getActionViewTableData({
            tasks,
            isProcessing,
            shouldDisplayProgress: true,
            onTaskCancel,
          }),
          title,
        }}
        onActionCancel={onActionCancel}
        onActionExit={onActionExit}
        onActionStart={onActionStart}
        onDropFiles={onDropFiles}
      >
        <ActionExitControl />
        <TitleControl className={`${CLASS_BASE}__upload-view-title`} />
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
            <Overwrite
              defaultChecked={isOverwriteEnabled}
              disabled={isOverwriteCheckboxDisabled}
              handleChange={onToggleOverwrite}
            />
          </ViewElement>
          <ButtonElement
            disabled={isAddFolderDisabled}
            className={`${CLASS_BASE}__add-folder`}
            variant="add-folder"
            onClick={() => {
              onSelectFiles('FOLDER');
            }}
          >
            Add folder
          </ButtonElement>
          <ButtonElement
            disabled={isAddFilesDisabled}
            className={`${CLASS_BASE}__add-files`}
            variant="add-files"
            onClick={() => {
              onSelectFiles('FILE');
            }}
          >
            Add files
          </ButtonElement>
        </ViewElement>
        <ViewElement className={`${CLASS_BASE}__table-wrapper`}>
          <DropZoneControl className={`${CLASS_BASE}__upload-view-drop-zone`}>
            <DataTableControl
              className={`${CLASS_BASE}__upload-view-data-table`}
            />
          </DropZoneControl>
        </ViewElement>
        <ViewElement className={`${CLASS_BASE}__action-footer`}>
          <StatusDisplayControl
            className={`${CLASS_BASE}__upload-status-display`}
          />
          <ActionCancelControl className={`${CLASS_BASE}__cancel`} />
          <ActionStartControl
            className={`${CLASS_BASE}__upload-action-start`}
          />
        </ViewElement>
      </ControlsContextProvider>
    </div>
  );
}
