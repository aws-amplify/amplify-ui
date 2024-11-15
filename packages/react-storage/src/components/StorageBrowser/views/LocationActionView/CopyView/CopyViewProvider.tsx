import React from 'react';

import { ControlsContextProvider } from '../../../controls/context';
import { useDisplayText } from '../../../displayText';

import { getActionViewTableData } from '../getActionViewTableData';

import { DestinationProvider } from './DestinationControl';
import { FoldersMessageProvider } from './FoldersMessageControl';
import { FoldersPaginationProvider } from './FoldersPaginationControl';
import { FoldersTableProvider } from './FoldersTableControl';
import { CopyViewProviderProps } from './types';
import { MessageProps } from '../../../composables/Message';

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
    getListFoldersResultsMessage,
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
    folders,
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
    hasNextPage,
    highestPageVisited,
    hasError: hasFoldersError,
    message: foldersErrorMessage,
    query,
    hasInitialized: hasFoldersInitialized,
    onQuery,
    onSearchClear,
    onSearch,
    onSelect,
    onPaginate,
    isLoading,
    page,
    pageItems,
  } = folders;

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

  const message: MessageProps | undefined = !isProcessingComplete
    ? {
        content: overwriteWarningMessage,
        type: 'warning',
      }
    : getActionCompleteMessage({ counts: statusCounts });

  const foldersMessage = !hasFoldersInitialized
    ? undefined
    : getListFoldersResultsMessage({
        hasError: hasFoldersError,
        message: foldersErrorMessage,
        folders: pageItems,
        query,
      });

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
        message,
        searchQuery: query,
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
        <FoldersPaginationProvider
          hasNextPage={hasNextPage}
          highestPageVisited={highestPageVisited}
          page={page}
          onPaginate={onPaginate}
        >
          <FoldersTableProvider folders={pageItems} onSelect={onSelect}>
            <FoldersMessageProvider {...foldersMessage}>
              {children}
            </FoldersMessageProvider>
          </FoldersTableProvider>
        </FoldersPaginationProvider>
      </DestinationProvider>
    </ControlsContextProvider>
  );
}
