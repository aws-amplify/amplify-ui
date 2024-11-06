import React from 'react';

import { ViewElement } from '../../context/elements';

import { Controls } from '../Controls';

import { Title } from './Controls/Title';
import { displayText } from '../../displayText/en';
import { CLASS_BASE } from '../constants';
import { DestinationPicker } from './DestinationPicker';

import { useCopyView } from './CopyView/useCopyView';
import { DataTableControl } from '../../controls/DataTableControl';
import { ControlsContextProvider } from '../../controls/context';
import { getActionViewTableData } from './utils';
import { useStore } from '../../providers/store';
import { ControlsContext } from '../../controls/types';
import { ActionStartControl } from '../../controls/ActionStartControl';
import { getTasksHaveStarted } from './utils';
import { DescriptionList } from '../../components/DescriptionList';
import { StatusDisplayControl } from '../../controls/StatusDisplayControl';
import { getDestinationListFullPrefix } from './utils/getDestinationPickerDataTable';
import { ActionCancelControl } from '../../controls/ActionCancelControl';
import { CopyHandlerData } from '../../actions';

const { Exit } = Controls;
const { actionSetDestination } = displayText;

export const CopyFilesControls = ({
  onExit: _onExit,
}: {
  onExit?: () => void;
}): React.JSX.Element => {
  const {
    destinationList,
    onSetDestinationList,
    disableCancel,
    disableClose,
    disableStart,
    onExit,
    onActionCancel,
    onActionStart,
    taskCounts,
    tasks,
  } = useCopyView({ onExit: _onExit });

  const [{ location }] = useStore();
  const { current } = location;
  const path = current?.prefix;
  const tableData = getActionViewTableData<CopyHandlerData>({
    tasks,
    taskCounts,
    path: path ?? '',
  });

  const contextValue: ControlsContext = {
    data: {
      taskCounts,
      tableData,
      actionStartLabel: 'Start',
      isActionStartDisabled: disableStart,
      isActionCancelDisabled: disableCancel,
      actionCancelLabel: 'Cancel',
    },
    actionsConfig: { type: 'BATCH_ACTION', isCancelable: true },
    onActionStart,
    onActionCancel,
  };
  const hasStarted = getTasksHaveStarted(taskCounts);

  return (
    <ControlsContextProvider {...contextValue}>
      <Exit
        onClick={() => {
          onExit(current!);
        }}
        disabled={disableClose}
      />

      <Title />

      <ViewElement className={`${CLASS_BASE}__table-wrapper`}>
        <DataTableControl className={`${CLASS_BASE}__table`} />
      </ViewElement>

      {hasStarted ? (
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
          onSetDestinationList={onSetDestinationList}
        />
      )}

      <ViewElement className={`${CLASS_BASE}__action-footer`}>
        {hasStarted ? (
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
