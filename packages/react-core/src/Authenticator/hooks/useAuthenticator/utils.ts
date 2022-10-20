import { Auth } from 'aws-amplify';
import {
  AmplifyUser,
  AuthenticatorRoute,
  AuthMachineState,
  FormFieldsArray,
  getSortedFormFields,
} from '@aws-amplify/ui';

import { areEmptyArrays, areEmptyObjects } from '../../../utils';

import { COMPONENT_ROUTE_KEYS } from './constants';
import {
  AuthenticatorRouteComponentKey,
  AuthenticatorLegacyFields,
  Comparator,
  Selector,
} from './types';

export const defaultComparator = (): false => false;

/**
 * Does an ordering and shallow comparison of each array value,
 * plus a value equality check for empty objects and arrays.
 */
export function areSelectorDepsEqual<T>(
  currentDeps: T[],
  nextDeps: T[]
): boolean {
  if (currentDeps.length !== nextDeps.length) {
    return false;
  }
  return currentDeps.every((currentDep, index) => {
    const nextDep = nextDeps[index];

    if (
      areEmptyArrays(currentDep, nextDep) ||
      areEmptyObjects(currentDep, nextDep)
    ) {
      return true;
    }

    return currentDep === nextDep;
  });
}

export const getComparator =
  (selector: Selector): Comparator =>
  (currentFacade, nextFacade) => {
    const currentSelectorDeps = selector(currentFacade);
    const nextSelectorDeps = selector(nextFacade);

    // Shallow compare the array values
    return areSelectorDepsEqual(currentSelectorDeps, nextSelectorDeps);
  };

export const getTotpSecretCodeCallback = (user: AmplifyUser) =>
  async function getTotpSecretCode(): Promise<string> {
    return await Auth.setupTOTP(user);
  };

export const isComponentRouteKey = (
  route: AuthenticatorRoute
): route is AuthenticatorRouteComponentKey =>
  COMPONENT_ROUTE_KEYS.some((componentRoute) => componentRoute === route);

const flattenFormFields = (
  fields: FormFieldsArray
): AuthenticatorLegacyFields =>
  fields.flatMap(([name, options]) => ({ name, ...options }));

/**
 * Retrieves legacy form field values from state machine for routes that have fields
 */
export const getLegacyFields = (
  route: AuthenticatorRoute,
  state: AuthMachineState
): AuthenticatorLegacyFields =>
  // verifyUser is a component route, but does not have form fields
  isComponentRouteKey(route) && route !== 'verifyUser'
    ? flattenFormFields(getSortedFormFields(route, state))
    : [];
