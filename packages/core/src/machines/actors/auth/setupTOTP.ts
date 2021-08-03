import { createMachine } from 'xstate';

export const setupTotpMachine = createMachine({
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
      invoke: {
        src: 'verifyTotpToken',
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
