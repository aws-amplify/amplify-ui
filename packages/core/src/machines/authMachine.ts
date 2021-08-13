import { assign, createMachine, forwardTo, spawn } from 'xstate';
import { Auth, Amplify } from 'aws-amplify';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { AuthContext, AuthEvent } from '../types';
import { inspect } from '@xstate/inspect';
import { signInActor, signUpActor, signOutActor } from './actors';
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
    context: {},
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
          'done.invoke.signInActor': [
            {
              target: 'signUp',
              cond: 'shouldRedirectToSignUp',
            },
            {
              target: 'authenticated',
              actions: 'setUser',
            },
          ],
        },
      },
      signUp: {
        entry: 'spawnSignUpActor',
        exit: stopActor('signUpActor'),
        on: {
          SIGN_IN: 'signIn',
          'done.invoke.signUpActor': 'signIn',
        },
      },
      signOut: {
        entry: 'spawnSignOutActor',
        exit: stopActor('signOutActor'),
        on: { 'done.invoke.signOutActor': 'idle' },
      },
      authenticated: {
        on: { SIGN_OUT: 'signOut' },
      },
    },
    on: {
      CHANGE: { actions: 'forwardToActor' },
      SUBMIT: { actions: 'forwardToActor' },
      FEDERATED_SIGN_IN: { actions: 'forwardToActor' },
      RESEND: { actions: 'forwardToActor' },
      SIGN_OUT: { actions: 'forwardToActor' },
    },
  },
  {
    actions: {
      forwardToActor: forwardTo((context) => context.actorRef),
      setUser: assign({
        user: (_, event) => event.data.user || event.data,
      }),
      setAuthConfig: assign({
        config(_, event) {
          return event.data.auth;
        },
      }),
      spawnSignInActor: assign({
        actorRef: (_, event) => {
          const actor = signInActor.withContext({
            authAttributes: event.data?.authAttributes,
            user: event.data?.user,
            intent: event.data?.intent,
            formValues: {},
            validationError: {},
          });
          return spawn(actor, { name: 'signInActor' });
        },
      }),
      spawnSignUpActor: assign({
        actorRef: (_, event) => {
          const actor = signUpActor.withContext({
            authAttributes: event.data?.authAttributes,
            intent: event.data?.intent,
            formValues: {},
            validationError: {},
          });
          return spawn(actor, { name: 'signUpActor' });
        },
      }),
      spawnSignOutActor: assign({
        actorRef: (context, event) => {
          const actor = signOutActor.withContext({
            user: context.user,
          });
          return spawn(actor, { name: 'signOutActor' });
        },
      }),
    },
    guards: {
      shouldRedirectToSignUp: (_, event): boolean => {
        if (!event.data?.intent) return false;
        return event.data.intent === 'confirmSignUp';
      },
    },
    services: {
      async getCurrentUser() {
        return Auth.currentAuthenticatedUser();
      },
      async getAmplifyConfig() {
        return Amplify.configure();
      },
    },
  }
);
