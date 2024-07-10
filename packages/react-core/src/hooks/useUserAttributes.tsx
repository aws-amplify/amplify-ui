/*
 *  This version of useUserAttributes is functional, but there are several type errors relating to the handleActions. Also, the handleActions are hardcoded.
 */

import React from 'react';

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

const useUserAttributes = <T extends keyof Actions>(
  action: T
): [
  state: ActionState<StateDataTypes[T]>,
  handleAction: (...input: HandlerInputs[T][]) => void,
] => {
  const [deleteState, handleDelete] = useDataState(
    deleteUserAttributesAction,
    undefined
  );
  const [updateState, handleUpdate] = useDataState(
    updateUserAttributesAction,
    defaultUpdateUserAttributesOutput
  );
  const [confirmState, handleConfirm] = useDataState(
    confirmUserAttributeAction,
    undefined
  );
  const [sendVerificationCodeState, handleSendVerificationCode] = useDataState(
    sendUserAttributeVerificationCodeAction,
    defaultSendUserAttributeVerificationCodeOutput
  );
  const [fetchState, handleFetch] = useDataState(
    fetchUserAttributesAction,
    DefaultAttributes
  );

  const fetchHub: HubCallback = React.useCallback(({ payload }) => {
    switch (payload.event) {
      // success events
      case 'FETCH_ATTRIBUTES': {
        handleFetch();
        break;
      }
      default: {
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (action === 'fetch') {
      const unsubscribe = Hub.listen('ui', fetchHub);
      return unsubscribe;
    }
  }, [fetchHub, handleFetch, action]);

  switch (action) {
    case 'delete':
      return [deleteState, handleDelete];
    case 'confirm':
      return [confirmState, handleConfirm];
    case 'sendVerificationCode':
      return [sendVerificationCodeState, handleSendVerificationCode];
    case 'update':
      return [updateState, handleUpdate];
    case 'fetch':
      return [fetchState, handleFetch];
    default:
      throw new Error(`Invalid action: ${action}`);
  }
};

export { useUserAttributes };
