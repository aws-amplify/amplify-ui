import React from 'react';

import { StorageBrowserElements } from '../../context/elements';

import { CLASS_BASE } from '../constants';
import { Controls } from '../Controls';
import { CommonControl, ViewComponent } from '../types';
import { LocationsViewTable } from '../Controls';

const { Message, Paginate, Refresh, Search, Table, Title } = Controls;

interface LocationsViewControls<
  T extends StorageBrowserElements = StorageBrowserElements,
  // exclude `Toggle` from `Search` for Locations List
> extends Exclude<
    Pick<Controls<T>, CommonControl | 'Paginate' | 'Refresh' | 'Search'>,
    Controls<T>['Search']['Toggle']
  > {
  (): React.JSX.Element;
}

export interface LocationsView<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends ViewComponent<LocationsViewControls<T>> {}

const LocationsViewControls: LocationsViewControls = () => {
  return (
    <>
      <Title>Home</Title>
      <LocationsViewTable />
    </>
  );
};

LocationsViewControls.Message = Message;
LocationsViewControls.Paginate = Paginate;
LocationsViewControls.Refresh = Refresh;
LocationsViewControls.Search = Search;
LocationsViewControls.Table = Table;
LocationsViewControls.Title = Title;

export const LocationsView: LocationsView = () => {
  return (
    <div className={CLASS_BASE} data-testid="LOCATIONS_VIEW">
      <LocationsViewControls />
    </div>
  );
};

LocationsView.Controls = LocationsViewControls;
