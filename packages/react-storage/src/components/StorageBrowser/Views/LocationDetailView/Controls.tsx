import React from 'react';

import { StorageBrowserElements } from '../../context/elements';
import { Controls } from '../Controls';
import { CommonControl } from '../types';

const { ActionSelect, Navigate } = Controls;
export interface LocationDetailViewControls<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends Pick<
    Controls<T>,
    CommonControl | 'Title' | 'ActionSelect' | 'Paginate' | 'Refresh' | 'Search'
  > {
  (): React.JSX.Element;
}

// @ts-expect-error TODO: add Controls assignment
export const LocationDetailViewControls: LocationDetailViewControls = () => {
  return (
    <>
      <Navigate />
      <ActionSelect />
    </>
  );
};
