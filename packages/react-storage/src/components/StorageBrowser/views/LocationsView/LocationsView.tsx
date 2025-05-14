import React from 'react';
import { classNames } from '@aws-amplify/ui';

import { STORAGE_BROWSER_BLOCK, ViewElement } from '../../components';
import {
  DataRefreshControl,
  DataTableControl,
  LoadingIndicatorControl,
  MessageControl,
  PaginationControl,
  SearchFieldControl,
  TitleControl,
} from '../../controls';

import { LocationsViewProvider } from './LocationsViewProvider';
import type { LocationsViewType } from './types';
import { useLocationsView } from './useLocationsView';

export const LocationsView: LocationsViewType = ({ className, ...props }) => {
  const state = useLocationsView(props);
  const { hasError } = state;

  return (
    <ViewElement
      className={classNames(STORAGE_BROWSER_BLOCK, className)}
      data-testid="LOCATIONS_VIEW"
    >
      <LocationsViewProvider {...state}>
        <TitleControl />
        <ViewElement className={`${STORAGE_BROWSER_BLOCK}__controls`}>
          <ViewElement className={`${STORAGE_BROWSER_BLOCK}__search`}>
            <SearchFieldControl />
          </ViewElement>
          <PaginationControl />
          <DataRefreshControl />
        </ViewElement>
        <ViewElement className={`${STORAGE_BROWSER_BLOCK}__data-table`}>
          <LoadingIndicatorControl />
          {hasError ? null : <DataTableControl />}
        </ViewElement>
        <ViewElement className={`${STORAGE_BROWSER_BLOCK}__message`}>
          <MessageControl />
        </ViewElement>
      </LocationsViewProvider>
    </ViewElement>
  );
};

LocationsView.displayName = 'LocationsView';

LocationsView.Provider = LocationsViewProvider;

LocationsView.LoadingIndicator = LoadingIndicatorControl;
LocationsView.LocationsTable = DataTableControl;
LocationsView.Message = MessageControl;
LocationsView.Pagination = PaginationControl;
LocationsView.Refresh = DataRefreshControl;
LocationsView.Search = SearchFieldControl;
LocationsView.Title = TitleControl;
