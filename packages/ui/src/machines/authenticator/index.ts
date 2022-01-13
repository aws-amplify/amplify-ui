import { assign, createMachine, forwardTo, spawn } from 'xstate';

import { AuthContext, AuthEvent, ServicesContext } from '../../types';
import { stopActor } from './actions';
import { resetPasswordActor, signInActor, signOutActor } from './actors';
import { defaultServices } from './defaultServices';
import { createSignUpMachine } from './signUp';

const DEFAULT_COUNTRY_CODE = '+1';

export type AuthenticatorMachineOptions = AuthContext['config'] & {
  services?: AuthContext['services'];
};

export function createAuthenticatorMachine() {
  return createMachine<AuthContext, AuthEvent>(
    {
      id: 'authenticator',
      initial: 'idle',
      context: {
        user: undefined,
        config: {},
        services: {},
        actorRef: undefined,
      },
      states: {
        // See: https://xstate.js.org/docs/guides/communication.html#invoking-promises
        idle: {
          on: {
            INIT: {
              target: 'setup',
              actions: 'configure',
            },
          },
        },
        setup: {
          invoke: [
            {
              // TODO Wait for Auth to be configured
              src: (context, _) => context.services.getCurrentUser(),
              onDone: {
                actions: 'setUser',
                target: 'authenticated',
              },
              onError: [
                {
                  target: 'signUp',
                  cond: (context) => context.config.initialState === 'signUp',
                },
                {
                  target: 'resetPassword',
                  cond: (context) =>
                    context.config.initialState === 'resetPassword',
                },
                { target: 'signIn' },
              ],
            },
            {
              src: (context, _) => context.services.getAmplifyConfig(),
              onDone: {
                actions: 'applyAmplifyConfig',
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
          entry: 'spawnSignUpActor',
          exit: stopActor('signUpActor'),
          on: {
            SIGN_IN: 'signIn',
            'done.invoke.signUpActor': {
              target: 'idle',
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
          on: { 'done.invoke.signOutActor': 'signIn' },
        },
        authenticated: {
          on: { SIGN_OUT: 'signOut' },
        },
      },
      on: {
        CHANGE: { actions: 'forwardToActor' },
        BLUR: { actions: 'forwardToActor' },
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

            // Prefer explicitly configured settings over default CLI values\

            const {
              loginMechanisms,
              signUpAttributes,
              socialProviders,
              initialState,
            } = context.config;
            console.log(context.config);
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
              initialState,
            };
          },
        }),
        spawnSignInActor: assign({
          actorRef: (context, event) => {
            const { services } = context;
            const actor = signInActor({ services }).withContext({
              authAttributes: event.data?.authAttributes,
              user: event.data?.user,
              intent: event.data?.intent,
              country_code: DEFAULT_COUNTRY_CODE,
              formValues: {},
              touched: {},
              validationError: {},
              loginMechanisms: context.config?.loginMechanisms,
              socialProviders: context.config?.socialProviders,
            });
            return spawn(actor, { name: 'signInActor' });
          },
        }),
        spawnSignUpActor: assign({
          actorRef: (context, event) => {
            const { services } = context;
            console.log(services);
            const actor = createSignUpMachine({ services }).withContext({
              authAttributes: event.data?.authAttributes ?? {},
              country_code: DEFAULT_COUNTRY_CODE,
              intent: event.data?.intent,
              formValues: {},
              touched: {},
              validationError: {},
              loginMechanisms: context.config?.loginMechanisms,
              socialProviders: context.config?.socialProviders,
            });
            return spawn(actor, { name: 'signUpActor' });
          },
        }),
        spawnResetPasswordActor: assign({
          actorRef: (context, event) => {
            const { services } = context;
            const actor = resetPasswordActor({ services }).withContext({
              formValues: {},
              touched: {},
              intent: event.data?.intent,
              username: event.data?.authAttributes?.username,
              validationError: {},
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
        configure: assign((_, event) => {
          const { services: customServices, ...config } = event.data;
          return {
            services: { ...defaultServices, ...customServices },
            config,
          };
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
    }
  );
}
