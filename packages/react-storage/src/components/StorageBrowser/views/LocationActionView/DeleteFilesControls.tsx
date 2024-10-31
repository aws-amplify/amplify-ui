import React from 'react';

import { Controls } from '../Controls';
import { ButtonElement } from '../../context/elements';
import { DataTableControl } from '../../controls/DataTableControl';
import { ControlsContextProvider } from '../../controls/context';
import { CLASS_BASE } from '../constants';
import { Title } from './Controls/Title';
import { useDeleteActionView } from './hooks/useDeleteActionView';
import { StatusDisplayControl } from '../../controls/StatusDisplayControl';
import { ControlsContext } from '../../controls/types';
import { useStore } from '../../providers/store';
import { getDeleteActionViewTableData } from './utils';
import { ActionStartControl } from '../../controls/ActionStartControl';

const { Exit } = Controls;

export const DeleteFilesControls = ({
  onClose: _onClose,
}: {
  onClose?: () => void;
}): React.JSX.Element => {
  const {
    disableCancel,
    disableClose,
    disableStart,
    onClose,
    onActionCancel,
    onActionStart,
    taskCounts,
    tasks,
  } = useDeleteActionView({ onClose: _onClose });

  const [{ history }] = useStore();
  const { current } = history;
  const path = current?.prefix;
  const tableData = getDeleteActionViewTableData({
    tasks,
    taskCounts,
    path: path ?? '',
  });

  const contextValue: ControlsContext = {
    data: {
      taskCounts,
      tableData,
      isActionStartDisabled: disableStart,
      actionStartLabel: 'Start',
    },
    actionsConfig: { type: 'BATCH_ACTION', isCancelable: true },
    onActionStart,
  };

  return (
    <ControlsContextProvider {...contextValue}>
      <Exit onClick={onClose} disabled={disableClose} />
      <Title />
      <ActionStartControl />
      <ButtonElement
        variant="cancel"
        disabled={disableCancel}
        className={`${CLASS_BASE}__cancel`}
        onClick={() => {
          onActionCancel();
        }}
      >
        Cancel
      </ButtonElement>
      <StatusDisplayControl
        className={`${CLASS_BASE}__action-status-display`}
      />
      <DataTableControl className={`${CLASS_BASE}__table`} />
    </ControlsContextProvider>
  );
};
