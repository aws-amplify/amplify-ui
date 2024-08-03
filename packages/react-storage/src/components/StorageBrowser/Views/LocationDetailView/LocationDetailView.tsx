import React from 'react';

import { useAction } from '../../context/actions';
import { StorageBrowserElements } from '../../context/elements';
import { ViewComponent } from '../types';
import { LocationDetailViewControls } from './Controls';
import { CLASS_BASE } from '../constants';
import { useControl } from '../../context/controls';
import { useConfig } from '../../context/config';

export interface LocationDetailView<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends ViewComponent<LocationDetailViewControls<T>> {}

export const LocationDetailView: LocationDetailView = () => {
  const { getLocationCredentials, region } = useConfig();
  const [{ history, location }, handleUpdateState] = useControl({
    type: 'NAVIGATE',
  });

  const { permission, scope } = location ?? {};
  const bucket = history[0];

  const prefix = history[history.length - 1];

  const [locationItemsState, handleListLocationItems] = useAction({
    type: 'LIST_LOCATION_ITEMS',
  });

  const { data, isLoading } = locationItemsState;

  React.useEffect(() => {
    if (!scope || !permission) {
      return;
    }

    handleListLocationItems({
      prefix: prefix === bucket ? '' : prefix,
      config: {
        bucket,
        credentialsProvider: async () =>
          await getLocationCredentials({ permission, scope }),
        region,
      },
      options: { refresh: true },
    });
  }, [
    bucket,
    getLocationCredentials,
    handleListLocationItems,
    permission,
    prefix,
    region,
    scope,
  ]);

  const hasItems = !!data.result?.length;

  const listItems = !hasItems
    ? null
    : data.result.map(({ key, type }) => {
        if (key === prefix) {
          return null;
        }
        if (type === 'FOLDER') {
          return (
            <button
              onClick={() => {
                handleUpdateState({
                  type: 'NAVIGATE',
                  prefix: key,
                });
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
