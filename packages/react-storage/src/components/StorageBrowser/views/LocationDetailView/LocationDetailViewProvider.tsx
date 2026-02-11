import React from 'react';

import type { FileData } from '../../actions';
import { ControlsContextProvider } from '../../controls/context';
import { useDisplayText } from '../../displayText';

import type { LocationDetailViewProviderProps } from './types';
import { getLocationDetailViewTableData } from './getLocationDetailViewTableData';

export function LocationDetailViewProvider({
  children,
  ...props
}: LocationDetailViewProviderProps): React.JSX.Element {
  const { LocationDetailView: displayText } = useDisplayText();
  const {
    LocationDetailView: {
      loadingIndicatorLabel,
      searchSubfoldersToggleLabel,
      selectFileLabel,
      selectAllFilesLabel,
      searchPlaceholder,
      searchSubmitLabel,
      searchClearLabel,
      getActionListItemLabel,
      getDateDisplayValue,
      getTitle,
      getListItemsResultMessage,
    },
  } = useDisplayText();

  const {
    actionItems,
    activeFile,
    activeFileHasNext,
    activeFileHasPrev,
    page,
    pageItems,
    hasNextPage,
    highestPageVisited,
    isLoading,
    isSearchSubfoldersEnabled,
    location,
    fileDataItems,
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
    onSelectActiveFile,
    onToggleSelectAll,
    onSearch,
    onSearchQueryChange,
    onSearchClear,
    onToggleSearchSubfolders,
    filePreviewState,
    filePreviewEnabled,
    onRetryFilePreview,
    dataItems,
  } = props;

  const actionsWithDisplayText = actionItems.map((item) => ({
    ...item,
    label: getActionListItemLabel(item.label),
  }));

  const fileItems = pageItems.filter(
    (item): item is FileData => item.type === 'FILE'
  );

  const areAllFilesSelected = fileDataItems?.length === fileItems.length;

  const hasFiles = fileItems.length > 0;

  const messageControlContent = getListItemsResultMessage({
    isLoading,
    items: pageItems,
    hasError: hasError || hasDownloadError,
    hasExhaustedSearch,
    message: hasError ? message : downloadErrorMessage,
  });

  const isActionsListDisabled =
    isLoading ||
    !actionItems?.length ||
    actionItems.every(({ isHidden }) => isHidden);

  return (
    <ControlsContextProvider
      data={{
        actions: actionsWithDisplayText,
        activeFile,
        activeFileHasNext,
        activeFileHasPrev,
        isActionsListDisabled,
        isDataRefreshDisabled: isLoading,
        isLoading,
        isSearchingSubfolders: isSearchSubfoldersEnabled,
        loadingIndicatorLabel,
        location,
        paginationData: {
          page,
          hasNextPage,
          highestPageVisited,
        },
        searchPlaceholder,
        searchSubfoldersToggleLabel,
        searchSubmitLabel,
        searchClearLabel,
        searchQuery,
        filePreviewState,
        tableData: getLocationDetailViewTableData({
          filePreviewEnabled,
          activeFile,
          onSelectActiveFile,
          areAllFilesSelected,
          displayText,
          location,
          fileDataItems,
          getDateDisplayValue,
          hasFiles,
          pageItems,
          selectFileLabel,
          selectAllFilesLabel,
          onDownload,
          onNavigate,
          onSelect,
          onSelectAll: onToggleSelectAll,
          dataItems,
        }),
        title: getTitle(location),
        message: messageControlContent,
      }}
      onActionSelect={onActionSelect}
      onDropFiles={onDropFiles}
      onNavigate={onNavigate}
      onNavigateHome={onNavigateHome}
      onPaginate={onPaginate}
      onRefresh={onRefresh}
      onSearch={onSearch}
      onSelectActiveFile={onSelectActiveFile}
      onSearchQueryChange={onSearchQueryChange}
      onSearchClear={onSearchClear}
      onToggleSearchSubfolders={onToggleSearchSubfolders}
      onRetryFilePreview={onRetryFilePreview}
    >
      {children}
    </ControlsContextProvider>
  );
}
