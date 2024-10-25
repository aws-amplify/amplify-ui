import React from 'react';

import { useViews } from './views';
import { useStore } from './providers/store';

/**
 * Handles default `StorageBrowser` behavior:
 * - render `LocationsView` on init
 * - render `LocationDetailView` on location selection
 * - render `ActionView` on action selection
 */
export function StorageBrowserDefault(): React.JSX.Element {
  const { LocationActionView, LocationDetailView, LocationsView } = useViews();

  const [{ actionType, location }] = useStore();
  const { current } = location;

  if (actionType) {
    return <LocationActionView />;
  }

  if (current) {
    return <LocationDetailView />;
  }

  return <LocationsView />;
}
