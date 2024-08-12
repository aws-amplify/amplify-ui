import React from 'react';

import { LocationsDataState, useLocationsData } from './context/actions';
import { useControl } from './context/controls';

const shouldLoadLocations = ({
  data,
  hasError,
  isLoading,
}: LocationsDataState[0]) => !data.result?.length && !isLoading && !hasError;

/**
 * Handles fetching of list data
 */
export function Controller(): null {
  const [locationsState, handleListLocations] = useLocationsData();
  const [{ isRefreshing }, handleRefreshState] = useControl({
    type: 'REFRESH',
  });

  const loadLocations = shouldLoadLocations(locationsState);

  React.useEffect(() => {
    if (loadLocations) {
      // TODO: update to exhaustive call
      handleListLocations({ options: { pageSize: 1000 } });
    }
  }, [handleListLocations, loadLocations]);

  React.useEffect(() => {
    if (isRefreshing && !loadLocations) {
      handleListLocations({ options: { pageSize: 1000, refresh: true } });
      handleRefreshState({ type: 'DONE' });
    }
  }, [handleListLocations, handleRefreshState, isRefreshing, loadLocations]);

  return null;
}
