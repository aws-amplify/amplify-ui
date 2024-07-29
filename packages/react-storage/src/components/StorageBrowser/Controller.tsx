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
  const [{ location }] = useControl({ type: 'NAVIGATE' });
  const { current } = location;

  const loadLocations = shouldLoadLocations(locationsState);

  React.useEffect(() => {
    if (loadLocations) {
      // TODO: update to exhaustive call
      handleListLocations();
    }
  }, [handleListLocations, loadLocations]);

  const listLocationItems = React.useCallback(
    ({ bucket, permission, scope }: LocationData) =>
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
      }),
    [getLocationCredentials, handleListLocationItems, region]
  );

  const loadLocationItems = shouldLoadLocationItems(locationItemsState);
  React.useEffect(() => {
    if (current && loadLocationItems) {
      // TODO: update to exhaustive call
      listLocationItems(current);
    }
  }, [current, listLocationItems, loadLocationItems]);

  return null;
}
