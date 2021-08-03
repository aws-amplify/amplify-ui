import { createMachine } from 'xstate';

export const forceNewPasswordMachine = createMachine({
  initial: 'edit',
  exit: ['clearFormValues, clearError'],
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
        SIGN_IN: '#auth.signIn',
        INPUT: { actions: 'handleInput' },
      },
    },
    submit: {
      entry: 'clearError',
      invoke: {
        src: 'forceNewPassword',
        onDone: {
          actions: ['setUser', 'clearChallengeName'],
          target: 'resolved',
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
