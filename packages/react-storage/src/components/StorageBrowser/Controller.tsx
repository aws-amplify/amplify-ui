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
  // data,
  hasError,
  isLoading,
}: LocationItemsState[0]) => !isLoading && !hasError;

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
    }
    // else if (location.shouldRefresh) {
    //   // TODO: update to exhaustive call
    //   handleListLocations({ refresh: true });
    // }
  }, [handleListLocations, loadLocations]);

  const { bucket, permission, scope, prefix } = location ?? {};

  const listLocationItems = React.useCallback(
    ({ prefix = '', scope }: { prefix: string | undefined; scope: string }) => {
      // s3://SOME_STRING/*
      // eslint-disable-next-line no-console
      console.log('listLocationItems scope', scope);

      return handleListLocationItems({
        // uncomment to test managed auth config
        // prefix: '',
        // uncomment to test with amplify config with public access level

        prefix,
        config: {
          bucket: bucket!,
          credentialsProvider: async () =>
            await getLocationCredentials({ permission: permission!, scope }),
          region,
        },
        options: { refresh: true },
      });
    },
    [
      getLocationCredentials,
      bucket,
      permission,
      handleListLocationItems,
      region,
    ]
  );

  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('location changed', location);
  }, [location]);

  const loadLocationItems = shouldLoadLocationItems(locationItemsState);

  React.useEffect(() => {
    if (scope && loadLocationItems) {
      // TODO: update to exhaustive call
      listLocationItems({ prefix, scope });
    }
    // if (location.current && loadLocationItems) {
    //   // TODO: update to exhaustive call
    //   listLocationItems(location.current);
    // } else if (location.current && history.shouldRefresh) {
    //   // TODO: update to exhaustive call
    //   listLocationItems(location.current, true);
    // }
  }, [prefix, scope, listLocationItems, loadLocationItems]);

  return null;
}
