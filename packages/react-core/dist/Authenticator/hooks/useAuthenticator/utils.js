"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLegacyFields = exports.isComponentRouteKey = exports.getTotpSecretCodeCallback = exports.getComparator = exports.areSelectorDepsEqual = exports.defaultComparator = void 0;
const tslib_1 = require("tslib");
const aws_amplify_1 = require("aws-amplify");
const ui_1 = require("@aws-amplify/ui");
const utils_1 = require("../../../utils");
const constants_1 = require("./constants");
const defaultComparator = () => false;
exports.defaultComparator = defaultComparator;
/**
 * Does an ordering and shallow comparison of each array value,
 * plus a value equality check for empty objects and arrays.
 */
function areSelectorDepsEqual(currentDeps, nextDeps) {
    if (currentDeps.length !== nextDeps.length) {
        return false;
    }
    return currentDeps.every((currentDep, index) => {
        const nextDep = nextDeps[index];
        if ((0, utils_1.areEmptyArrays)(currentDep, nextDep) ||
            (0, utils_1.areEmptyObjects)(currentDep, nextDep)) {
            return true;
        }
        return currentDep === nextDep;
    });
}
exports.areSelectorDepsEqual = areSelectorDepsEqual;
const getComparator = (selector) => (currentFacade, nextFacade) => {
    const currentSelectorDeps = selector(currentFacade);
    const nextSelectorDeps = selector(nextFacade);
    // Shallow compare the array values
    return areSelectorDepsEqual(currentSelectorDeps, nextSelectorDeps);
};
exports.getComparator = getComparator;
const getTotpSecretCodeCallback = (user) => function getTotpSecretCode() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return yield aws_amplify_1.Auth.setupTOTP(user);
    });
};
exports.getTotpSecretCodeCallback = getTotpSecretCodeCallback;
const isComponentRouteKey = (route) => constants_1.COMPONENT_ROUTE_KEYS.some((componentRoute) => componentRoute === route);
exports.isComponentRouteKey = isComponentRouteKey;
const flattenFormFields = (fields) => fields.flatMap(([name, options]) => (Object.assign({ name }, options)));
/**
 * Retrieves legacy form field values from state machine for routes that have fields
 */
const getLegacyFields = (route, state) => (0, exports.isComponentRouteKey)(route)
    ? flattenFormFields((0, ui_1.getSortedFormFields)(route, state))
    : [];
exports.getLegacyFields = getLegacyFields;
