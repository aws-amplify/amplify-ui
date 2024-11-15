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
import { Controls } from '../Controls';
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

export const DEFAULT_ERROR_MESSAGE = 'There was an error loading items.';
const DEFAULT_PAGE_SIZE = 100;
export const DEFAULT_LIST_OPTIONS = {
  pageSize: DEFAULT_PAGE_SIZE,
  delimiter: '/',
};

const { EmptyMessage, Message } = Controls;

export const LocationDetailMessage = ({
  show,
  message,
}: {
  show?: boolean;
  message?: string;
}): React.JSX.Element | null => {
  return show ? (
    <Message variant="error">{message ?? DEFAULT_ERROR_MESSAGE}</Message>
  ) : null;
};

const LocationDetailEmptyMessage = ({ show }: { show?: boolean }) => {
  return show ? <EmptyMessage>No items to show.</EmptyMessage> : null;
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
      searchExhaustedMessage,
      title,
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
    shouldShowEmptyMessage,
    searchPlaceholder,
    searchQuery,
    hasExhaustedSearch,
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
          messageContent: hasExhaustedSearch ? searchExhaustedMessage : null,
          messageType: hasExhaustedSearch ? 'info' : undefined,
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
          title: title(location),
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
        <ViewElement
          className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__message`}
        >
          <MessageControl />
        </ViewElement>
        <LocationDetailMessage show={hasError} message={message} />
        <LoadingIndicatorControl />
        {hasError ? null : (
          <DropZoneControl>
            <DataTableControl />
          </DropZoneControl>
        )}
        <LocationDetailEmptyMessage show={shouldShowEmptyMessage} />
      </ControlsContextProvider>
    </div>
  );
}
