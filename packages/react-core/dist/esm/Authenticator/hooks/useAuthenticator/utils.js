import { __awaiter } from "tslib";
import { Auth } from 'aws-amplify';
import { getSortedFormFields, } from '@aws-amplify/ui';
import { areEmptyArrays, areEmptyObjects } from '../../../utils';
import { COMPONENT_ROUTE_KEYS } from './constants';
export const defaultComparator = () => false;
/**
 * Does an ordering and shallow comparison of each array value,
 * plus a value equality check for empty objects and arrays.
 */
export function areSelectorDepsEqual(currentDeps, nextDeps) {
    if (currentDeps.length !== nextDeps.length) {
        return false;
    }
    return currentDeps.every((currentDep, index) => {
        const nextDep = nextDeps[index];
        if (areEmptyArrays(currentDep, nextDep) ||
            areEmptyObjects(currentDep, nextDep)) {
            return true;
        }
        return currentDep === nextDep;
    });
}
export const getComparator = (selector) => (currentFacade, nextFacade) => {
    const currentSelectorDeps = selector(currentFacade);
    const nextSelectorDeps = selector(nextFacade);
    // Shallow compare the array values
    return areSelectorDepsEqual(currentSelectorDeps, nextSelectorDeps);
};
export const getTotpSecretCodeCallback = (user) => function getTotpSecretCode() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Auth.setupTOTP(user);
    });
};
export const isComponentRouteKey = (route) => COMPONENT_ROUTE_KEYS.some((componentRoute) => componentRoute === route);
const flattenFormFields = (fields) => fields.flatMap(([name, options]) => (Object.assign({ name }, options)));
/**
 * Retrieves legacy form field values from state machine for routes that have fields
 */
export const getLegacyFields = (route, state) => isComponentRouteKey(route)
    ? flattenFormFields(getSortedFormFields(route, state))
    : [];
