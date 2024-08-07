import React from 'react';

import { useControl } from '../../context/controls';
import { StorageBrowserElements } from '../../context/elements';
import { FileItem } from '../../context/types';

import { CLASS_BASE } from '../constants';
import { ViewComponent } from '../types';

import { LocationActionViewControls, UploadControls } from './Controls';
import { CreateFolderControls } from './CreateFolderControls';

import { useHandleUpload } from './useHandleUpload';

export interface LocationActionView<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends ViewComponent<LocationActionViewControls<T>> {}

// @ts-expect-error
export const LocationActionView: LocationActionView = () => {
  const [state, handleUpdateState] = useControl({
    type: 'ACTION_SELECT',
  });
  const [{ history }] = useControl({ type: 'NAVIGATE' });
  const { actionType, items } = state.selected;

  const [tasks, handleUpload] = useHandleUpload({
    prefix: history.join(''),
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
    <div className={CLASS_BASE} data-testid="LOCATION_ACTION_VIEW">
      <button onClick={() => handleUpdateState({ type: 'EXIT' })}>Exit</button>
      <button
        onClick={() => {
          if (!items) return;
          handleUpload();
        }}
      >
        Start
      </button>
      {actionType === 'CREATE_FOLDER' ? (
        <CreateFolderControls />
      ) : (
        <UploadControls />
      )}

      {listItems}
    </div>
  );
};
