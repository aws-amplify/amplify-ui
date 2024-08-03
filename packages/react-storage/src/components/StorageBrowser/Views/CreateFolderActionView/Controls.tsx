import React from 'react';
import { Controls } from '../Controls';
import { StorageBrowserElements } from '../../context/elements';

export interface CreateFolderActionViewControls<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends Pick<Controls<T>, 'Target'> {
  (): React.JSX.Element;
}

const { Target } = Controls;

// @ts-expect-error TODO: add Controls assignment
export const CreateFolderActionViewControls: CreateFolderActionViewControls =
  () => {
    return (
      <Target.Field.Container>
        <Target.Field.Label>Enter folder name:</Target.Field.Label>
        <Target.Field.Input type="text" />
        <Target.Field.Submit
          onClick={() => {
            // eslint-disable-next-line no-console
            console.log('create folder');
          }}
        >
          Create folder
        </Target.Field.Submit>
      </Target.Field.Container>
    );
  };
