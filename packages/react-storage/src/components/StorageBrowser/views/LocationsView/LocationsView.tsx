import React from 'react';

import {
  STORAGE_BROWSER_BLOCK,
  STORAGE_BROWSER_BLOCK_TO_BE_UPDATED,
} from '../../constants';
import { ViewElement } from '../../context/elements';
import { DataRefreshControl } from '../../controls/DataRefreshControl';
import { DataTableControl } from '../../controls/DataTableControl';
import { LoadingIndicatorControl } from '../../controls/LoadingIndicatorControl';
import { MessageControl } from '../../controls/MessageControl';
import { PaginationControl } from '../../controls/PaginationControl';
import { SearchControl } from '../../controls/SearchControl';
import { TitleControl } from '../../controls/TitleControl';

import { LocationsViewProvider } from './LocationsViewProvider';
import { LocationsViewType } from './types';
import { useLocationsView } from './useLocationsView';
import { classNames } from '@aws-amplify/ui';

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
        <ViewElement
          className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__location-detail-view-controls`}
        >
          <ViewElement
            className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__search`}
          >
            <SearchControl />
          </ViewElement>
          <PaginationControl />
          <DataRefreshControl />
        </ViewElement>
        <LoadingIndicatorControl />
        {hasError ? null : <DataTableControl />}
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
LocationsView.Search = SearchControl;
LocationsView.Title = TitleControl;
