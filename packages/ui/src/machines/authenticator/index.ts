import { assign, createMachine, forwardTo, spawn } from 'xstate';
import { actions } from 'xstate';

import {
  AuthContext,
  AuthEvent,
  AmplifyUser,
  AuthFormFields,
  PasswordSettings,
} from '../../types';
import { groupLog, isEmptyObject } from '../../utils';

import { stopActor } from './actions';
import { resetPasswordActor, signInActor, signOutActor } from './actors';
import { defaultServices } from './defaultServices';
import { createSignUpMachine } from './signUp';
import { getAuthenticatorConfig } from './getAuthenticatorConfig';

const { choose } = actions;
const DEFAULT_COUNTRY_CODE = '+1';

export type AuthenticatorMachineOptions = AuthContext['config'] & {
  services?: AuthContext['services'];
};

// setup step waits for ui to emit INIT action to proceed to configure
const LEGACY_WAIT_CONFIG = {
  on: {
    INIT: {
      actions: ['configure', 'setHasSetup'],
      target: 'applyConfig',
    },
  },
};

// setup step proceeds directly to configure
const NEXT_WAIT_CONFIG = {
  always: {
    actions: ['configure', 'setHasSetup'],
    target: 'applyConfig',
  },
};

export function createAuthenticatorMachine(
  options?: AuthenticatorMachineOptions & {
    useNextWaitConfig?: boolean;
  }
) {
  const { useNextWaitConfig, ...overrideConfigServices } = options ?? {};
  const waitConfig = useNextWaitConfig ? NEXT_WAIT_CONFIG : LEGACY_WAIT_CONFIG;
  return createMachine<AuthContext, AuthEvent>(
    {
      id: 'authenticator',
      initial: 'idle',
      context: {
        user: undefined,
        config: {},
        services: defaultServices,
        actorRef: undefined,
        hasSetup: false,
      },
      predictableActionArguments: true,
      states: {
        // See: https://xstate.js.org/docs/guides/communication.html#invoking-promises
        idle: {
          invoke: {
            src: 'getCurrentUser',
            onDone: {
              actions: 'setUser',
              target: 'authenticated',
            },
            onError: {
              target: 'setup',
            },
          },
        },
        setup: {
          initial: 'waitConfig',
          states: {
            waitConfig,
            applyConfig: {
              invoke: {
                // TODO Wait for Auth to be configured
                src: 'getAmplifyConfig',
                onDone: {
                  actions: 'applyAmplifyConfig',
                  target: 'goToInitialState',
                },
              },
            },
            goToInitialState: {
              always: [
                {
                  target: '#authenticator.signUp',
                  cond: 'isInitialStateSignUp',
                },
                {
                  target: '#authenticator.resetPassword',
                  cond: 'isInitialStateResetPassword',
                },
                { target: '#authenticator.signIn' },
              ],
            },
          },
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
            autoSignIn: {
              invoke: {
                src: 'getCurrentUser',
                onDone: '#authenticator.authenticated',
                onError: '#authenticator.setup.goToInitialState',
              },
            },
          },
          on: {
            SIGN_IN: 'signIn',
            'done.invoke.signUpActor': {
              target: '#authenticator.signIn',
              actions: 'setActorDoneData',
              cond: 'shouldAutoSignIn',
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
            'done.invoke.signOutActor': [
              { target: 'setup', cond: 'shouldSetup' },
              { target: 'setup.goToInitialState' },
            ],
          },
        },
        authenticated: {
          initial: 'idle',
          states: {
            idle: {
              on: {
                TOKEN_REFRESH: 'refreshUser',
              },
            },
            refreshUser: {
              invoke: {
                src: 'getCurrentUser',
                onDone: {
                  actions: 'setUser',
                  target: 'idle',
                },
                onError: { target: '#authenticator.signOut' },
              },
            },
          },
          on: { SIGN_OUT: 'signOut' },
        },
      },
      on: {
        CHANGE: { actions: 'forwardToActor' },
        BLUR: { actions: 'forwardToActor' },
        SUBMIT: { actions: 'forwardToActor' },
        FEDERATED_SIGN_IN: { actions: 'forwardToActor' },
        AUTO_SIGN_IN: { actions: 'forwardToActor' },
        RESEND: { actions: 'forwardToActor' },
        SIGN_IN: { actions: 'forwardToActor' },
        SKIP: { actions: 'forwardToActor' },
      },
    },
    {
      actions: {
        forwardToActor: choose([
          {
            cond: 'hasActor',
            actions: forwardTo((context) => context.actorRef),
          },
        ]),
        setUser: assign({
          user: (_, event) => {
            groupLog('+++createMachine.setUser', 'event', event);
            return event.data as AmplifyUser;
          },
        }),
        setActorDoneData: assign({
          /**
           * @migration potentially update flows here
           */
          actorDoneData: (_, event) => {
            groupLog('+++setActorDoneData', 'event', event);
            return {
              authAttributes: { ...event.data?.authAttributes },
              intent: event.data?.intent,
            };
          },
          user: (_, event) => event.data?.user,
        }),
        clearUser: assign({ user: undefined }),
        clearActorDoneData: assign({ actorDoneData: undefined }),
        applyAmplifyConfig: assign({
          config(context, { data: cliConfigBase }) {
            console.group('+++applyAmplifyConfig');

            const cliConfig = getAuthenticatorConfig(cliConfigBase);
            // Prefer explicitly configured settings over default CLI values\
            const {
              loginMechanisms = cliConfig.loginMechanisms ?? [],
              signUpAttributes = cliConfig.signUpAttributes ?? [],
              socialProviders = cliConfig.socialProviders ?? [],
              initialState,
              formFields: _formFields,
              /**
               * @migration was missing, prev noted as deprecated
               */
              passwordSettings = cliConfig.passwordSettings ??
                ({} as PasswordSettings),
            } = context.config;

            // By default, Cognito assumes `username`, so there isn't a different username attribute like `email`.
            // We explicitly add it as a login mechanism to be consistent with Admin UI's language.
            if (loginMechanisms.length === 0) {
              loginMechanisms.push('username');
            }

            const formFields = convertFormFields(_formFields) ?? {};

            console.groupEnd();

            return {
              formFields,
              initialState,
              loginMechanisms,
              passwordSettings,
              signUpAttributes,
              socialProviders,
            };
          },
        }),
        spawnSignInActor: assign({
          actorRef: (context, _) => {
            groupLog(
              '+++spawnSignInActor.actorRef',
              'looking for context.actorDoneData?.intent',
              context
            );

            const { services } = context;
            const actor = signInActor({ services }).withContext({
              authAttributes: context.actorDoneData?.authAttributes ?? {},
              user: context.user,
              intent: context.actorDoneData?.intent,
              country_code: DEFAULT_COUNTRY_CODE,
              formValues: {},
              touched: {},
              validationError: {},
              passwordSettings: context.config?.passwordSettings,
              loginMechanisms: context.config?.loginMechanisms,
              socialProviders: context.config?.socialProviders,
              formFields: context.config?.formFields,
            });
            return spawn(actor, { name: 'signInActor' });
          },
        }),
        spawnSignUpActor: assign({
          actorRef: (context, _) => {
            groupLog(
              '+++spawnSignUpActor.actorRef',
              'looking for context.actorDoneData?.intent',
              context
            );
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
              formFields: context.config?.formFields,
              passwordSettings: context.config?.passwordSettings,
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
              formFields: context.config?.formFields,
              validationError: {},
              passwordSettings: context.config?.passwordSettings,
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
        configure: assign((_, event) => {
          const { services: customServices, ...config } = !isEmptyObject(
            overrideConfigServices
          )
            ? overrideConfigServices
            : event.data;

          return {
            services: { ...defaultServices, ...customServices },
            config,
          };
        }),
        setHasSetup: assign({
          hasSetup: true,
        }),
      },
      guards: {
        // guards for initial states
        isInitialStateSignUp: (context) =>
          context.config.initialState === 'signUp',
        isInitialStateResetPassword: (context) =>
          context.config.initialState === 'resetPassword',
        // guards for redirections
        shouldRedirectToSignUp: (_, event) => {
          groupLog('+++shouldRedirectToSignUp');
          return event.data?.intent === 'confirmSignUp';
        },
        shouldRedirectToResetPassword: (_, event) =>
          event.data?.intent === 'confirmPasswordReset',
        shouldAutoSignIn: (context, event) => {
          groupLog('+++shouldAutoSignIn', 'event', event);
          return (
            event.data?.intent === 'autoSignIn' ||
            event.data?.intent === 'autoSignInSubmit'
          );
        },
        shouldSetup: (context) => {
          groupLog('+++shouldSetup', 'context', context);
          return context.hasSetup === false;
        },
        // other context guards
        hasActor: (context) => !!context.actorRef,
      },
      services: {
        getCurrentUser: (context, _) => context.services.getCurrentUser(),
        getAmplifyConfig: (context, _) => context.services.getAmplifyConfig(),
      },
    }
  );
}

function convertFormFields(formFields: AuthFormFields): AuthFormFields {
  if (formFields) {
    Object.keys(formFields).forEach((component: string) => {
      Object.keys(formFields[component]).forEach((inputName) => {
        let ff = formFields[component][inputName];
        ff.required = ff.isRequired;
      });
    });
  }
  return formFields;
}
