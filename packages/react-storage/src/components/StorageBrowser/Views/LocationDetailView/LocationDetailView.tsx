import React from 'react';

import { StorageBrowserElements } from '../../context/elements';
import { ViewComponent } from '../types';
import { LocationDetailViewControls } from './Controls';
import { CLASS_BASE } from '../constants';
import { ViewsContext } from '../../createProvider';

export interface LocationDetailView<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends ViewComponent<LocationDetailViewControls<T>> {}

export const LocationDetailView: LocationDetailView = () => {
  const views = React.useContext(ViewsContext);
  if (views?.LocationDetailView) {
    return <views.LocationDetailView />;
  }
  return (
    <div className={CLASS_BASE} data-testid="LOCATION_DETAIL_VIEW">
      <LocationDetailViewControls />
    </div>
  );
};

LocationDetailView.Controls = LocationDetailViewControls;
