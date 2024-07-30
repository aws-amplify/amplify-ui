import React from 'react';

import { FolderName, useAction } from '../../context/actions';
import { StorageBrowserElements } from '../../context/elements';
import { ViewComponent } from '../types';
import { LocationDetailViewControls } from './Controls';
import { useControl } from '../../context/controls';

export interface LocationDetailView<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends ViewComponent<LocationDetailViewControls<T>> {}

export const LocationDetailView: LocationDetailView = () => {
  const [_, handleUpdateState] = useControl({ type: 'NAVIGATE' });

  const [{ data, isLoading }] = useAction({
    type: 'LIST_LOCATION_ITEMS',
  });

  const hasItems = !!data.items.length;

  const listItems = !hasItems
    ? null
    : data.items.map((item) => {
        if (item.type === 'FOLDER') {
          return (
            <button
              onClick={() => {
                handleUpdateState({
                  type: 'ENTER_FOLDER',
                  name: item.key as FolderName, //TODO: remove this, just testing for now
                });
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
