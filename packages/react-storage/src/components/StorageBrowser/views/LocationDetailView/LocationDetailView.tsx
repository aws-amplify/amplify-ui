import React from 'react';
import {
  InputElement,
  LabelElement,
  ViewElement,
} from '../../context/elements';
import { DataTableControl } from '../../controls/DataTableControl';
import { DataRefreshControl } from '../../controls/DataRefreshControl';
import { DropZoneControl } from '../../controls/DropZoneControl';
import { NavigationControl } from '../../controls/NavigationControl';
import { SearchControl } from '../../controls/SearchControl';
import { TitleControl } from '../../controls/TitleControl';
import { ControlsContextProvider } from '../../controls/context';
import { useDisplayText } from '../../displayText';
import { Controls } from '../Controls';
import { AMPLIFY_CLASS_BASE, CLASS_BASE } from '../constants';
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

const { EmptyMessage, Loading: LoadingControl, Message, Paginate } = Controls;

function Loading({ show }: { show?: boolean }) {
  return show ? <LoadingControl /> : null;
}

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
    LocationDetailView: { title },
  } = useDisplayText();

  const {
    page,
    pageItems,
    hasNextPage,
    highestPageVisited,
    isLoading,
    location,
    areAllFilesSelected,
    fileDataItems,
    hasFiles,
    hasError,
    message,
    shouldShowEmptyMessage,
    searchPlaceholder,
    searchQuery,
    includeSubfolders,
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
    onIncludeSubfoldersChange,
    onSearchClear,
  } = useLocationDetailView({ onNavigate: onNavigateProp, onExit });

  return (
    <div
      className={resolveClassName(AMPLIFY_CLASS_BASE, className)}
      data-testid="LOCATION_DETAIL_VIEW"
    >
      <ControlsContextProvider
        data={{
          isDataRefreshDisabled: isLoading,
          location,
          searchPlaceholder,
          searchQuery,
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
      >
        <NavigationControl
          className={`${CLASS_BASE}__location-detail-view-navigation`}
        />
        <TitleControl className={`${CLASS_BASE}__location-detail-view-title`} />
        <ViewElement className={`${CLASS_BASE}__location-detail-view-controls`}>
          <SearchControl
            className={`${CLASS_BASE}__location-detail-view-search`}
          >
            <LabelElement
              className={`${CLASS_BASE}__search-subfolder-toggle__label`}
            >
              <InputElement
                checked={includeSubfolders}
                className={`${CLASS_BASE}__search-subfolder-toggle__checkbox`}
                onChange={() => onIncludeSubfoldersChange?.(!includeSubfolders)}
                type="checkbox"
              />
              Include subfolders
            </LabelElement>
          </SearchControl>
          <Paginate
            currentPage={page}
            onPaginate={onPaginate}
            hasMorePages={hasNextPage}
            highestPageVisited={highestPageVisited}
          />
          <DataRefreshControl
            className={`${CLASS_BASE}__locations-detail-view-data-refresh`}
          />
          <ActionsMenuControl
            onActionSelect={onActionSelect}
            disabled={isLoading}
          />
        </ViewElement>
        <LocationDetailMessage show={hasError} message={message} />
        <Loading show={isLoading} />
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
