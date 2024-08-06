import React from 'react';

import { StorageBrowserElements } from '../../context/elements';
import { useControl } from '../../context/controls';
import { Controls } from '../Controls';
import { CommonControl } from '../types';

const { Summary, Title: TitleElement } = Controls;

export interface LocationActionViewControls<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends Pick<Controls<T>, CommonControl | 'Summary' | 'Title'> {
  (): React.JSX.Element;
}

export const Title = (): React.JSX.Element => {
  const [state] = useControl({
    type: 'ACTION_SELECT',
  });
  const { name } = state.selected;
  return <TitleElement>{name}</TitleElement>;
};

// @ts-expect-error TODO: add Controls assignment
export const LocationActionViewControls: LocationActionViewControls<
  StorageBrowserElements
> = () => {
  return (
    <>
      <Title />
      <Summary />
    </>
  );
};
