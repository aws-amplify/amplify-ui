import {
  actions as xStateActions,
  assign,
  createMachine,
  sendUpdate,
} from 'xstate';
import {
  confirmSignIn,
  ConfirmSignInInput,
  fetchUserAttributes,
  resendSignUpCode,
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

const fetchUserAttributesState = {
  tags: 'pending',
  invoke: {
    src: 'fetchUserAttributes',
    onDone: [
      {
        cond: 'shouldVerifyAttribute',
        actions: 'setShouldVerifyUserAttribute',
        target: '#signInActor.resolved',
      },
      {
        actions: 'setConfirmAttributeComplete',
        target: '#signInActor.resolved',
      },
    ],
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
              target: 'forceChangePassword',
            },
            { target: 'signIn' },
          ],
        },
        signIn: {
          initial: 'edit',
          exit: 'clearTouched',
          states: {
            edit: {
              entry: 'sendUpdate',
              on: {
                CHANGE: { actions: 'handleInput' },
                FEDERATED_SIGN_IN: 'federatedSignIn',
                SUBMIT: { actions: 'handleSubmit', target: 'submit' },
              },
            },
            federatedSignIn: {
              entry: ['sendUpdate', 'clearError'],
              invoke: {
                src: 'signInWithRedirect',
                onDone: { target: 'edit' },
                onError: { actions: 'setRemoteError' },
              },
            },
            fetchUserAttributes: fetchUserAttributesState,
            resendSignUpCode: {
              tags: 'pending',
              invoke: {
                src: 'resendSignUpCode',
                onDone: {
                  actions: ['setConfirmSignUpStep', 'setCodeDeliveryDetails'],
                  target: '#signInActor.resolved',
                },
                onError: {
                  actions: 'setRemoteError',
                  target: '#signInActor.signIn',
                },
              },
            },
            submit: {
              tags: 'pending',
              entry: ['clearError', 'parsePhoneNumber', 'sendUpdate'],
              exit: 'setUsername',
              invoke: {
                src: 'signIn',
                onDone: [
                  {
                    cond: 'hasCompletedSignIn',
                    actions: 'setNextSignInStep',
                    target: 'fetchUserAttributes',
                  },
                  {
                    cond: 'shouldConfirmResetPassword',
                    actions: 'setNextSignInStep',
                    target: '#signInActor.resolved',
                  },
                  {
                    cond: 'shouldConfirmSignUpFromSignIn',
                    target: 'resendSignUpCode',
                  },
                  {
                    actions: [
                      'setNextSignInStep',
                      'setChallengeName',
                      'setMissingAttributes',
                      'setTotpSecretCode',
                    ],
                    target: '#signInActor.init',
                  },
                ],
                onError: { actions: 'setRemoteError', target: 'edit' },
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
            resendSignUpCode: {
              tags: 'pending',
              invoke: {
                src: 'resendSignUpCode',
                onDone: {
                  actions: ['setConfirmSignUpStep', 'setCodeDeliveryDetails'],
                  target: '#signInActor.resolved',
                },
                onError: {
                  actions: 'setRemoteError',
                  target: '#signInActor.confirmSignIn',
                },
              },
            },
            fetchUserAttributes: fetchUserAttributesState,
            submit: {
              tags: 'pending',
              entry: ['clearError', 'sendUpdate'],
              invoke: {
                src: 'confirmSignIn',
                onDone: [
                  {
                    cond: 'hasCompletedSignIn',
                    actions: 'setNextSignInStep',
                    target: 'fetchUserAttributes',
                  },
                  {
                    cond: 'shouldConfirmResetPassword',
                    actions: 'setNextSignInStep',
                    target: '#signInActor.resolved',
                  },
                  {
                    cond: 'shouldConfirmSignUpFromSignIn',
                    target: 'resendSignUpCode',
                  },
                  {
                    actions: [
                      'setNextSignInStep',
                      'setChallengeName',
                      'setMissingAttributes',
                      'setTotpSecretCode',
                    ],
                    target: '#signInActor.init',
                  },
                ],
                onError: { actions: 'setRemoteError', target: 'edit' },
              },
            },
          },
        },
        forceChangePassword: {
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
                SIGN_IN: { target: '#signInActor.resolved' },
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
              initial: 'idle',
              entry: 'clearError',
              states: {
                idle: {
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
                    onError: { actions: 'setFieldErrors', target: 'idle' },
                  },
                },
                pending: {
                  tags: 'pending',
                  entry: ['sendUpdate', 'clearError'],
                  invoke: {
                    src: 'forceChangePassword',
                    onDone: { target: '#signInActor.resolved' },
                    onError: { actions: 'setRemoteError', target: 'idle' },
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
              entry: ['sendUpdate', xStateActions.log('ENTER setupTotp')],
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
                onDone: { target: '#signInActor.resolved' },
                onError: { actions: 'setRemoteError', target: 'edit' },
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
              errorMessage: context.errorMessage,
              step: context.step,
              username: context.username,
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
          return fetchUserAttributes()
            .then((res) => {
              groupLog('+++fetchUserAttributes res', res);
              return res;
            })
            .catch((e) => {
              groupLog('+++fetchUserAttributes error', e);
              throw e;
            });
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
        async forceChangePassword({ formValues }) {
          groupLog('+++forceChangePassword', formValues);
          let {
            password,
            confirm_password,
            phone_number,
            country_code,
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
