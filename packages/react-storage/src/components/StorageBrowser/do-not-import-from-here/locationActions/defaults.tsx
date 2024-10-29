import React from 'react';
import { IconElement } from '../../context/elements/IconElement';

import { LocationAction } from './types';
import { displayText } from '../../displayText/en';
const {
  createFolderTitle,
  deleteFilesTitle,
  uploadFilesTitle,
  uploadFolderTitle,
} = displayText;

export const OPTIONS_DEFAULT: LocationAction['options'] = {
  disable: (items) => !!items.length,
  hide: (permission) => permission === 'READ',
};

const CREATE_FOLDER: LocationAction = {
  options: {
    ...OPTIONS_DEFAULT,
    displayName: createFolderTitle,
    icon: <IconElement variant="create-folder" />,
  },
};

const DELETE_FILES: LocationAction = {
  options: {
    ...OPTIONS_DEFAULT,
    disable: (selectedItems) => selectedItems.length < 1,
    displayName: deleteFilesTitle,
    icon: <IconElement variant="delete-file" />,
  },
};

const UPLOAD_FOLDER: LocationAction = {
  options: {
    ...OPTIONS_DEFAULT,
    displayName: uploadFolderTitle,
    icon: <IconElement variant="upload-folder" />,
    selectionData: 'folder',
  },
};

const UPLOAD_FILES: LocationAction = {
  options: {
    ...OPTIONS_DEFAULT,
    displayName: uploadFilesTitle,
    icon: <IconElement variant="upload-file" />,
    selectionData: 'file',
  },
};

export const locationActionsDefault = {
  CREATE_FOLDER,
  DELETE_FILES,
  UPLOAD_FILES,
  UPLOAD_FOLDER,
};

export type LocationActionsDefault = typeof locationActionsDefault;
