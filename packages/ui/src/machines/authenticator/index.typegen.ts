// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    forwardToActor:
      | 'CHANGE'
      | 'BLUR'
      | 'SUBMIT'
      | 'FEDERATED_SIGN_IN'
      | 'RESEND'
      | 'SIGN_OUT'
      | 'SIGN_IN'
      | 'SKIP';
    configure: 'INIT';
    setUser: 'done.invoke.authenticator.setup:invocation[0]';
    applyAmplifyConfig: 'done.invoke.authenticator.setup:invocation[1]';
    setActorDoneData:
      | 'done.invoke.signInActor'
      | 'done.invoke.signUpActor'
      | 'done.invoke.resetPasswordActor';
    spawnSignInActor: '';
    spawnSignUpActor: '';
    spawnResetPasswordActor: '';
    spawnSignOutActor: '';
    stopSignInActor: 'xstate.init';
    clearActorDoneData: '';
    stopSignUpActor: 'xstate.init';
    stopResetPasswordActor: 'xstate.init';
    stopSignOutActor: 'xstate.init';
    clearUser: 'xstate.init';
  };
  internalEvents: {
    'done.invoke.authenticator.setup:invocation[0]': {
      type: 'done.invoke.authenticator.setup:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.authenticator.setup:invocation[1]': {
      type: 'done.invoke.authenticator.setup:invocation[1]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.signInActor': {
      type: 'done.invoke.signInActor';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.signUpActor': {
      type: 'done.invoke.signUpActor';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.resetPasswordActor': {
      type: 'done.invoke.resetPasswordActor';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    '': { type: '' };
    'error.platform.authenticator.setup:invocation[0]': {
      type: 'error.platform.authenticator.setup:invocation[0]';
      data: unknown;
    };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    getCurrentUser: 'done.invoke.authenticator.setup:invocation[0]';
    getAmplifyConfig: 'done.invoke.authenticator.setup:invocation[1]';
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    getCurrentUser: 'INIT' | 'done.invoke.signUpActor';
    getAmplifyConfig: 'INIT' | 'done.invoke.signUpActor';
  };
  eventsCausingGuards: {
    shouldSignUp: 'error.platform.authenticator.setup:invocation[0]';
    shouldResetPassword: 'error.platform.authenticator.setup:invocation[0]';
    shouldRedirectToSignUp: 'done.invoke.signInActor';
    shouldRedirectToResetPassword: 'done.invoke.signInActor';
  };
  eventsCausingDelays: {};
  matchesStates:
    | 'idle'
    | 'setup'
    | 'signIn'
    | 'signIn.spawnActor'
    | 'signIn.runActor'
    | 'signUp'
    | 'signUp.spawnActor'
    | 'signUp.runActor'
    | 'resetPassword'
    | 'resetPassword.spawnActor'
    | 'resetPassword.runActor'
    | 'signOut'
    | 'signOut.spawnActor'
    | 'signOut.runActor'
    | 'authenticated'
    | {
        signIn?: 'spawnActor' | 'runActor';
        signUp?: 'spawnActor' | 'runActor';
        resetPassword?: 'spawnActor' | 'runActor';
        signOut?: 'spawnActor' | 'runActor';
      };
  tags: never;
}
