import React from 'react';

import { StorageBrowserElements } from '../../context/elements';
import { useLocationsData } from '../../context/locationsData';

import { CLASS_BASE } from '../constants';
import { Controls } from '../Controls';
import { ViewTypeProvider } from '../ViewContext';
import { CommonControl, ViewComponent } from '../types';

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
> extends ViewComponent<T, LocationsViewControls<T>> {}

const LocationsViewProvider = (props: { children?: React.ReactNode }) => (
  <ViewTypeProvider {...props} type="LOCATIONS_VIEW" />
);

const LocationsViewControls: LocationsViewControls = () => (
  <div className={`${CLASS_BASE}__header`}>
    <div className={`${CLASS_BASE}__header__primary`}>
      <Title />
      <div className={`${CLASS_BASE}__header__primary__actions`}>
        <Refresh />
      </div>
    </div>
    <div className={`${CLASS_BASE}__header__secondary`}>
      <Paginate />
    </div>
  </div>
);

LocationsViewControls.Message = Message;
LocationsViewControls.Paginate = Paginate;
LocationsViewControls.Refresh = Refresh;
LocationsViewControls.Search = Search;
LocationsViewControls.Title = Title;

export const LocationsView: LocationsView = () => {
  const [{ data, isLoading }, handleList] = useLocationsData();

  React.useEffect(() => {
    // update to exhaustive call
    handleList();
  }, [handleList]);

  const hasLocations = !!data.locations.length;

  return (
    <LocationsViewProvider>
      <div className={CLASS_BASE}>
        <div className={`${CLASS_BASE}__controls`}></div>
        <LocationsViewControls />
        {!hasLocations || isLoading
          ? '...loading'
          : data.locations.map(({ scope }) => <p key={scope}>{scope}</p>)}
      </div>
    </LocationsViewProvider>
  );
};

LocationsView.Controls = LocationsViewControls;
LocationsView.Provider = LocationsViewProvider;
LocationsView.Table = Table;
