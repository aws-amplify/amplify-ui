import React from 'react';

import { ControlsContextProvider } from '../../controls/context';
import { useDisplayText } from '../../displayText';

import { LocationsViewProviderProps } from './types';
import { getLocationsViewTableData } from './getLocationsViewTableData';

export function LocationsViewProvider({
  children,
  ...props
}: LocationsViewProviderProps): React.JSX.Element {
  const { LocationsView: displayText } = useDisplayText();
  const {
    loadingIndicatorLabel,
    title,
    searchPlaceholder,
    searchSubmitLabel,
    searchClearLabel,
    getListLocationsResultMessage,
  } = displayText;

  const {
    hasError,
    hasNextPage,
    highestPageVisited,
    page,
    isLoading,
    searchQuery,
    pageItems,
    message,
    onDownload,
    onRefresh,
    onPaginate,
    onNavigate,
    onSearch,
    onSearchQueryChange,
    onSearchClear,
  } = props;

  // TODO: add hasExhaustedSearch + query param
  const messageControlContent = getListLocationsResultMessage({
    isLoading,
    locations: pageItems,
    hasError,
    message,
  });

  return (
    <ControlsContextProvider
      data={{
        isDataRefreshDisabled: isLoading,
        loadingIndicatorLabel,
        tableData: getLocationsViewTableData({
          displayText,
          pageItems,
          onDownload,
          onNavigate,
        }),
        paginationData: {
          page,
          hasNextPage,
          highestPageVisited,
          onPaginate,
        },
        title,
        searchPlaceholder,
        searchClearLabel,
        searchSubmitLabel,
        searchQuery,
        message: messageControlContent,
        isLoading,
      }}
      onSearch={onSearch}
      onRefresh={onRefresh}
      onSearchQueryChange={onSearchQueryChange}
      onSearchClear={onSearchClear}
    >
      {children}
    </ControlsContextProvider>
  );
}
