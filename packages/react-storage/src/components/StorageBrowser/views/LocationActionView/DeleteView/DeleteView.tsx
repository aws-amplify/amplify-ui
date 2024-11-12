import React from 'react';

import { Title } from '../Controls/Title';

import { ViewElement } from '../../../context/elements';
import { DataTableControl } from '../../../controls/DataTableControl';
import { ControlsContextProvider } from '../../../controls/context';
import { StatusDisplayControl } from '../../../controls/StatusDisplayControl';
import { ActionStartControl } from '../../../controls/ActionStartControl';
import { ActionExitControl } from '../../../controls/ActionExitControl';
import { ActionCancelControl } from '../../../controls/ActionCancelControl';
import { CLASS_BASE } from '../../constants';
import { resolveClassName } from '../../utils';

import { getActionViewTableData } from '../getActionViewTableData';
import { useDeleteView } from './useDeleteView';
import { DeleteViewProps } from './types';
import { useDisplayText } from '../../../displayText';

export function DeleteView({
  className,
  ...props
}: DeleteViewProps): React.JSX.Element {
  const { actionCancelLabel, actionExitLabel, actionStartLabel } =
    useDisplayText()['DeleteView'];

  const {
    isProcessing,
    isProcessingComplete,
    location,
    statusCounts,
    tasks,
    onActionCancel,
    onActionStart,
    onActionExit,
    onTaskCancel,
  } = useDeleteView(props);

  const tableData = getActionViewTableData({
    tasks,
    locationKey: location.key,
    isProcessing,
    onTaskCancel,
  });

  return (
    <div className={resolveClassName(CLASS_BASE, className)}>
      <ControlsContextProvider
        data={{
          actionCancelLabel,
          actionExitLabel,
          actionStartLabel,
          isActionCancelDisabled: !isProcessing || isProcessingComplete,
          isActionExitDisabled: isProcessing,
          isActionStartDisabled: isProcessing || isProcessingComplete,
          statusCounts,
          tableData,
        }}
        onActionStart={onActionStart}
        onActionExit={onActionExit}
        onActionCancel={onActionCancel}
      >
        <ActionExitControl />
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
}
