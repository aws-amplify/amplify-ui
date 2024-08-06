import React from 'react';

import { StorageBrowserElements } from '../../context/elements';
import { useControl } from '../../context/controls';

import { Controls, NavigateItem } from '../Controls';
import { CommonControl } from '../types';

export interface LocationActionViewControls<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends Pick<Controls<T>, CommonControl | 'Summary' | 'Title'> {
  (): React.JSX.Element;
}

export const Navigate = (): React.JSX.Element => {
  const [, handleUpdateState] = useControl({ type: 'ACTION_SELECT' });

  return (
    <NavigateItem.Button
      onClick={() => {
        handleUpdateState({ type: 'EXIT' });
      }}
    >
      Exit
    </NavigateItem.Button>
  );
};
