import React from 'react';

import { ControlsContextProvider } from '../../../controls/context';
import { useDisplayText } from '../../../displayText';

import { getActionViewTableData } from '../getActionViewTableData';

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
    destination,
    folders,
    isProcessing,
    isProcessingComplete,
    location,
    statusCounts,
    tasks,
    onActionCancel,
    onActionExit,
    onActionStart,
    onSelectDestination,
    onTaskRemove,
  } = props;

  const {
    hasNextPage,
    highestPageVisited,
    hasError: hasFoldersError,
    message: foldersErrorMessage,
    query,
    hasExhaustedSearch,
    isLoading,
    page,
    pageItems,
    onPaginate,
    onQuery,
    onSearchClear,
    onSearch,
    onSelectFolder,
  } = folders;

  const { key: locationKey } = location ?? {};

  const tableData = getActionViewTableData({
    tasks,
    locationKey,
    isProcessing,
    displayText,
    onTaskRemove,
  });

  const isActionStartDisabled =
    isProcessing || isProcessingComplete || !destination?.current;

  const isActionCancelDisabled = !isProcessing || isProcessingComplete;

  const message: MessageProps | undefined = !isProcessingComplete
    ? {
        content: overwriteWarningMessage,
        type: 'warning',
      }
    : getActionCompleteMessage({ counts: statusCounts });

  return (
    <ControlsContextProvider
      data={{
        actionCancelLabel,
        actionDestinationLabel,
        actionExitLabel,
        actionStartLabel,
        destination,
        isActionCancelDisabled,
        isActionDestinationNavigable: !isProcessing && !isProcessingComplete,
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
      onSelectDestination={onSelectDestination}
    >
      <FoldersPaginationProvider
        hasNextPage={hasNextPage}
        highestPageVisited={highestPageVisited}
        page={page}
        onPaginate={onPaginate}
      >
        <FoldersTableProvider
          destination={destination}
          folders={pageItems}
          onSelectFolder={onSelectFolder}
        >
          <FoldersMessageProvider
            folders={folders.pageItems}
            hasError={hasFoldersError}
            message={foldersErrorMessage}
            query={query}
            hasExhaustedSearch={hasExhaustedSearch}
          >
            {children}
          </FoldersMessageProvider>
        </FoldersTableProvider>
      </FoldersPaginationProvider>
    </ControlsContextProvider>
  );
}
