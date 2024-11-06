import React from 'react';

import { ViewElement } from '../../context/elements';

import { Controls } from '../Controls';

import { Title } from './Controls/Title';
import { displayText } from '../../displayText/en';
import { CLASS_BASE } from '../constants';
import { DestinationPicker } from './DestinationPicker';

import { useCopyView } from './CopyView';
import { DataTableControl } from '../../controls/DataTableControl';
import { ControlsContextProvider } from '../../controls/context';
import { getActionViewTableData } from './utils';
import { useStore } from '../../providers/store';
import { ControlsContext } from '../../controls/types';
import { ActionStartControl } from '../../controls/ActionStartControl';
import { DescriptionList } from '../../components/DescriptionList';
import { StatusDisplayControl } from '../../controls/StatusDisplayControl';
import { getDestinationListFullPrefix } from './utils/getDestinationPickerDataTable';
import { ActionCancelControl } from '../../controls/ActionCancelControl';

const { Exit } = Controls;
const { actionSetDestination } = displayText;

export const CopyFilesControls = (props: {
  onExit?: () => void;
}): React.JSX.Element => {
  const {
    destinationList,
    onDestinationChange,
    isProcessing,
    isProcessingComplete,
    onExit,
    onActionCancel,
    onActionStart,
    statusCounts,
    tasks,
  } = useCopyView(props);

  const [{ location }] = useStore();
  const { current } = location;
  const path = current?.prefix;
  const tableData = getActionViewTableData({
    tasks,
    path: path ?? '',
    isProcessing,
  });

  const isActionStartDisabled =
    isProcessing || isProcessingComplete || destinationList.length === 0;

  const isActionCancelDisabled = !isProcessing || isProcessingComplete;

  const contextValue: ControlsContext = {
    data: {
      statusCounts,
      tableData,
      actionStartLabel: 'Copy',
      isActionStartDisabled,
      isActionCancelDisabled,
      actionCancelLabel: 'Cancel',
    },
    actionsConfig: { type: 'BATCH_ACTION', isCancelable: true },
    onActionStart,
    onActionCancel,
  };

  return (
    <ControlsContextProvider {...contextValue}>
      <Exit onClick={onExit} disabled={isProcessing} />
      <Title />
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
