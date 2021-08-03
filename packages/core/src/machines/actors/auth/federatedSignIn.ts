import { createMachine } from 'xstate';

export const federatedSignInMachine = createMachine({
  initial: 'federatedSignIn',
  entry: 'clearError',

  states: {
    federatedSignIn: {
      invoke: {
        src: 'federatedSignIn',
        onDone: [
          {
            actions: 'setUser',
            target: 'confirmFederatedSignIn',
          },
        ],
        onError: [
          {
            actions: 'setRemoteError',
            target: 'rejected',
          },
        ],
      },
    },
    edit: {
      initial: 'clean',
      states: {
        clean: {},
        error: {},
      },
    },
    confirmFederatedSignIn: {
      entry: 'clearError',
      invoke: {
        src: 'confirmFederatedSignIn',
        onDone: [
          {
            actions: 'setUser',
            target: 'resolved',
          },
        ],
        onError: [
          {
            actions: 'setRemoteError',
            target: 'rejected',
          },
        ],
      },
    },
    rejected: {
      // TODO Set errors and go back ?
      always: 'edit.error',
    },
    resolved: {
      type: 'final',
    },
  },
});
