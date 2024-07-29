import React from 'react';

import { useAction } from '../../context/actions';
import { StorageBrowserElements } from '../../context/elements';
import { ViewComponent } from '../types';
import { LocationDetailViewControls } from './Controls';

export interface LocationDetailView<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends ViewComponent<LocationDetailViewControls<T>> {}

export const LocationDetailView: LocationDetailView = () => {
  const [{ data, isLoading }] = useAction({
    type: 'LIST_LOCATION_ITEMS',
  });

  const hasItems = !!data.items.length;

  const listItems = !hasItems
    ? null
    : data.items.map(({ key }) => <p key={key}>{key}</p>);

  return (
    <>
      <LocationDetailViewControls />
      {isLoading && !hasItems ? <span>loading...</span> : listItems}
    </>
  );
};

LocationDetailView.Controls = LocationDetailViewControls;
