import { useEffect } from 'react';

import { Hub, HubCallback } from '@aws-amplify/core';

import { useFetchUserAttributes } from './constants';
import { Actions } from './constants';
import { UseFetchUserAttributes } from './types';

const useUserAttributesFetch = <T extends keyof Actions>(
  action: T
): [
  state: UseFetchUserAttributes[0],
  handleAction: UseFetchUserAttributes[1],
] => {
  const useFetch = useFetchUserAttributes();

  useEffect(() => {
    const fetchHub: HubCallback = ({ payload }) => {
      if (payload.event === 'FETCH_ATTRIBUTES') {
        useFetch[1]();
      } else {
        return;
      }
    };
    const unsubscribe = Hub.listen('ui', fetchHub);
    return unsubscribe;
  }, [useFetch, action]);

  if (action === 'fetch') {
    return useFetch;
  } else {
    throw new Error(`Invalid action: ${String(action)}`);
  }
};

export { useUserAttributesFetch };
