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
  <>
    <Title />
    <Refresh />
    <Paginate />
    <Table />
  </>
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

  const hasLocations = !!data.result?.length;
  const shouldRenderLocations = !hasLocations || isLoading;

  return (
    <div className={CLASS_BASE}>
      <div className={`${CLASS_BASE}__controls`}>
        <LocationsViewControls />
      </div>
      {shouldRenderLocations
        ? '...loading'
        : data.result.map(({ scope, type, ...rest }) =>
            type === 'BUCKET' || type === 'PREFIX' ? (
              <button
                key={scope}
                onClick={() => {
                  handleUpdateState({
                    type: 'ACCESS_LOCATION',
                    location: { ...rest, scope, type },
                  });
                }}
                type="button"
              >
                {scope}
              </button>
            ) : (
              <p key={scope}>This is a file: {scope}</p>
            )
          )}
    </div>
  );
};

LocationsView.Controls = LocationsViewControls;
