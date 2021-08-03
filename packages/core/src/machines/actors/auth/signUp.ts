import { createMachine } from 'xstate';

export const signUpMachine = createMachine({
  type: 'parallel',
  exit: ['clearError'],
  states: {
    validation: {
      initial: 'pending',
      states: {
        pending: {
          invoke: {
            src: 'validateFields',
            onDone: {
              target: 'valid',
              actions: 'clearValidationError',
            },
            onError: {
              target: 'invalid',
              actions: 'setFieldErrors',
            },
          },
        },
        valid: {},
        invalid: {},
      },
      on: {
        CHANGE: {
          actions: 'handleInput',
          target: '.pending',
        },
      },
    },
    submission: {
      initial: 'idle',
      onDone: '#auth.confirmSignUp',
      states: {
        idle: {
          on: {
            SUBMIT: 'validate',
          },
        },
        validate: {
          invoke: {
            src: 'validateFields',
            onDone: {
              target: 'pending',
              actions: 'clearValidationError',
            },
            onError: {
              target: 'idle',
              actions: 'setFieldErrors',
            },
          },
        },
        pending: {
          invoke: {
            src: 'signUp',
            onDone: { target: 'done', actions: 'setUser' },
            onError: {
              target: 'idle',
              actions: 'setRemoteError',
            },
          },
        },
        done: { type: 'final' },
      },
    },
  },
  on: {
    SIGN_IN: '#auth.signIn',
    FEDERATED_SIGN_IN: '#auth.federatedSignIn',
  },
});
