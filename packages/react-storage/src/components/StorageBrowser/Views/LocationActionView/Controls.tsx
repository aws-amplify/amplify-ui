import React from 'react';

import { useControl } from '../../context/controls';
import { StorageBrowserElements } from '../../context/elements';

import { Controls } from '../Controls';
import { CommonControl } from '../types';
import { FileItem } from '../../context/types';

import { useHandleUpload } from './useHandleUpload';

const { ActionCancel, ActionStart, Summary, Title: TitleElement } = Controls;

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

export const UploadControls = (): React.JSX.Element => {
  const [state, handleUpdateState] = useControl({
    type: 'ACTION_SELECT',
  });
  const [{ history }] = useControl({ type: 'NAVIGATE' });
  const { items } = state.selected;
  const [, handleUpload] = useHandleUpload({
    prefix: history.join(''),
    items: items! as FileItem[],
  });
  return (
    <>
      <ActionCancel onClick={() => handleUpdateState({ type: 'EXIT' })} />
      <ActionStart
        onClick={() => {
          if (!items) return;
          handleUpload();
        }}
      />
      <Title />
      <Summary />
    </>
  );
};
