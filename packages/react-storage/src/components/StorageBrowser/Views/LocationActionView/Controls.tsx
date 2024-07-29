import React from 'react';

import { StorageBrowserElements } from '../../context/elements';
import { Controls } from '../Controls';
import { CommonControl } from '../types';

export interface LocationActionViewControls<T extends StorageBrowserElements>
  extends Pick<Controls<T>, CommonControl | 'Summary'> {
  (): React.JSX.Element;
}

// @ts-expect-error TODO: add Controls assignment
export const LocationActionViewControls: LocationActionViewControls<
  StorageBrowserElements
> = () => {
  return <>Action View Controls</>;
};
