import { createMachine } from 'xstate';

export const confirmSignUpMachine = createMachine({
  initial: 'edit',
  exit: ['clearFormValues', 'clearError'],
  onDone: 'idle',
  states: {
    edit: {
      initial: 'clean',
      states: {
        clean: {},
        error: {},
      },
      on: {
        SUBMIT: 'submit',
        RESEND: 'resend',
        SIGN_IN: '#auth.signIn',
        INPUT: { actions: 'handleInput' },
      },
    },
    submit: {
      invoke: {
        src: 'confirmSignUp',
        onDone: {
          target: 'resolved',
        },
        onError: {
          actions: 'setRemoteError',
          target: 'rejected',
        },
      },
    },
    resend: {
      invoke: {
        src: 'resendConfirmationCode',
        onDone: {
          target: 'edit',
        },
        onError: {
          actions: 'setRemoteError',
          target: 'rejected',
        },
      },
    },
    rejected: {
      always: 'edit.error',
    },
    resolved: {
      type: 'final',
    },
  },
});
