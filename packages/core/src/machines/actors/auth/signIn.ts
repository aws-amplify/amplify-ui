import { handleInput } from '../../actions';
import { createMachine, forwardTo } from 'xstate';

export const signInMachine = createMachine({
  initial: 'edit',
  context: {
    remoteError: '',
    formValues: {},
    validationError: {},
  },
  exit: ['clearError'],
  // onDone: '',
  id: 'signIn',
  states: {
    edit: {
      initial: 'clean',
      states: {
        clean: {},
        error: {},
      },
      on: {
        SUBMIT: 'submit',
        CHANGE: { actions: handleInput },
        // FEDERATED_SIGN_IN: '#auth.federatedSignIn',
      },
    },
    submit: {
      entry: 'clearError',
      invoke: {
        src: 'signIn',
        onDone: [
          // {
          //   cond: 'shouldSetupTOTP',
          //   actions: ['setUser', 'setChallengeName'],
          //   target: '#auth.setupTOTP',
          // },
          // {
          //   cond: 'shouldConfirmSignIn',
          //   actions: ['setUser', 'setChallengeName'],
          //   target: '#auth.confirmSignIn',
          // },
          // {
          //   cond: 'shouldForceChangePassword',
          //   actions: ['setUser', 'setChallengeName'],
          //   target: '#auth.forceNewPassword',
          // },
          {
            actions: 'setUser',
            target: 'resolved',
          },
        ],
        onError: [
          // {
          //   cond: 'shouldRedirectToConfirmSignUp',
          //   actions: ['setUser'],
          //   target: '#auth.confirmSignUp',
          // },
          {
            actions: 'setRemoteError',
            target: 'rejected',
          },
        ],
      },
    },

    resolved: {
      exit: ['clearFormValues'],
      type: 'final',
    },
    rejected: {
      always: 'edit.error',
    },
  },
});
