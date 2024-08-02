import React from 'react';

import { StorageBrowserElements } from '../../context/elements';

import { ViewComponent } from '../types';
import { LocationActionViewControls } from './Controls';
import { useControl } from '../../context/controls';

export interface LocationActionView<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends ViewComponent<LocationActionViewControls<T>> {}

export const LocationActionView: LocationActionView = () => {
  const [{ selected }, handleUpdateState] = useControl({
    type: 'ACTION_SELECT',
  });
  const { actionType, items } = selected;
  const listItems = items
    ? items.map(({ key, type }) => {
        return (
          <div key={key}>
            <span>{key}</span>
            <span>{type}</span>
          </div>
        );
      })
    : 'No items selected.';

  return (
    <>
      <h2>{actionType}</h2>
      <button
        onClick={() => handleUpdateState({ type: 'DESELECT_ACTION_TYPE' })}
      >
        Cancel
      </button>
      <LocationActionViewControls />
      {listItems}
    </>
  );
};

LocationActionView.Controls = LocationActionViewControls;
