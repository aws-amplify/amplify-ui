import React from 'react';

import {
  AuthMachineState,
  getServiceFacade,
  AuthenticatorServiceFacade,
} from '@aws-amplify/ui';
import { useSelector } from '@xstate/react';

import { AuthenticatorContext } from '../../context';

import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';

import { Selector, UseAuthenticator } from './types';

function isEmptyObj<T>(val: T): boolean {
  return isObject(val) && isEmpty(val);
}

function isEmptyArr<T>(val: T): boolean {
  return isArray(val) && isEmpty(val);
}

/**
 * Does a comparison of each array value, plus a value equality check for empty
 * objects and arrays.
 */
export const areArrayValuesEqual = (
  arr1: unknown[],
  arr2: unknown[]
): boolean => {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((elem1, index) => {
    const elem2 = arr2[index];
    /**
     * edge cases: if both values are empty object/array, we consider them equal.
     * These can catch empty default values (`[]`, `{}`) that unintentionally point
     * to different refernces.
     *
     * We can consider doing a deep comparison, but left it here for efficiency
     * + practicality for authenticator state comparison purposes.
     */
    if (isEmptyArr(elem1) && isEmptyArr(elem2)) return true;
    if (isEmptyObj(elem1) && isEmptyObj(elem2)) return true;

    return elem1 === elem2;
  });
};

const useAuthenticatorService = () =>
  React.useContext(AuthenticatorContext)?.service;

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/connected-components/authenticator/headless#useauthenticator-hook)
 */
export default function useAuthenticator(
  selector?: Selector
): UseAuthenticator {
  const service = useAuthenticatorService();

  if (!service) {
    throw new Error(
      'Please ensure you wrap your App with `Authenticator.Provider`.\nSee the `useAuthenticator` section on https://ui.docs.amplify.aws/connected-components/authenticator.'
    );
  }

  const { send } = service;

  const getFacade = React.useCallback(
    (state: AuthMachineState) => ({ ...getServiceFacade({ send, state }) }),
    [send]
  );

  /**
   * For `useSelector`'s selector argument, we transform `state` into
   * public facade values using `getFacade`.
   *
   * This is to hide the internal xstate implementation details to customers.
   */
  const xstateSelector = (state: AuthMachineState) => getFacade(state);

  /**
   * comparator decides whether or not the new authState should trigger a
   * re-render. Does a deep equality check.
   */
  const comparator = (
    prevFacade: AuthenticatorServiceFacade,
    nextFacade: AuthenticatorServiceFacade
  ) => {
    if (!selector) return false;

    /**
     * Apply the passed in `selector` to get the value of their desired
     * dependency array.
     */
    const prevDepsArray = selector(prevFacade);
    const nextDepsArray = selector(nextFacade);

    // Shallow compare the array values
    // TODO: is there a reason to compare deep at the cost of expensive comparisons?
    return areArrayValuesEqual(prevDepsArray, nextDepsArray);
  };

  const facade = useSelector(service, xstateSelector, comparator);

  return {
    ...facade,
    /** @deprecated For internal use only */
    _state: service.getSnapshot(),
    /** @deprecated For internal use only */
    _send: send,
  };
}
