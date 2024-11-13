import React from 'react';

import { ViewElement } from '../../../context/elements';
import { ActionCancelControl } from '../../../controls/ActionCancelControl';
import { ActionExitControl } from '../../../controls/ActionExitControl';
import { ActionStartControl } from '../../../controls/ActionStartControl';
import { DataTableControl } from '../../../controls/DataTableControl';
import { StatusDisplayControl } from '../../../controls/StatusDisplayControl';
import { TitleControl } from '../../../controls/TitleControl';
import { ControlsContextProvider } from '../../../controls/context';
import { useDisplayText } from '../../../displayText';
import { CLASS_BASE } from '../../constants';
import { resolveClassName } from '../../utils';
import { getActionViewTableData } from '../getActionViewTableData';
import { useDeleteView } from './useDeleteView';
import { DeleteViewProps } from './types';

export function DeleteView({
  className,
  ...props
}: DeleteViewProps): React.JSX.Element {
  const {
    DeleteView: { actionCancelLabel, actionExitLabel, actionStartLabel, title },
  } = useDisplayText();

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
          title,
        }}
        onActionStart={onActionStart}
        onActionExit={onActionExit}
        onActionCancel={onActionCancel}
      >
        <ActionExitControl />
        <TitleControl className={`${CLASS_BASE}__delete-view-title`} />
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
