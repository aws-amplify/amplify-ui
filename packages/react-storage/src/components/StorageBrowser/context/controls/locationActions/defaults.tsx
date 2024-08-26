import React from 'react';
import { IconElement } from '../../elements/IconElement';

import { TaskActionOutput, TaskActionInput } from '../../types';
import { LocationAction } from './types';

export const OPTIONS_DEFAULT: LocationAction['options'] = {
  disable: (items) => !!items.length,
  hide: (permission) => permission === 'READ',
};

const handler = (_: TaskActionInput): Promise<TaskActionOutput> =>
  Promise.resolve({ result: undefined });

const CREATE_FOLDER: LocationAction = {
  handler,
  options: {
    ...OPTIONS_DEFAULT,
    displayName: 'Create Folder',
    icon: <IconElement variant="create-folder" />,
  },
};

const UPLOAD_FOLDER: LocationAction = {
  handler,
  options: {
    ...OPTIONS_DEFAULT,
    displayName: 'Upload Folder',
    icon: <IconElement variant="upload-folder" />,
    selectionData: 'folder',
  },
};

const UPLOAD_FILES: LocationAction = {
  handler,
  options: {
    ...OPTIONS_DEFAULT,
    displayName: 'Upload Files',
    icon: <IconElement variant="upload-file" />,
    selectionData: 'file',
  },
};

export const ACTIONS_DEFAULT = { CREATE_FOLDER, UPLOAD_FILES, UPLOAD_FOLDER };
