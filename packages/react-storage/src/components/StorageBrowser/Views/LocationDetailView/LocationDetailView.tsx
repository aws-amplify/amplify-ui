import React from 'react';

import { useAction } from '../../context/actions';
import { StorageBrowserElements } from '../../context/elements';
import { ViewComponent } from '../types';
import { LocationDetailViewControls } from './Controls';
import { useControl } from '../../context/controls';

export interface LocationDetailView<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends ViewComponent<LocationDetailViewControls<T>> {}

export const LocationDetailView: LocationDetailView = () => {
  const [_, handleUpdateState] = useControl({ type: 'NAVIGATE' });

  const [{ data, isLoading, message }] = useAction({
    type: 'LIST_LOCATION_ITEMS',
  });

  // eslint-disable-next-line no-console
  console.log('message', message);

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

  return (
    <>
      <LocationDetailViewControls />
      {isLoading && !hasItems ? <span>loading...</span> : listItems}
    </>
  );
};

LocationDetailView.Controls = LocationDetailViewControls;
