import React from 'react';

import { useControl } from '../../context/controls';
import { StorageBrowserElements } from '../../context/elements';
import { FileItem } from '../../context/types';

import { CreateFolderActionViewControls } from '../CreateFolderActionView/Controls';
import { ViewComponent } from '../types';

import { LocationActionViewControls } from './Controls';
import { useHandleUpload } from './useHandleUpload';

export interface LocationActionView<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends ViewComponent<LocationActionViewControls<T>> {}

export const LocationActionView: LocationActionView = () => {
  const [state, handleUpdateState] = useControl({
    type: 'ACTION_SELECT',
  });
  const { actionType, destination, items, name } = state.selected;

  const [, handleUpload] = useHandleUpload({
    destination: destination!,
    items: items! as FileItem[],
  });

  return (
    <>
      <h2>{name}</h2>
      <button
        onClick={() => handleUpdateState({ type: 'DESELECT_ACTION_TYPE' })}
      >
        Exit
      </button>
      <button
        onClick={() => {
          if (!items) return;
          handleUpload();
        }}
      >
        Start
      </button>
      {actionType === 'CREATE_FOLDER' ? (
        <CreateFolderActionViewControls />
      ) : (
        <LocationActionViewControls />
      )}
    </>
  );
};

LocationActionView.Controls = LocationActionViewControls;
