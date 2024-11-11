import React from 'react';

import { Controls } from '../../Controls';
import { ViewElement } from '../../../context/elements';
import { DataTableControl } from '../../../controls/DataTableControl';
import { ControlsContextProvider } from '../../../controls/context';
import { CLASS_BASE } from '../../constants';
import { Title } from '../Controls/Title';
import { StatusDisplayControl } from '../../../controls/StatusDisplayControl';
import { getActionViewTableData } from '../getActionViewTableData';
import { ActionStartControl } from '../../../controls/ActionStartControl';
import { ActionCancelControl } from '../../../controls/ActionCancelControl';
import { resolveClassName } from '../../utils';
import { useDeleteView } from './useDeleteView';
import { DeleteViewProps } from './types';

const { Exit } = Controls;

export const DeleteView = ({
  className,
  onExit: onExitProps,
}: DeleteViewProps): React.JSX.Element => {
  const {
    isProcessing,
    isProcessingComplete,
    location,
    statusCounts,
    tasks,
    onActionCancel,
    onActionStart,
    onExit,
    onTaskRemove,
  } = useDeleteView({ onExit: onExitProps });

  const tableData = getActionViewTableData({
    tasks,
    locationKey: location.key,
    isProcessing,
    onTaskRemove,
  });

  return (
    <div className={resolveClassName(CLASS_BASE, className)}>
      <ControlsContextProvider
        data={{
          actionCancelLabel: 'Cancel',
          actionStartLabel: 'Start',
          isActionCancelDisabled: !isProcessing || isProcessingComplete,
          isActionStartDisabled: isProcessing || isProcessingComplete,
          statusCounts,
          tableData,
        }}
        onActionStart={onActionStart}
        onActionCancel={onActionCancel}
      >
        <Exit onClick={onExit} disabled={isProcessing} />
        <Title />
        <ViewElement className={`${CLASS_BASE}__table-wrapper`}>
          <DataTableControl
            className={`${CLASS_BASE}__delete-view-data-table`}
          />
        </ViewElement>
        <ViewElement className={`${CLASS_BASE}__action-footer`}>
          <StatusDisplayControl
            className={`${CLASS_BASE}__action-status-display`}
          />
          <ActionCancelControl className={`${CLASS_BASE}__cancel`} />
          <ActionStartControl />
        </ViewElement>
      </ControlsContextProvider>
    </div>
  );
};
