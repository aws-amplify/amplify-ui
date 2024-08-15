import React from 'react';

import { useControl } from '../../context/controls';
import { StorageBrowserElements } from '../../context/elements';
import { CLASS_BASE } from '../constants';
import { ViewComponent } from '../types';

import { LocationActionViewControls } from './Controls';
import { CreateFolderControls } from './CreateFolderControls';
import { UploadControls } from './UploadControls';

export interface LocationActionView<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends ViewComponent<LocationActionViewControls<T>> {}

// @ts-expect-error
export const LocationActionView: LocationActionView = () => {
  const [state] = useControl({
    type: 'ACTION_SELECT',
  });

  const { actionType } = state.selected;

  return (
    <div className={CLASS_BASE} data-testid="LOCATION_ACTION_VIEW">
      {actionType === 'CREATE_FOLDER' ? (
        <CreateFolderControls />
      ) : (
        <UploadControls />
      )}
    </div>
  );
};
