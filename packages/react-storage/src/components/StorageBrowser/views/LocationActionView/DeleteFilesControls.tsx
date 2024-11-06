import React from 'react';

import { Controls } from '../Controls';
import { ViewElement } from '../../context/elements';
import { DataTableControl } from '../../controls/DataTableControl';
import { ControlsContextProvider } from '../../controls/context';
import { CLASS_BASE } from '../constants';
import { Title } from './Controls/Title';
import { useDeleteView } from './DeleteView/useDeleteView';
import { StatusDisplayControl } from '../../controls/StatusDisplayControl';
import { ControlsContext } from '../../controls/types';
import { useStore } from '../../providers/store';
import { getActionViewTableData } from './utils';
import { ActionStartControl } from '../../controls/ActionStartControl';
import { ActionCancelControl } from '../../controls/ActionCancelControl';
import { LocationData } from '../../actions';

const { Exit } = Controls;

export const DeleteFilesControls = (props?: {
  onExit?: (location: LocationData) => void;
}): React.JSX.Element => {
  const {
    isProcessing,
    isProcessingComplete,
    onActionCancel,
    onActionStart,
    onExit,
    statusCounts,
    tasks,
  } = useDeleteView(props);

  const [{ location }] = useStore();
  const { key } = location;
  const tableData = getActionViewTableData({
    tasks,
    path: key,
    isProcessing,
  });

  const contextValue: ControlsContext = {
    data: {
      statusCounts,
      tableData,
      isActionStartDisabled: isProcessing || isProcessingComplete,
      actionStartLabel: 'Start',
      actionCancelLabel: 'Cancel',
      isActionCancelDisabled: !isProcessing || isProcessingComplete,
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
