import React from 'react';

import { StorageBrowserElements } from '../../context/elements';

import { ViewComponent } from '../types';
import { Controls } from '../Controls';
import { LocationActionViewControls } from './Controls';
import { useControl } from '../../context/controls';
const { Title } = Controls;

export interface LocationActionView<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends ViewComponent<LocationActionViewControls<T>> {}

export const LocationActionView: LocationActionView = () => {
  const [{ selected }] = useControl({ type: 'ACTION_SELECT' });
  console.log('selected: ', selected);
  const { actionType, name, items } = selected;
  const listItems = items
    ? items?.map(({ key }) => <p key={key}>{key}</p>)
    : 'No items selected.';

  return (
    <>
      <h2>
        {name}: {actionType}
      </h2>
      <LocationActionViewControls />
      {listItems}
    </>
  );
};

LocationActionView.Controls = LocationActionViewControls;
