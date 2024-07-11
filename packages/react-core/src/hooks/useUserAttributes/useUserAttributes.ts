import { useEffect } from 'react';

import { Hub, HubCallback } from '@aws-amplify/core';

import {
  useDeleteUserAttributes,
  useFetchUserAttributes,
  useUpdateUserAttributes,
  useConfirmUserAttribute,
  useSendUserAttributeVerificationCode,
} from './constants';
import { Actions, UseActions } from './interfaces';

const useUserAttributes = <T extends keyof Actions>(
  action: T
): [state: UseActions[T][0], handleAction: UseActions[T][1]] => {
  const useDelete = useDeleteUserAttributes();
  const useFetch = useFetchUserAttributes();
  const useUpdate = useUpdateUserAttributes();
  const useConfirm = useConfirmUserAttribute();
  const useSendCode = useSendUserAttributeVerificationCode();

  const handleFetch = useFetch[1];

  useEffect(() => {
    if (action === 'fetch') {
      const fetchHub: HubCallback = ({ payload }) => {
        if (payload.event === 'FETCH_ATTRIBUTES') {
          handleFetch();
        } else {
          return;
        }
      };
      const unsubscribe = Hub.listen('ui', fetchHub);
      return unsubscribe;
    }
  }, [handleFetch, action]);

  switch (action) {
    case 'delete':
      return useDelete;
    case 'confirm':
      return useConfirm;
    case 'sendCode':
      return useSendCode;
    case 'update':
      return useUpdate;
    case 'fetch':
      return useFetch;
    default:
      throw new Error(`Invalid action: ${action}`);
  }
};

export { useUserAttributes };
