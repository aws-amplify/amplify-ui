import React from 'react';

import { useViews } from './views';
import { useControl } from './context/control';

/**
 * Handles default `StorageBrowser` behavior:
 * - render `LocationsView` on init
 * - render `LocationDetailView` on location selection
 * - render `ActionView` on action selection
 */
export function StorageBrowserDefault(): React.JSX.Element {
  const { LocationActionView, LocationDetailView, LocationsView } = useViews();

  const [{ location }] = useControl('NAVIGATE');
  const [{ selected }] = useControl('LOCATION_ACTIONS');

  const { type } = selected;

  if (type) {
    return <LocationActionView />;
  }

  if (location) {
    return <LocationDetailView />;
  }

  return <LocationsView />;
}
