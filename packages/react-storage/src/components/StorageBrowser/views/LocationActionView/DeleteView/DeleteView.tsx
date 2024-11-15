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
import { STORAGE_BROWSER_BLOCK } from '../../../constants';
import { resolveClassName } from '../../utils';
import { getActionViewTableData } from '../getActionViewTableData';
import { useDeleteView } from './useDeleteView';
import { DeleteViewProps } from './types';

export function DeleteView({
  className,
  ...props
}: DeleteViewProps): React.JSX.Element {
  const { DeleteView: displayText } = useDisplayText();
  const {
    actionCancelLabel,
    actionExitLabel,
    actionStartLabel,
    title,
    statusDisplayCanceledLabel,
    statusDisplayCompletedLabel,
    statusDisplayFailedLabel,
    statusDisplayQueuedLabel,
  } = displayText;

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
    displayText,
    onTaskRemove,
  });

  return (
    <div className={resolveClassName(STORAGE_BROWSER_BLOCK, className)}>
      <ControlsContextProvider
        data={{
          actionCancelLabel,
          actionExitLabel,
          actionStartLabel,
          isActionCancelDisabled: !isProcessing || isProcessingComplete,
          isActionExitDisabled: isProcessing,
          isActionStartDisabled: isProcessing || isProcessingComplete,
          statusDisplayCanceledLabel,
          statusDisplayCompletedLabel,
          statusDisplayFailedLabel,
          statusDisplayQueuedLabel,
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

        <ViewElement className={`${STORAGE_BROWSER_BLOCK}__summary`}>
          <StatusDisplayControl />
        </ViewElement>
        <ViewElement className={`${STORAGE_BROWSER_BLOCK}__footer`}>
          <ViewElement className={`${STORAGE_BROWSER_BLOCK}__message`}>
            {/* TODO: confirmation message goes here */}
          </ViewElement>
          <ViewElement className={`${STORAGE_BROWSER_BLOCK}__buttons`}>
            <ActionCancelControl />
            <ActionStartControl />
          </ViewElement>
        </ViewElement>
      </ControlsContextProvider>
    </div>
  );
}
