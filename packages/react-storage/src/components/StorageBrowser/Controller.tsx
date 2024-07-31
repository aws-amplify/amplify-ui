import React from 'react';

import { LocationsDataState, useLocationsData } from './context/actions';

const shouldLoadLocations = ({
  data,
  hasError,
  isLoading,
}: LocationsDataState[0]) => !data.locations.length && !isLoading && !hasError;

/**
 * Handles fetching of list data
 */
export function Controller(): null {
  const [locationsState, handleListLocations] = useLocationsData();

  const loadLocations = shouldLoadLocations(locationsState);

  React.useEffect(() => {
    if (loadLocations) {
      // TODO: update to exhaustive call
      handleListLocations();
    }
    // else if (location.shouldRefresh) {
    //   // TODO: update to exhaustive call
    //   handleListLocations({ refresh: true });
    // }
  }, [handleListLocations, loadLocations]);

  return null;
}
