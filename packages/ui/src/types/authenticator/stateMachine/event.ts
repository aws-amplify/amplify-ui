import { AuthenticatorMachineOptions } from '../../../machines';
import { CognitoUserAmplify, FederatedIdentityProviders } from '../user';
import { ActorDoneData } from './context';

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
  | 'SIGN_IN'
  | 'SIGN_OUT'
  | 'SIGN_UP'
  | 'SKIP'
  | 'SUBMIT'
  | 'INIT'
  | InvokeActorEventTypes;

/**
 * Data payload for auth events
 */
export type AuthEventData = Record<PropertyKey, any>; // TODO: this should be typed further

/** Top-level auth machine event interface */
export type AuthEvent =
  | {
      type: 'INIT';
      data: AuthenticatorMachineOptions;
    }
  | {
      type: 'SIGN_UP' | 'RESET_PASSWORD' | 'SIGN_IN' | 'SIGN_OUT';
    }
  | {
      /**
       * This event is called after signUp actor is done.
       */
      type: 'done.invoke.signInActor';
      data: {
        user: CognitoUserAmplify;
        intent: string;
        authAttributes: Record<string, any>;
      };
    }
  | {
      /**
       * This event is called after signUp actor is done.
       */
      type: 'done.invoke.signUpActor';
      data: ActorDoneData;
    }
  | {
      type: 'done.invoke.resetPasswordActor';
      data: ActorDoneData;
    }
  | {
      type: 'done.invoke.signOutActor';
    }
  | {
      type: 'CHANGE';
      data: {
        name: string;
        value: string;
      };
    }
  | {
      type: 'BLUR';
      data: {
        name: string;
      };
    }
  | {
      type: 'SUBMIT';
      data: Record<string, string>;
    }
  | {
      type: 'FEDERATED_SIGN_IN';
      data: { provider: FederatedIdentityProviders };
    }
  | {
      type: 'RESEND';
    }
  | {
      type: 'SKIP';
    };
