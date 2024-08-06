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
  const { actionType, destination, items } = state.selected;

  const [tasks, handleUpload] = useHandleUpload({
    destination: destination!,
    items: items! as FileItem[],
  });

  const listItems = items
    ? tasks.map(({ cancel, key, status, progress }, i) => {
        return (
          <React.Fragment key={key}>
            {i === 0 ? (
              <div style={{ flexDirection: 'row' }}>
                <span>Name </span>
                <span>Status </span>
                <span>Progress </span>
                <span>Cancel </span>
              </div>
            ) : null}
            <div style={{ flexDirection: 'row' }}>
              <span>{key} </span>
              <span>{status} </span>
              <span>{progress} </span>
              {cancel ? <button onClick={cancel}>Cancel</button> : null}
            </div>
          </React.Fragment>
        );
      })
    : 'No items selected.';

  return (
    <>
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

      {listItems}
    </>
  );
};

LocationActionView.Controls = LocationActionViewControls;
