/*
 *  This version of useUserAttributes has individual hook declarations for each action. The return types are working properly.
 */

import { useEffect } from 'react';

import { Hub, HubCallback } from '@aws-amplify/core';

import {
  Actions,
  UseActions,
  useConfirmUserAttribute,
  useDeleteUserAttributes,
  useFetchUserAttributes,
  useSendUserAttributeVerificationCode,
  useUpdateUserAttributes,
} from './useUserAttrActionTypes';

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
        switch (payload.event) {
          case 'FETCH_ATTRIBUTES': {
            handleFetch(null);
            break;
          }
          default: {
            break;
          }
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
    case 'sendVerificationCode':
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
