import React from 'react';

import { ViewElement } from '../../context/elements';
import { DataRefreshControl } from '../../controls/DataRefreshControl';
import { DataTableControl } from '../../controls/DataTableControl';
import { SearchControl } from '../../controls/SearchControl';
import { TitleControl } from '../../controls/TitleControl';
import { ControlsContextProvider } from '../../controls/context';
import { useDisplayText } from '../../displayText';
import { Controls } from '../Controls';
import { CLASS_BASE } from '../constants';
import { resolveClassName } from '../utils';
import { getLocationsViewTableData } from './getLocationsViewTableData';
import { LocationViewHeaders } from './getLocationsViewTableData/types';
import { useLocationsView } from './useLocationsView';
import { LocationsViewProps } from './types';

export const DEFAULT_ERROR_MESSAGE = 'There was an error loading locations.';

const { EmptyMessage, Loading: LoadingElement, Message, Paginate } = Controls;

const Loading = ({ show }: { show: boolean }) => {
  return show ? <LoadingElement /> : null;
};

const LocationsMessage = ({
  show,
  message,
}: {
  show: boolean;
  message?: string;
}): React.JSX.Element | null => {
  return show ? (
    <Message variant="error">{message ?? DEFAULT_ERROR_MESSAGE}</Message>
  ) : null;
};

const getHeaders = ({
  tableColumnBucketHeader,
  tableColumnFolderHeader,
  tableColumnPermissionsHeader,
}: {
  tableColumnBucketHeader: string;
  tableColumnFolderHeader: string;
  tableColumnPermissionsHeader: string;
}): LocationViewHeaders => {
  return [
    {
      key: 'folder',
      type: 'sort',
      content: { label: tableColumnFolderHeader },
    },
    {
      key: 'bucket',
      type: 'sort',
      content: { label: tableColumnBucketHeader },
    },
    {
      key: 'permission',
      type: 'sort',
      content: { label: tableColumnPermissionsHeader },
    },
  ];
};

const LocationsEmptyMessage = ({ show }: { show: boolean }) => {
  return show ? <EmptyMessage>No locations to show.</EmptyMessage> : null;
};

export function LocationsView({
  className,
  ...props
}: LocationsViewProps): React.JSX.Element {
  const {
    LocationsView: {
      title,
      tableColumnBucketHeader,
      tableColumnFolderHeader,
      tableColumnPermissionsHeader,
      searchPlaceholder,
      getPermissionName,
    },
  } = useDisplayText();

  const {
    hasError,
    hasNextPage,
    highestPageVisited,
    page,
    isLoading,
    searchQuery,
    pageItems,
    message,
    shouldShowEmptyMessage,
    onRefresh,
    onPaginate,
    onNavigate,
    onSearch,
    onSearchQueryChange,
    onSearchClear,
  } = useLocationsView(props);

  const headers = getHeaders({
    tableColumnBucketHeader,
    tableColumnFolderHeader,
    tableColumnPermissionsHeader,
  });

  return (
    <ControlsContextProvider
      data={{
        isDataRefreshDisabled: isLoading,
        tableData: getLocationsViewTableData({
          getPermissionName,
          headers,
          pageItems,
          onNavigate,
        }),
        title,
        searchPlaceholder: searchPlaceholder,
        searchQuery,
      }}
      onSearch={onSearch}
      onRefresh={onRefresh}
      onSearchQueryChange={onSearchQueryChange}
      onSearchClear={onSearchClear}
    >
      <div
        className={resolveClassName(CLASS_BASE, className)}
        data-testid="LOCATIONS_VIEW"
      >
        <TitleControl className={`${CLASS_BASE}__locations-view-title`} />
        <ViewElement className={`${CLASS_BASE}__location-detail-view-controls`}>
          <SearchControl className={`${CLASS_BASE}__locations-view-search`} />
          <Paginate
            currentPage={page}
            highestPageVisited={highestPageVisited}
            hasMorePages={hasNextPage}
            onPaginate={onPaginate}
          />
          <DataRefreshControl
            className={`${CLASS_BASE}__locations-view-data-refresh`}
          />
        </ViewElement>
        <LocationsMessage show={hasError} message={message} />
        <Loading show={isLoading} />
        {hasError ? null : (
          <ViewElement className={`${CLASS_BASE}__table-wrapper`}>
            <DataTableControl
              className={`${CLASS_BASE}__locations-view-data-table`}
            />
          </ViewElement>
        )}
        <LocationsEmptyMessage show={shouldShowEmptyMessage} />
      </div>
    </ControlsContextProvider>
  );
}
