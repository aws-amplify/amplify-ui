// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    handleInput: 'CHANGE';
    handleBlur: 'BLUR';
    clearValidationError:
      | 'done.invoke.signUpActor.signUp.validation.pending:invocation[0]'
      | 'done.invoke.signUpActor.signUp.submission.validate:invocation[0]';
    setFieldErrors:
      | 'error.platform.signUpActor.signUp.validation.pending:invocation[0]'
      | 'error.platform.signUpActor.signUp.submission.validate:invocation[0]';
    setRemoteError:
      | 'error.platform.signUpActor.signUp.submission.federatedSignIn:invocation[0]'
      | 'error.platform.signUpActor.signUp.submission.pending:invocation[0]'
      | 'error.platform.signUpActor.signUp.submission.skipConfirm:invocation[0]'
      | 'error.platform.signUpActor.confirmSignUp.resend:invocation[0]'
      | 'error.platform.signUpActor.confirmSignUp.submit:invocation[0]';
    setUser:
      | 'done.invoke.signUpActor.signUp.submission.pending:invocation[0]'
      | 'done.invoke.signUpActor.signUp.submission.skipConfirm:invocation[0]'
      | 'error.platform.signUpActor.confirmSignUp.resend:invocation[0]'
      | 'done.invoke.signUpActor.confirmSignUp.submit:invocation[0]';
    setCredentials: 'done.invoke.signUpActor.signUp.submission.pending:invocation[0]';
    setCodeDeliveryDetails: 'done.invoke.signUpActor.signUp.submission.pending:invocation[0]';
    clearError:
      | 'FEDERATED_SIGN_IN'
      | 'done.invoke.signUpActor.signUp.submission.validate:invocation[0]'
      | 'SUBMIT';
    clearFormValues: 'xstate.init';
    clearTouched: 'xstate.init';
    sendUpdate:
      | 'done.invoke.signUpActor.signUp.validation.pending:invocation[0]'
      | 'error.platform.signUpActor.signUp.validation.pending:invocation[0]'
      | 'error.platform.signUpActor.signUp.submission.validate:invocation[0]'
      | 'error.platform.signUpActor.signUp.submission.pending:invocation[0]'
      | 'error.platform.signUpActor.signUp.submission.skipConfirm:invocation[0]'
      | 'FEDERATED_SIGN_IN'
      | 'SUBMIT'
      | 'done.invoke.signUpActor.signUp.submission.validate:invocation[0]'
      | 'done.invoke.signUpActor.confirmSignUp.resend:invocation[0]'
      | 'error.platform.signUpActor.confirmSignUp.resend:invocation[0]'
      | 'error.platform.signUpActor.confirmSignUp.submit:invocation[0]'
      | 'RESEND';
    parsePhoneNumber: 'done.invoke.signUpActor.signUp.submission.validate:invocation[0]';
  };
  internalEvents: {
    'done.invoke.signUpActor.signUp.validation.pending:invocation[0]': {
      type: 'done.invoke.signUpActor.signUp.validation.pending:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.signUpActor.signUp.submission.validate:invocation[0]': {
      type: 'done.invoke.signUpActor.signUp.submission.validate:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.signUpActor.signUp.validation.pending:invocation[0]': {
      type: 'error.platform.signUpActor.signUp.validation.pending:invocation[0]';
      data: unknown;
    };
    'error.platform.signUpActor.signUp.submission.validate:invocation[0]': {
      type: 'error.platform.signUpActor.signUp.submission.validate:invocation[0]';
      data: unknown;
    };
    'error.platform.signUpActor.signUp.submission.federatedSignIn:invocation[0]': {
      type: 'error.platform.signUpActor.signUp.submission.federatedSignIn:invocation[0]';
      data: unknown;
    };
    'error.platform.signUpActor.signUp.submission.pending:invocation[0]': {
      type: 'error.platform.signUpActor.signUp.submission.pending:invocation[0]';
      data: unknown;
    };
    'error.platform.signUpActor.signUp.submission.skipConfirm:invocation[0]': {
      type: 'error.platform.signUpActor.signUp.submission.skipConfirm:invocation[0]';
      data: unknown;
    };
    'error.platform.signUpActor.confirmSignUp.resend:invocation[0]': {
      type: 'error.platform.signUpActor.confirmSignUp.resend:invocation[0]';
      data: unknown;
    };
    'error.platform.signUpActor.confirmSignUp.submit:invocation[0]': {
      type: 'error.platform.signUpActor.confirmSignUp.submit:invocation[0]';
      data: unknown;
    };
    'done.invoke.signUpActor.signUp.submission.pending:invocation[0]': {
      type: 'done.invoke.signUpActor.signUp.submission.pending:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.signUpActor.signUp.submission.skipConfirm:invocation[0]': {
      type: 'done.invoke.signUpActor.signUp.submission.skipConfirm:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.signUpActor.confirmSignUp.submit:invocation[0]': {
      type: 'done.invoke.signUpActor.confirmSignUp.submit:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.signUpActor.confirmSignUp.resend:invocation[0]': {
      type: 'done.invoke.signUpActor.confirmSignUp.resend:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    '': { type: '' };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    validateSignUp:
      | 'done.invoke.signUpActor.signUp.validation.pending:invocation[0]'
      | 'done.invoke.signUpActor.signUp.submission.validate:invocation[0]';
    federatedSignIn: 'done.invoke.signUpActor.signUp.submission.federatedSignIn:invocation[0]';
    signUp: 'done.invoke.signUpActor.signUp.submission.pending:invocation[0]';
    signIn: 'done.invoke.signUpActor.signUp.submission.skipConfirm:invocation[0]';
    resendConfirmationCode: 'done.invoke.signUpActor.confirmSignUp.resend:invocation[0]';
    confirmSignUp: 'done.invoke.signUpActor.confirmSignUp.submit:invocation[0]';
  };
  missingImplementations: {
    actions: 'sendUpdate';
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    validateSignUp: 'CHANGE' | 'BLUR' | 'SUBMIT';
    federatedSignIn: 'FEDERATED_SIGN_IN';
    signUp: 'done.invoke.signUpActor.signUp.submission.validate:invocation[0]';
    signIn: 'done.invoke.signUpActor.signUp.submission.pending:invocation[0]';
    confirmSignUp: 'SUBMIT';
    resendConfirmationCode: 'RESEND';
  };
  eventsCausingGuards: {
    shouldInitConfirmSignUp: '';
    shouldSkipConfirm: 'done.invoke.signUpActor.signUp.submission.pending:invocation[0]';
    isUserAlreadyConfirmed: 'error.platform.signUpActor.confirmSignUp.resend:invocation[0]';
  };
  eventsCausingDelays: {};
  matchesStates:
    | 'init'
    | 'signUp'
    | 'signUp.validation'
    | 'signUp.validation.pending'
    | 'signUp.validation.valid'
    | 'signUp.validation.invalid'
    | 'signUp.submission'
    | 'signUp.submission.idle'
    | 'signUp.submission.federatedSignIn'
    | 'signUp.submission.validate'
    | 'signUp.submission.pending'
    | 'signUp.submission.skipConfirm'
    | 'signUp.submission.resolved'
    | 'confirmSignUp'
    | 'confirmSignUp.edit'
    | 'confirmSignUp.resend'
    | 'confirmSignUp.submit'
    | 'resolved'
    | {
        signUp?:
          | 'validation'
          | 'submission'
          | {
              validation?: 'pending' | 'valid' | 'invalid';
              submission?:
                | 'idle'
                | 'federatedSignIn'
                | 'validate'
                | 'pending'
                | 'skipConfirm'
                | 'resolved';
            };
        confirmSignUp?: 'edit' | 'resend' | 'submit';
      };
  tags: 'pending';
}
