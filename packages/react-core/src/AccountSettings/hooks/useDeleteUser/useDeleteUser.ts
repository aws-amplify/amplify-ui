import { useState, useCallback } from 'react';
import type { MouseEvent } from 'react';

import { AmplifyUser, deleteUser } from '@aws-amplify/ui';

import useAuth from '../../../hooks/useAuth';
import type { DeleteUserState } from './types';

interface UseDeleteUserInput {
  onSuccess: () => void;
  onError: (error: Error) => void;
  handleDelete: (user: AmplifyUser) => Promise<void> | void;
}

interface UseDeleteUserOutput {
  state: DeleteUserState;
  errorMessage: string | null;
  user: AmplifyUser | undefined;
  isLoading: boolean;
  startConfirmation: (event: MouseEvent<HTMLButtonElement>) => void;
  handleCancel: () => void;
  handleConfirmDelete: () => void;
}

const useDeleteUser = ({
  onSuccess,
  onError,
  handleDelete,
}: UseDeleteUserInput): UseDeleteUserOutput => {
  const [state, setState] = useState<DeleteUserState>('IDLE');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { user, isLoading } = useAuth();

  const startConfirmation = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setState('CONFIRMATION');
  };

  const runDeleteUser = useCallback(async () => {
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

  const handleCancel = useCallback(() => {
    setState('IDLE');
  }, []);

  const handleConfirmDelete = useCallback(() => {
    runDeleteUser();
  }, [runDeleteUser]);

  return {
    state,
    errorMessage,
    user,
    isLoading,
    startConfirmation,
    handleCancel,
    handleConfirmDelete,
  };
};

export default useDeleteUser;
