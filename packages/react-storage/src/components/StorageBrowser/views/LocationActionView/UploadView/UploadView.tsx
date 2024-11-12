import React from 'react';

import { displayText } from '../../../displayText/en';
import { DescriptionList } from '../../../components/DescriptionList';
import { ButtonElement, ViewElement } from '../../../context/elements';
import { StatusDisplayControl } from '../../../controls/StatusDisplayControl';
import { ControlsContextProvider } from '../../../controls/context';
import { AMPLIFY_CLASS_BASE, CLASS_BASE } from '../../constants';
import { Controls } from '../../Controls';
import { Title } from '../Controls/Title';
import { ActionCancelControl } from '../../../controls/ActionCancelControl';
import { ActionExitControl } from '../../../controls/ActionExitControl';
import { ActionStartControl } from '../../../controls/ActionStartControl';
import { DataTableControl } from '../../../controls/DataTableControl';
import { DropZoneControl } from '../../../controls/DropZoneControl';
import { resolveClassName } from '../../utils';
import { getActionViewTableData } from '../getActionViewTableData';
import { useDisplayText } from '../../../displayText';

import { useUploadView } from './useUploadView';
import { UploadViewProps } from './types';

const { Overwrite } = Controls;

export const ICON_CLASS = `${CLASS_BASE}__action-status`;

export function UploadView({
  className,
  ...props
}: UploadViewProps): React.JSX.Element {
  const { actionCancelLabel, actionExitLabel, actionStartLabel } =
    useDisplayText()['UploadView'];

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
    <div className={resolveClassName(AMPLIFY_CLASS_BASE, className)}>
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
        }}
        onActionCancel={onActionCancel}
        onActionExit={onActionExit}
        onActionStart={onActionStart}
        onDropFiles={onDropFiles}
      >
        <ActionExitControl />
        <Title />
        <ViewElement className={`${CLASS_BASE}__action-header`}>
          <ViewElement className={`${CLASS_BASE}__upload-destination`}>
            <DescriptionList
              descriptions={[
                {
                  term: `${displayText.actionDestination}:`,
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
