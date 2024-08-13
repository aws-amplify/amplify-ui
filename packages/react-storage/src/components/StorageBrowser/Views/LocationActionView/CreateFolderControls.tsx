import React from 'react';

import { useAction } from '../../context/actions';
import { useControl } from '../../context/controls';

import { Controls } from '../Controls';
import { Title } from './Controls';

const { Exit, Message, Primary, Target } = Controls;

export const isValidFolderName = (name: string | undefined): boolean => {
  return name !== undefined && name.length > 1 && name.endsWith('/');
};

export const FIELD_VALIDATION_MESSAGE =
  'Folder name must be at least one character and end with a "/"';

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

  const handleFieldValidation = () => {
    if (!isValidFolderName(inputRef.current?.value)) {
      setFieldValidationError(FIELD_VALIDATION_MESSAGE);
      return;
    }
    // clear error
    setFieldValidationError(undefined);
    setData(() => inputRef.current?.value ?? '');
  };

  const handleCreateFolder = (prefix: string) => {
    if (isValidFolderName(data)) {
      setFieldValidationError(undefined);
      handleCreateAction({ prefix });
    } else {
      setFieldValidationError(FIELD_VALIDATION_MESSAGE);
    }
  };

  const prefix = `${history.join('')}${data}`;

  let primaryProps = {
    onClick: () => {
      handleCreateFolder(prefix);
    },
    children: 'Create folder',
    disabled: false,
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
      {result?.status === 'SUCCESS' ? (
        <Message variant="success">Folder created.</Message>
      ) : null}
      <Target.Field.Container>
        <Target.Field.Label htmlFor="folder-name-input">
          Enter folder name:
        </Target.Field.Label>
        <Target.Field.Input
          disabled={isLoading}
          aria-invalid={fieldValidationError ? 'true' : undefined}
          aria-describedby="fieldError"
          type="text"
          id="folder-name-input"
          onBlur={handleFieldValidation}
          onFocus={() => setFieldValidationError(undefined)}
          ref={inputRef}
        />
        {fieldValidationError ? (
          <Target.Field.Error id="fieldError">
            {fieldValidationError}
          </Target.Field.Error>
        ) : null}
      </Target.Field.Container>
      <Primary {...primaryProps} />
    </>
  );
};
