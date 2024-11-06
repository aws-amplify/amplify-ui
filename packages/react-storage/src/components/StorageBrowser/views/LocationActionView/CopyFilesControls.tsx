import React from 'react';

import { ViewElement } from '../../context/elements';

import { Controls } from '../Controls';

import { displayText } from '../../displayText/en';
import { CLASS_BASE } from '../constants';
import { DestinationPicker } from './DestinationPicker';

import { useCopyView } from './CopyView/useCopyView';
import { ControlsContextProvider } from '../../controls/context';
import { getActionViewTableData } from './utils';
import { useStore } from '../../providers/store';
import { ControlsContext } from '../../controls/types';
import { getTasksHaveStarted } from './utils';
import { DescriptionList } from '../../components/DescriptionList';
import { getDestinationListFullPrefix } from './utils/getDestinationPickerDataTable';
import { CopyHandlerData } from '../../actions';

import { ActionCancelControl } from '../../controls/ActionCancelControl';
import { ActionStartControl } from '../../controls/ActionStartControl';
import { DataTableControl } from '../../controls/DataTableControl';
import { StatusDisplayControl } from '../../controls/StatusDisplayControl';
import { TitleControl } from '../../controls/TitleControl';

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
    disablePrimary,
    onExit,
    onActionCancel,
    onActionStart,
    taskCounts,
    tasks,
  } = useCopyView({ onExit: _onExit });

  const [{ location }] = useStore();
  const { current, key } = location;
  const tableData = getActionViewTableData<CopyHandlerData>({
    tasks,
    taskCounts,
    path: key,
  });

  const contextValue: ControlsContext = {
    data: {
      taskCounts,
      tableData,
      actionStartLabel: 'Start',
      isActionStartDisabled: disablePrimary,
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

      <TitleControl />

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
