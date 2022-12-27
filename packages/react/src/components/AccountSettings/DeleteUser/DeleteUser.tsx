import React from 'react';

import { translate, getLogger } from '@aws-amplify/ui';
import { useAuth, useDeleteUser } from '@aws-amplify/ui-react-core';

import { Flex } from '../../../primitives';
import { ComponentClassName } from '../types';
import DEFAULTS from './defaults';
import { DeleteUserProps } from './types';

const logger = getLogger('Auth');

function DeleteUser({
  components,
  onSuccess,
  onError,
  handleDelete,
}: DeleteUserProps): JSX.Element | null {
  const {
    state,
    errorMessage,
    user,
    isLoading,
    startConfirmation,
    handleCancel,
    handleConfirmDelete,
  } = useDeleteUser({
    onSuccess,
    onError,
    handleDelete,
  });

  // translations
  const deleteAccountText = translate('Delete Account');

  // subcomponents
  const { ErrorMessage, DeleteButton, WarningView } = React.useMemo(
    () => ({ ...DEFAULTS, ...(components ?? {}) }),
    [components]
  );

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
