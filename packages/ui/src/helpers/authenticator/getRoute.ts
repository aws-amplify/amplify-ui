import {
  AuthActorState,
  AuthMachineState,
} from '../../machines/authenticator/types';
import { AuthenticatorRoute } from './facade';

export type GetRoute = (
  state: AuthMachineState,
  actorState: AuthActorState
) => AuthenticatorRoute;

export const getRoute = (
  state: AuthMachineState,
  actorState: AuthActorState
): AuthenticatorRoute => {
  // 'federatedSignIn' exists as a state on both the 'signInActor' and 'signUpActor',
  // match against the `actorState` initially to determine if the federated sign in flow
  // has begun, then which actor has begun the flow and return the corresponding `route`
  if (actorState?.matches('federatedSignIn')) {
    if (state.matches('signUpActor')) {
      return 'signUp';
    }
    if (state.matches('signInActor')) {
      return 'signIn';
    }
  }

  switch (true) {
    case state.matches('idle'):
      return 'idle';
    case state.matches('setup'):
      return 'setup';
    case state.matches('signOut'):
      return 'signOut';
    case state.matches('authenticated'):
      return 'authenticated';
    case actorState?.matches('confirmSignUp'):
    case actorState?.matches('resendSignUpCode'):
      return 'confirmSignUp';
    case actorState?.matches('confirmSignIn'):
      return 'confirmSignIn';
    case actorState?.matches('setupTotp.edit'):
    case actorState?.matches('setupTotp.submit'):
      return 'setupTotp';
    case actorState?.matches('signIn'):
      return 'signIn';
    case actorState?.matches('signUp'):
    case actorState?.matches('autoSignIn'):
      return 'signUp';
    case actorState?.matches('forceChangePassword'):
      return 'forceNewPassword';
    case actorState?.matches('forgotPassword'):
      return 'forgotPassword';
    case actorState?.matches('confirmResetPassword'):
      return 'confirmResetPassword';
    case actorState?.matches('selectUserAttributes'):
      return 'verifyUser';
    case actorState?.matches('confirmVerifyUserAttribute'):
      return 'confirmVerifyUser';
    case state.matches('getCurrentUser'):
    case actorState?.matches('fetchUserAttributes'):
      /**
       * This route is needed for autoSignIn to capture both the
       * autoSignIn.pending and the resolved states when the
       * signIn actor is running.
       */
      return 'transition';
    default:
      return null;
  }
};
