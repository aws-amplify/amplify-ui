import React from 'react';

import type { PrimaryViewsContextType } from './types';

import { LocationActionView as LocationActionViewDefault } from '../LocationActionView';
import { LocationDetailView as LocationDetailViewDefault } from '../LocationDetailView';
import { LocationsView as LocationsViewDefault } from '../LocationsView';
import type { PrimaryViews } from '../types';

export const DEFAULT_PRIMARY_VIEWS: PrimaryViews = {
  LocationActionView: LocationActionViewDefault,
  LocationDetailView: LocationDetailViewDefault,
  LocationsView: LocationsViewDefault,
};

export const PrimaryViewsContext = React.createContext<PrimaryViewsContextType>(
  {
    primary: DEFAULT_PRIMARY_VIEWS,
  }
);

export function usePrimaryViews(): PrimaryViewsContextType {
  return React.useContext(PrimaryViewsContext);
}
