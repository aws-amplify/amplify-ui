import React from 'react';

import { Logger } from 'aws-amplify';

import { useAuth } from '../../../internal';
import { Button, Flex } from '../../../primitives';
import { DefaultConfirmation } from './defaultComponents';
import { DeleteUserProps } from './types';

const logger = new Logger('ChangePassword');

function DeleteUser({
  onSuccess,
  onError,
}: DeleteUserProps): JSX.Element | null {
  // whether user has acknowledged account deletion prompt
  const [isConfirming, setIsConfirming] = React.useState(true);

  const { user, isLoading } = useAuth();

  const startConfirmation = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsConfirming(true);
  };

  // called when end user cancels account deletion confirmation
  const handleCancel = () => {
    event.preventDefault();
    setIsConfirming(false);
  };

  const handleDelete = () => {};

  /** Return null if Auth.getCurrentAuthenticatedUser is still in progress  */
  if (isLoading) {
    return null;
  }

  /** Return null if user isn't authenticated in the first place */
  if (!user) {
    logger.warn('<ChangePassword /> requires user to be authenticated.');
    return null;
  }

  return (
    <Flex direction="column">
      <Button disabled={isConfirming} onClick={startConfirmation}>
        Delete Account
      </Button>
      {isConfirming ? (
        <DefaultConfirmation
          onCancel={handleCancel}
          onAcknowledge={handleDelete}
        />
      ) : null}
    </Flex>
  );
}

export default DeleteUser;
