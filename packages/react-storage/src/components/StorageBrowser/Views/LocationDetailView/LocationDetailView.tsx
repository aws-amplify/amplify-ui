import React from 'react';

import { useAction } from '../../context/actions';
import { StorageBrowserElements } from '../../context/elements';
import { ViewComponent } from '../types';
import { LocationDetailViewControls } from './Controls';
import { useControl } from '../../context/controls';
import { useConfig } from '../../context/config';
import { useHasValueUpdated } from '@aws-amplify/ui-react-core';

export interface LocationDetailView<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends ViewComponent<LocationDetailViewControls<T>> {}

export const LocationDetailView: LocationDetailView = () => {
  const { getLocationCredentials, region } = useConfig();
  const [{ location }, handleUpdateState] = useControl({ type: 'NAVIGATE' });

  const [locationItemsState, handleListLocationItems] = useAction({
    type: 'LIST_LOCATION_ITEMS',
  });

  const { bucket, permission, scope, prefix } = location ?? {};
  const { data, isLoading } = locationItemsState;

  const hasScopeChanged = useHasValueUpdated(scope);

  const listLocationItems = React.useCallback(
    ({
      bucket,
      // uncomment for testing Amplify buckets
      prefix = 'public/',
      // uncomment for testing managed auth buckets
      // prefix = '',
      scope,
    }: {
      bucket: string;
      prefix: string | undefined;
      scope: string;
    }) =>
      handleListLocationItems({
        // uncomment to test managed auth config
        // prefix: '',
        // uncomment to test with amplify config with public access level

        prefix,
        config: {
          bucket,
          credentialsProvider: async () =>
            await getLocationCredentials({ permission: permission!, scope }),
          region,
        },
        options: { refresh: true },
      }),
    [getLocationCredentials, permission, handleListLocationItems, region]
  );

  React.useEffect(() => {
    if (bucket && scope && hasScopeChanged) {
      // TODO: update to exhaustive call
      listLocationItems({ bucket, prefix, scope });
    }
  }, [bucket, hasScopeChanged, prefix, scope, listLocationItems]);

  const hasItems = !!data.items.length;

  const listItems = !hasItems
    ? null
    : data.items.map((item) => {
        if (item.type === 'FOLDER') {
          return (
            <button
              onClick={() => {
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

  return (
    <>
      <LocationDetailViewControls />
      {isLoading && !hasItems ? <span>loading...</span> : listItems}
    </>
  );
};

LocationDetailView.Controls = LocationDetailViewControls;
