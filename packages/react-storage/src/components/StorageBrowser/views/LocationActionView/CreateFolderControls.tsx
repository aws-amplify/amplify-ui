import React from 'react';
import { isFunction, isUndefined } from '@aws-amplify/ui';

import { LocationData } from '../../actions';
import { Field } from '../../components/Field';
import { useAction } from '../../do-not-import-from-here/actions';
import { SpanElement, ViewElement } from '../../context/elements';
import { useStore } from '../../providers/store';

import { Controls } from '../Controls';

import { Title } from './Controls/Title';
import { ActionStartControl } from '../../controls/ActionStartControl';
import { ControlsContext } from '../../controls/types';
import { ControlsContextProvider } from '../../controls/context';
import { CLASS_BASE } from '../constants';

const { Exit, Message } = Controls;

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
  ] = useAction('CREATE_FOLDER');

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

export const CreateFolderControls = ({
  onExit,
}: {
  onExit?: (location: LocationData) => void;
}): React.JSX.Element => {
  const [{ location }, dipatchStoreAction] = useStore();
  const { current, key } = location;

  const { prefix } = current ?? {};
  const hasInvalidPrefix = isUndefined(prefix);

  const [{ isLoading, data }, handleCreateAction] = useAction('CREATE_FOLDER');
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
    if (hasInvalidPrefix) return;
    const folderPrefix = `${key}${folderName}/`;
    handleCreateAction({ prefix: folderPrefix });
  };

  const handleClose = () => {
    if (isFunction(onExit)) onExit(current!);
    dipatchStoreAction({ type: 'RESET_ACTION_TYPE' });
    // reset hook state on exit, use empty string for prefix to keep TS happy
    // @todo: this needs to be addressed
    handleCreateAction({ prefix: '', options: { reset: true } });
  };

  const hasCompletedStatus = result?.status === 'COMPLETE';

  // FIXME: Eventually comes from useView hook
  const contextValue: ControlsContext = {
    data: {
      actionStartLabel: hasCompletedStatus ? 'Folder created' : 'Create Folder',
      isActionStartDisabled: !hasCompletedStatus
        ? !folderName || !!fieldValidationError
        : undefined,
    },
    actionsConfig: {
      type: 'SINGLE_ACTION',
      isCancelable: true,
    },
    onActionStart: hasCompletedStatus ? handleClose : handleCreateFolder,
  };

  return (
    <ControlsContextProvider {...contextValue}>
      <ViewElement className={`amplify-${CLASS_BASE}__navigation`}>
        <Exit
          onClick={() => {
            handleClose();
          }}
        />
      </ViewElement>
      <Title />

      <Field
        label="Enter folder name:"
        disabled={isLoading || !!result?.status}
        aria-invalid={fieldValidationError ? 'true' : undefined}
        aria-describedby="fieldError"
        type="text"
        id="folder-name-input"
        onBlur={handleBlur}
        onChange={handleChange}
      >
        {fieldValidationError ? (
          <SpanElement id={'fieldError'} variant="field-error">
            {fieldValidationError}
          </SpanElement>
        ) : null}
      </Field>

      <ViewElement className={`amplify-${CLASS_BASE}__action__footer`}>
        <ViewElement className={`amplify-${CLASS_BASE}__action__message`}>
          {result?.status === 'COMPLETE' || result?.status === 'FAILED' ? (
            <CreateFolderMessage />
          ) : null}
        </ViewElement>
        <ViewElement className={`amplify-${CLASS_BASE}__action__buttons`}>
          <ActionStartControl
            className={`amplify-${CLASS_BASE}__action__start`}
          />
        </ViewElement>
      </ViewElement>
    </ControlsContextProvider>
  );
};
