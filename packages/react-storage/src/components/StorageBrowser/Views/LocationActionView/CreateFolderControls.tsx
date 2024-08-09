import React from 'react';

import { useAction } from '../../context/actions';
import { useControl } from '../../context/controls';

import { Controls } from '../Controls';
import { Title } from './Controls';

const { Exit, Primary, Target } = Controls;

export const CreateFolderControls = (): React.JSX.Element => {
  const [, handleUpdateState] = useControl({ type: 'ACTION_SELECT' });
  const [{ history }] = useControl({ type: 'NAVIGATE' });

  const [
    {
      isLoading,
      data: { result },
    },
    handleCreateAction,
  ] = useAction({
    type: 'CREATE_FOLDER',
  });

  const [data, setData] = React.useState('');
  const [fieldValidationError, setFieldValidationError] = React.useState<
    string | undefined
  >();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const prefix = `${history.join('')}${data}`;

  let primaryProps = {
    onClick: () => {
      handleCreateAction({ prefix });
    },
    children: 'Create folder',
    disabled: !data.length,
  };

  if (result?.status === 'SUCCESS') {
    primaryProps = {
      onClick: () => {
        handleUpdateState({ type: 'EXIT' });
      },
      children: 'Folder created',
      disabled: true,
    };
  }

  return (
    <>
      <Title />
      <Exit onClick={() => handleUpdateState({ type: 'EXIT' })} />
      <Primary {...primaryProps} />

      <Target.Field.Container>
        <Target.Field.Label htmlFor="folder-name-input">
          Enter folder name:
        </Target.Field.Label>
        <Target.Field.Input
          disabled={isLoading}
          type="text"
          id="folder-name-input"
          ref={inputRef}
        />
        {fieldValidationError ? <span>{fieldValidationError}</span> : null}
        <Target.Field.Button
          onClick={() => {
            if (!inputRef.current?.value?.endsWith('/')) {
              setFieldValidationError(
                'Folder name must end with a "/" character'
              );
              return;
            }
            // clear error
            setFieldValidationError(undefined);
            setData(() => inputRef.current?.value ?? '');
          }}
        >
          Set Folder Name
        </Target.Field.Button>
      </Target.Field.Container>
    </>
  );
};
