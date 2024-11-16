import React from 'react';

import { ViewElement } from '../../context/elements';
import { DataRefreshControl } from '../../controls/DataRefreshControl';
import { DataTableControl } from '../../controls/DataTableControl';
import { PaginationControl } from '../../controls/PaginationControl';
import { SearchControl } from '../../controls/SearchControl';
import { TitleControl } from '../../controls/TitleControl';
import { ControlsContextProvider } from '../../controls/context';
import { useDisplayText } from '../../displayText';
import {
  STORAGE_BROWSER_BLOCK,
  STORAGE_BROWSER_BLOCK_TO_BE_UPDATED,
} from '../../constants';
import { resolveClassName } from '../utils';
import { getLocationsViewTableData } from './getLocationsViewTableData';
import { LocationViewHeaders } from './getLocationsViewTableData/types';
import { useLocationsView } from './useLocationsView';
import { LocationsViewProps } from './types';
import { LoadingIndicator } from '../../composables/LoadingIndicator';
import { MessageControl } from '../../controls/MessageControl';

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

export function LocationsView({
  className,
  ...props
}: LocationsViewProps): React.JSX.Element {
  const {
    LocationsView: {
      loadingIndicatorLabel,
      title,
      tableColumnBucketHeader,
      tableColumnFolderHeader,
      tableColumnPermissionsHeader,
      tableColumnActionsHeader,
      searchPlaceholder,
      searchSubmitLabel,
      searchClearLabel,
      getDownloadLabel,
      getPermissionName,
      getListLocationsResultMessage,
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
    onDownload,
    onRefresh,
    onPaginate,
    onNavigate,
    onSearch,
    onSearchQueryChange,
    onSearchClear,
  } = useLocationsView(props);

  const loadingIndicator = (
    <LoadingIndicator isLoading label={loadingIndicatorLabel} />
  );

  // TODO: add hasExhaustedSearch + query param
  const messageControlContent = getListLocationsResultMessage({
    locations: pageItems,
    hasError,
    message,
  });

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
        isLoading,
        loadingIndicator,
        loadingIndicatorLabel,
        tableData: getLocationsViewTableData({
          getPermissionName,
          headers,
          pageItems,
          onDownload,
          onNavigate,
          getDownloadLabel,
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
      }}
      onSearch={onSearch}
      onRefresh={onRefresh}
      onSearchQueryChange={onSearchQueryChange}
      onSearchClear={onSearchClear}
    >
      <div
        className={resolveClassName(STORAGE_BROWSER_BLOCK, className)}
        data-testid="LOCATIONS_VIEW"
      >
        <TitleControl />
        <ViewElement
          className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__location-detail-view-controls`}
        >
          <ViewElement
            className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__search`}
          >
            <SearchControl />
          </ViewElement>
          <PaginationControl
            className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__locations-view-pagination`}
          />
          <DataRefreshControl
            className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__locations-view-data-refresh`}
          />
        </ViewElement>
        {hasError ? null : <DataTableControl />}
        <ViewElement className={`${STORAGE_BROWSER_BLOCK}__message`}>
          <MessageControl />
        </ViewElement>
      </div>
    </ControlsContextProvider>
  );
}
