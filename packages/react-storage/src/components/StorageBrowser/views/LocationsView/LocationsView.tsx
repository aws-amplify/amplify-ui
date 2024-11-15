import React from 'react';

import { ViewElement } from '../../context/elements';
import { DataRefreshControl } from '../../controls/DataRefreshControl';
import { DataTableControl } from '../../controls/DataTableControl';
import { LoadingIndicatorControl } from '../../controls/LoadingIndicatorControl';
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
      getDownloadLabel,
      getPermissionsDisplayValue,
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

  // TODO: add hasExhaustedSearch + query param
  const messageControlContent = hasError
    ? getListLocationsResultMessage({
        locations: pageItems,
        hasError,
        errorMessage: message,
      })
    : getListLocationsResultMessage({
        locations: pageItems,
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
        loadingIndicatorLabel,
        tableData: getLocationsViewTableData({
          getPermissionsDisplayValue,
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
        searchPlaceholder: searchPlaceholder,
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
        <LoadingIndicatorControl />
        {hasError ? null : <DataTableControl />}
        <ViewElement className={`${STORAGE_BROWSER_BLOCK}__message`}>
          <MessageControl />
        </ViewElement>
      </div>
    </ControlsContextProvider>
  );
}
