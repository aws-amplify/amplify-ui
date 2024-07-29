import React from 'react';

import { StorageBrowserElements } from '../../context/elements';
import { useLocationsData } from '../../context/actions/locationsData';

import { CLASS_BASE } from '../constants';
import { Controls } from '../Controls';
import { CommonControl, ViewComponent } from '../types';
import { useControl } from '../../context/controls';

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
LocationsViewControls.Table = Table;
LocationsViewControls.Title = Title;

export const LocationsView: LocationsView = () => {
  const [, handleUpdateState] = useControl({ type: 'NAVIGATE' });
  const [{ data, isLoading }] = useLocationsData();

  const hasLocations = !!data.locations.length;

  return (
    <div className={CLASS_BASE}>
      <div className={`${CLASS_BASE}__controls`}></div>
      <LocationsViewControls />
      {!hasLocations || isLoading
        ? '...loading'
        : data.locations.map(({ bucket, scope, ...rest }) =>
            bucket ? (
              <button
                key={scope}
                onClick={() => {
                  handleUpdateState({
                    type: 'SELECT_LOCATION',
                    location: { bucket, scope, ...rest },
                  });
                }}
                type="button"
              >
                {bucket}
              </button>
            ) : null
          )}
    </div>
  );
};

LocationsView.Controls = LocationsViewControls;
