import { assign, createMachine, forwardTo, spawn } from 'xstate';
import { Auth, Amplify } from 'aws-amplify';
import { AuthContext, AuthEvent } from '../types';
import { inspect } from '@xstate/inspect';
import { signInActor, signUpActor } from './actors';
import { stopActor } from './actions';

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
        entry: 'spawnSignInActor',
        exit: stopActor('signInActor'),
        on: {
          SIGN_UP: 'signUp',
          DONE: 'authenticated',
        },
      },
      signUp: {
        entry: 'spawnSignUpActor',
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
      spawnSignInActor: assign({
        actorRef: (_context, event) => {
          const actor = signInActor.withContext({
            authAttributes: event.data?.authAttributes,
          });
          return spawn(actor, 'signInActor');
        },
      }),
      spawnSignUpActor: assign({
        actorRef: (context, event) => {
          const actor = signUpActor.withContext({
            authAttributes: event.data?.authAttributes,
            config: context.config,
          });
          return spawn(actor, 'signUpActor');
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
