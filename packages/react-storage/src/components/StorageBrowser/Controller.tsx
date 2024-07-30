import React from 'react';

import {
  LocationData,
  LocationItemsState,
  LocationsDataState,
  useAction,
  useLocationsData,
} from './context/actions';

import { useControl } from './context/controls';
import { useConfig } from './context/config';

const shouldLoadLocations = ({
  data,
  hasError,
  isLoading,
}: LocationsDataState[0]) => !data.locations.length && !isLoading && !hasError;

const shouldLoadLocationItems = ({
  data,
  hasError,
  isLoading,
}: LocationItemsState[0]) => !data.items.length && !isLoading && !hasError;

/**
 * Handles fetching of list data
 */
export function Controller(): null {
  const { getLocationCredentials, region } = useConfig();
  const [locationsState, handleListLocations] = useLocationsData();
  const [locationItemsState, handleListLocationItems] = useAction({
    type: 'LIST_LOCATION_ITEMS',
  });
  const [{ location, history }] = useControl({ type: 'NAVIGATE' });

  const loadLocations = shouldLoadLocations(locationsState);

  React.useEffect(() => {
    if (loadLocations) {
      // TODO: update to exhaustive call
      handleListLocations();
    } else if (location.shouldRefresh) {
      handleListLocations({ refresh: true });
    }
  }, [location.shouldRefresh, handleListLocations, loadLocations]);

  const listLocationItems = React.useCallback(
    ({ bucket, permission, scope }: LocationData, refresh: boolean = false) =>
      handleListLocationItems({
        // uncomment to test managed auth config
        prefix: '',
        // uncomment to test with amplify config with public access level
        // prefix: 'public/'
        config: {
          bucket,
          credentialsProvider: async () =>
            await getLocationCredentials({ permission, scope }),
          region,
        },
        options: { refresh },
      }),
    [getLocationCredentials, handleListLocationItems, region]
  );

  const loadLocationItems = shouldLoadLocationItems(locationItemsState);
  React.useEffect(() => {
    if (location.current && loadLocationItems) {
      // TODO: update to exhaustive call
      listLocationItems(location.current);
    } else if (location.current && history.shouldRefresh) {
      listLocationItems(location.current, true);
    }
  }, [location, history.shouldRefresh, listLocationItems, loadLocationItems]);

  return null;
}
