/**
 * Events that occur when actors are done
 */
export type InvokeActorEventTypes =
  | 'done.invoke.signInActor'
  | 'done.invoke.signUpActor'
  | 'done.invoke.signOutActor'
  | 'done.invoke.resetPasswordActor';

/**
 * All known explicit events for xstate
 */
export type AuthEventTypes =
  | 'CHANGE'
  | 'BLUR'
  | 'FEDERATED_SIGN_IN'
  | 'RESEND'
  | 'RESET_PASSWORD'
  | 'AUTO_SIGN_IN'
  | 'AUTO_SIGN_IN_FAILURE'
  | 'SIGN_IN'
  | 'SIGN_OUT'
  | 'SIGN_UP'
  | 'SKIP'
  | 'SUBMIT'
  | 'INIT'
  | 'TOKEN_REFRESH'
  | InvokeActorEventTypes;

/**
 * Data payload for auth events
 */
export type AuthEventData = Record<PropertyKey, any>; // TODO: this should be typed further

/** Top-level auth machine event interface */
export interface AuthEvent {
  type: AuthEventTypes;
  data?: AuthEventData;
}
