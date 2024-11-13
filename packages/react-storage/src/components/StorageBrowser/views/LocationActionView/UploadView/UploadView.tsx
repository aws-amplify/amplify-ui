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
import { AMPLIFY_CLASS_BASE } from '../../constants';
import { resolveClassName } from '../../utils';
import { getActionViewTableData } from '../getActionViewTableData';
import { useUploadView } from './useUploadView';
import { UploadViewProps } from './types';
import { Breadcrumb } from '../../../components/BreadcrumbNavigation';

const { Overwrite } = Controls;

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
  const isOverwriteCheckboxDisabled = isProcessing || isProcessingComplete;
  const destinationList = (location.key || '/').split('/');

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
            onTaskRemove,
          }),
          title,
        }}
        onActionCancel={onActionCancel}
        onActionExit={onActionExit}
        onActionStart={onActionStart}
        onDropFiles={onDropFiles}
      >
        <ActionExitControl />
        <TitleControl />
        <ViewElement className={`${AMPLIFY_CLASS_BASE}__controls`}>
          <Overwrite
            defaultChecked={isOverwriteEnabled}
            disabled={isOverwriteCheckboxDisabled}
            handleChange={onToggleOverwrite}
          />

          <ViewElement className={`${AMPLIFY_CLASS_BASE}__buttons`}>
            <ButtonElement
              disabled={isAddFolderDisabled}
              className={`${AMPLIFY_CLASS_BASE}__add-folder`}
              variant="add-folder"
              onClick={() => {
                onSelectFiles('FOLDER');
              }}
            >
              Add folder
            </ButtonElement>
            <ButtonElement
              disabled={isAddFilesDisabled}
              className={`${AMPLIFY_CLASS_BASE}__add-files`}
              variant="add-files"
              onClick={() => {
                onSelectFiles('FILE');
              }}
            >
              Add files
            </ButtonElement>
          </ViewElement>
        </ViewElement>
        <DropZoneControl>
          <DataTableControl />
        </DropZoneControl>
        <ViewElement className={`${AMPLIFY_CLASS_BASE}__summary`}>
          <DescriptionList
            className={`${AMPLIFY_CLASS_BASE}__destination`}
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
        <ViewElement className={`${AMPLIFY_CLASS_BASE}__footer`}>
          {/* Message goes here */}
          <ViewElement className={`${AMPLIFY_CLASS_BASE}__buttons`}>
            <ActionCancelControl />
            <ActionStartControl />
          </ViewElement>
        </ViewElement>
      </ControlsContextProvider>
    </div>
  );
}
