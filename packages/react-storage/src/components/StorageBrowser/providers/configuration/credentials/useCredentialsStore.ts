import React from 'react';

import {
  createLocationCredentialsStore,
  GetLocationCredentials,
} from '../../../storage-internal';

import { isFunction } from '@aws-amplify/ui';

import {
  CreateCredentialsStoreInput,
  CredentialsStore,
  RegisterAuthListener,
} from './types';

const createCredentialsStore = ({
  ...input
}: CreateCredentialsStoreInput): CredentialsStore => {
  const { destroy, getProvider } = createLocationCredentialsStore(input);
  return {
    destroy,
    getCredentials: ({ bucket, permission, prefix }) =>
      getProvider({ scope: `s3://${bucket}/${prefix}*`, permission }),
  };
};

const isCredentialsStore = (
  value?: CredentialsStore
): value is CredentialsStore => isFunction(value?.getCredentials);

export function useCredentialsStore({
  getLocationCredentials: handler,
  initialValue,
  onDestroy,
  registerAuthListener,
}: {
  getLocationCredentials: GetLocationCredentials;
  initialValue?: CredentialsStore;
  onDestroy?: () => void;
  registerAuthListener: RegisterAuthListener;
}): CredentialsStore {
  const hasExistingStore = isCredentialsStore(initialValue);
  const [store, setStore] = React.useState(() =>
    hasExistingStore ? initialValue : createCredentialsStore({ handler })
  );

  const { destroy } = store;

  React.useEffect(() => {
    if (hasExistingStore) {
      return;
    }

    const handleAuthStatusChange = () => {
      destroy();

      if (isFunction(onDestroy)) {
        onDestroy();
      }

      setStore(createCredentialsStore({ handler }));
    };

    // provide `handleAuthStatusChange` to consumer
    registerAuthListener(handleAuthStatusChange);
  }, [destroy, handler, hasExistingStore, onDestroy, registerAuthListener]);

  return store;
}
