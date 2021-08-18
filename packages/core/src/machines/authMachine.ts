import { assign, createMachine, forwardTo, spawn } from 'xstate';
import { Auth, Amplify } from 'aws-amplify';
import { AuthContext, AuthEvent } from '../types';
import {
  signInActor,
  signUpActor,
  signOutActor,
  resetPasswordActor,
} from './actors';
import { stopActor } from './actions';

export const authMachine = createMachine<AuthContext, AuthEvent>(
  {
    id: 'auth',
    initial: 'idle',
    context: {
      user: undefined,
      config: undefined,
      actorRef: undefined,
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
          RESET_PASSWORD: 'resetPassword',
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
          'done.invoke.signUpActor': {
            target: 'signIn',
            actions: 'setUser',
          },
        },
      },
      resetPassword: {
        entry: 'spawnResetPasswordActor',
        exit: stopActor('resetPasswordActor'),
        on: {
          SIGN_IN: 'signIn',
          'done.invoke.resetPasswordActor': 'signIn',
        },
      },
      signOut: {
        entry: 'spawnSignOutActor',
        exit: [stopActor('signOutActor'), 'clearUser'],
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
      SIGN_IN: { actions: 'forwardToActor' },
    },
  },
  {
    actions: {
      forwardToActor: forwardTo((context) => context.actorRef),
      setUser: assign({
        user: (_, event) => event.data.user || event.data,
      }),
      clearUser: assign({
        user: undefined,
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
        actorRef: (context, event) => {
          const actor = signUpActor.withContext({
            authAttributes: event.data?.authAttributes ?? {},
            intent: event.data?.intent,
            formValues: {},
            validationError: {},
            login_mechanisms: context.config?.login_mechanisms,
          });
          return spawn(actor, { name: 'signUpActor' });
        },
      }),
      spawnResetPasswordActor: assign({
        actorRef: (context, event) => {
          const actor = resetPasswordActor.withContext({
            formValues: {},
          });
          return spawn(actor, { name: 'resetPasswordActor' });
        },
      }),
      spawnSignOutActor: assign({
        actorRef: (context) => {
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
