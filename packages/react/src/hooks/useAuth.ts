import Auth, { CognitoUser } from '@aws-amplify/auth';
import { Hub } from '@aws-amplify/core';
import { useEffect, useState } from 'react';

// Exposes relevant CognitoUser properties
interface AuthUser extends CognitoUser {
  username: string;
  attributes: Record<string, string>;
}

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser>();
  const [error, setError] = useState<Error>();
  const [isLoading, setLoading] = useState<boolean>(true);

  const handleUser = (user: AuthUser | undefined) => {
    if (typeof user === 'undefined') {
      setError(new Error('Current authenticated user is not available'));
    } else {
      setUser(user);
    }
  };

  const handleAuth = ({ payload }) => {
    switch (payload.event) {
      case 'signIn':
        return handleUser(payload.data);
      case 'signOut':
        return handleUser(undefined);
      default:
        break;
    }
  };

  const fetch = () => {
    Auth.currentAuthenticatedUser()
      .then(handleUser)
      .catch(setError)
      .finally(() => setLoading(false));

    // Handle Hub Auth events
    Hub.listen('auth', handleAuth);

    // Stop listening events on unmount
    return () => Hub.remove('auth', handleAuth);
  };

  useEffect(fetch, []);

  return {
    user,
    isLoading,
    fetch,
    error,
  };
};
