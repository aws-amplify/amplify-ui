import { Auth } from 'aws-amplify';
import { AmplifyUser } from '@aws-amplify/ui';

import { areEmptyArrays, areEmptyObjects } from '../../../utils';
import { Comparator, Selector } from './types';

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

export const getTotpSecretCodeCallback = (currentUser: AmplifyUser) =>
  async function getTotpSecretCode(): Promise<string> {
    return await Auth.setupTOTP(currentUser);
  };
