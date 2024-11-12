import React from 'react';

import { displayText } from '../../../displayText/en';
import { DescriptionList } from '../../../components/DescriptionList';
import { ButtonElement, ViewElement } from '../../../context/elements';
import { StatusDisplayControl } from '../../../controls/StatusDisplayControl';
import { ControlsContextProvider } from '../../../controls/context';
import { AMPLIFY_CLASS_BASE, CLASS_BASE } from '../../constants';
import { Controls } from '../../Controls';
import { Title } from '../Controls/Title';
import { ActionStartControl } from '../../../controls/ActionStartControl';
import { ActionCancelControl } from '../../../controls/ActionCancelControl';
import { DataTableControl } from '../../../controls/DataTableControl';
import { DropZoneControl } from '../../../controls/DropZoneControl';
import { getFileSelectionType } from './getFileSelectionType';
import { useStore } from '../../../providers/store';
import { resolveClassName } from '../../utils';
import { getActionViewTableData } from '../getActionViewTableData';
import { useUploadView } from './useUploadView';
import { UploadViewProps } from './types';

const { Exit, Overwrite } = Controls;

export const ICON_CLASS = `${CLASS_BASE}__action-status`;

export const UploadView = ({
  className,
  onExit: onExitProps,
}: UploadViewProps): React.JSX.Element => {
  const [{ actionType, files }, dispatchStoreAction] = useStore();
  // launch native file picker on intiial render if no files are currently in state
  const selectionTypeRef = React.useRef<'FILE' | 'FOLDER' | undefined>(
    getFileSelectionType(actionType, files)
  );

  React.useEffect(() => {
    const selectionType = selectionTypeRef.current;
    if (!selectionType) {
      return;
    }

    dispatchStoreAction({ type: 'SELECT_FILES', selectionType });

    return () => {
      selectionTypeRef.current = undefined;
    };
  }, [dispatchStoreAction]);

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
    onExit,
    onSelectFiles,
    onTaskCancel,
    onToggleOverwrite,
  } = useUploadView({ onExit: onExitProps });

  const isActionStartDisabled =
    isProcessing || isProcessingComplete || statusCounts.TOTAL === 0;
  const isActionCancelDisabled = !isProcessing || isProcessingComplete;
  const isAddFilesDisabled = isProcessing || isProcessingComplete;
  const isAddFolderDisabled = isProcessing || isProcessingComplete;
  const isExitDisabled = isProcessing;
  const isOverwriteCheckboxDisabled = isProcessing || isProcessingComplete;

  return (
    <div className={resolveClassName(`amplify-${CLASS_BASE}`, className)}>
      <ControlsContextProvider
        data={{
          actionCancelLabel: 'Cancel',
          actionStartLabel: 'Upload',
          isActionCancelDisabled,
          isActionStartDisabled,
          isAddFilesDisabled,
          isAddFolderDisabled,
          isExitDisabled,
          isOverwriteCheckboxDisabled,
          statusCounts,
          tableData: getActionViewTableData({
            tasks,
            isProcessing,
            shouldDisplayProgress: true,
            onTaskCancel,
          }),
        }}
        onActionStart={onActionStart}
        onActionCancel={onActionCancel}
        onDropFiles={onDropFiles}
      >
        <Exit disabled={isExitDisabled} onClick={onExit} />
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
};
