import React from 'react';

import type { MessageProps } from '../../../components/composables/Message';
import { ControlsContextProvider } from '../../../controls';
import { useDisplayText } from '../../../displayText';

import { useResolveTableData } from '../../hooks/useResolveTableData';
import { FILE_DATA_ITEM_TABLE_KEYS, COPY_TABLE_RESOLVERS } from '../../utils';

import { FoldersMessageProvider } from './FoldersMessageControl';
import { FoldersPaginationProvider } from './FoldersPaginationControl';
import { FoldersTableProvider } from './FoldersTableControl';
import type { CopyViewProviderProps } from './types';

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
    title,
  } = displayText;

  const {
    destination,
    folders,
    hasNextPage,
    highestPageVisited,
    isProcessing,
    isProcessingComplete,
    onPaginate,
    page,
    pageTasks,
    statusCounts,
    onActionCancel,
    onActionExit,
    onActionStart,
    onSelectDestination,
    onTaskRemove,
  } = props;

  const {
    hasNextPage: foldersHasNextPage,
    highestPageVisited: foldersHighestPageVisited,
    hasError: hasFoldersError,
    message: foldersErrorMessage,
    query,
    hasExhaustedSearch,
    isLoading,
    page: foldersPage,
    pageItems,
    onPaginate: foldersOnPaginate,
    onQuery,
    onSearchClear,
    onSearch,
    onSelectFolder,
  } = folders;

  const tableData = useResolveTableData(
    FILE_DATA_ITEM_TABLE_KEYS,
    COPY_TABLE_RESOLVERS,
    {
      items: pageTasks,
      props: { displayText, isProcessing, onTaskRemove },
    }
  );

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
        paginationData: {
          hasNextPage,
          highestPageVisited,
          page,
        },
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
        title,
      }}
      onActionCancel={onActionCancel}
      onActionExit={onActionExit}
      onActionStart={onActionStart}
      onPaginate={onPaginate}
      onSearch={onSearch}
      onSearchClear={onSearchClear}
      onSearchQueryChange={onQuery}
      onSelectDestination={onSelectDestination}
    >
      <FoldersPaginationProvider
        hasNextPage={foldersHasNextPage}
        highestPageVisited={foldersHighestPageVisited}
        page={foldersPage}
        onPaginate={foldersOnPaginate}
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
