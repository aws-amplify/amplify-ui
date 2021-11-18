import { assign, createMachine, forwardTo, spawn, send } from 'xstate';

import { AuthContext, AuthEvent } from '../../types';
import { resetPasswordActor, signInActor, signOutActor } from './actors';
import { defaultServices } from './defaultServices';
import { createSignUpMachine } from './signUp';

const DEFAULT_COUNTRY_CODE = '+1';

export type AuthenticatorMachineOptions = AuthContext['config'] & {
  initialState?: 'signIn' | 'signUp' | 'resetPassword';
  services?: Partial<typeof defaultServices>;
};

export function createAuthenticatorMachine({
  initialState = 'signIn',
  loginMechanisms,
  signUpAttributes,
  socialProviders,
  services: customServices,
}: AuthenticatorMachineOptions) {
  const services = {
    ...defaultServices,
    ...customServices,
  };

  return createMachine<AuthContext, AuthEvent>(
    {
      id: 'authenticator',
      initial: 'spawnActors',
      context: {
        user: undefined,
        config: {
          loginMechanisms,
          signUpAttributes,
          socialProviders,
        },
        actorRef: undefined,
      },
      states: {
        // See: https://xstate.js.org/docs/guides/communication.html#invoking-promises
        spawnActors: {
          always: {
            actions: 'spawnAllActors',
            target: 'idle',
          },
        },
        idle: {
          invoke: [
            {
              // TODO Wait for Auth to be configured
              src: 'getCurrentUser',
              onDone: {
                actions: 'setUser',
                target: 'authenticated',
              },
              onError: initialState,
            },
            {
              src: 'getAmplifyConfig',
              onDone: {
                actions: 'applyAmplifyConfig',
              },
            },
          ],
        },
        signIn: {
          entry: ['useSignInActor', 'initSignInActor'],
          on: {
            SIGN_UP: 'signUp',
            RESET_PASSWORD: 'resetPassword',
            'done.invoke.signInActor': [
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
          entry: ['useSignUpActor', 'initSignUpActor'],
          on: {
            SIGN_IN: 'signIn',
            'done.invoke.signUpActor': {
              target: 'idle',
              actions: 'setUser',
            },
          },
        },
        resetPassword: {
          entry: ['useResetPasswordActor', 'initResetPasswordActor'],
          on: {
            SIGN_IN: 'signIn',
            'done.invoke.resetPasswordActor': 'signIn',
          },
        },
        signOut: {
          entry: ['useSignOutActor', 'initSignOutActor'],
          exit: 'clearUser',
          on: { 'done.invoke.signOutActor': 'signIn' },
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
        INIT: { actions: 'forwardToActor' },
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
        applyAmplifyConfig: assign({
          config(context, event) {
            // The CLI uses uppercased constants in `aws-exports.js`, while `parameters.json` are lowercase.
            // We use lowercase to be consistent with previous versions' values.
            const cliLoginMechanisms =
              event.data.aws_cognito_username_attributes?.map((s) =>
                s.toLowerCase()
              ) ?? [];

            const cliVerificationMechanisms =
              event.data.aws_cognito_verification_mechanisms?.map((s) =>
                s.toLowerCase()
              ) ?? [];

            const cliSignUpAttributes =
              event.data.aws_cognito_signup_attributes?.map((s) =>
                s.toLowerCase()
              ) ?? [];

            const cliSocialProviders =
              event.data.aws_cognito_social_providers?.map((s) =>
                s.toLowerCase()
              ) ?? [];

            // By default, Cognito assumes `username`, so there isn't a different username attribute like `email`.
            // We explicitly add it as a login mechanism to be consistent with Admin UI's language.
            if (cliLoginMechanisms.length === 0) {
              cliLoginMechanisms.push('username');
            }

            // Prefer explicitly configured settings over default CLI values
            return {
              loginMechanisms: loginMechanisms ?? cliLoginMechanisms,
              signUpAttributes:
                signUpAttributes ??
                Array.from(
                  new Set([
                    ...cliVerificationMechanisms,
                    ...cliSignUpAttributes,
                  ])
                ),
              socialProviders: socialProviders ?? cliSocialProviders.sort(),
            };
          },
        }),
        spawnAllActors: assign({
          actors: () => {
            const actors = {
              signInActor: spawn(signInActor, { name: 'signInActor' }),
              signUpActor: spawn(createSignUpMachine({ services }), {
                name: 'signUpActor',
              }),
              resetPasswordActor: spawn(resetPasswordActor, {
                name: 'resetPasswordActor',
              }),
              signOutActor: spawn(signOutActor, { name: 'signOutActor' }),
            };
            return actors;
          },
        }),
        useSignInActor: assign({
          actorRef: (context, event) => {
            return context.actors.signInActor;
          },
        }),
        useSignUpActor: assign({
          actorRef: (context) => context.actors.signUpActor,
        }),
        useResetPasswordActor: assign({
          actorRef: (context) => {
            return context.actors.resetPasswordActor;
          },
        }),
        useSignOutActor: assign({
          actorRef: (context) => context.actors.signOutActor,
        }),
        initSignInActor: send((context, event) => {
          const data = {
            authAttributes: event.data?.authAttributes,
            user: event.data?.user,
            intent: event.data?.intent,
            country_code: DEFAULT_COUNTRY_CODE,
            formValues: {},
            validationError: {},
            loginMechanisms: context.config?.loginMechanisms,
            socialProviders: context.config?.socialProviders,
          };
          return { type: 'INIT', data };
        }),
        initSignUpActor: send((context, event) => {
          const data = {
            authAttributes: event.data?.authAttributes ?? {},
            country_code: DEFAULT_COUNTRY_CODE,
            intent: event.data?.intent,
            formValues: {},
            validationError: {},
            loginMechanisms: context.config?.loginMechanisms,
            socialProviders: context.config?.socialProviders,
          };
          return { type: 'INIT', data };
        }),
        initResetPasswordActor: send((context, event) => {
          const data = {
            authAttributes: event.data?.authAttributes ?? {},
            country_code: DEFAULT_COUNTRY_CODE,
            intent: event.data?.intent,
            formValues: {},
            validationError: {},
            loginMechanisms: context.config?.loginMechanisms,
            socialProviders: context.config?.socialProviders,
          };
          return { type: 'INIT', data };
        }),
        initSignOutActor: send((context, event) => {
          const data = {
            user: context.user,
          };
          return { type: 'INIT', data };
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
      services,
    }
  );
}
