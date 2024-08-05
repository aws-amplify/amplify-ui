import React from 'react';

import { StorageBrowserElements } from '../../context/elements';
import { ViewComponent } from '../types';
import { LocationDetailViewControls } from './Controls';
import { CLASS_BASE } from '../constants';

export interface LocationDetailView<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends ViewComponent<LocationDetailViewControls<T>> {}

export const LocationDetailView: LocationDetailView = () => {
  return (
    <div className={CLASS_BASE} data-testid="LOCATION_DETAIL_VIEW">
      <LocationDetailViewControls />
    </div>
  );
};

LocationDetailView.Controls = LocationDetailViewControls;
