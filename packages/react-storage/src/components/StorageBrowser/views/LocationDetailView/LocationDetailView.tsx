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
import {
  STORAGE_BROWSER_BLOCK,
  STORAGE_BROWSER_BLOCK_TO_BE_UPDATED,
} from '../../constants';
import { resolveClassName } from '../utils';
import { ActionsMenuControl } from './Controls/ActionsMenu';
import { getLocationDetailViewTableData } from './getLocationDetailViewTableData';
import { useLocationDetailView } from './useLocationDetailView';
import { LocationDetailViewProps } from './types';
import { MessageControl } from '../../controls/MessageControl';

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
    hasExhaustedSearch,
  } = useLocationDetailView({ onNavigate: onNavigateProp, onExit });

  const messageControlContent = getListItemsResultMessage({
    items: pageItems,
    hasError: hasError || hasDownloadError,
    hasExhaustedSearch,
    message: hasError ? message : downloadErrorMessage,
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
            <SearchSubfoldersToggleControl
              className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__search-subfolder-toggle__label`}
            />
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
        <ViewElement className={`${STORAGE_BROWSER_BLOCK}__message`}>
          <MessageControl />
        </ViewElement>
      </ControlsContextProvider>
    </div>
  );
}
