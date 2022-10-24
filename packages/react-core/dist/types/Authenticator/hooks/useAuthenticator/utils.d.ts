import { AmplifyUser, AuthenticatorRoute, AuthMachineState } from '@aws-amplify/ui';
import { AuthenticatorRouteComponentKey, AuthenticatorLegacyFields, Comparator, Selector } from './types';
export declare const defaultComparator: () => false;
/**
 * Does an ordering and shallow comparison of each array value,
 * plus a value equality check for empty objects and arrays.
 */
export declare function areSelectorDepsEqual<T>(currentDeps: T[], nextDeps: T[]): boolean;
export declare const getComparator: (selector: Selector) => Comparator;
export declare const getTotpSecretCodeCallback: (user: AmplifyUser) => () => Promise<string>;
export declare const isComponentRouteKey: (route: AuthenticatorRoute) => route is AuthenticatorRouteComponentKey;
/**
 * Retrieves legacy form field values from state machine for routes that have fields
 */
export declare const getLegacyFields: (route: AuthenticatorRoute, state: AuthMachineState) => AuthenticatorLegacyFields;
