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

const { Exit, Primary } = Controls;

export const DeleteFilesControls = ({
  onClose: _onClose,
}: {
  onClose?: () => void;
}): React.JSX.Element => {
  const {
    disableCancel,
    disableClose,
    disablePrimary,
    onClose,
    onCancel,
    onStart,
    taskCounts,
    tableData,
  } = useDeleteActionView({ onClose: _onClose });

  const contextValue: ControlsContext = {
    data: { taskCounts, tableData },
    actionsConfig: { type: 'BATCH_ACTION', isCancelable: true },
  };

  return (
    <ControlsContextProvider {...contextValue}>
      <Exit onClick={onClose} disabled={disableClose} />
      <Title />
      <Primary
        disabled={disablePrimary}
        onClick={() => {
          onStart();
        }}
      >
        Start
      </Primary>
      <ButtonElement
        variant="cancel"
        disabled={disableCancel}
        className={`${CLASS_BASE}__cancel`}
        onClick={() => {
          onCancel();
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
