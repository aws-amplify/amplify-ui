// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    handleInput: 'CHANGE';
    setRemoteError:
      | 'error.platform.signInActor.signIn.federatedSignIn:invocation[0]'
      | 'error.platform.signInActor.signIn.submit:invocation[0]'
      | 'error.platform.signInActor.signIn.verifying:invocation[0]'
      | 'error.platform.signInActor.confirmSignIn.submit:invocation[0]'
      | 'error.platform.signInActor.forceNewPassword.submit.pending:invocation[0]'
      | 'error.platform.signInActor.setupTOTP.submit:invocation[0]'
      | 'error.platform.signInActor.verifyUser.submit:invocation[0]'
      | 'error.platform.signInActor.confirmVerifyUser.submit:invocation[0]';
    setUser:
      | 'done.invoke.signInActor.signIn.submit:invocation[0]'
      | 'done.invoke.signInActor.confirmSignIn.submit:invocation[0]'
      | 'done.invoke.signInActor.forceNewPassword.submit.pending:invocation[0]'
      | 'done.invoke.signInActor.setupTOTP.submit:invocation[0]';
    setChallengeName:
      | 'done.invoke.signInActor.signIn.submit:invocation[0]'
      | 'done.invoke.signInActor.forceNewPassword.submit.pending:invocation[0]';
    setRequiredAttributes: 'done.invoke.signInActor.signIn.submit:invocation[0]';
    setCredentials:
      | 'error.platform.signInActor.signIn.submit:invocation[0]'
      | 'done.invoke.signInActor.forceNewPassword.submit.pending:invocation[0]';
    setConfirmSignUpIntent: 'error.platform.signInActor.signIn.submit:invocation[0]';
    setUsernameAuthAttributes: 'error.platform.signInActor.signIn.submit:invocation[0]';
    setConfirmResetPasswordIntent: 'error.platform.signInActor.signIn.submit:invocation[0]';
    setUnverifiedAttributes: 'done.invoke.signInActor.signIn.verifying:invocation[0]';
    clearChallengeName:
      | 'done.invoke.signInActor.confirmSignIn.submit:invocation[0]'
      | 'done.invoke.signInActor.setupTOTP.submit:invocation[0]';
    clearRequiredAttributes:
      | 'done.invoke.signInActor.confirmSignIn.submit:invocation[0]'
      | 'done.invoke.signInActor.setupTOTP.submit:invocation[0]';
    handleBlur: 'BLUR';
    clearValidationError:
      | 'done.invoke.signInActor.forceNewPassword.validation.pending:invocation[0]'
      | 'done.invoke.signInActor.forceNewPassword.submit.validate:invocation[0]';
    setFieldErrors:
      | 'error.platform.signInActor.forceNewPassword.validation.pending:invocation[0]'
      | 'error.platform.signInActor.forceNewPassword.submit.validate:invocation[0]';
    clearFormValues: 'xstate.init';
    clearTouched: 'xstate.init';
    sendUpdate:
      | 'error.platform.signInActor.signIn.submit:invocation[0]'
      | 'error.platform.signInActor.signIn.verifying:invocation[0]'
      | 'FEDERATED_SIGN_IN'
      | 'SUBMIT'
      | 'done.invoke.signInActor.signIn.submit:invocation[0]'
      | 'error.platform.signInActor.confirmSignIn.submit:invocation[0]'
      | 'done.invoke.signInActor.forceNewPassword.validation.pending:invocation[0]'
      | 'error.platform.signInActor.forceNewPassword.validation.pending:invocation[0]'
      | 'error.platform.signInActor.forceNewPassword.submit.validate:invocation[0]'
      | 'error.platform.signInActor.forceNewPassword.submit.pending:invocation[0]'
      | 'done.invoke.signInActor.forceNewPassword.submit.validate:invocation[0]'
      | 'error.platform.signInActor.setupTOTP.submit:invocation[0]'
      | 'error.platform.signInActor.verifyUser.submit:invocation[0]'
      | 'error.platform.signInActor.confirmVerifyUser.submit:invocation[0]';
    clearError:
      | 'FEDERATED_SIGN_IN'
      | 'SUBMIT'
      | 'done.invoke.signInActor.signIn.submit:invocation[0]'
      | 'done.invoke.signInActor.forceNewPassword.submit.validate:invocation[0]';
    parsePhoneNumber: 'SUBMIT';
    clearUnverifiedAttributes: 'xstate.init';
    clearAttributeToVerify: 'xstate.init';
  };
  internalEvents: {
    'error.platform.signInActor.signIn.federatedSignIn:invocation[0]': {
      type: 'error.platform.signInActor.signIn.federatedSignIn:invocation[0]';
      data: unknown;
    };
    'error.platform.signInActor.signIn.submit:invocation[0]': {
      type: 'error.platform.signInActor.signIn.submit:invocation[0]';
      data: unknown;
    };
    'error.platform.signInActor.signIn.verifying:invocation[0]': {
      type: 'error.platform.signInActor.signIn.verifying:invocation[0]';
      data: unknown;
    };
    'error.platform.signInActor.confirmSignIn.submit:invocation[0]': {
      type: 'error.platform.signInActor.confirmSignIn.submit:invocation[0]';
      data: unknown;
    };
    'error.platform.signInActor.forceNewPassword.submit.pending:invocation[0]': {
      type: 'error.platform.signInActor.forceNewPassword.submit.pending:invocation[0]';
      data: unknown;
    };
    'error.platform.signInActor.setupTOTP.submit:invocation[0]': {
      type: 'error.platform.signInActor.setupTOTP.submit:invocation[0]';
      data: unknown;
    };
    'error.platform.signInActor.verifyUser.submit:invocation[0]': {
      type: 'error.platform.signInActor.verifyUser.submit:invocation[0]';
      data: unknown;
    };
    'error.platform.signInActor.confirmVerifyUser.submit:invocation[0]': {
      type: 'error.platform.signInActor.confirmVerifyUser.submit:invocation[0]';
      data: unknown;
    };
    'done.invoke.signInActor.signIn.submit:invocation[0]': {
      type: 'done.invoke.signInActor.signIn.submit:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.signInActor.confirmSignIn.submit:invocation[0]': {
      type: 'done.invoke.signInActor.confirmSignIn.submit:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.signInActor.forceNewPassword.submit.pending:invocation[0]': {
      type: 'done.invoke.signInActor.forceNewPassword.submit.pending:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.signInActor.setupTOTP.submit:invocation[0]': {
      type: 'done.invoke.signInActor.setupTOTP.submit:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.signInActor.signIn.verifying:invocation[0]': {
      type: 'done.invoke.signInActor.signIn.verifying:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.signInActor.forceNewPassword.validation.pending:invocation[0]': {
      type: 'done.invoke.signInActor.forceNewPassword.validation.pending:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.signInActor.forceNewPassword.submit.validate:invocation[0]': {
      type: 'done.invoke.signInActor.forceNewPassword.submit.validate:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.signInActor.forceNewPassword.validation.pending:invocation[0]': {
      type: 'error.platform.signInActor.forceNewPassword.validation.pending:invocation[0]';
      data: unknown;
    };
    'error.platform.signInActor.forceNewPassword.submit.validate:invocation[0]': {
      type: 'error.platform.signInActor.forceNewPassword.submit.validate:invocation[0]';
      data: unknown;
    };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    federatedSignIn: 'done.invoke.signInActor.signIn.federatedSignIn:invocation[0]';
    signIn: 'done.invoke.signInActor.signIn.submit:invocation[0]';
    checkVerifiedContact: 'done.invoke.signInActor.signIn.verifying:invocation[0]';
    confirmSignIn: 'done.invoke.signInActor.confirmSignIn.submit:invocation[0]';
    validateFields:
      | 'done.invoke.signInActor.forceNewPassword.validation.pending:invocation[0]'
      | 'done.invoke.signInActor.forceNewPassword.submit.validate:invocation[0]';
    forceNewPassword: 'done.invoke.signInActor.forceNewPassword.submit.pending:invocation[0]';
    verifyTotpToken: 'done.invoke.signInActor.setupTOTP.submit:invocation[0]';
    verifyUser: 'done.invoke.signInActor.verifyUser.submit:invocation[0]';
    confirmVerifyUser: 'done.invoke.signInActor.confirmVerifyUser.submit:invocation[0]';
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    signIn: 'SUBMIT';
    federatedSignIn: 'FEDERATED_SIGN_IN';
    checkVerifiedContact: 'done.invoke.signInActor.signIn.submit:invocation[0]';
    confirmSignIn: 'SUBMIT';
    validateFields: 'CHANGE' | 'BLUR' | 'SUBMIT';
    forceNewPassword: 'done.invoke.signInActor.forceNewPassword.submit.validate:invocation[0]';
    verifyTotpToken: 'SUBMIT';
    verifyUser: 'SUBMIT';
    confirmVerifyUser: 'SUBMIT';
  };
  eventsCausingGuards: {
    shouldSetupTOTP:
      | 'done.invoke.signInActor.signIn.submit:invocation[0]'
      | 'done.invoke.signInActor.forceNewPassword.submit.pending:invocation[0]';
    shouldConfirmSignIn:
      | 'done.invoke.signInActor.signIn.submit:invocation[0]'
      | 'done.invoke.signInActor.forceNewPassword.submit.pending:invocation[0]';
    shouldForceChangePassword: 'done.invoke.signInActor.signIn.submit:invocation[0]';
    shouldRedirectToConfirmSignUp: 'error.platform.signInActor.signIn.submit:invocation[0]';
    shouldRedirectToConfirmResetPassword: 'error.platform.signInActor.signIn.submit:invocation[0]';
    shouldRequestVerification: 'done.invoke.signInActor.signIn.verifying:invocation[0]';
  };
  eventsCausingDelays: {};
  matchesStates:
    | 'init'
    | 'signIn'
    | 'signIn.edit'
    | 'signIn.federatedSignIn'
    | 'signIn.submit'
    | 'signIn.verifying'
    | 'signIn.resolved'
    | 'signIn.rejected'
    | 'confirmSignIn'
    | 'confirmSignIn.edit'
    | 'confirmSignIn.submit'
    | 'forceNewPassword'
    | 'forceNewPassword.validation'
    | 'forceNewPassword.validation.pending'
    | 'forceNewPassword.validation.valid'
    | 'forceNewPassword.validation.invalid'
    | 'forceNewPassword.submit'
    | 'forceNewPassword.submit.idle'
    | 'forceNewPassword.submit.validate'
    | 'forceNewPassword.submit.pending'
    | 'forceNewPassword.submit.resolved'
    | 'setupTOTP'
    | 'setupTOTP.edit'
    | 'setupTOTP.submit'
    | 'verifyUser'
    | 'verifyUser.edit'
    | 'verifyUser.submit'
    | 'confirmVerifyUser'
    | 'confirmVerifyUser.edit'
    | 'confirmVerifyUser.submit'
    | 'resolved'
    | 'rejected'
    | {
        signIn?:
          | 'edit'
          | 'federatedSignIn'
          | 'submit'
          | 'verifying'
          | 'resolved'
          | 'rejected';
        confirmSignIn?: 'edit' | 'submit';
        forceNewPassword?:
          | 'validation'
          | 'submit'
          | {
              validation?: 'pending' | 'valid' | 'invalid';
              submit?: 'idle' | 'validate' | 'pending' | 'resolved';
            };
        setupTOTP?: 'edit' | 'submit';
        verifyUser?: 'edit' | 'submit';
        confirmVerifyUser?: 'edit' | 'submit';
      };
  tags: 'pending';
}
