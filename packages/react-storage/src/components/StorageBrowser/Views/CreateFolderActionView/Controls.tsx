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
    const [_folderName, setFolderName] = React.useState('');
    const inputRef = React.useRef<HTMLInputElement>(null);

    return (
      <Target.Field.Container>
        <Target.Field.Label htmlFor="folder-name-input">
          Enter folder name:
        </Target.Field.Label>
        <Target.Field.Input type="text" id="folder-name-input" ref={inputRef} />
        <Target.Field.Submit
          onClick={() => {
            setFolderName(() => {
              return inputRef.current?.value ?? '';
            });
          }}
        >
          Set Destination
        </Target.Field.Submit>
      </Target.Field.Container>
    );
  };
