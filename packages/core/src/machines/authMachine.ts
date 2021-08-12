import { assign, createMachine, forwardTo } from 'xstate';
import { Auth, Amplify } from 'aws-amplify';
import { AuthContext, AuthEvent } from '../types';
import { inspect } from '@xstate/inspect';
import { signInMachine, signUpMachine } from './actors';
import { stop } from 'xstate/lib/actions';
import { spawnActor, stopActor } from './actions';

// TODO: Remove this before it's merged.
if (typeof window !== 'undefined') {
  inspect({
    // options
    // url: 'https://statecharts.io/inspect', // (default)
    iframe: false, // open in new window
  });
}

export const authMachine = createMachine<AuthContext, AuthEvent>(
  {
    id: 'auth',
    initial: 'idle',
    context: {
      remoteError: '',
      formValues: {},
      validationError: {},
      user: undefined,
      session: undefined,
    },
    states: {
      // See: https://xstate.js.org/docs/guides/communication.html#invoking-promises
      idle: {
        invoke: [
          {
            // TODO Wait for Auth to be configured
            src: 'getCurrentUser',
            onDone: {
              actions: 'setUser',
              target: 'authenticated',
            },
            onError: 'signIn',
          },
          {
            src: 'getAmplifyConfig',
            onDone: {
              actions: 'setAuthConfig',
            },
          },
        ],
      },
      signIn: {
        entry: spawnActor(signInMachine, 'signInActor'),
        exit: stopActor('signInActor'),
        on: {
          SIGN_UP: 'signUp',
          DONE: 'signUp',
        },
      },
      signUp: {
        entry: spawnActor(signUpMachine, 'signUpActor'),
        exit: stopActor('signUpActor'),
        on: {
          SIGN_IN: 'signIn',
        },
      },
      authenticated: {
        on: {
          SIGN_OUT: 'signOut',
        },
      },
      confirmSignUp: {},
      signOut: {
        initial: 'pending',
        onDone: 'idle',
        states: {
          pending: {
            invoke: {
              src: 'signOut',
              onDone: {
                actions: 'setUser',
                target: 'resolved',
              },
              // See: https://xstate.js.org/docs/guides/communication.html#the-invoke-property
              onError: 'rejected',
            },
          },
          rejected: {
            // TODO Why would signOut be rejected?
            type: 'final',
          },
          resolved: {
            type: 'final',
          },
        },
      },
    },
    on: {
      CHANGE: {
        actions: 'forwardToActor',
      },
      SUBMIT: {
        actions: 'forwardToActor',
      },
      FEDERATED_SIGN_IN: {
        actions: 'forwardToActor',
      },
    },
  },
  {
    actions: {
      forwardToActor: forwardTo((context) => context.actorRef),
      setUser: assign({
        user(_, event) {
          return event.data?.user || event.data;
        },
      }),
      setAuthConfig: assign({
        config(_, event) {
          return event.data.auth;
        },
      }),
    },
    services: {
      async getCurrentUser() {
        return Auth.currentAuthenticatedUser();
      },
      async getAmplifyConfig() {
        return Amplify.configure();
      },
      async signOut() {
        await Auth.signOut(/* global? */);
      },
    },
  }
);
