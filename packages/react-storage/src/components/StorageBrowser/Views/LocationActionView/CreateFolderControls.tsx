import React from 'react';

import { useAction } from '../../context/actions';
import { useControl } from '../../context/controls';

import { Controls } from '../Controls';
import { Primary, Title, Navigate } from './Controls';

const { Target } = Controls;

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
    children: 'Start',
    disabled: !data.length,
  };

  if (result?.status === 'SUCCESS') {
    primaryProps = {
      onClick: () => {
        handleUpdateState({ type: 'EXIT' });
      },
      children: 'Done',
      disabled: false,
    };
  }

  return (
    <>
      <Navigate />
      <Title />
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
      <Primary {...primaryProps} />
    </>
  );
};
