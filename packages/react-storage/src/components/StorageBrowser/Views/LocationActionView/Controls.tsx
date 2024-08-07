import React from 'react';

import { useControl } from '../../context/controls';
import { StorageBrowserElements } from '../../context/elements';

import { CLASS_BASE } from '../constants';
import { Controls, NavigateItem } from '../Controls';
import { CommonControl } from '../types';

const { Button } = StorageBrowserElements;

const { Title: TitleElement } = Controls;

export interface LocationActionViewControls<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends Pick<Controls<T>, CommonControl | 'Summary' | 'Title'> {
  (): React.JSX.Element;
}

export const Navigate = (): React.JSX.Element => {
  const [, handleUpdateState] = useControl({ type: 'ACTION_SELECT' });

  return (
    <NavigateItem.Button
      className={`${CLASS_BASE}__navigate__container`}
      onClick={() => {
        handleUpdateState({ type: 'EXIT' });
      }}
    >
      Exit
    </NavigateItem.Button>
  );
};

export function Primary(props: {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}): React.JSX.Element {
  return <Button {...props} className={`${CLASS_BASE}__refresh`} />;
}

export const Title = (): React.JSX.Element => {
  const [state] = useControl({
    type: 'ACTION_SELECT',
  });
  const { name } = state.selected;
  return <TitleElement>{name}</TitleElement>;
};
