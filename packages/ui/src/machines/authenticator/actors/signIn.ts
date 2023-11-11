import { createMachine, sendUpdate } from 'xstate';
import {
  confirmSignIn,
  ConfirmSignInInput,
  fetchUserAttributes,
  resendSignUpCode,
  resetPassword,
  signInWithRedirect,
} from 'aws-amplify/auth';

import { runValidators } from '../../../validators';
import actions from '../actions';
import { defaultServices } from '../defaultServices';
import guards from '../guards';
import { groupLog } from '../../../utils';
import { AuthEvent, ActorDoneData, SignInContext } from '../types';

export interface SignInMachineOptions {
  services?: Partial<typeof defaultServices>;
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
      actions: ['setMissingAttributes', 'setUsername', 'setNextSignInStep'],
      target: '#signInActor.forceChangePassword',
    },
    {
      cond: 'shouldResetPassword',
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
      ],
      target: '#signInActor.init',
    },
  ],
  onError: { actions: 'setRemoteError', target: 'edit' },
};

const handleResetPasswordResponse = {
  onDone: [
    { actions: 'setCodeDeliveryDetails', target: '#signInActor.resolved' },
  ],
  onError: { actions: ['setRemoteError', 'sendUpdate'] },
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

const handleConfirmSignInResponse = {
  onDone: {
    actions: ['setConfirmSignUpSignUpStep', 'setCodeDeliveryDetails'],
    target: '#signInActor.resolved',
  },
  onError: {
    actions: 'setRemoteError',
    target: '#signInActor.signIn',
  },
};

export function signInActor({ services }: SignInMachineOptions) {
  return createMachine<SignInContext, AuthEvent>(
    {
      initial: 'init',
      id: 'signInActor',
      predictableActionArguments: true,
      states: {
        init: {
          always: [
            {
              cond: ({ step }) =>
                step === 'CONFIRM_SIGN_IN_WITH_SMS_CODE' ||
                step === 'CONFIRM_SIGN_IN_WITH_TOTP_CODE',
              target: 'confirmSignIn',
            },
            {
              cond: ({ step }) => {
                console.log('to CONTINUE_SIGN_IN_WITH_TOTP_SETUP', step);

                return step === 'CONTINUE_SIGN_IN_WITH_TOTP_SETUP';
              },
              target: 'setupTotp',
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
        federatedSignIn: {
          entry: ['sendUpdate', 'clearError'],
          invoke: {
            src: 'signInWithRedirect',
            onError: { actions: 'setRemoteError' },
          },
        },
        fetchUserAttributes: {
          invoke: {
            src: 'fetchUserAttributes',
            ...handleFetchUserAttributesResponse,
          },
        },
        resendSignUpCode: {
          invoke: {
            src: 'resendSignUpCode',
            ...handleConfirmSignInResponse,
          },
        },
        resetPassword: {
          invoke: {
            src: 'resetPassword',
            ...handleResetPasswordResponse,
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
              entry: ['clearError', 'parsePhoneNumber', 'sendUpdate'],
              exit: ['setUsername', 'clearFormValues'],
              invoke: {
                src: 'signIn',
                ...handleSignInResponse,
              },
            },
          },
        },
        confirmSignIn: {
          initial: 'edit',
          exit: [
            'clearChallengeName',
            'clearFormValues',
            'clearError',
            'clearTouched',
          ],
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
              entry: ['clearError', 'sendUpdate'],
              invoke: {
                src: 'confirmSignIn',
                ...handleSignInResponse,
              },
            },
          },
        },
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
        setupTotp: {
          initial: 'edit',
          exit: ['clearFormValues', 'clearError', 'clearTouched'],
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
              invoke: {
                src: 'confirmSignIn',
                ...handleSignInResponse,
              },
            },
          },
        },
        resolved: {
          type: 'final',
          data: (context, event): ActorDoneData => {
            groupLog('+++signIn.resolved.final', context, event);
            return {
              codeDeliveryDetails: context.codeDeliveryDetails,
              remoteError: context.remoteError,
              step: context.step,
              username: context.username,
              unverifiedUserAttributes: context.unverifiedUserAttributes,
            };
          },
        },
      },
    },
    {
      // sendUpdate is a HOC
      actions: { ...actions, sendUpdate: sendUpdate() },
      guards,
      services: {
        async fetchUserAttributes(context) {
          groupLog('+++fetchUserAttributes', context);
          return fetchUserAttributes();
        },
        resetPassword({ username }) {
          groupLog('+++resetPassword', username);
          return resetPassword({ username });
        },
        resendSignUpCode({ username }) {
          console.log('+++resendSignUpCode username:', username);
          return resendSignUpCode({ username });
        },
        signIn({ formValues }) {
          const { username, password } = formValues;
          groupLog('+++signIn', formValues);
          return services.handleSignIn({ username, password });
        },
        confirmSignIn({ formValues }) {
          groupLog('+++confirmSignIn', formValues);
          const { confirmation_code: challengeResponse } = formValues;
          return services.handleConfirmSignIn({ challengeResponse });
        },
        async handleForceChangePassword({ formValues }) {
          groupLog('+++handleForceChangePassword', formValues);
          let {
            password,
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
            challengeResponse: password,
            options: { userAttributes },
          };

          return confirmSignIn(input);
        },
        getTotpSecretCode(_, event) {
          groupLog(
            '+++getTotpSecretCode',
            'event',
            event.data?.nextStep?.totpSetupDetails?.sharedSecret
          );
          return event.data?.nextStep?.totpSetupDetails?.sharedSecret;
        },
        signInWithRedirect(context, event) {
          groupLog('+++signIn.signInWithRedirect', context, event);
          const { provider } = event.data;
          return signInWithRedirect({ provider });
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
