import {
  assign,
  createMachine,
  forwardTo,
  interpret,
  Interpreter,
  spawn,
} from 'xstate';

import {
  AuthContext,
  AuthEvent,
  CognitoUserAmplify,
  ServicesContext,
  AuthServices,
} from '../../types';
import { stopActor } from './actions';
import { resetPasswordActor, signInActor, signOutActor } from './actors';
import { defaultServices } from './defaultServices';
import { createSignUpMachine } from './signUp';

const DEFAULT_COUNTRY_CODE = '+1';

export type AuthenticatorMachineOptions = AuthContext['config'] & {
  services?: AuthContext['services'];
};

export const createAuthenticatorMachine = () =>
  createMachine(
    {
      schema: {
        context: {} as AuthContext,
        events: {} as AuthEvent,
        services: {} as AuthServices,
      },
      id: 'authenticator',
      initial: 'idle',
      tsTypes: {} as import('./index.typegen').Typegen0,
      context: {
        user: undefined,
        config: {},
        services: {},
        actorRef: undefined,
      },
      states: {
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
              src: 'getCurrentUser',
              onDone: {
                actions: 'setUser',
                target: 'authenticated',
              },
              onError: [
                {
                  target: 'signUp',
                  cond: 'shouldSignUp',
                },
                {
                  target: 'resetPassword',
                  cond: 'shouldResetPassword',
                },
                { target: 'signIn' },
              ],
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
          initial: 'spawnActor',
          states: {
            spawnActor: {
              always: { actions: 'spawnSignInActor', target: 'runActor' },
            },
            runActor: {
              entry: 'clearActorDoneData',
              exit: 'stopSignInActor',
            },
          },
          on: {
            SIGN_UP: 'signUp',
            RESET_PASSWORD: 'resetPassword',
            'done.invoke.signInActor': [
              {
                target: 'signUp',
                actions: 'setActorDoneData',
                cond: 'shouldRedirectToSignUp',
              },
              {
                target: 'resetPassword',
                actions: 'setActorDoneData',
                cond: 'shouldRedirectToResetPassword',
              },
              {
                target: 'authenticated',
                actions: 'setActorDoneData',
              },
            ],
          },
        },
        signUp: {
          initial: 'spawnActor',
          states: {
            spawnActor: {
              always: { actions: 'spawnSignUpActor', target: 'runActor' },
            },
            runActor: {
              entry: 'clearActorDoneData',
              exit: 'stopSignUpActor',
            },
          },
          on: {
            SIGN_IN: 'signIn',
            'done.invoke.signUpActor': {
              target: 'setup',
              actions: 'setActorDoneData',
            },
          },
        },
        resetPassword: {
          initial: 'spawnActor',
          states: {
            spawnActor: {
              always: {
                actions: 'spawnResetPasswordActor',
                target: 'runActor',
              },
            },
            runActor: {
              entry: 'clearActorDoneData',
              exit: 'stopResetPasswordActor',
            },
          },
          on: {
            SIGN_IN: 'signIn',
            'done.invoke.resetPasswordActor': {
              target: 'signIn',
              actions: 'setActorDoneData',
            },
          },
        },
        signOut: {
          initial: 'spawnActor',
          states: {
            spawnActor: {
              always: { actions: 'spawnSignOutActor', target: 'runActor' },
            },
            runActor: {
              entry: 'clearActorDoneData',
              exit: ['stopSignOutActor', 'clearUser'],
            },
          },
          on: {
            'done.invoke.signOutActor': 'signIn',
          },
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
        configure: assign((_, event) => {
          const { services: customServices, ...config } = event.data;
          return {
            services: { ...defaultServices, ...customServices },
            config,
          };
        }),
        setUser: assign({
          user: (_, event) => event.data as CognitoUserAmplify,
        }),
        setActorDoneData: assign({
          actorDoneData: (_, event) => ({
            authAttributes: { ...event.data.authAttributes },
            intent: event.data.intent,
          }),
          user: (_, event) => event.data.user,
        }),
        clearUser: assign({ user: undefined }),
        clearActorDoneData: assign({ actorDoneData: undefined }),
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
          actorRef: (context, _) => {
            const { services } = context;

            const actor = signInActor({ services }).withContext({
              authAttributes: context.actorDoneData?.authAttributes,
              user: context.user,
              intent: context.actorDoneData?.intent,
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
          actorRef: (context, _) => {
            const { services } = context;
            const actor = createSignUpMachine({ services }).withContext({
              authAttributes: context.actorDoneData?.authAttributes ?? {},
              country_code: DEFAULT_COUNTRY_CODE,
              intent: context.actorDoneData?.intent,
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
          actorRef: (context, _) => {
            const { services } = context;
            const actor = resetPasswordActor({ services }).withContext({
              formValues: {},
              touched: {},
              intent: context.actorDoneData?.intent,
              username: context.actorDoneData?.authAttributes?.username,
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
        stopSignInActor: stopActor('signInActor'),
        stopSignUpActor: stopActor('signUpActor'),
        stopResetPasswordActor: stopActor('resetPasswordActor'),
        stopSignOutActor: stopActor('signOutActor'),
      },
      guards: {
        shouldSignUp: (context) => {
          return context.config.initialState === 'signUp';
        },
        shouldResetPassword: (context) => {
          return context.config.initialState === 'resetPassword';
        },
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
        getCurrentUser: async (context, _) => {
          const { services } = context;
          return services.getCurrentUser();
        },
        getAmplifyConfig: (context, _) => {
          const { services } = context;
          return services.getAmplifyConfig();
        },
      },
    }
  );

/**
 * Utility types that describes the AuthMachine
 */

const interpretAuthMachine = () => interpret(createAuthenticatorMachine());

export type AuthInterpreter = ReturnType<typeof interpretAuthMachine>;

export type AuthMachineState = AuthInterpreter['state'];
export type AuthMachineSend = AuthInterpreter['send'];
