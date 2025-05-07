import React from 'react';

import { useSetUserAgent } from '@aws-amplify/ui-react-core';
import { deleteUser, getLogger } from '@aws-amplify/ui';

import { useAuth } from '../../../internal';
import { Flex } from '../../../primitives';
import { ComponentClassName } from '../constants';
import DEFAULTS from './defaults';
import type { DeleteUserProps, DeleteUserState } from './types';
import { defaultDeleteUserDisplayText } from '../utils';
import { VERSION } from '../../../version';

const logger = getLogger('AccountSettings');

function DeleteUser({
  components,
  displayText: overrideDisplayText,
  handleDelete,
  onError,
  onSuccess,
}: DeleteUserProps): React.JSX.Element | null {
  const [state, setState] = React.useState<DeleteUserState>('IDLE');
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  useSetUserAgent({
    componentName: 'DeleteUser',
    packageName: 'react',
    version: VERSION,
  });

  // translations
  const displayText = {
    ...defaultDeleteUserDisplayText,
    ...overrideDisplayText,
  };
  const { deleteAccountButtonText } = displayText;

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
    if (!user) {
      return;
    }
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

  // Return null if Auth.getgetCurrentUser is still in progress
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
        {deleteAccountButtonText}
      </DeleteButton>
      {state === 'CONFIRMATION' || state === 'DELETING' ? (
        <WarningView
          displayText={displayText}
          isDisabled={state === 'DELETING'}
          onCancel={handleCancel}
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
