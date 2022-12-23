import { AmplifyUser } from '@aws-amplify/ui';
import { useState, useCallback } from 'react';

import type { DeleteUserState } from './types';
import { useAuth } from '../../../hooks/useAuth';

interface UseDeleteUserInput {
  onSuccess: () => void;
  onError: (error: Error) => void;
  handleDelete: (user: AmplifyUser) => Promise<void> | void;
}

interface UseDeleteUserOutput {
  state: DeleteUserState;
  errorMessage: string | null;
}

const useDeleteUser = ({
  onSuccess,
}: UseDeleteUserInput): UseDeleteUserOutput => {
  const [state, setState] = useState<DeleteUserState>('IDLE');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { user, isLoading } = useAuth();

  return { state, errorMessage };
};

export default useDeleteUser;
