import React from 'react';
import { resolveClassName } from '../utils';
import { CLASS_BASE } from '../constants';
import { Controls } from '../Controls';
import { ControlsContextProvider } from '../../controls/context';
import { useLocationDetailView } from './useLocationDetailView';
import { LocationDetailViewProps } from './types';
import { getLocationDetailViewTableData } from './getLocationDetailViewTableData';
import { ViewElement } from '../../context/elements';

import { ActionsMenuControl } from './Controls/ActionsMenu';

import { DropZoneControl } from '../../controls/DropZoneControl';
import { DataTableControl } from '../../controls/DataTableControl';
import { DataRefreshControl } from '../../controls/DataRefreshControl';
import { NavigationControl } from '../../controls/NavigationControl';
import { SearchControl } from '../../controls/SearchControl';
import { TitleControl } from '../../controls/TitleControl';

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
    page,
    pageItems,
    isLoading,
    isPaginatePreviousDisabled,
    isPaginateNextDisabled,
    currentLocation,
    currentPath,
    areAllFilesSelected,
    fileDataItems,
    hasFiles,
    hasError,
    message,
    shouldShowEmptyMessage,
    searchPlaceholder,
    showIncludeSubfolders,
    onDropFiles,
    onRefresh,
    onPaginateNext,
    onPaginatePrevious,
    onDownload,
    onNavigate,
    onNavigateHome,
    onSelect,
    onSelectAll,
    onSearch,
  } = useLocationDetailView({ onNavigate: onNavigateProp, onExit });

  const title = currentLocation?.prefix;

  return (
    <div
      className={resolveClassName(CLASS_BASE, className)}
      data-testid="LOCATION_DETAIL_VIEW"
    >
      <ControlsContextProvider
        data={{
          isDataRefreshDisabled: isLoading,
          currentLocation,
          currentPath,
          searchPlaceholder,
          showIncludeSubfolders,
          tableData: getLocationDetailViewTableData({
            areAllFilesSelected,
            currentLocation,
            currentPath,
            fileDataItems,
            hasFiles,
            pageItems,
            onDownload,
            onNavigate,
            onSelect,
            onSelectAll,
          }),
          title,
        }}
        onDropFiles={onDropFiles}
        onNavigate={onNavigate}
        onNavigateHome={onNavigateHome}
        onRefresh={onRefresh}
        onSearch={onSearch}
      >
        <NavigationControl
          className={`${CLASS_BASE}__location-detail-view-navigation`}
        />
        <TitleControl />
        <ViewElement className={`${CLASS_BASE}__location-detail-view-controls`}>
          <SearchControl
            className={`${CLASS_BASE}__location-detail-view-search`}
          />
          <Paginate
            currentPage={page}
            disableNext={isPaginateNextDisabled}
            disablePrevious={isPaginatePreviousDisabled}
            handleNext={onPaginateNext}
            handlePrevious={onPaginatePrevious}
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
          <ViewElement className={`${CLASS_BASE}__table-wrapper`}>
            <DropZoneControl
              className={`${CLASS_BASE}__location-detail-view-drop-zone`}
            >
              <DataTableControl
                className={`${CLASS_BASE}__location-detail-view-data-table`}
              />
            </DropZoneControl>
          </ViewElement>
        )}
        <LocationDetailEmptyMessage show={shouldShowEmptyMessage} />
      </ControlsContextProvider>
    </div>
  );
}
