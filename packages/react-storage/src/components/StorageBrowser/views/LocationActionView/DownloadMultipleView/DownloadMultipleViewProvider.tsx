import React from 'react';

import { ControlsContextProvider } from '../../../controls/context';
import { useDisplayText } from '../../../displayText';

import { useResolveTableData } from '../../hooks/useResolveTableData';
import { DOWNLOAD_TABLE_KEYS, DOWNLOAD_TABLE_RESOLVERS } from '../../utils';

import { DownloadMultipleViewProviderProps } from './types';

export function DownloadMultipleViewProvider({
  children,
  ...props
}: DownloadMultipleViewProviderProps): React.JSX.Element {
  const { DownloadMultipleView: displayText } = useDisplayText();

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
  } = props;

  const message = isProcessingComplete
    ? getActionCompleteMessage({ counts: statusCounts })
    : undefined;

  const tableData = useResolveTableData(
    DOWNLOAD_TABLE_KEYS,
    DOWNLOAD_TABLE_RESOLVERS,
    {
      items,
      props: { displayText, isProcessing },
    }
  );

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
