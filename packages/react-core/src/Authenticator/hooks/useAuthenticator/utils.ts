import { Auth } from 'aws-amplify';
import { AmplifyUser, AuthenticatorRoute } from '@aws-amplify/ui';

import { areEmptyArrays, areEmptyObjects } from '../../../utils';
import { AuthenticatorRouteComponentKey, Comparator, Selector } from './types';

const COMPONENENT_ROUTE_KEYS = [
  'signIn',
  'signUp',
  'forceNewPassword',
  'confirmResetPassword',
  'confirmSignIn',
  'confirmSignUp',
  'confirmVerifyUser',
  'resetPassword',
  'setupTOTP',
];

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
  COMPONENENT_ROUTE_KEYS.some((componentRoute) => componentRoute === route);
