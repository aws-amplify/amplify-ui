import React from 'react';

import { Controls } from '../Controls';
import { DataTableControl } from '../../controls/DataTableControl';
import { ControlsContextProvider } from '../../controls/context';
import { CLASS_BASE } from '../constants';
import { Title } from './Controls/Title';
import { useDeleteView } from './DeleteView/useDeleteView';
import { StatusDisplayControl } from '../../controls/StatusDisplayControl';
import { ControlsContext } from '../../controls/types';
import { useStore } from '../../providers/store';
import { getDeleteActionViewTableData } from './utils';
import { ActionStartControl } from '../../controls/ActionStartControl';
import { LocationData } from '../../actions';
import { ActionCancelControl } from '../../controls/ActionCancelControl';

const { Exit } = Controls;

export const DeleteFilesControls = (props: {
  onExit?: (location: LocationData) => void;
}): React.JSX.Element => {
  const {
    disableCancel,
    disableClose,
    disablePrimary,
    onExit,
    onActionCancel,
    onActionStart,
    taskCounts,
    tasks,
  } = useDeleteView(props);

  const [{ location }] = useStore();
  const { current, key } = location;
  const tableData = getDeleteActionViewTableData({
    tasks,
    taskCounts,
    path: key,
  });

  const contextValue: ControlsContext = {
    data: {
      taskCounts,
      tableData,
      isActionStartDisabled: disablePrimary,
      actionStartLabel: 'Start',
      actionCancelLabel: 'Cancel',
      isActionCancelDisabled: disableCancel,
    },
    actionsConfig: { type: 'BATCH_ACTION', isCancelable: true },
    onActionStart,
    onActionCancel,
  };

  return (
    <ControlsContextProvider {...contextValue}>
      <Exit
        onClick={() => {
          onExit(current!);
        }}
        disabled={disableClose}
      />
      <Title />
      <ActionStartControl
        className={`${CLASS_BASE}__delete-files-action-start`}
      />
      <ActionCancelControl
        className={`${CLASS_BASE}__delete-files-action-cancel`}
      />
      <StatusDisplayControl
        className={`${CLASS_BASE}__action-status-display`}
      />
      <DataTableControl className={`${CLASS_BASE}__table`} />
    </ControlsContextProvider>
  );
};
