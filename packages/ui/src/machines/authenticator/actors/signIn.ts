import { createMachine, sendUpdate, assign } from 'xstate';
import type { ConfirmSignInInput } from 'aws-amplify/auth';
import {
  confirmSignIn,
  fetchUserAttributes,
  resetPassword,
  signInWithRedirect,
} from 'aws-amplify/auth';

import { runValidators } from '../../../validators';
import actions from '../actions';
import { defaultServices } from '../defaultServices';
import guards from '../guards';

import type {
  AuthEvent,
  ActorDoneData,
  SignInContext,
  AuthContext,
} from '../types';

import {
  getConfirmSignInFormValuesKey,
  getFederatedSignInState,
} from './utils';

export interface SignInMachineOptions {
  services?: AuthContext['services'];
}

const handleSignInResponse = {
  onDone: [
    {
      cond: 'hasCompletedSignIn',
      target: '#signInActor.fetchUserAttributes',
    },
    {
      cond: 'shouldConfirmSignInWithNewPassword',
      actions: ['setMissingAttributes', 'setNextSignInStep'],
      target: '#signInActor.forceChangePassword',
    },
    {
      cond: 'shouldResetPasswordFromSignIn',
      actions: 'setNextSignInStep',
      target: '#signInActor.resetPassword',
    },
    {
      cond: 'shouldConfirmSignUpFromSignIn',
      actions: 'setNextSignInStep',
      target: '#signInActor.resendSignUpCode',
    },
    {
      actions: [
        'setChallengeName',
        'setMissingAttributes',
        'setNextSignInStep',
        'setTotpSecretCode',
        'setAllowedMfaTypes',
        'setCodeDeliveryDetails',
      ],
      target: '#signInActor.init',
    },
  ],
  onError: { actions: 'setRemoteError', target: 'edit' },
};

const getDefaultConfirmSignInState = (exit: string[]) => ({
  initial: 'edit',
  exit,
  states: {
    edit: {
      entry: 'sendUpdate',
      on: {
        SUBMIT: { actions: 'handleSubmit', target: 'submit' },
        SIGN_IN: '#signInActor.signIn',
        CHANGE: { actions: 'handleInput' },
        RESEND: { target: 'resend' },
      },
    },
    submit: {
      tags: 'pending',
      entry: ['sendUpdate', 'clearError'],
      invoke: { src: 'confirmSignIn', ...handleSignInResponse },
    },
    resend: {
      tags: 'pending',
      entry: ['sendUpdate', 'clearError'],
      invoke: {
        src: 'resendSignInCode',
        onDone: {
          actions: ['setCodeDeliveryDetails', 'sendUpdate'],
          target: 'edit',
        },
        onError: {
          actions: 'setRemoteError',
          target: 'edit',
        },
      },
    },
  },
});

export function signInActor({ services }: SignInMachineOptions) {
  return createMachine<SignInContext, AuthEvent>(
    {
      id: 'signInActor',
      initial: 'init',
      predictableActionArguments: true,
      states: {
        init: {
          always: [
            {
              cond: 'shouldConfirmSignIn',
              target: 'confirmSignIn',
            },
            {
              cond: 'shouldSetupTotp',
              target: 'setupTotp',
            },
            {
              cond: 'shouldSetupEmail',
              target: 'setupEmail',
            },
            {
              cond: 'shouldSelectMfaType',
              target: 'selectMfaType',
            },
            {
              cond: ({ step }) =>
                step === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED',
              actions: 'setActorDoneData',
              target: 'forceChangePassword',
            },
            { target: 'signIn' },
          ],
        },
        federatedSignIn: getFederatedSignInState('signIn'),
        fetchUserAttributes: {
          invoke: {
            src: 'fetchUserAttributes',
            onDone: [
              {
                cond: ({ passwordlessAuthOptions }) =>
                  passwordlessAuthOptions?.passkeyRegistrationPrompts != null,
                actions: assign({
                  fetchedUserAttributes: (_, event) => event.data,
                }),
                target: 'checkPasskeys',
              },
              {
                actions: assign({
                  fetchedUserAttributes: (_, event) => event.data,
                }),
                target: 'evaluatePasskeyPrompt',
              },
            ],
            onError: {
              actions: 'setConfirmAttributeCompleteStep',
              target: '#signInActor.resolved',
            },
          },
        },
        checkPasskeys: {
          invoke: {
            src: async () => {
              try {
                const { listWebAuthnCredentials } = await import(
                  'aws-amplify/auth'
                );
                const result = await listWebAuthnCredentials();
                return result.credentials && result.credentials.length > 0;
              } catch {
                return false;
              }
            },
            onDone: {
              actions: assign({
                hasExistingPasskeys: (_, event) => event.data,
              }),
              target: 'evaluatePasskeyPrompt',
            },
            onError: {
              actions: assign({ hasExistingPasskeys: false }),
              target: 'evaluatePasskeyPrompt',
            },
          },
        },
        evaluatePasskeyPrompt: {
          always: [
            {
              cond: 'shouldPromptPasskeyRegistration',
              target: '#signInActor.passkeyPrompt',
            },
            {
              cond: 'shouldVerifyAttribute',
              actions: [
                'setShouldVerifyUserAttributeStep',
                'setUnverifiedUserAttributes',
              ],
              target: '#signInActor.resolved',
            },
            {
              actions: 'setConfirmAttributeCompleteStep',
              target: '#signInActor.resolved',
            },
          ],
        },
        resendSignUpCode: {
          invoke: {
            src: 'handleResendSignUpCode',
            onDone: {
              actions: 'setCodeDeliveryDetails',
              target: '#signInActor.resolved',
            },
            onError: {
              actions: 'setRemoteError',
              target: '#signInActor.signIn',
            },
          },
        },
        resetPassword: {
          invoke: {
            src: 'resetPassword',
            onDone: [
              {
                actions: 'setCodeDeliveryDetails',
                target: '#signInActor.resolved',
              },
            ],
            onError: { actions: ['setRemoteError', 'sendUpdate'] },
          },
        },
        signIn: {
          initial: 'edit',
          exit: 'clearTouched',
          states: {
            edit: {
              entry: 'sendUpdate',
              on: {
                CHANGE: { actions: 'handleInput' },
                FEDERATED_SIGN_IN: { target: '#signInActor.federatedSignIn' },
                SHOW_AUTH_METHODS: {
                  actions: 'setUsernameSignIn',
                  target: 'selectMethod',
                },
                SUBMIT: [
                  {
                    cond: 'shouldSelectAuthMethod',
                    actions: 'handleSubmit',
                    target: 'selectMethod',
                  },
                  {
                    actions: 'handleSubmit',
                    target: 'submit',
                  },
                ],
              },
            },
            selectMethod: {
              entry: [
                'sendUpdate',
                'setSelectAuthMethodStep',
                'setUsernameSignIn',
              ],
              on: {
                SELECT_METHOD: {
                  actions: 'setSelectedAuthMethod',
                  target: 'submit',
                },
                SIGN_IN: {
                  target: 'edit',
                },
              },
            },
            submit: {
              tags: 'pending',
              entry: ['clearError', 'sendUpdate', 'setUsernameSignIn'],
              exit: 'clearFormValues',
              invoke: {
                src: 'handleSignIn',
                onDone: handleSignInResponse.onDone,
                onError: [
                  {
                    cond: ({ selectedAuthMethod }) =>
                      selectedAuthMethod != null,
                    actions: 'setRemoteError',
                    target: 'selectMethod',
                  },
                  {
                    actions: 'setRemoteError',
                    target: 'edit',
                  },
                ],
              },
            },
          },
        },
        confirmSignIn: getDefaultConfirmSignInState([
          'clearChallengeName',
          'clearFormValues',
          'clearError',
          'clearTouched',
        ]),
        forceChangePassword: {
          entry: 'sendUpdate',
          type: 'parallel',
          exit: ['clearFormValues', 'clearError', 'clearTouched'],
          states: {
            validation: {
              initial: 'pending',
              states: {
                pending: {
                  invoke: {
                    src: 'validateFields',
                    onDone: {
                      target: 'valid',
                      actions: 'clearValidationError',
                    },
                    onError: {
                      target: 'invalid',
                      actions: 'setFieldErrors',
                    },
                  },
                },
                valid: { entry: 'sendUpdate' },
                invalid: { entry: 'sendUpdate' },
              },
              on: {
                SIGN_IN: {
                  actions: 'setSignInStep',
                  target: '#signInActor.resolved',
                },
                CHANGE: {
                  actions: 'handleInput',
                  target: '.pending',
                },
                BLUR: {
                  actions: 'handleBlur',
                  target: '.pending',
                },
              },
            },
            submit: {
              initial: 'edit',
              entry: 'clearError',
              states: {
                edit: {
                  entry: 'sendUpdate',
                  on: {
                    SUBMIT: { actions: 'handleSubmit', target: 'validate' },
                  },
                },
                validate: {
                  entry: 'sendUpdate',
                  invoke: {
                    src: 'validateFields',
                    onDone: {
                      actions: 'clearValidationError',
                      target: 'pending',
                    },
                    onError: { actions: 'setFieldErrors', target: 'edit' },
                  },
                },
                pending: {
                  tags: 'pending',
                  entry: ['sendUpdate', 'clearError'],
                  invoke: {
                    src: 'handleForceChangePassword',
                    ...handleSignInResponse,
                  },
                },
              },
            },
          },
        },
        setupTotp: getDefaultConfirmSignInState([
          'clearFormValues',
          'clearError',
          'clearTouched',
        ]),
        setupEmail: getDefaultConfirmSignInState([
          'clearFormValues',
          'clearError',
          'clearTouched',
        ]),
        selectMfaType: getDefaultConfirmSignInState([
          'clearFormValues',
          'clearError',
          'clearTouched',
        ]),
        passkeyPrompt: {
          entry: 'sendUpdate',
          on: {
            SUBMIT: {
              actions: 'setConfirmAttributeCompleteStep',
              target: 'resolved',
            },
            SKIP: {
              actions: 'setConfirmAttributeCompleteStep',
              target: 'resolved',
            },
          },
        },
        resolved: {
          type: 'final',
          data: (context): ActorDoneData => ({
            codeDeliveryDetails: context.codeDeliveryDetails,
            remoteError: context.remoteError,
            step: context.step,
            unverifiedUserAttributes: context.unverifiedUserAttributes,
            username: context.username,
          }),
        },
      },
    },
    {
      // sendUpdate is a HOC
      actions: { ...actions, sendUpdate: sendUpdate() },
      guards,
      services: {
        async fetchUserAttributes() {
          return fetchUserAttributes();
        },
        resetPassword({ username }) {
          return resetPassword({ username });
        },
        handleResendSignUpCode({ username }) {
          return services.handleResendSignUpCode({ username });
        },
        resendSignInCode({
          username,
          selectedAuthMethod,
          availableAuthMethods,
          preferredChallenge,
        }) {
          // Resend code by calling signIn again with the same parameters
          const method =
            selectedAuthMethod ??
            preferredChallenge ??
            availableAuthMethods?.[0] ??
            'PASSWORD';

          return services.handleSignIn({
            username,
            options: {
              authFlowType: 'USER_AUTH',
              preferredChallenge: method,
            },
          });
        },
        handleSignIn({
          formValues,
          username,
          selectedAuthMethod,
          availableAuthMethods,
          preferredChallenge,
        }) {
          // Determine which method to use
          const method =
            selectedAuthMethod ??
            preferredChallenge ??
            availableAuthMethods?.[0] ??
            'PASSWORD';

          if (method === 'PASSWORD') {
            // Traditional password flow
            const { password } = formValues;
            return services.handleSignIn({ username, password });
          } else {
            // Passwordless flow using USER_AUTH
            return services.handleSignIn({
              username,
              options: {
                authFlowType: 'USER_AUTH',
                preferredChallenge: method,
              },
            });
          }
        },
        confirmSignIn({ formValues, step }) {
          const formValuesKey = getConfirmSignInFormValuesKey(step);
          const { [formValuesKey]: challengeResponse } = formValues;
          return services.handleConfirmSignIn({ challengeResponse });
        },
        async handleForceChangePassword({ formValues }) {
          let {
            password: challengeResponse,
            phone_number,
            country_code,
            // destructure and toss UI confirm_password field
            // to prevent error from sending to confirmSignIn
            confirm_password,
            ...userAttributes
          } = formValues;

          let phoneNumberWithCountryCode;
          if (phone_number) {
            phoneNumberWithCountryCode =
              `${country_code}${phone_number}`.replace(/[^A-Z0-9+]/gi, '');
            userAttributes = {
              ...userAttributes,
              phone_number: phoneNumberWithCountryCode,
            };
          }

          const input: ConfirmSignInInput = {
            challengeResponse,
            options: { userAttributes },
          };

          return confirmSignIn(input);
        },
        signInWithRedirect(_, { data }) {
          return signInWithRedirect(data);
        },
        async validateFields(context) {
          return runValidators(
            context.formValues,
            context.touched,
            context.passwordSettings,
            [
              defaultServices.validateFormPassword,
              defaultServices.validateConfirmPassword,
            ]
          );
        },
      },
    }
  );
}
