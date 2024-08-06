import React from 'react';

import { StorageBrowserElements } from '../../context/elements';
import { useControl } from '../../context/controls';
import { Controls } from '../Controls';
import { CommonControl } from '../types';
import { useHandleUpload } from './useHandleUpload';
import { FileItem } from '../../context/types';

const { Title, Summary, ActionStart, ActionCancel } = Controls;

export interface LocationActionViewControls<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends Pick<Controls<T>, CommonControl | 'Summary' | 'Title'> {
  (): React.JSX.Element;
}
// @ts-expect-error TODO: add Controls assignment
export const LocationActionViewControls: LocationActionViewControls<
  StorageBrowserElements
> = () => {
  const [state, handleUpdateState] = useControl({
    type: 'ACTION_SELECT',
  });
  const { destination, items } = state.selected;

  const [, handleUpload] = useHandleUpload({
    destination: destination!,
    items: items! as FileItem[],
  });
  return (
    <>
      <Title />
      <ActionCancel
        onClick={() => handleUpdateState({ type: 'DESELECT_ACTION_TYPE' })}
      />
      <ActionStart
        onClick={() => {
          if (!items) return;
          handleUpload();
        }}
      />
      <Summary />
    </>
  );
};
