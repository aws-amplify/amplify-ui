import React from 'react';
import { IconElement } from '../../elements/IconElement';

import { TaskActionOutput, TaskActionInput } from '../../types';
import { LocationAction } from './types';

const handler = (_: TaskActionInput): Promise<TaskActionOutput> =>
  Promise.resolve({ result: undefined });

const CREATE_FOLDER: LocationAction = {
  handler,
  options: {
    displayName: 'Create Folder',
    disable: (items) => !!items.length,
    hide: (permission) => permission === 'READ',
    icon: <IconElement variant="create-folder" />,
  },
};

const UPLOAD_FOLDER: LocationAction = {
  handler,
  options: {
    disable: (items) => !!items.length,
    displayName: 'Upload Folder',
    hide: (permission) => permission === 'READ',
    icon: <IconElement variant="upload-folder" />,
    selectionData: 'folder',
  },
};

const UPLOAD_FILES: LocationAction = {
  handler,
  options: {
    disable: (items) => !!items.length,
    displayName: 'Upload Files',
    hide: (permission) => permission === 'READ',
    icon: <IconElement variant="upload-file" />,
    selectionData: 'file',
  },
};

export const ACTIONS_DEFAULT = { CREATE_FOLDER, UPLOAD_FILES, UPLOAD_FOLDER };
