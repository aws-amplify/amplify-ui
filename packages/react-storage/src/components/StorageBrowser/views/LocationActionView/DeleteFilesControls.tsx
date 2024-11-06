import React from 'react';

import { Controls } from '../Controls';
import { ViewElement } from '../../context/elements';
import { ControlsContextProvider } from '../../controls/context';
import { CLASS_BASE } from '../constants';
import { useDeleteView } from './DeleteView/useDeleteView';
import { ControlsContext } from '../../controls/types';
import { useStore } from '../../providers/store';
import { getActionViewTableData, GetTitle } from './utils';
import { LocationData } from '../../actions';
import { ActionStartControl } from '../../controls/ActionStartControl';
import { ActionCancelControl } from '../../controls/ActionCancelControl';
import { DataTableControl } from '../../controls/DataTableControl';
import { StatusDisplayControl } from '../../controls/StatusDisplayControl';
import { TitleControl } from '../../controls/TitleControl';

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
  const tableData = getActionViewTableData({
    tasks,
    taskCounts,
    path: key,
  });
  const title = GetTitle();
  const contextValue: ControlsContext = {
    data: {
      taskCounts,
      tableData,
      isActionStartDisabled: disablePrimary,
      actionStartLabel: 'Start',
      actionCancelLabel: 'Cancel',
      isActionCancelDisabled: disableCancel,
      title,
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
      <TitleControl className={`${CLASS_BASE}__delete-action-view-title`} />
      <ViewElement className={`${CLASS_BASE}__table-wrapper`}>
        <DataTableControl className={`${CLASS_BASE}__table`} />
      </ViewElement>
      <ViewElement className={`${CLASS_BASE}__action-footer`}>
        <StatusDisplayControl
          className={`${CLASS_BASE}__action-status-display`}
        />

        <ActionCancelControl className={`${CLASS_BASE}__cancel`} />
        <ActionStartControl />
      </ViewElement>
    </ControlsContextProvider>
  );
};
