import type {
  AuthenticatorRoute,
  AuthMachineState,
  FormFieldsArray,
  UnverifiedUserAttributes,
  AuthMFAType,
} from '@aws-amplify/ui';
import {
  areEmptyArrays,
  areEmptyObjects,
  getSortedFormFields,
  getActorContext,
  isString,
  authenticatorTextUtil,
} from '@aws-amplify/ui';

import type {
  AuthenticatorLegacyField,
  AuthenticatorLegacyFields,
} from '../types';
import { isComponentRouteKey } from '../utils';

import type { Comparator, UseAuthenticatorSelector } from './types';

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
  unverifiedUserAttributes: UnverifiedUserAttributes = {}
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

const convertAllowedMfaTypesToFields = (
  allowedMfaTypes: AuthMFAType[] = []
): AuthenticatorLegacyFields => {
  return allowedMfaTypes.map((mfaType) => ({
    name: 'mfa_type',
    label: authenticatorTextUtil.getMfaTypeLabelByValue(mfaType),
    type: 'radio',
    value: mfaType,
  }));
};

/**
 * Retrieves default and custom (RWA only, to be updated) form field values from state machine
 * for subcomponent routes that render fields
 */
export const getMachineFields = (
  route: AuthenticatorRoute,
  state: AuthMachineState
): AuthenticatorLegacyFields => {
  if (isComponentRouteKey(route)) {
    if (route === 'verifyUser') {
      return convertContactMethodsToFields(
        getActorContext(state).unverifiedUserAttributes
      );
    }
    if (route === 'selectMfaType') {
      return convertAllowedMfaTypesToFields(
        getActorContext(state).allowedMfaTypes
      );
    }
    return flattenFormFields(getSortedFormFields(route, state));
  }

  return [];
};
