import { createMachine, sendUpdate } from 'xstate';
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
      actions: 'setNextSignInStep',
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
      ],
      target: '#signInActor.init',
    },
  ],
  onError: { actions: 'setRemoteError', target: 'edit' },
};

const handleFetchUserAttributesResponse = {
  onDone: [
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
  onError: {
    actions: 'setConfirmAttributeCompleteStep',
    target: '#signInActor.resolved',
  },
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
      },
    },
    submit: {
      tags: 'pending',
      entry: ['sendUpdate', 'clearError'],
      invoke: { src: 'confirmSignIn', ...handleSignInResponse },
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
            ...handleFetchUserAttributesResponse,
          },
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
                SUBMIT: { actions: 'handleSubmit', target: 'submit' },
              },
            },
            submit: {
              tags: 'pending',
              entry: ['clearError', 'sendUpdate', 'setUsernameSignIn'],
              exit: 'clearFormValues',
              invoke: { src: 'handleSignIn', ...handleSignInResponse },
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
        handleSignIn({ formValues, username }) {
          const { password } = formValues;
          return services.handleSignIn({ username, password });
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
