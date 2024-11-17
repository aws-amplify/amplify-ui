import React from 'react';

import { ControlsContextProvider } from '../../controls/context';
import { useDisplayText } from '../../displayText';

import { LocationDetailViewProviderProps } from './types';
import { getLocationDetailViewTableData } from './getLocationDetailViewTableData';

export function LocationDetailViewProvider({
  children,
  ...props
}: LocationDetailViewProviderProps): React.JSX.Element {
  const {
    LocationDetailView: {
      loadingIndicatorLabel,
      searchSubfoldersToggleLabel,
      selectFileLabel,
      selectAllFilesLabel,
      searchPlaceholder,
      searchSubmitLabel,
      searchClearLabel,
      getTitle,
      getListItemsResultMessage,
    },
  } = useDisplayText();

  const {
    actions,
    page,
    pageItems,
    hasNextPage,
    highestPageVisited,
    isLoading,
    isSearchingSubfolders,
    location,
    areAllFilesSelected,
    fileDataItems,
    hasFiles,
    hasError,
    hasDownloadError,
    message,
    downloadErrorMessage,
    searchQuery,
    hasExhaustedSearch,
    onActionSelect,
    onDropFiles,
    onRefresh,
    onPaginate,
    onDownload,
    onNavigate,
    onNavigateHome,
    onSelect,
    onSelectAll,
    onSearch,
    onSearchQueryChange,
    onSearchClear,
    onToggleSearchSubfolders,
  } = props;

  const messageControlContent = getListItemsResultMessage({
    items: pageItems,
    hasError: hasError || hasDownloadError,
    hasExhaustedSearch,
    message: hasError ? message : downloadErrorMessage,
  });

  return (
    <ControlsContextProvider
      data={{
        actions,
        isActionsListDisabled: isLoading,
        isDataRefreshDisabled: isLoading,
        isLoading,
        isSearchingSubfolders,
        loadingIndicatorLabel,
        location,
        paginationData: {
          page,
          hasNextPage,
          highestPageVisited,
          onPaginate,
        },
        searchPlaceholder,
        searchSubfoldersToggleLabel,
        searchSubmitLabel,
        searchClearLabel,
        searchQuery,
        tableData: getLocationDetailViewTableData({
          areAllFilesSelected,
          location,
          fileDataItems,
          hasFiles,
          pageItems,
          selectFileLabel,
          selectAllFilesLabel,
          onDownload,
          onNavigate,
          onSelect,
          onSelectAll,
        }),
        title: getTitle(location),
        message: messageControlContent,
      }}
      onActionSelect={onActionSelect}
      onDropFiles={onDropFiles}
      onNavigate={onNavigate}
      onNavigateHome={onNavigateHome}
      onRefresh={onRefresh}
      onSearch={onSearch}
      onSearchQueryChange={onSearchQueryChange}
      onSearchClear={onSearchClear}
      onToggleSearchSubfolders={onToggleSearchSubfolders}
    >
      {children}
    </ControlsContextProvider>
  );
}
