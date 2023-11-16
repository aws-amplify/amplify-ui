import {
  areEmptyArrays,
  areEmptyObjects,
  AuthenticatorRoute,
  AuthMachineState,
  FormFieldsArray,
  getSortedFormFields,
  UnverifiedUserAttributes,
  getActorContext,
  isString,
} from '@aws-amplify/ui';

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
): { totpIssuer?: string; totpUsername?: string } => ({
  ...getActorContext(state)?.formFields?.setupTotp?.QR,
});

const flattenFormFields = (
  fields: FormFieldsArray
): AuthenticatorLegacyFields =>
  fields.flatMap(([name, options]) => ({ name, ...options }));

const convertContactMethodsToFields = (
  unverifiedUserAttributes: UnverifiedUserAttributes
): AuthenticatorLegacyFields => {
  return (
    unverifiedUserAttributes &&
    Object.entries(unverifiedUserAttributes).map(([name, value]) => {
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
  unverifiedUserAttributes: UnverifiedUserAttributes
): AuthenticatorLegacyFields => {
  if (isComponentRouteKey(route)) {
    return route === 'verifyUser'
      ? convertContactMethodsToFields(unverifiedUserAttributes)
      : flattenFormFields(getSortedFormFields(route, state));
  }

  return [];
};
