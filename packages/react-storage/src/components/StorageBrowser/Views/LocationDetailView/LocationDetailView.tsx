import React from 'react';

import { useAction, LocationItemsState } from '../../context/actions';
import { StorageBrowserElements } from '../../context/elements';
import { ViewComponent } from '../types';
import { LocationDetailViewControls } from './Controls';
import { useControl } from '../../context/controls';
import { useConfig } from '../../context/config';

export interface LocationDetailView<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends ViewComponent<LocationDetailViewControls<T>> {}

const shouldLoadLocationItems = ({
  // data,
  hasError,
  isLoading,
}: LocationItemsState[0]) => !isLoading && !hasError;

export const LocationDetailView: LocationDetailView = () => {
  const { getLocationCredentials, region } = useConfig();
  const [{ location }, handleUpdateState] = useControl({ type: 'NAVIGATE' });

  const [locationItemsState, handleListLocationItems] = useAction({
    type: 'LIST_LOCATION_ITEMS',
  });

  const { bucket, permission, scope, prefix } = location ?? {};
  const { data, message, isLoading } = locationItemsState;

  // eslint-disable-next-line no-console
  console.log('message', message);

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

  const hasItems = !!data.items.length;

  const listItems = !hasItems
    ? null
    : data.items.map((item) => {
        if (item.type === 'FOLDER') {
          return (
            <button
              onClick={() => {
                // eslint-disable-next-line no-console
                console.log('clcik', item.key);

                if (item.key.endsWith('/')) {
                  handleUpdateState({
                    type: 'ENTER_FOLDER',
                    // @ts-expect-error Type 'string' is not assignable to type '${string}/'
                    name: item.key, // TODO: fix this type error
                  });
                }
              }}
              key={item.key}
            >
              {item.key}
            </button>
          );
        } else {
          return <p key={item.key}>{item.key}</p>;
        }
      });

  const loadLocationItems = shouldLoadLocationItems(locationItemsState);
  // eslint-disable-next-line no-console
  console.log('loadLocationItems', loadLocationItems);

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

  return (
    <>
      <LocationDetailViewControls />
      {isLoading && !hasItems ? <span>loading...</span> : listItems}
    </>
  );
};

LocationDetailView.Controls = LocationDetailViewControls;
