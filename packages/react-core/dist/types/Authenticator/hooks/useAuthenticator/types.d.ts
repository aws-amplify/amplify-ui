import { AuthMachineSend, AuthMachineState, AuthenticatorServiceFacade, LegacyFormFieldOptions } from '@aws-amplify/ui';
/**
 * These are the "facades" that we provide, which contains contexts respective
 * to current authenticator state.
 */
declare type AuthenticatorMachineContext = AuthenticatorServiceFacade;
declare type AuthenticatorMachineContextKey = keyof AuthenticatorMachineContext;
export declare type AuthenticatorRouteComponentKey = 'signIn' | 'signUp' | 'forceNewPassword' | 'confirmResetPassword' | 'confirmSignIn' | 'confirmSignUp' | 'confirmVerifyUser' | 'resetPassword' | 'setupTOTP';
export declare type AuthenticatorLegacyFields = LegacyFormFieldOptions[];
/**
 * Inspired from https://xstate.js.org/docs/packages/xstate-react/#useselector-actor-selector-compare-getsnapshot.
 *
 * Selector accepts current facade values and returns an array of
 * desired value(s) that should trigger re-render.
 */
export declare type Selector = (context: AuthenticatorMachineContext) => AuthenticatorMachineContext[AuthenticatorMachineContextKey][];
declare type InternalAuthenticatorContext = {
    _state: AuthMachineState;
    _send: AuthMachineSend;
};
export interface UseAuthenticator extends AuthenticatorServiceFacade {
    getTotpSecretCode: () => Promise<string>;
    /** @deprecated For internal use only */
    fields: AuthenticatorLegacyFields;
    /** @deprecated For internal use only */
    _send: InternalAuthenticatorContext['_send'];
    /** @deprecated For internal use only */
    _state: InternalAuthenticatorContext['_state'];
}
export declare type Comparator = (currentFacade: AuthenticatorServiceFacade, nextFacade: AuthenticatorServiceFacade) => boolean;
export {};
