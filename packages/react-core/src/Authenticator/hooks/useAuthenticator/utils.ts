import { Auth } from 'aws-amplify';
import {
  AmplifyUser,
  AuthenticatorRoute,
  AuthMachineState,
  FormFieldsArray,
  getSortedFormFields,
  UnverifiedContactMethods,
  getActorContext,
} from '@aws-amplify/ui';
import isString from 'lodash/isString';

import { areEmptyArrays, areEmptyObjects } from '../../../utils';
import { AuthenticatorLegacyField, AuthenticatorLegacyFields } from '../types';
import { isComponentRouteKey } from '../utils';

import { Comparator, UseAuthenticatorSelector } from './types';

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
  (selector: UseAuthenticatorSelector): Comparator =>
  (currentFacade, nextFacade) => {
    const currentSelectorDeps = selector(currentFacade);
    const nextSelectorDeps = selector(nextFacade);

    // Shallow compare the array values
    return areSelectorDepsEqual(currentSelectorDeps, nextSelectorDeps);
  };

export const getQRFields = (
  state: AuthMachineState
): { totpIssuer?: string; totpUsername?: string } => {
  const fields = getActorContext(state);

  const QR = fields?.formFields?.setupTOTP?.QR ?? {};

  return { ...QR };
};

export const getTotpSecretCodeCallback = (user: AmplifyUser) =>
  async function getTotpSecretCode(): Promise<string> {
    return await Auth.setupTOTP(user);
  };

const flattenFormFields = (
  fields: FormFieldsArray
): AuthenticatorLegacyFields =>
  fields.flatMap(([name, options]) => ({ name, ...options }));

const convertContactMethodsToFields = (
  unverifiedContactMethods: UnverifiedContactMethods
): AuthenticatorLegacyFields => {
  return (
    unverifiedContactMethods &&
    Object.entries(unverifiedContactMethods).map(([name, value]) => {
      const valueIsString = isString(value);
      if (!valueIsString || !name) {
        return {} as AuthenticatorLegacyField;
      }
      return { name, label: value, type: 'radio', value };
    })
  );
};

/**
 * Retrieves default and custom (RWA only, to be updated) form field values from state machine
 * for subcomponent routes that render fields
 */
export const getMachineFields = (
  route: AuthenticatorRoute,
  state: AuthMachineState,
  unverifiedContactMethods: UnverifiedContactMethods
): AuthenticatorLegacyFields => {
  if (isComponentRouteKey(route)) {
    return route === 'verifyUser'
      ? convertContactMethodsToFields(unverifiedContactMethods)
      : flattenFormFields(getSortedFormFields(route, state));
  }

  return [];
};
