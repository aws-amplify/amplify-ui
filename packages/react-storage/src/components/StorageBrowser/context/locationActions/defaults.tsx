import React from 'react';
import { IconElement } from '../elements/IconElement';

import { LocationAction } from './types';

export const OPTIONS_DEFAULT: LocationAction['options'] = {
  disable: (items) => !!items.length,
  hide: (permission) => permission === 'READ',
};

const CREATE_FOLDER: LocationAction = {
  options: {
    ...OPTIONS_DEFAULT,
    displayName: 'Create Folder',
    icon: <IconElement variant="create-folder" />,
  },
};

const UPLOAD_FOLDER: LocationAction = {
  options: {
    ...OPTIONS_DEFAULT,
    displayName: 'Upload Folder',
    icon: <IconElement variant="upload-folder" />,
    selectionData: 'folder',
  },
};

const UPLOAD_FILES: LocationAction = {
  options: {
    ...OPTIONS_DEFAULT,
    displayName: 'Upload Files',
    icon: <IconElement variant="upload-file" />,
    selectionData: 'file',
  },
};

export const locationActionsDefault = {
  CREATE_FOLDER,
  UPLOAD_FILES,
  UPLOAD_FOLDER,
};

export type LocationActionsDefault = typeof locationActionsDefault;
