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
      <ViewElement className={`amplify-${CLASS_BASE}__navigation`}>
        <Exit
          onClick={() => {
            onExit(current!);
          }}
          disabled={disableClose}
        />
      </ViewElement>
      <Title />
      <ViewElement className={`amplify-${CLASS_BASE}__table__wrapper`}>
        <DataTableControl className={`amplify-${CLASS_BASE}__table`} />
      </ViewElement>
      <ViewElement className={`amplify-${CLASS_BASE}__action__summary`}>
        <StatusDisplayControl
          className={`amplify-${CLASS_BASE}__action__status`}
        />
      </ViewElement>
      <ViewElement className={`amplify-${CLASS_BASE}__action__footer`}>
        <ViewElement
          className={`amplify-${CLASS_BASE}__action__message`}
        ></ViewElement>
        <ViewElement className={`amplify-${CLASS_BASE}__action__buttons`}>
          <ActionCancelControl
            className={`amplify-${CLASS_BASE}__action__cancel`}
          />
          <ActionStartControl
            className={`amplify-${CLASS_BASE}__action__start`}
          />
        </ViewElement>
      </ViewElement>
    </ControlsContextProvider>
  );
};
