import React from 'react';

import { useAction } from '../../context/actions';
import { useControl } from '../../context/controls';

import { Controls } from '../Controls';
import { Title } from './Controls/Title';

const { Exit, Message, Primary, Target } = Controls;

export const isValidFolderName = (name: string | undefined): boolean =>
  !!name?.length && !name.includes('/');

export const FIELD_VALIDATION_MESSAGE =
  'Folder name must be at least one character and cannot contain a "/"';

export const CreateFolderControls = (): React.JSX.Element => {
  const [, handleUpdateState] = useControl({ type: 'ACTION_SELECT' });

  const [{ path }] = useControl({ type: 'NAVIGATE' });
  const [{ isLoading, data }, handleCreateAction] = useAction({
    type: 'CREATE_FOLDER',
  });
  const { result } = data;

  const [folderName, setFolderName] = React.useState('');
  const [fieldValidationError, setFieldValidationError] = React.useState<
    string | undefined
  >();

  const handleBlur = () => {
    if (!isValidFolderName(folderName)) {
      setFieldValidationError(FIELD_VALIDATION_MESSAGE);
    }
  };

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    // validate on change if validation error is present
    if (fieldValidationError && isValidFolderName(target.value)) {
      setFieldValidationError(undefined);
    }
    setFolderName(target.value);
  };

  const handleCreateFolder = () => {
    const prefix = `${path}${folderName}/`;
    handleCreateAction({ prefix });
  };

  const handleClose = () => {
    handleUpdateState({ type: 'CLEAR' });
    // reset hook state on exit, use empty string for prefix to keep TS happy
    handleCreateAction({ prefix: '', options: { reset: true } });
  };

  const primaryProps =
    result?.status === 'COMPLETE'
      ? {
          onClick: () => {
            handleClose();
          },
          children: 'Folder created',
        }
      : {
          onClick: () => {
            handleCreateFolder();
          },
          children: 'Create Folder',
          disabled: !folderName || !!fieldValidationError,
        };

  return (
    <>
      <Title />
      <Exit
        onClick={() => {
          handleClose();
        }}
      />
      {result?.status === 'COMPLETE' ? (
        <Message variant="success">Folder created.</Message>
      ) : null}
      <Target.Field.Container>
        <Target.Field.Label htmlFor="folder-name-input">
          Enter folder name:
        </Target.Field.Label>
        <Target.Field.Input
          disabled={isLoading || !!result?.status}
          aria-invalid={fieldValidationError ? 'true' : undefined}
          aria-describedby="fieldError"
          type="text"
          id="folder-name-input"
          onBlur={handleBlur}
          onChange={handleChange}
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
