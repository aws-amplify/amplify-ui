import React from 'react';

import { useServiceWorkerRegistration } from '../service-worker/useServiceWorkerRegistration';
import { useViews } from '../views';
import { useStore } from '../store';

/**
 * Handles default `StorageBrowser` behavior:
 * - render `LocationsView` on init
 * - render `LocationDetailView` on location selection
 * - render `ActionView` on action selection
 */
export default function StorageBrowserDefault(): React.JSX.Element {
  useServiceWorkerRegistration();
  const { primary } = useViews();
  const { LocationActionView, LocationDetailView, LocationsView } = primary;

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
