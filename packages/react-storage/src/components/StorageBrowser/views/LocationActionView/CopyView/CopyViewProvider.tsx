import React from 'react';

import { ControlsContextProvider } from '../../../controls/context';
import { useDisplayText } from '../../../displayText';

import { getActionViewTableData } from '../getActionViewTableData';

import { DestinationProvider } from './DestinationControl';
import { FoldersMessageProvider } from './FoldersMessageControl';
import { FoldersPaginationProvider } from './FoldersPaginatationControl';
import { FoldersTableProvider } from './FoldersTableControl';
import { useFolders } from './useFolders';
import { CopyViewProviderProps } from './types';

export function CopyViewProvider({
  children,
  ...props
}: CopyViewProviderProps): React.JSX.Element {
  const { CopyView: displayText } = useDisplayText();
  const {
    actionCancelLabel,
    actionDestinationLabel,
    actionExitLabel,
    actionStartLabel,
    getActionCompleteMessage,
    getFolderListResultsMessage,
    overwriteWarningMessage,
    searchPlaceholder,
    searchSubmitLabel,
    searchClearLabel,
    statusDisplayCanceledLabel,
    statusDisplayCompletedLabel,
    statusDisplayFailedLabel,
    statusDisplayQueuedLabel,
  } = displayText;

  const {
    destinationList,
    isProcessing,
    isProcessingComplete,
    location,
    onActionCancel,
    onActionExit,
    onActionStart,
    onDestinationChange,
    onTaskRemove,
    statusCounts,
    tasks,
  } = props;

  const {
    folders,
    hasError: hasFoldersError,
    message: foldersMessage,
    currentQuery,
    hasInitialized: hasFoldersInitialized,
    isLoading,
    onQuery,
    onSearchClear,
    onSearch,
    onSelect,
    ...paginateProps
  } = useFolders({ destinationList, onDestinationChange });

  const { current, key: locationKey } = location ?? {};
  const { bucket } = current ?? {};

  const tableData = getActionViewTableData({
    tasks,
    locationKey,
    isProcessing,
    displayText,
    onTaskRemove,
  });

  const isActionStartDisabled =
    isProcessing || isProcessingComplete || destinationList.length === 0;

  const isActionCancelDisabled = !isProcessing || isProcessingComplete;

  const copyMessageContent = !isProcessingComplete
    ? overwriteWarningMessage
    : getActionCompleteMessage(statusCounts);

  const copyCompleteMessageType = isProcessingComplete
    ? statusCounts.FAILED
      ? 'error'
      : !statusCounts.FAILED
      ? 'info'
      : undefined
    : undefined;

  const copyMessageType = isProcessingComplete
    ? copyCompleteMessageType
    : 'warning';

  const foldersMessageContent = !hasFoldersInitialized
    ? undefined
    : getFolderListResultsMessage({
        defaultMessage: foldersMessage,
        folders,
        query: currentQuery,
      });

  const foldersMessageType = foldersMessageContent
    ? hasFoldersError
      ? 'error'
      : 'info'
    : undefined;

  return (
    <ControlsContextProvider
      data={{
        actionCancelLabel,
        actionExitLabel,
        actionStartLabel,
        isActionCancelDisabled,
        isActionExitDisabled: isProcessing,
        isActionStartDisabled,
        isLoading,
        messageContent: copyMessageContent,
        messageType: copyMessageType,
        searchQuery: currentQuery,
        searchPlaceholder,
        searchSubmitLabel,
        searchClearLabel,
        statusCounts,
        statusDisplayCanceledLabel,
        statusDisplayCompletedLabel,
        statusDisplayFailedLabel,
        statusDisplayQueuedLabel,
        tableData,
      }}
      onActionCancel={onActionCancel}
      onActionExit={onActionExit}
      onActionStart={onActionStart}
      onSearch={onSearch}
      onSearchClear={onSearchClear}
      onSearchQueryChange={onQuery}
    >
      <DestinationProvider
        bucket={bucket}
        label={actionDestinationLabel}
        destinationList={destinationList}
        onDestinationChange={onDestinationChange}
        isDisabled={isProcessing || isProcessingComplete}
      >
        <FoldersPaginationProvider {...paginateProps}>
          <FoldersTableProvider folders={folders} onSelect={onSelect}>
            <FoldersMessageProvider
              content={foldersMessageContent}
              type={foldersMessageType}
            >
              {children}
            </FoldersMessageProvider>
          </FoldersTableProvider>
        </FoldersPaginationProvider>
      </DestinationProvider>
    </ControlsContextProvider>
  );
}
