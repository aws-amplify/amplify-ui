import React from 'react';

import { StorageBrowserElements } from '../../context/elements';
import { Controls } from '../Controls';
import { CommonControl } from '../types';

const { ActionSelect } = Controls;

export interface LocationDetailViewControls<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends Pick<
    Controls<T>,
    CommonControl | 'ActionSelect' | 'Paginate' | 'Refresh' | 'Search'
  > {
  (): React.JSX.Element;
}

const TEMP_ACTIONS = [
  { name: 'Upload File', type: 'UPLOAD_FILE' },
  { name: 'Create Folder', type: 'CREATE_FOLDER' },
];

// @ts-expect-error TODO: add Controls assignment
export const LocationDetailViewControls: LocationDetailViewControls = () => {
  return <ActionSelect />;
};
