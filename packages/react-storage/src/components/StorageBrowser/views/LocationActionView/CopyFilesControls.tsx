import React from 'react';

import { ViewElement } from '../../context/elements';

import { Controls } from '../Controls';

import { displayText } from '../../displayText/en';
import { CLASS_BASE } from '../constants';
import { DestinationPicker } from './DestinationPicker';

import { useCopyView } from './CopyView';
import { ControlsContextProvider } from '../../controls/context';
import { getActionViewTableData } from './utils';
import { useStore } from '../../providers/store';
import { ControlsContext } from '../../controls/types';
import { DescriptionList } from '../../components/DescriptionList';
import { getDestinationListFullPrefix } from './utils/getDestinationPickerDataTable';
import { getFolderNameFromPath } from './utils/getFolderNameFromPath';

import { ActionCancelControl } from '../../controls/ActionCancelControl';
import { ActionStartControl } from '../../controls/ActionStartControl';
import { DataTableControl } from '../../controls/DataTableControl';
import { StatusDisplayControl } from '../../controls/StatusDisplayControl';
import { TitleControl } from '../../controls/TitleControl';

const { Exit } = Controls;
const { actionSetDestination } = displayText;

export const CopyFilesControls = (props: {
  onExit?: () => void;
}): React.JSX.Element => {
  const {
    destinationList,
    isProcessing,
    isProcessingComplete,
    onActionCancel,
    onActionStart,
    onDestinationChange,
    onExit,
    statusCounts,
    tasks,
  } = useCopyView(props);

  const [{ location }] = useStore();
  const { current, key } = location;

  const tableData = getActionViewTableData({
    tasks,
    folder: key,
    isProcessing,
  });

  const isActionStartDisabled =
    isProcessing || isProcessingComplete || destinationList.length === 0;

  const isActionCancelDisabled = !isProcessing || isProcessingComplete;
  const title = key ? getFolderNameFromPath(key) : current.bucket;
  const contextValue: ControlsContext = {
    data: {
      statusCounts,
      tableData,
      actionStartLabel: 'Copy',
      isActionStartDisabled,
      isActionCancelDisabled,
      actionCancelLabel: 'Cancel',
      title,
    },
    onActionStart,
    onActionCancel,
  };

  return (
    <ControlsContextProvider {...contextValue}>
      <Exit onClick={onExit} disabled={isProcessing} />
      <TitleControl />
      <ViewElement className={`${CLASS_BASE}__table-wrapper`}>
        <DataTableControl className={`${CLASS_BASE}__table`} />
      </ViewElement>
      {isProcessing || isProcessingComplete ? (
        <ViewElement className={`${CLASS_BASE}__action-destination`}>
          <DescriptionList
            descriptions={[
              {
                term: `${actionSetDestination}:`,
                details: getDestinationListFullPrefix(destinationList),
              },
            ]}
          />
        </ViewElement>
      ) : (
        <DestinationPicker
          destinationList={destinationList}
          onDestinationChange={onDestinationChange}
        />
      )}

      <ViewElement className={`${CLASS_BASE}__action-footer`}>
        {isProcessing || isProcessingComplete ? (
          <StatusDisplayControl
            className={`${CLASS_BASE}__action-status-display`}
          />
        ) : (
          <ViewElement className={`${CLASS_BASE}__action-status-display`}>
            Copy action may overwrite existing files at selected destination.
          </ViewElement>
        )}
        <ActionCancelControl className={`${CLASS_BASE}__cancel`} />
        <ActionStartControl className={`${CLASS_BASE}__upload-action-start`} />
      </ViewElement>
    </ControlsContextProvider>
  );
};
