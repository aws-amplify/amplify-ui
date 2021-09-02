import { assign, createMachine, forwardTo, spawn } from 'xstate';
import { Auth, Amplify } from 'aws-amplify';
import { AuthContext, AuthEvent } from '../types';
import {
  signInMachine,
  signUpMachine,
  signOutMachine,
  resetPasswordMachine,
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
        entry: 'spawnSignInMachine',
        exit: stopActor('signInMachine'),
        on: {
          SIGN_UP: 'signUp',
          RESET_PASSWORD: 'resetPassword',
          'done.invoke.signInMachine': [
            {
              target: 'signUp',
              cond: 'shouldRedirectToSignUp',
            },
            {
              target: 'resetPassword',
              cond: 'shouldRedirectToResetPassword',
            },
            {
              target: 'authenticated',
              actions: 'setUser',
            },
          ],
        },
      },
      signUp: {
        entry: 'spawnSignUpMachine',
        exit: stopActor('signUpMachine'),
        on: {
          SIGN_IN: 'signIn',
          'done.invoke.signUpMachine': {
            target: 'signIn',
            actions: 'setUser',
          },
        },
      },
      resetPassword: {
        entry: 'spawnResetPasswordMachine',
        exit: stopActor('resetPasswordMachine'),
        on: {
          SIGN_IN: 'signIn',
          'done.invoke.resetPasswordMachine': 'signIn',
        },
      },
      signOut: {
        entry: 'spawnSignOutMachine',
        exit: [stopActor('signOutMachine'), 'clearUser'],
        on: { 'done.invoke.signOutMachine': 'idle' },
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
      SKIP: { actions: 'forwardToActor' },
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
      spawnSignInMachine: assign({
        actorRef: (_, event) => {
          const actor = signInMachine.withContext({
            authAttributes: event.data?.authAttributes,
            user: event.data?.user,
            intent: event.data?.intent,
            formValues: {},
            validationError: {},
          });
          return spawn(actor, { name: 'signInMachine' });
        },
      }),
      spawnSignUpMachine: assign({
        actorRef: (context, event) => {
          const actor = signUpMachine.withContext({
            authAttributes: event.data?.authAttributes ?? {},
            intent: event.data?.intent,
            formValues: {},
            validationError: {},
            login_mechanisms: context.config?.login_mechanisms,
          });
          return spawn(actor, { name: 'signUpMachine' });
        },
      }),
      spawnResetPasswordMachine: assign({
        actorRef: (context, event) => {
          const actor = resetPasswordMachine.withContext({
            formValues: {},
            intent: event.data?.intent,
            username: event.data?.authAttributes?.username,
            validationError: {},
          });
          return spawn(actor, { name: 'resetPasswordMachine' });
        },
      }),
      spawnSignOutMachine: assign({
        actorRef: (context) => {
          const actor = signOutMachine.withContext({
            user: context.user,
          });
          return spawn(actor, { name: 'signOutMachine' });
        },
      }),
    },
    guards: {
      shouldRedirectToSignUp: (_, event): boolean => {
        if (!event.data?.intent) return false;
        return event.data.intent === 'confirmSignUp';
      },
      shouldRedirectToResetPassword: (_, event): boolean => {
        if (!event.data?.intent) return false;
        return event.data.intent === 'confirmPasswordReset';
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
