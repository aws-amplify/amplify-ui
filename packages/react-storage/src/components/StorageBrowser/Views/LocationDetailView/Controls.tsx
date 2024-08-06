import React from 'react';

import { StorageBrowserElements } from '../../context/elements';
import { useControl } from '../../context/controls';
import { Controls, LocationDetailViewTable } from '../Controls';
import { CommonControl } from '../types';

const { ActionSelect, Navigate, Title: TitleElement } = Controls;

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
  return <TitleElement>{title}</TitleElement>;
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
