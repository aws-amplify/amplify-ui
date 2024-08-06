import React from 'react';

import { CLASS_BASE } from '../constants';
import { StorageBrowserElements } from '../../context/elements';
import { useControl } from '../../context/controls';
import { Controls, LocationDetailViewTable } from '../Controls';
import { CommonControl } from '../types';

const { ActionSelect, Navigate } = Controls;
const { Heading } = StorageBrowserElements;

export interface LocationDetailViewControls<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends Pick<
    Controls<T>,
    CommonControl | 'Title' | 'ActionSelect' | 'Paginate' | 'Refresh' | 'Search'
  > {
  (): React.JSX.Element;
}

export const Title = (): React.JSX.Element => {
  const [{ history }] = useControl({
    type: 'NAVIGATE',
  });
  const title = history.slice(-1)[0];
  return <Heading className={`${CLASS_BASE}__title`}>{title}</Heading>;
};

// @ts-expect-error TODO: add Controls assignment
export const LocationDetailViewControls: LocationDetailViewControls = () => {
  return (
    <>
      <Navigate />
      <Title />
      <ActionSelect />
      <LocationDetailViewTable />
    </>
  );
};
