import * as React from 'react';

import type { HubCallback } from '@aws-amplify/core';
import { Hub } from '@aws-amplify/core';
import type { AuthUser } from 'aws-amplify/auth';
import { getCurrentUser } from 'aws-amplify/auth';

export interface UseAuthResult {
  user?: AuthUser;
  isLoading: boolean;
  error?: Error;
  /** @deprecated Fetch is handled automatically, do not use this directly */
  fetch?: () => Promise<void>;
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

  /**
   * Hub events like `tokenRefresh` will not give back the user object.
   * This util will be used to get current user after those events.
   */
  const fetchCurrentUser = React.useCallback(async () => {
    setResult((prevResult) => ({ ...prevResult, isLoading: true }));

    try {
      const user = await getCurrentUser();
      setResult({ user, isLoading: false });
    } catch (e) {
      const error = e as Error;
      setResult({ error, isLoading: false });
    }
  }, []);

  const handleAuth: HubCallback = React.useCallback(
    ({ payload }) => {
      switch (payload.event) {
        // success events
        case 'signedIn':
        case 'signUp':
        case 'autoSignIn': {
          setResult({ user: payload.data as AuthUser, isLoading: false });
          break;
        }
        case 'signedOut': {
          setResult({ user: undefined, isLoading: false });
          break;
        }

        // failure events
        case 'tokenRefresh_failure':
        case 'signIn_failure': {
          setResult({ error: payload.data as Error, isLoading: false });
          break;
        }
        case 'autoSignIn_failure': {
          // autoSignIn just returns error message. Wrap it to an Error object
          setResult({ error: new Error(payload.message), isLoading: false });
          break;
        }

        // events that need another fetch
        case 'tokenRefresh': {
          fetchCurrentUser();
          break;
        }

        default: {
          // we do not handle other hub events like `configured`.
          break;
        }
      }
    },
    [fetchCurrentUser]
  );

  React.useEffect(() => {
    const unsubscribe = Hub.listen('auth', handleAuth, 'useAuth');
    fetchCurrentUser(); // on init, see if user is already logged in

    return unsubscribe;
  }, [handleAuth, fetchCurrentUser]);

  return {
    ...result,
    /** @deprecated Fetch is handled automatically, do not use this directly */
    fetch: fetchCurrentUser,
  };
};
