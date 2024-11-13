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
import { AMPLIFY_CLASS_BASE } from '../../constants';
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
    onTaskRemove,
  } = useDeleteView(props);

  const tableData = getActionViewTableData({
    tasks,
    locationKey: location.key,
    isProcessing,
    onTaskRemove,
  });

  return (
    <div className={resolveClassName(AMPLIFY_CLASS_BASE, className)}>
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
        <TitleControl />

        <DataTableControl />

        <ViewElement className={`${AMPLIFY_CLASS_BASE}__summary`}>
          <StatusDisplayControl />
        </ViewElement>
        <ViewElement className={`${AMPLIFY_CLASS_BASE}__footer`}>
          <ViewElement className={`${AMPLIFY_CLASS_BASE}__message`}>
            {/* TODO: confirmation message goes here */}
          </ViewElement>
          <ViewElement className={`${AMPLIFY_CLASS_BASE}__buttons`}>
            <ActionCancelControl />
            <ActionStartControl />
          </ViewElement>
        </ViewElement>
      </ControlsContextProvider>
    </div>
  );
}
