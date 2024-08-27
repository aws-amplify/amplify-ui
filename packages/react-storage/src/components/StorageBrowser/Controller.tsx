import React from 'react';

import { useLocationsData } from './context/actions';

/**
 * Defines and provides default `StorageBrowser`
 * loading behavior
 */
export function Controller(): null {
  const [, handleListLocations] = useLocationsData();

  React.useEffect(() => {
    handleListLocations({ options: { refresh: true } });
  }, [handleListLocations]);

  return null;
}
