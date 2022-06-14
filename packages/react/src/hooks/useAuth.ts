import * as React from 'react';

import Auth, { CognitoUser } from '@aws-amplify/auth';
import { Hub, HubCallback } from '@aws-amplify/core';

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
  const [result, setResult] = React.useState<UseAuthResult>({
    error: undefined,
    isLoading: true,
    user: undefined,
  });

  const handleAuth: HubCallback = ({ payload }) => {
    switch (payload.event) {
      case 'signIn':
        return setResult({ user: payload.data as AuthUser, isLoading: false });
      case 'signOut':
        return setResult({ isLoading: false });
      default:
        break;
    }
  };

  const fetch = () => {
    setResult({ isLoading: true });

    Auth.currentAuthenticatedUser()
      .then((user: AuthUser) => setResult({ user, isLoading: false }))
      .catch((error: Error) => setResult({ error, isLoading: false }));

    // Handle Hub Auth events
    Hub.listen('auth', handleAuth);

    // Stop listening events on unmount
    return () => Hub.remove('auth', handleAuth);
  };

  React.useEffect(fetch, []);

  return { ...result, fetch };
};
