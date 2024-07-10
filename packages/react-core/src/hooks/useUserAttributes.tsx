/* eslint-disable react-hooks/rules-of-hooks */
/*
 *  This version of useUserAttributes is functional, but there are several type errors relating to the handleActions. Also, the handleActions are hardcoded.
 */

import { useEffect } from 'react';

import { Hub, HubCallback } from '@aws-amplify/core';

import useDataState from './useDataState';

import {
  DefaultAttributes,
  defaultSendUserAttributeVerificationCodeOutput,
  defaultUpdateUserAttributesOutput,
  HandlerInputs,
  StateDataTypes,
  confirmUserAttributeAction,
  deleteUserAttributesAction,
  fetchUserAttributesAction,
  sendUserAttributeVerificationCodeAction,
  updateUserAttributesAction,
  Actions,
} from './useUserAttrActionTypes';

interface ActionState<T> {
  /**
   * action data
   */
  data: T;
  /**
   * indicates whether action is running
   */
  isLoading: boolean;
  /**
   * error message
   */
  message: string | undefined;
}

// Had to disable 'rules-of-hooks' to use outside
const useDeleteUserAttributes = useDataState(
  deleteUserAttributesAction,
  undefined
);

const useUpdateUserAttributes = useDataState(
  updateUserAttributesAction,
  defaultUpdateUserAttributesOutput
);

const useConfirmUserAttribute = useDataState(
  confirmUserAttributeAction,
  undefined
);

const useSendUserVerificationCode = useDataState(
  sendUserAttributeVerificationCodeAction,
  defaultSendUserAttributeVerificationCodeOutput
);

const useFetchUserAttributes = useDataState(
  fetchUserAttributesAction,
  DefaultAttributes
);

const useUserAttributes = <T extends keyof Actions>(
  action: T
): [
  state: ActionState<StateDataTypes[T]>,
  handleAction: (...input: HandlerInputs[T][]) => void,
] => {
  const useDelete = useDeleteUserAttributes;
  const useFetch = useFetchUserAttributes;
  const useUpdate = useUpdateUserAttributes;
  const useConfirm = useConfirmUserAttribute;
  const useSendCode = useSendUserVerificationCode;

  const handleFetch = useFetch[1];

  useEffect(() => {
    if (action === 'fetch') {
      const fetchHub: HubCallback = ({ payload }) => {
        switch (payload.event) {
          case 'FETCH_ATTRIBUTES': {
            handleFetch();
            break;
          }
          default: {
            break;
          }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
