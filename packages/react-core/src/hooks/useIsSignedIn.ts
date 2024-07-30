import { getCurrentUser } from 'aws-amplify/auth';
import { Hub, HubCallback } from '@aws-amplify/core';
import { useEffect, useState } from 'react';
import useDataState, { DataState } from './useDataState';

const action = async (_: { isSignedIn: boolean }, __: undefined) => {
  await getCurrentUser();
  return { isSignedIn: true };
};

const defaultState: DataState<{ isSignedIn: boolean }> = {
  hasError: false,
  isLoading: false,
  message: undefined,
  data: { isSignedIn: false },
};

export default function useIsSignedIn(): DataState<{ isSignedIn: boolean }> {
  const [state, handler] = useDataState(action, { isSignedIn: false });
  const [effectState, setEffectState] =
    useState<DataState<{ isSignedIn: boolean }>>(state);

  useEffect(() => {
    setEffectState(state);
  }, [state]);

  useEffect(() => {
    handler();

    const listener: HubCallback = ({ payload }) => {
      if (payload.event === 'signedIn') {
        setEffectState({ ...defaultState, data: { isSignedIn: true } });
      } else if (payload.event === 'signedOut') {
        setEffectState(defaultState);
      }
    };

    const unmount = Hub.listen('auth', listener);

    return () => {
      unmount();
    };
  }, [handler]);

  return effectState;
}
