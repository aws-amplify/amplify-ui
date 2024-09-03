import React from 'react';

import { useControl } from '../../context/control';
import { CLASS_BASE } from '../constants';

import { CreateFolderControls } from './CreateFolderControls';
import { UploadControls } from './UploadControls';

export const LocationActionView = (): React.JSX.Element => {
  const [{ selected }] = useControl('LOCATION_ACTIONS');

  return (
    <div className={CLASS_BASE} data-testid="LOCATION_ACTION_VIEW">
      {selected.type === 'CREATE_FOLDER' ? (
        <CreateFolderControls />
      ) : (
        <UploadControls />
      )}
    </div>
  );
};
