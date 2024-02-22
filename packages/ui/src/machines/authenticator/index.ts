import {
  actions as xStateActions,
  assign,
  createMachine,
  forwardTo,
  spawn,
} from 'xstate';

import { AuthFormFields, PasswordSettings } from '../../types';
import { AuthEvent, AuthContext, ActorDoneData, InitialStep } from './types';
import { isEmptyObject } from '../../utils';

import actions from './actions';
import guards from './guards';
import {
  forgotPasswordActor,
  signInActor,
  signOutActor,
  signUpActor,
  verifyUserAttributesActor,
} from './actors';

import { defaultServices } from './defaultServices';

export type AuthenticatorMachineOptions = AuthContext['config'] & {
  services?: AuthContext['services'];
};

const getActorContext = (context: AuthContext, defaultStep?: InitialStep) => ({
  ...context.actorDoneData,
  step: context?.actorDoneData?.step ?? defaultStep,

  // initialize empty objects on actor start
  formValues: {},
  touched: {},
  validationError: {},

  // values included on `context.config` that should be available in actors
  formFields: context.config?.formFields,
  loginMechanisms: context.config?.loginMechanisms,
  passwordSettings: context.config?.passwordSettings,
  signUpAttributes: context.config?.signUpAttributes,
  socialProviders: context.config?.socialProviders,
});

const { choose, stop } = xStateActions;

const stopActor = (machineId: string) => stop(machineId);

// setup step waits for ui to emit INIT action to proceed to configure
const LEGACY_WAIT_CONFIG = {
  on: {
    INIT: {
      actions: 'configure',
      target: 'getConfig',
    },
    SIGN_OUT: '#authenticator.signOut',
  },
};

// setup step proceeds directly to configure
const NEXT_WAIT_CONFIG = {
  always: { actions: 'configure', target: 'getConfig' },
};

export function createAuthenticatorMachine(
  options?: AuthenticatorMachineOptions & {
    useNextWaitConfig?: boolean;
  }
) {
  const { useNextWaitConfig, ...overrideConfigServices } = options ?? {};
  const initConfig = useNextWaitConfig ? NEXT_WAIT_CONFIG : LEGACY_WAIT_CONFIG;
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
            src: 'handleGetCurrentUser',
            onDone: { actions: 'setUser', target: 'setup' },
            onError: { target: 'setup' },
          },
        },
        setup: {
          initial: 'initConfig',
          states: {
            initConfig,
            getConfig: {
              invoke: {
                src: 'getAmplifyConfig',
                onDone: [
                  {
                    actions: ['applyAmplifyConfig', 'setHasSetup'],
                    cond: 'hasUser',
                    target: '#authenticator.authenticated',
                  },
                  {
                    actions: ['applyAmplifyConfig', 'setHasSetup'],
                    target: 'goToInitialState',
                  },
                ],
              },
            },
            goToInitialState: {
              always: [
                {
                  cond: 'isInitialStateSignUp',
                  target: '#authenticator.signUpActor',
                },
                {
                  cond: 'isInitialStateResetPassword',
                  target: '#authenticator.forgotPasswordActor',
                },
                { target: '#authenticator.signInActor' },
              ],
            },
          },
        },
        getCurrentUser: {
          invoke: {
            src: 'handleGetCurrentUser',
            onDone: {
              actions: 'setUser',
              target: '#authenticator.authenticated',
            },
            onError: { target: '#authenticator.setup' },
          },
        },
        signInActor: {
          initial: 'spawnActor',
          states: {
            spawnActor: {
              always: { actions: 'spawnSignInActor', target: 'runActor' },
            },
            runActor: {
              entry: 'clearActorDoneData',
              exit: stopActor('signInActor'),
            },
          },
          on: {
            FORGOT_PASSWORD: 'forgotPasswordActor',
            SIGN_IN: 'signInActor',
            SIGN_UP: 'signUpActor',
            'done.invoke.signInActor': [
              {
                cond: 'hasCompletedAttributeConfirmation',
                target: '#authenticator.getCurrentUser',
              },
              {
                cond: 'isShouldConfirmUserAttributeStep',
                actions: 'setActorDoneData',
                target: '#authenticator.verifyUserAttributesActor',
              },
              {
                cond: 'isResetPasswordStep',
                actions: 'setActorDoneData',
                target: '#authenticator.forgotPasswordActor',
              },
              {
                cond: 'isConfirmSignUpStep',
                actions: 'setActorDoneData',
                target: '#authenticator.signUpActor',
              },
            ],
          },
        },
        signUpActor: {
          initial: 'spawnActor',
          states: {
            spawnActor: {
              always: { actions: 'spawnSignUpActor', target: 'runActor' },
            },
            runActor: {
              entry: 'clearActorDoneData',
              exit: stopActor('signUpActor'),
            },
          },
          on: {
            SIGN_IN: 'signInActor',
            'done.invoke.signUpActor': [
              {
                cond: 'hasCompletedAttributeConfirmation',
                target: '#authenticator.getCurrentUser',
              },
              {
                cond: 'isShouldConfirmUserAttributeStep',
                actions: 'setActorDoneData',
                target: '#authenticator.verifyUserAttributesActor',
              },
              {
                cond: 'isConfirmUserAttributeStep',
                target: '#authenticator.verifyUserAttributesActor',
              },
              {
                actions: 'setActorDoneData',
                target: '#authenticator.signInActor',
              },
            ],
          },
        },
        forgotPasswordActor: {
          initial: 'spawnActor',
          states: {
            spawnActor: {
              always: {
                actions: 'spawnForgotPasswordActor',
                target: 'runActor',
              },
            },
            runActor: {
              entry: 'clearActorDoneData',
              exit: stopActor('forgotPasswordActor'),
            },
          },
          on: {
            SIGN_IN: 'signInActor',
            'done.invoke.forgotPasswordActor': [
              { target: '#authenticator.signInActor' },
            ],
          },
        },
        verifyUserAttributesActor: {
          initial: 'spawnActor',
          states: {
            spawnActor: {
              always: {
                actions: 'spawnVerifyUserAttributesActor',
                target: 'runActor',
              },
            },
            runActor: {
              entry: 'clearActorDoneData',
              exit: stopActor('verifyUserAttributesActor'),
            },
          },
          on: {
            'done.invoke.verifyUserAttributesActor': [
              {
                actions: 'setActorDoneData',
                target: '#authenticator.getCurrentUser',
              },
            ],
          },
        },
        authenticated: {
          initial: 'idle',
          states: {
            idle: { on: { TOKEN_REFRESH: 'refreshUser' } },
            refreshUser: {
              invoke: {
                src: '#authenticator.getCurrentUser',
                onDone: { actions: 'setUser', target: 'idle' },
                onError: { target: '#authenticator.signOut' },
              },
            },
          },
          on: { SIGN_OUT: 'signOut' },
        },
        signOut: {
          initial: 'spawnActor',
          states: {
            spawnActor: {
              always: { actions: 'spawnSignOutActor', target: 'runActor' },
            },
            runActor: {
              entry: 'clearActorDoneData',
              exit: stopActor('signOutActor'),
            },
          },
          on: {
            'done.invoke.signOutActor': {
              actions: 'clearUser',
              target: 'setup.getConfig',
            },
          },
        },
      },
      on: {
        SIGN_IN_WITH_REDIRECT: { target: '#authenticator.getCurrentUser' },
        CHANGE: { actions: 'forwardToActor' },
        BLUR: { actions: 'forwardToActor' },
        SUBMIT: { actions: 'forwardToActor' },
        FEDERATED_SIGN_IN: { actions: 'forwardToActor' },
        RESEND: { actions: 'forwardToActor' },
        SIGN_IN: { actions: 'forwardToActor' },
        SKIP: { actions: 'forwardToActor' },
      },
    },
    {
      actions: {
        ...actions,
        forwardToActor: choose([
          { cond: 'hasActor', actions: forwardTo(({ actorRef }) => actorRef) },
        ]),
        setActorDoneData: assign({
          actorDoneData: (context, event): ActorDoneData => ({
            codeDeliveryDetails: event.data.codeDeliveryDetails,
            missingAttributes: event.data.missingAttributes,
            remoteError: event.data.remoteError,
            username: event.data.username,
            step: event.data.step,
            totpSecretCode: event.data.totpSecretCode,
            unverifiedUserAttributes: event.data.unverifiedUserAttributes,
          }),
        }),
        applyAmplifyConfig: assign({
          config(context, { data: cliConfig }) {
            // Prefer explicitly configured settings over default CLI values\
            const {
              loginMechanisms = cliConfig.loginMechanisms ?? [],
              signUpAttributes = cliConfig.signUpAttributes ?? [],
              socialProviders = cliConfig.socialProviders ?? [],
              initialState,
              formFields: _formFields,
              passwordSettings = cliConfig.passwordFormat ??
                ({} as PasswordSettings),
            } = context.config;

            // By default, Cognito assumes `username`, so there isn't a different username attribute like `email`.
            // We explicitly add it as a login mechanism to be consistent with Admin UI's language.
            if (loginMechanisms.length === 0) {
              loginMechanisms.push('username');
            }

            const formFields = convertFormFields(_formFields) ?? {};

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
            const { services } = context;
            const actor = signInActor({ services }).withContext(
              getActorContext(context, 'SIGN_IN')
            );
            return spawn(actor, { name: 'signInActor' });
          },
        }),
        spawnSignUpActor: assign({
          actorRef: (context, _) => {
            const { services } = context;
            const actor = signUpActor({ services }).withContext(
              getActorContext(context, 'SIGN_UP')
            );
            return spawn(actor, { name: 'signUpActor' });
          },
        }),
        spawnForgotPasswordActor: assign({
          actorRef: (context: AuthContext, _) => {
            const { services } = context;
            const actor = forgotPasswordActor({ services }).withContext(
              getActorContext(context, 'FORGOT_PASSWORD')
            );
            return spawn(actor, { name: 'forgotPasswordActor' });
          },
        }),
        spawnVerifyUserAttributesActor: assign({
          actorRef: (context) => {
            const actor = verifyUserAttributesActor().withContext(
              getActorContext(context)
            );
            return spawn(actor, { name: 'verifyUserAttributesActor' });
          },
        }),
        spawnSignOutActor: assign({
          actorRef: (context) => {
            const actor = signOutActor().withContext({ user: context?.user });
            return spawn(actor, { name: 'signOutActor' });
          },
        }),
        configure: assign((_, event) => {
          const { services: customServices, ...config } = !isEmptyObject(
            overrideConfigServices
          )
            ? overrideConfigServices
            : event.data ?? {};

          return {
            services: { ...defaultServices, ...customServices },
            config,
          };
        }),
        setHasSetup: assign({ hasSetup: true }),
      },
      guards: {
        ...guards,
        hasActor: ({ actorRef }) => !!actorRef,
        isInitialStateSignUp: ({ config }) => config.initialState === 'signUp',
        isInitialStateResetPassword: ({ config }) =>
          config.initialState === 'forgotPassword',
        shouldSetup: ({ hasSetup }) => !hasSetup,
        hasUser: ({ user }) => {
          return !!user;
        },
      },
      services: {
        getAmplifyConfig: ({ services }) => services.getAmplifyConfig(),
        handleGetCurrentUser: ({ services }) => services.getCurrentUser(),
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
