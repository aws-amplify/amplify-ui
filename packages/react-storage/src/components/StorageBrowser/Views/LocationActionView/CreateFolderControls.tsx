import React from 'react';

import { useAction } from '../../context/actions';
import { useControl } from '../../context/controls';
import { Controls } from '../Controls';
import { Title } from './Controls/Title';

const { Exit, Message, Primary, Target } = Controls;

export const isValidFolderName = (name: string | undefined): boolean =>
  !!name?.length && !name.includes('/');

export const FIELD_VALIDATION_MESSAGE =
  'Folder name must be at least one character and cannot contain a "/".';
export const RESULT_COMPLETE_MESSAGE = 'Folder created.';
export const RESULT_FAILED_MESSAGE = 'There was an issue creating the folder.';

export const CreateFolderMessage = (): React.JSX.Element | null => {
  const [
    {
      data: { result },
    },
  ] = useAction({
    type: 'CREATE_FOLDER',
  });

  switch (result?.status) {
    case 'COMPLETE':
      return <Message variant="success">{RESULT_COMPLETE_MESSAGE}</Message>;
    case 'FAILED':
      return (
        <Message variant="error">
          {result.message ? result.message : RESULT_FAILED_MESSAGE}
        </Message>
      );
    default:
      return null;
  }
};

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
      <Exit
        onClick={() => {
          handleClose();
        }}
      />
      <Title />
      <Primary {...primaryProps} />
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
      {result?.status === 'COMPLETE' || result?.status === 'FAILED' ? (
        <CreateFolderMessage />
      ) : null}
    </>
  );
};
