import React from 'react';

import { useControl } from '../../context/controls';
import { StorageBrowserElements } from '../../context/elements';

import { CreateFolderActionViewControls } from '../CreateFolderActionView/Controls';
import { CLASS_BASE } from '../constants';
import { ViewComponent } from '../types';

import { LocationActionViewControls } from './Controls';
import { UploadFileControls } from './UploadFileControls';

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
        <CreateFolderActionViewControls />
      ) : actionType === 'UPLOAD_FILES' ? (
        <UploadFileControls />
      ) : null}
    </div>
  );
};
