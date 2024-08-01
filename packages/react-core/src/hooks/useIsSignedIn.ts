import { getCurrentUser } from 'aws-amplify/auth';
import { Hub, HubCallback } from '@aws-amplify/core';
import { useEffect } from 'react';
import useDataState, { DataState } from './useDataState';

const action = async (
  _: { isSignedIn: boolean },
  input: { setState?: boolean }
) => {
  try {
    await getCurrentUser();
    return { isSignedIn: true };
  } catch (error) {
    if (input?.setState) {
      return { isSignedIn: false };
    }
    throw error;
  }
};

export default function useIsSignedIn(): DataState<{ isSignedIn: boolean }> {
  const [state, handler] = useDataState(action, { isSignedIn: false });

  useEffect(() => {
    handler();

    const listener: HubCallback = ({ payload }) => {
      if (payload.event === 'signedIn') {
        handler();
      } else if (payload.event === 'signedOut') {
        handler({ setState: true });
        handler();
      }
    };

    const unmount = Hub.listen('auth', listener);

    return () => {
      unmount();
    };
  }, [handler]);

  return state;
}
