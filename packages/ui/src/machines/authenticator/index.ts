import {
  actions as xStateActions,
  assign,
  createMachine,
  forwardTo,
  spawn,
} from 'xstate';

import { AuthFormFields, PasswordSettings } from '../../types';
import { AuthEvent, AuthContext, ActorDoneData, InitialStep } from './types';
import { groupLog, isEmptyObject } from '../../utils';

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

const getActorContext = (
  defaultStep:
    | InitialStep
    | 'CONFIRM_ATTRIBUTE_WITH_CODE'
    | 'SHOULD_VERIFY_USER_ATTRIBUTE',
  context: AuthContext
) => ({
  codeDeliveryDetails: context.actorDoneData?.codeDeliveryDetails,
  remoteError: context.actorDoneData?.remoteError,
  step: context.actorDoneData?.step ?? defaultStep,
  username: context.actorDoneData?.username,
  unverifiedUserAttributes: context.actorDoneData?.unverifiedUserAttributes,

  formValues: {},
  touched: {},
  validationError: {},

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
      actions: ['configure'],
      target: 'getConfig',
    },
  },
};

// setup step proceeds directly to configure
const NEXT_WAIT_CONFIG = {
  always: {
    actions: ['configure'],
    target: 'getConfig',
  },
};

const clearActorDoneData = assign((ctx, e) => {
  groupLog('+++clearActorDoneData', e);
  return { actorDoneData: undefined };
});

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
            onDone: { actions: 'setUser', target: 'authenticated' },
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
                onDone: {
                  actions: ['applyAmplifyConfig', 'setHasSetup'],
                  target: 'goToInitialState',
                },
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
              entry: clearActorDoneData,
              exit: stopActor('signInActor'),
            },
          },
          on: {
            FORGOT_PASSWORD: 'forgotPasswordActor',
            SIGN_IN: 'signInActor',
            SIGN_UP: 'signUpActor',
            'done.invoke.signInActor': [
              {
                cond: (context, { data }) => {
                  groupLog(
                    '+++to CONFIRM_ATTRIBUTE_COMPLETE',
                    data.step,
                    context
                  );
                  return data.step === 'CONFIRM_ATTRIBUTE_COMPLETE';
                },
                target: '#authenticator.getCurrentUser',
              },
              {
                cond: (context, event) => {
                  groupLog(
                    '+++is SHOULD_VERIFY_USER_ATTRIBUTE ',
                    context,
                    event
                  );

                  return event.data?.step === 'SHOULD_VERIFY_USER_ATTRIBUTE';
                },
                actions: 'setActorDoneData',
                target: '#authenticator.verifyUserAttributesActor',
              },
              {
                cond: (context, event) => {
                  groupLog('+++is RESET_PASSWORD', context, event);
                  return event.data?.step === 'RESET_PASSWORD';
                },
                actions: 'setActorDoneData',
                target: '#authenticator.forgotPasswordActor',
              },
              {
                cond: (context, event) => {
                  groupLog(
                    '+++is CONFIRM_SIGN_UP',
                    event.data?.step === 'CONFIRM_SIGN_UP',
                    context,
                    event
                  );
                  return event.data?.step === 'CONFIRM_SIGN_UP';
                },
                actions: 'setActorDoneData',
                target: '#authenticator.signUpActor',
              },
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
              entry: clearActorDoneData,
              exit: stopActor('verifyUserAttributesActor'),
            },
          },
          on: {
            'done.invoke.verifyUserAttributesActor': [
              {
                cond: (context, event) => {
                  groupLog('+++is VERIFIED', context, event);
                  return event.data?.step === 'CONFIRM_ATTRIBUTE_COMPLETE';
                },
                actions: 'setActorDoneData',
                target: '#authenticator.getCurrentUser',
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
              entry: clearActorDoneData,
              exit: stopActor('signUpActor'),
            },
          },
          on: {
            SIGN_IN: 'signInActor',
            'done.invoke.signUpActor': [
              {
                cond: (context, event) => {
                  groupLog('+++is VERIFIED', context, event);
                  return event.data?.step === 'CONFIRM_ATTRIBUTE_COMPLETE';
                },
                target: '#authenticator.getCurrentUser',
              },
              {
                cond: (context, event) => {
                  groupLog('+++go to verify attrs ', context, event);
                  return event.data?.step === 'CONFIRM_ATTRIBUTE_WITH_CODE';
                },
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
              entry: clearActorDoneData,
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
        signOut: {
          initial: 'spawnActor',
          states: {
            spawnActor: {
              always: {
                actions: 'spawnSignOutActor',
                target: 'runActor',
              },
            },
            runActor: {
              entry: clearActorDoneData,
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
        ...actions,
        forwardToActor: choose([
          { cond: 'hasActor', actions: forwardTo(({ actorRef }) => actorRef) },
        ]),
        setActorDoneData: assign({
          actorDoneData: (context, event): ActorDoneData => {
            groupLog('+++setActorDoneData', context, event);
            return {
              codeDeliveryDetails: event.data.codeDeliveryDetails,
              remoteError: event.data.remoteError,
              username: event.data.username,
              step: event.data.step,
              unverifiedUserAttributes: event.data.unverifiedUserAttributes,
            };
          },
        }),
        clearUser: assign((ctx, e) => {
          groupLog('+++clearUser', e);
          return { user: undefined };
        }),
        clearActorDoneData: assign((ctx, e) => {
          groupLog('+++clearActorDoneData', e);
          return { actorDoneData: undefined };
        }),
        applyAmplifyConfig: assign({
          config(context, { data: cliConfig }) {
            groupLog('+++applyAmplifyConfig', cliConfig);

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
            groupLog('+++spawnSignInActor.actorRef', context);
            const { services } = context;
            const actor = signInActor({ services }).withContext(
              getActorContext('SIGN_IN', context)
            );
            return spawn(actor, { name: 'signInActor' });
          },
        }),
        spawnSignUpActor: assign({
          actorRef: (context, _) => {
            groupLog('+++spawnSignUpActor.actorRef', context);
            const { services } = context;
            const actor = signUpActor({ services }).withContext(
              getActorContext('SIGN_UP', context)
            );
            return spawn(actor, { name: 'signUpActor' });
          },
        }),
        spawnForgotPasswordActor: assign({
          actorRef: (context: AuthContext, _) => {
            const { services } = context;
            const actor = forgotPasswordActor({ services }).withContext(
              getActorContext('FORGOT_PASSWORD', context)
            );
            return spawn(actor, { name: 'forgotPasswordActor' });
          },
        }),
        spawnVerifyUserAttributesActor: assign({
          actorRef: (context) => {
            groupLog('+++spawnVerifyAttributes', context);
            const actor = verifyUserAttributesActor().withContext(
              getActorContext('SHOULD_VERIFY_USER_ATTRIBUTE', context)
            );
            return spawn(actor, { name: 'signOutActor' });
          },
        }),
        spawnSignOutActor: assign({
          actorRef: (context) => {
            groupLog('+++spawnSignOutActor', context);
            const actor = signOutActor().withContext({ user: context?.user });
            return spawn(actor, { name: 'signOutActor' });
          },
        }),
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
        setHasSetup: assign({ hasSetup: true }),
      },
      guards: {
        ...guards,
        isInitialStateSignUp: (context) =>
          context.config.initialState === 'signUp',
        isInitialStateResetPassword: (context) =>
          context.config.initialState === 'forgotPassword',
        shouldSetup: (context) => {
          groupLog('+++shouldSetup', context);
          return context.hasSetup === false;
        },
        // other context guards
        hasActor: (context) => !!context.actorRef,
      },
      services: {
        handleGetCurrentUser: (context, event) => {
          groupLog('+++getCurrentUser.top', context, event);
          return context.services
            .getCurrentUser()
            .then((user) => {
              console.log('getCurrentUser.top success', user);
              return user;
            })
            .catch((e) => {
              console.log('getCurrentUser.top fail', e);
              throw new Error(undefined);
            });
        },
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
