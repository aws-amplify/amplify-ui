import Auth, { CognitoUser } from '@aws-amplify/auth';
import { Hub } from '@aws-amplify/core';
import { useEffect, useState } from 'react';

// Exposes relevant CognitoUser properties
interface AuthUser extends CognitoUser {
  username: string;
  attributes: Record<string, string>;
}

export interface UseAuthResult {
  user?: AuthUser;
  isLoading: boolean;
  error?: Error;
  fetch?: () => void;
}

/**
 * Amplify Auth React hook
 * @internal
 */
export const useAuth = (): UseAuthResult => {
  const [result, setResult] = useState<UseAuthResult>({
    error: undefined,
    isLoading: true,
    user: undefined,
  });

  const handleAuth = ({ payload }) => {
    switch (payload.event) {
      case 'signIn':
        return setResult({ user: payload.data, isLoading: false });
      case 'signOut':
        return setResult({ isLoading: false });
      default:
        break;
    }
  };

  const fetch = () => {
    setResult({ isLoading: true });

    Auth.currentAuthenticatedUser()
      .then((user) => setResult({ user, isLoading: false }))
      .catch((error) => setResult({ error, isLoading: false }));

    // Handle Hub Auth events
    Hub.listen('auth', handleAuth);

    // Stop listening events on unmount
    return () => Hub.remove('auth', handleAuth);
  };

  useEffect(fetch, []);

  return { ...result, fetch };
};
