import React from 'react';
import {
  GetLocationCredentials,
  LocationCredentialsStore,
} from '../credentials/types';
import { createLocationCredentialsStore } from '../credentials/store';

export type RegisterAuthListener = (onStateChange: () => void) => void;
export type GetCredentialsProvider = LocationCredentialsStore['getProvider'];

export function useGetCredentialsProvider(
  handler: GetLocationCredentials,
  registerAuthListener: RegisterAuthListener,
  options?: { onDestroy?: () => void }
): GetCredentialsProvider {
  const [{ destroy, getProvider }, setStore] = React.useState(() =>
    createLocationCredentialsStore({ handler })
  );

  const { onDestroy } = options ?? {};

  React.useEffect(() => {
    const handleAuthStatusChange = () => {
      destroy();
      if (typeof onDestroy === 'function') onDestroy();

      setStore(createLocationCredentialsStore({ handler }));
    };

    registerAuthListener(handleAuthStatusChange);
  }, [destroy, handler, onDestroy, registerAuthListener]);

  return getProvider;
}
