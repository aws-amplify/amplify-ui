import React from 'react';

import { StorageBrowserElements } from '../../context/elements';
import { Controls } from '../Controls';
import { CommonControl } from '../types';

const { Title, Summary } = Controls;

export interface LocationActionViewControls<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends Pick<Controls<T>, CommonControl | 'Summary' | 'Title'> {
  (): React.JSX.Element;
}
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
