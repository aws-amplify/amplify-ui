import React from 'react';

import { fetchAuthSession } from 'aws-amplify/auth';
import { Hub, HubCallback } from '@aws-amplify/core';
import { isFunction } from '@aws-amplify/ui';

export interface UseIsSignedInParams {
  onSignIn?: () => void;
  onSignOut?: () => void;
}

interface UseIsSignedIn {
  isSignedIn: boolean;
}

const INITIAL_STATE: UseIsSignedIn = { isSignedIn: false };

/**
 * listens for `Auth` sign in and sign out events
 *
 * @param {UseIsSignedInParams} params `onSignIn` and `onSignOut` event callbacks
 * @returns {UseIsSignedIn} Outputs `isSignedIn`
 */
export default function useIsSignedIn({
  onSignIn,
  onSignOut,
}: UseIsSignedInParams): UseIsSignedIn {
  const [output, setOutput] = React.useState<UseIsSignedIn>(
    () => INITIAL_STATE
  );

  React.useEffect(() => {
    fetchAuthSession().then(() => {
      if (isFunction(onSignIn)) onSignIn();
    });
  }, [onSignIn]);

  const handleEvent: HubCallback = React.useCallback(
    ({ payload }) => {
      switch (payload.event) {
        case 'signedIn':
        case 'autoSignIn': {
          if (isFunction(onSignIn)) {
            onSignIn();
          }
          setOutput({ isSignedIn: true });
          break;
        }
        case 'signedOut': {
          if (isFunction(onSignOut)) {
            onSignOut();
          }
          setOutput({ isSignedIn: false });
          break;
        }
        default: {
          break;
        }
      }
    },
    [onSignIn, onSignOut]
  );

  React.useEffect(() => {
    const unsubscribe = Hub.listen('auth', handleEvent, 'useIsSignedIn');

    return unsubscribe;
  }, [handleEvent]);

  return output;
}
