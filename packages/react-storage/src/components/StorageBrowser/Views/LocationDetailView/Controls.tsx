import React from 'react';

import { StorageBrowserElements } from '../../context/elements';
import { Controls } from '../Controls';
import { CommonControl } from '../types';

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
  const handleActionSelect = (type: string) => {
    // eslint-disable-next-line no-console
    console.log('type', type);
  };

  return (
    <>
      {TEMP_ACTIONS.map(({ name, type }) => (
        <button
          key={name}
          onClick={() => {
            handleActionSelect(type);
          }}
          type="button"
        >
          {name}
        </button>
      ))}
    </>
  );
};
