import {
  AuthActorState,
  AuthMachineState,
} from '../../machines/authenticator/types';

export const getRoute = (
  state: AuthMachineState,
  actorState: AuthActorState
) => {
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
    case state?.matches('signInActor.runActor'):
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
    case state?.matches('signUpActor.runActor'):
      return 'signUp';
    default:
      console.debug(
        `Cannot infer 'route' from Authenticator state:
       ${state?.value} and actor state: ${actorState?.value}`
      );
  }
};
