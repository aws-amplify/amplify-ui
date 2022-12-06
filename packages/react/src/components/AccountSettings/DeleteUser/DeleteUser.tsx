import React from 'react';

import { deleteUser, translate, getLogger } from '@aws-amplify/ui';

import { useAuth } from '../../../internal';
import { Flex } from '../../../primitives';
import { ComponentClassName } from '../constants';
import DEFAULTS from './defaults';
import { DeleteUserProps, DeleteUserState } from './types';

const logger = getLogger('Auth');

function DeleteUser({
  components,
  onSuccess,
  onError,
  handleDelete,
}: DeleteUserProps): JSX.Element | null {
  const [state, setState] = React.useState<DeleteUserState>('IDLE');
  const [errorMessage, setErrorMessage] = React.useState<string>(null);

  // translations
  const deleteAccountText = translate('Delete Account');

  const { user, isLoading } = useAuth();

  // subcomponents
  const { ErrorMessage, DeleteButton, WarningView } = React.useMemo(
    () => ({ ...DEFAULTS, ...(components ?? {}) }),
    [components]
  );

  const startConfirmation = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setState('CONFIRMATION');
  };

  const runDeleteUser = React.useCallback(async () => {
    setState('DELETING');
    if (errorMessage) {
      setErrorMessage(null);
    }

    try {
      if (handleDelete) {
        /*
         * run custom delete handler, if provided. We pass `user` so that
         * developer can do whichever cleanup with the user object they wish.
         */
        await handleDelete(user);
      } else {
        // else, run default deleteUser function.
        await deleteUser();
      }
      setState('DONE');
      onSuccess?.();
    } catch (e) {
      const error = e as Error;
      setState('ERROR');
      setErrorMessage(error.message);
      onError?.(error);
    }
  }, [errorMessage, handleDelete, onError, onSuccess, user]);

  // called when end user cancels account deletion confirmation
  const handleCancel = React.useCallback(() => {
    setState('IDLE');
  }, []);

  const handleConfirmDelete = React.useCallback(() => {
    runDeleteUser();
  }, [runDeleteUser]);

  // Return null if Auth.getCurrentAuthenticatedUser is still in progress
  if (isLoading) {
    return null;
  }

  // Return null if user isn't authenticated
  if (!user) {
    logger.warn('<DeleteUser /> requires user to be authenticated.');
    return null;
  }

  // Return null if delete user was successful
  if (state === 'DONE') {
    return null;
  }

  return (
    <Flex className={ComponentClassName.DeleteUser} direction="column">
      <DeleteButton
        isDisabled={state === 'CONFIRMATION' || state === 'DELETING'}
        onClick={startConfirmation}
      >
        {deleteAccountText}
      </DeleteButton>
      {state === 'CONFIRMATION' || state === 'DELETING' ? (
        <WarningView
          onCancel={handleCancel}
          isDisabled={state === 'DELETING'}
          onConfirm={handleConfirmDelete}
        />
      ) : null}
      {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
    </Flex>
  );
}

DeleteUser.ErrorMessage = DEFAULTS.ErrorMessage;
DeleteUser.DeleteButton = DEFAULTS.DeleteButton;
DeleteUser.WarningView = DEFAULTS.WarningView;

export default DeleteUser;
