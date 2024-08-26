import React from 'react';
import { IconElement } from '../elements/IconElement';

import { LocationAction } from './types';

export const OPTIONS_DEFAULT: LocationAction['options'] = {
  disable: (items) => !!items.length,
  hide: (permission) => permission === 'READ',
};

const CREATE_FOLDER: Omit<LocationAction, 'handler'> = {
  options: {
    ...OPTIONS_DEFAULT,
    displayName: 'Create Folder',
    icon: <IconElement variant="create-folder" />,
  },
};

const UPLOAD_FOLDER: Omit<LocationAction, 'handler'> = {
  options: {
    ...OPTIONS_DEFAULT,
    displayName: 'Upload Folder',
    icon: <IconElement variant="upload-folder" />,
    selectionData: 'folder',
  },
};

const UPLOAD_FILES: Omit<LocationAction, 'handler'> = {
  options: {
    ...OPTIONS_DEFAULT,
    displayName: 'Upload Files',
    icon: <IconElement variant="upload-file" />,
    selectionData: 'file',
  },
};

export const LOCATION_ACTIONS_DEFAULT = {
  CREATE_FOLDER,
  UPLOAD_FILES,
  UPLOAD_FOLDER,
};

export type LocationActionsDefault = typeof LOCATION_ACTIONS_DEFAULT;
