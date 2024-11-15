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
import { MessageProps } from '../../../composables/Message';

export function CopyViewProvider({
  children,
  ...props
}: CopyViewProviderProps): React.JSX.Element {
  const {
    actionCancelLabel,
    actionDestinationLabel,
    actionExitLabel,
    actionStartLabel,
    getActionCompleteMessage,
    getListFoldersResultsMessage,
    overwriteWarningMessage,
    searchPlaceholder,
  } = useDisplayText()['CopyView'];

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
    message: foldersErrorMessage,
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
        message: foldersErrorMessage,
        folders,
        query: currentQuery,
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
        searchQuery: currentQuery,
        searchPlaceholder,
        statusCounts,
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
            <FoldersMessageProvider {...foldersMessage}>
              {children}
            </FoldersMessageProvider>
          </FoldersTableProvider>
        </FoldersPaginationProvider>
      </DestinationProvider>
    </ControlsContextProvider>
  );
}
