import React from 'react';

import { StorageBrowserElements } from '../../context/elements';

import { ViewComponent } from '../types';
import { LocationActionViewControls } from './Controls';

export interface LocationActionView<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends ViewComponent<LocationActionViewControls<T>> {}

export const LocationActionView: LocationActionView = () => {
  return (
    <>
      <h1>LocationActionView</h1>;
      <LocationActionViewControls />
    </>
  );
};

LocationActionView.Controls = LocationActionViewControls;
