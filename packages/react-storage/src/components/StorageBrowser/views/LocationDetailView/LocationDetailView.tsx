import React from 'react';
import { ViewElement } from '../../context/elements';
import { DataTableControl } from '../../controls/DataTableControl';
import { DataRefreshControl } from '../../controls/DataRefreshControl';
import { DropZoneControl } from '../../controls/DropZoneControl';
import { LoadingIndicatorControl } from '../../controls/LoadingIndicatorControl';
import { NavigationControl } from '../../controls/NavigationControl';
import { PaginationControl } from '../../controls/PaginationControl';
import { SearchControl } from '../../controls/SearchControl';
import { SearchSubfoldersToggleControl } from '../../controls/SearchSubfoldersToggleControl';
import { TitleControl } from '../../controls/TitleControl';
import { ControlsContextProvider } from '../../controls/context';
import { useDisplayText } from '../../displayText';
import { Controls, MessageControl } from '../Controls';
import {
  STORAGE_BROWSER_BLOCK,
  STORAGE_BROWSER_BLOCK_TO_BE_UPDATED,
} from '../../constants';
import { resolveClassName } from '../utils';
import { ActionsMenuControl } from './Controls/ActionsMenu';
import { getLocationDetailViewTableData } from './getLocationDetailViewTableData';
import { useLocationDetailView } from './useLocationDetailView';
import { LocationDetailViewProps } from './types';

export const DEFAULT_ERROR_MESSAGE = 'There was an error loading items.';
const DEFAULT_PAGE_SIZE = 100;
export const DEFAULT_LIST_OPTIONS = {
  pageSize: DEFAULT_PAGE_SIZE,
  delimiter: '/',
};

export function LocationDetailView({
  className,
  onActionSelect,
  onExit,
  onNavigate: onNavigateProp,
}: LocationDetailViewProps): React.JSX.Element {
  const {
    LocationDetailView: {
      loadingIndicatorLabel,
      searchSubfoldersToggleLabel,
      getTitle,
      getListItemsResultMessage,
    },
  } = useDisplayText();

  const {
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
    message,
    searchPlaceholder,
    searchQuery,
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
  } = useLocationDetailView({ onNavigate: onNavigateProp, onExit });

  const messageControlContent = hasError
    ? getListItemsResultMessage({
        items: pageItems,
        errorMessage: message ?? DEFAULT_ERROR_MESSAGE,
      })
    : getListItemsResultMessage({
        items: pageItems,
      });

  return (
    <div
      className={resolveClassName(STORAGE_BROWSER_BLOCK, className)}
      data-testid="LOCATION_DETAIL_VIEW"
    >
      <ControlsContextProvider
        data={{
          isDataRefreshDisabled: isLoading,
          isLoading,
          isSearchingSubfolders,
          loadingIndicatorLabel,
          location,
          searchPlaceholder,
          paginationData: {
            page,
            hasNextPage,
            highestPageVisited,
            onPaginate,
          },
          searchQuery,
          searchSubfoldersToggleLabel,
          tableData: getLocationDetailViewTableData({
            areAllFilesSelected,
            location,
            fileDataItems,
            hasFiles,
            pageItems,
            onDownload,
            onNavigate,
            onSelect,
            onSelectAll,
          }),
          title: getTitle(location),
          message: messageControlContent,
        }}
        onDropFiles={onDropFiles}
        onNavigate={onNavigate}
        onNavigateHome={onNavigateHome}
        onRefresh={onRefresh}
        onSearch={onSearch}
        onSearchQueryChange={onSearchQueryChange}
        onSearchClear={onSearchClear}
        onToggleSearchSubfolders={onToggleSearchSubfolders}
      >
        <NavigationControl
          className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__location-detail-view-navigation`}
        />
        <TitleControl />
        <ViewElement
          className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__location-detail-view-controls`}
        >
          <ViewElement
            className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__search`}
          >
            <SearchControl />
            <SearchSubfoldersToggleControl />
          </ViewElement>
          <PaginationControl
            className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__location-detail-view-pagination`}
          />
          <DataRefreshControl
            className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__locations-detail-view-data-refresh`}
          />
          <ActionsMenuControl
            onActionSelect={onActionSelect}
            disabled={isLoading}
          />
        </ViewElement>
        <LoadingIndicatorControl />
        {hasError ? null : (
          <DropZoneControl>
            <DataTableControl />
          </DropZoneControl>
        )}
        <MessageControl />
      </ControlsContextProvider>
    </div>
  );
}
