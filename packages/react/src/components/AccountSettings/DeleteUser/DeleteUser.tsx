import React from 'react';

import { Logger } from 'aws-amplify';
import { deleteUser } from '@aws-amplify/ui';

import { useAuth } from '../../../internal';
import { Button, Flex } from '../../../primitives';
import { DefaultConfirmation } from './defaultComponents';
import { DeleteUserProps, DeleteUserState } from './types';

const logger = new Logger('ChangePassword');

function DeleteUser({
  onSuccess,
  onError,
  handleDelete,
}: DeleteUserProps): JSX.Element | null {
  // whether user has opened confirmation prompt
  const [state, setState] = React.useState<DeleteUserState>('IDLE');

  const { user, isLoading } = useAuth();

  const startConfirmation = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setState('IS_CONFIRMING');
  };

  const runDeleteUser = React.useCallback(async () => {
    setState('IN_PROGRESS');
    try {
      if (handleDelete) {
        await handleDelete(user);
      } else {
        await deleteUser();
      }
      setState('DONE');
      onSuccess?.();
    } catch (e) {
      const error = e as Error;
      setState('IDLE');
      onError?.(error);
    }
  }, [handleDelete, onError, onSuccess, user]);

  // called when end user cancels account deletion confirmation
  const handleCancel = React.useCallback(() => {
    setState('IDLE');
  }, []);

  const handleConfirmDelete = React.useCallback(() => {
    runDeleteUser();
  }, [runDeleteUser]);

  /** Return null if Auth.getCurrentAuthenticatedUser is still in progress  */
  if (isLoading) {
    return null;
  }

  /** Return null if user isn't authenticated in the first place */
  if (!user) {
    logger.warn('<DeleteUser /> requires user to be authenticated.');
    return null;
  }

  // return null if delete user was successful
  if (state === 'DONE') {
    return null;
  }

  return (
    <Flex direction="column">
      <Button disabled={state === 'IS_CONFIRMING'} onClick={startConfirmation}>
        Delete Account
      </Button>
      {state === 'IS_CONFIRMING' ? (
        <DefaultConfirmation
          onCancel={handleCancel}
          onConfirmDelete={handleConfirmDelete}
        />
      ) : null}
    </Flex>
  );
}

export default DeleteUser;
