import React from 'react';

import { useAction } from '../../context/actions';
import { StorageBrowserElements } from '../../context/elements';
import { ViewComponent } from '../types';
import { LocationDetailViewControls } from './Controls';
import { CLASS_BASE } from '../constants';
import { useControl } from '../../context/controls';
import { useConfig } from '../../context/config';
import { useHasValueUpdated } from '@aws-amplify/ui-react-core';
import { isFolderName } from '../../context/actions/types';

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
    : data.items.map(({ key, type }) => {
        if (type === 'FOLDER') {
          return (
            <button
              onClick={() => {
                if (isFolderName(key)) {
                  handleUpdateState({
                    type: 'ENTER_FOLDER',
                    name: key,
                  });
                }
              }}
              key={key}
            >
              {key}
            </button>
          );
        } else {
          return <p key={key}>{key}</p>;
        }
      });

  return (
    <>
      <div className={CLASS_BASE}>
        <div className={`${CLASS_BASE}__controls`}>
          <LocationDetailViewControls />
        </div>
      </div>
      {isLoading && !hasItems ? <span>loading...</span> : listItems}
    </>
  );
};

LocationDetailView.Controls = LocationDetailViewControls;
