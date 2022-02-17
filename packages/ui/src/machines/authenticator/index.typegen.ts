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
    setUserFromService: 'done.invoke.authenticator.setup:invocation[0]';
    applyAmplifyConfig: 'done.invoke.authenticator.setup:invocation[1]';
    setUserFromEvent: 'done.invoke.signInActor' | 'done.invoke.signUpActor';
    stopSignInActor: 'xstate.init';
    spawnSignInActor:
      | 'error.platform.authenticator.setup:invocation[0]'
      | 'SIGN_IN'
      | 'done.invoke.resetPasswordActor'
      | 'done.invoke.signOutActor';
    stopSignUpActor: 'xstate.init';
    spawnSignUpActor:
      | 'error.platform.authenticator.setup:invocation[0]'
      | 'SIGN_UP'
      | 'done.invoke.signInActor';
    stopResetPasswordActor: 'xstate.init';
    spawnResetPasswordActor:
      | 'error.platform.authenticator.setup:invocation[0]'
      | 'RESET_PASSWORD'
      | 'done.invoke.signInActor';
    stopSignOutActor: 'xstate.init';
    clearUser: 'xstate.init';
    spawnSignOutActor: 'SIGN_OUT';
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
    'error.platform.authenticator.setup:invocation[0]': {
      type: 'error.platform.authenticator.setup:invocation[0]';
      data: unknown;
    };
    'done.invoke.resetPasswordActor': {
      type: 'done.invoke.resetPasswordActor';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.signOutActor': {
      type: 'done.invoke.signOutActor';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    getCurrentUser: 'done.invoke.authenticator.setup:invocation[0]';
    getAmplifyConfig: 'done.invoke.authenticator.setup:invocation[1]';
  };
  missingImplementations: {
    actions: 'clearUser';
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
    | 'signUp'
    | 'resetPassword'
    | 'signOut'
    | 'authenticated';
  tags: never;
}
