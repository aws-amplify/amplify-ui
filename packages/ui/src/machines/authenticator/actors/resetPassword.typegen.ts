// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    handleInput: 'CHANGE';
    handleBlur: 'BLUR';
    setRemoteError:
      | 'error.platform.resetPasswordActor.resetPassword.submit:invocation[0]'
      | 'error.platform.resetPasswordActor.confirmResetPassword.submission.resendCode:invocation[0]'
      | 'error.platform.resetPasswordActor.confirmResetPassword.submission.pending:invocation[0]';
    clearValidationError:
      | 'done.invoke.resetPasswordActor.confirmResetPassword.validation.pending:invocation[0]'
      | 'done.invoke.resetPasswordActor.confirmResetPassword.submission.validate:invocation[0]';
    setFieldErrors:
      | 'error.platform.resetPasswordActor.confirmResetPassword.validation.pending:invocation[0]'
      | 'error.platform.resetPasswordActor.confirmResetPassword.submission.validate:invocation[0]';
    clearUsername: 'done.invoke.resetPasswordActor.confirmResetPassword.submission.pending:invocation[0]';
    clearFormValues: 'xstate.init';
    clearError:
      | 'SUBMIT'
      | 'RESEND'
      | 'done.invoke.resetPasswordActor.confirmResetPassword.submission.validate:invocation[0]';
    clearTouched: 'xstate.init';
    sendUpdate:
      | 'error.platform.resetPasswordActor.resetPassword.submit:invocation[0]'
      | 'SUBMIT'
      | 'done.invoke.resetPasswordActor.confirmResetPassword.validation.pending:invocation[0]'
      | 'error.platform.resetPasswordActor.confirmResetPassword.validation.pending:invocation[0]'
      | 'error.platform.resetPasswordActor.confirmResetPassword.submission.validate:invocation[0]'
      | 'done.invoke.resetPasswordActor.confirmResetPassword.submission.resendCode:invocation[0]'
      | 'error.platform.resetPasswordActor.confirmResetPassword.submission.resendCode:invocation[0]'
      | 'error.platform.resetPasswordActor.confirmResetPassword.submission.pending:invocation[0]'
      | 'RESEND'
      | 'done.invoke.resetPasswordActor.confirmResetPassword.submission.validate:invocation[0]';
    setUsername: 'SUBMIT';
  };
  internalEvents: {
    'error.platform.resetPasswordActor.resetPassword.submit:invocation[0]': {
      type: 'error.platform.resetPasswordActor.resetPassword.submit:invocation[0]';
      data: unknown;
    };
    'error.platform.resetPasswordActor.confirmResetPassword.submission.resendCode:invocation[0]': {
      type: 'error.platform.resetPasswordActor.confirmResetPassword.submission.resendCode:invocation[0]';
      data: unknown;
    };
    'error.platform.resetPasswordActor.confirmResetPassword.submission.pending:invocation[0]': {
      type: 'error.platform.resetPasswordActor.confirmResetPassword.submission.pending:invocation[0]';
      data: unknown;
    };
    'done.invoke.resetPasswordActor.confirmResetPassword.validation.pending:invocation[0]': {
      type: 'done.invoke.resetPasswordActor.confirmResetPassword.validation.pending:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.resetPasswordActor.confirmResetPassword.submission.validate:invocation[0]': {
      type: 'done.invoke.resetPasswordActor.confirmResetPassword.submission.validate:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.resetPasswordActor.confirmResetPassword.validation.pending:invocation[0]': {
      type: 'error.platform.resetPasswordActor.confirmResetPassword.validation.pending:invocation[0]';
      data: unknown;
    };
    'error.platform.resetPasswordActor.confirmResetPassword.submission.validate:invocation[0]': {
      type: 'error.platform.resetPasswordActor.confirmResetPassword.submission.validate:invocation[0]';
      data: unknown;
    };
    'done.invoke.resetPasswordActor.confirmResetPassword.submission.pending:invocation[0]': {
      type: 'done.invoke.resetPasswordActor.confirmResetPassword.submission.pending:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.resetPasswordActor.confirmResetPassword.submission.resendCode:invocation[0]': {
      type: 'done.invoke.resetPasswordActor.confirmResetPassword.submission.resendCode:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    '': { type: '' };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    resetPassword:
      | 'done.invoke.resetPasswordActor.resetPassword.submit:invocation[0]'
      | 'done.invoke.resetPasswordActor.confirmResetPassword.submission.resendCode:invocation[0]';
    validateFields:
      | 'done.invoke.resetPasswordActor.confirmResetPassword.validation.pending:invocation[0]'
      | 'done.invoke.resetPasswordActor.confirmResetPassword.submission.validate:invocation[0]';
    confirmResetPassword: 'done.invoke.resetPasswordActor.confirmResetPassword.submission.pending:invocation[0]';
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    resetPassword: 'SUBMIT' | 'RESEND';
    validateFields: 'CHANGE' | 'BLUR' | 'SUBMIT';
    confirmResetPassword: 'done.invoke.resetPasswordActor.confirmResetPassword.submission.validate:invocation[0]';
  };
  eventsCausingGuards: {
    shouldAutoConfirmReset: '';
  };
  eventsCausingDelays: {};
  matchesStates:
    | 'init'
    | 'resetPassword'
    | 'resetPassword.edit'
    | 'resetPassword.submit'
    | 'confirmResetPassword'
    | 'confirmResetPassword.validation'
    | 'confirmResetPassword.validation.pending'
    | 'confirmResetPassword.validation.valid'
    | 'confirmResetPassword.validation.invalid'
    | 'confirmResetPassword.submission'
    | 'confirmResetPassword.submission.idle'
    | 'confirmResetPassword.submission.validate'
    | 'confirmResetPassword.submission.resendCode'
    | 'confirmResetPassword.submission.pending'
    | 'resolved'
    | {
        resetPassword?: 'edit' | 'submit';
        confirmResetPassword?:
          | 'validation'
          | 'submission'
          | {
              validation?: 'pending' | 'valid' | 'invalid';
              submission?: 'idle' | 'validate' | 'resendCode' | 'pending';
            };
      };
  tags: 'pending';
}
