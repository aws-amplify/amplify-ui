import React from 'react';

import { ViewElement } from '../../context/elements';
import { DataRefreshControl } from '../../controls/DataRefreshControl';
import { DataTableControl } from '../../controls/DataTableControl';
import { SearchControl } from '../../controls/SearchControl';
import { TitleControl } from '../../controls/TitleControl';
import { ControlsContextProvider } from '../../controls/context';
import { useDisplayText } from '../../displayText';
import { Controls } from '../Controls';
import { AMPLIFY_CLASS_BASE, CLASS_BASE } from '../constants';
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
  hasObjectLocations,
  tableColumnBucketHeader,
  tableColumnFolderHeader,
  tableColumnPermissionsHeader,
  tableColumnActionsHeader,
}: {
  hasObjectLocations: boolean;
  tableColumnBucketHeader: string;
  tableColumnFolderHeader: string;
  tableColumnPermissionsHeader: string;
  tableColumnActionsHeader: string;
}): LocationViewHeaders => {
  const headers: LocationViewHeaders = [
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

  if (hasObjectLocations) {
    headers.push({
      key: 'action',
      type: 'sort',
      content: { label: tableColumnActionsHeader },
    });
  }

  return headers;
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
      tableColumnActionsHeader,
      searchPlaceholder,
      getDownloadLabel,
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
    onDownload,
    onRefresh,
    onPaginate,
    onNavigate,
    onSearch,
    onSearchQueryChange,
    onSearchClear,
  } = useLocationsView(props);

  const headers = getHeaders({
    hasObjectLocations: pageItems.some(({ type }) => type === 'OBJECT'),
    tableColumnBucketHeader,
    tableColumnFolderHeader,
    tableColumnPermissionsHeader,
    tableColumnActionsHeader,
  });

  return (
    <ControlsContextProvider
      data={{
        isDataRefreshDisabled: isLoading,
        tableData: getLocationsViewTableData({
          getPermissionName,
          headers,
          pageItems,
          onDownload,
          onNavigate,
          getDownloadLabel,
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
        className={resolveClassName(AMPLIFY_CLASS_BASE, className)}
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
        {hasError ? null : <DataTableControl />}
        <LocationsEmptyMessage show={shouldShowEmptyMessage} />
      </div>
    </ControlsContextProvider>
  );
}
