/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';

import { ControlsContextProvider } from '../../../controls/context';
import { useDisplayText } from '../../../displayText';

import { useResolveTableData } from '../../hooks/useResolveTableData';
import { DELETE_TABLE_KEYS, DELETE_TABLE_RESOLVERS } from '../../utils';

import type { DeleteViewProviderProps } from './types';

export function DeleteViewProvider({
  children,
  ...props
}: DeleteViewProviderProps): React.JSX.Element {
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
    getActionCompleteMessage,
  } = displayText;

  const {
    isProcessing,
    isProcessingComplete,
    statusCounts,
    tasks: items,
    onActionCancel,
    onActionStart,
    onActionExit,
    onTaskRemove,
  } = props;

  const message = isProcessingComplete
    ? getActionCompleteMessage({ counts: statusCounts, tasks: items })
    : undefined;

  const tableData = useResolveTableData(
    DELETE_TABLE_KEYS,
    //@ts-expect-error ddd
    DELETE_TABLE_RESOLVERS,
    {
      items: items as any,
      props: { displayText, isProcessing, onTaskRemove },
    }
  );

  console.log('tableData', tableData);

  return (
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
        message,
      }}
      onActionStart={onActionStart}
      onActionExit={onActionExit}
      onActionCancel={onActionCancel}
    >
      {children}
    </ControlsContextProvider>
  );
}
