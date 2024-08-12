import { getCurrentUser } from 'aws-amplify/auth';
import { Hub, HubCallback } from '@aws-amplify/core';
import { useEffect } from 'react';
import useDataState, { DataState } from './useDataState';

const action = async (_: boolean, input: { setState?: boolean }) => {
  try {
    await getCurrentUser();
    return true;
  } catch (error) {
    if (input?.setState) {
      return false;
    }
    throw error;
  }
};

export default function useIsSignedIn(): DataState<boolean> {
  const [state, handler] = useDataState(action, false);

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
