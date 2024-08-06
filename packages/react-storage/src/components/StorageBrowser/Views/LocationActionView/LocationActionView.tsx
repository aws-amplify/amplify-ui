import React from 'react';

import { useControl } from '../../context/controls';
import { StorageBrowserElements } from '../../context/elements';
import { FileItem } from '../../context/types';

import { CreateFolderActionViewControls } from '../CreateFolderActionView/Controls';
import { ViewComponent } from '../types';
import { CLASS_BASE } from '../constants';

import { LocationActionViewControls } from './Controls';
import { useHandleUpload } from './useHandleUpload';

export interface LocationActionView<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends ViewComponent<LocationActionViewControls<T>> {}

export const LocationActionView: LocationActionView = () => {
  const [state] = useControl({
    type: 'ACTION_SELECT',
  });
  const { actionType, destination, items } = state.selected;

  const [tasks] = useHandleUpload({
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
      <div className={CLASS_BASE} data-testid="ACTIONS_VIEW">
        {actionType === 'CREATE_FOLDER' ? (
          <CreateFolderActionViewControls />
        ) : (
          <LocationActionViewControls />
        )}
      </div>
      {listItems}
    </>
  );
};

LocationActionView.Controls = LocationActionViewControls;
