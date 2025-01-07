import React from 'react';

import { STORAGE_BROWSER_BLOCK } from '../../constants';
import { ViewElement } from '../../context/elements';
import { ActionsListControl } from '../../controls/ActionsListControl';
import { DataTableControl } from '../../controls/DataTableControl';
import { DataRefreshControl } from '../../controls/DataRefreshControl';
import { DropZoneControl } from '../../controls/DropZoneControl';
import { LoadingIndicatorControl } from '../../controls/LoadingIndicatorControl';
import { MessageControl } from '../../controls/MessageControl';
import { NavigationControl } from '../../controls/NavigationControl';
import { PaginationControl } from '../../controls/PaginationControl';
import { SearchFieldControl } from '../../controls/SearchFieldControl';
import { SearchSubfoldersToggleControl } from '../../controls/SearchSubfoldersToggleControl';
import { TitleControl } from '../../controls/TitleControl';

import { LocationDetailViewType } from './types';
import { useLocationDetailView } from './useLocationDetailView';
import { LocationDetailViewProvider } from './LocationDetailViewProvider';
import { classNames } from '@aws-amplify/ui';

const DEFAULT_PAGE_SIZE = 100;
export const DEFAULT_LIST_OPTIONS = {
  pageSize: DEFAULT_PAGE_SIZE,
  delimiter: '/',
};

export const LocationDetailView: LocationDetailViewType = ({
  className,
  ...props
}) => {
  const state = useLocationDetailView(props);
  const { hasError } = state;

  return (
    <ViewElement
      className={classNames(STORAGE_BROWSER_BLOCK, className)}
      data-testid="LOCATION_DETAIL_VIEW"
    >
      <LocationDetailViewProvider {...state}>
        <NavigationControl />
        <TitleControl />
        <ViewElement className={`${STORAGE_BROWSER_BLOCK}__controls`}>
          <ViewElement className={`${STORAGE_BROWSER_BLOCK}__search`}>
            <SearchFieldControl />
            <SearchSubfoldersToggleControl />
          </ViewElement>
          <PaginationControl />
          <DataRefreshControl />
          <ActionsListControl />
        </ViewElement>
        {hasError ? null : (
          <DropZoneControl>
            <ViewElement className={`${STORAGE_BROWSER_BLOCK}__data-table`}>
              <LoadingIndicatorControl />
              <DataTableControl />
            </ViewElement>
          </DropZoneControl>
        )}
        <ViewElement className={`${STORAGE_BROWSER_BLOCK}__footer`}>
          <MessageControl />
        </ViewElement>
      </LocationDetailViewProvider>
    </ViewElement>
  );
};

LocationDetailView.displayName = 'LocationDetailView';

LocationDetailView.Provider = LocationDetailViewProvider;

LocationDetailView.ActionsList = ActionsListControl;
LocationDetailView.DropZone = DropZoneControl;
LocationDetailView.LoadingIndicator = LoadingIndicatorControl;
LocationDetailView.LocationItemsTable = DataTableControl;
LocationDetailView.Message = MessageControl;
LocationDetailView.Navigation = NavigationControl;
LocationDetailView.Pagination = PaginationControl;
LocationDetailView.Refresh = DataRefreshControl;
LocationDetailView.Search = SearchFieldControl;
LocationDetailView.SearchSubfoldersToggle = SearchSubfoldersToggleControl;
LocationDetailView.Title = TitleControl;
