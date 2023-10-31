import { createMachine, sendUpdate } from 'xstate';
import {
  autoSignIn,
  confirmSignIn,
  ConfirmSignInInput,
  confirmUserAttribute,
  ConfirmUserAttributeInput,
  fetchUserAttributes,
  FetchUserAttributesOutput,
  getCurrentUser,
  sendUserAttributeVerificationCode,
  SendUserAttributeVerificationCodeInput,
  signInWithRedirect,
} from 'aws-amplify/auth';

import { AuthEvent, SignInContext } from '../../../types';
import { runValidators } from '../../../validators';
import {
  clearAttributeToVerify,
  clearChallengeName,
  clearRequiredAttributes,
  clearError,
  clearFormValues,
  clearTouched,
  clearUnverifiedContactMethods,
  clearValidationError,
  handleInput,
  handleSubmit,
  handleBlur,
  parsePhoneNumber,
  setChallengeName,
  setConfirmResetPasswordIntent,
  setConfirmSignUpIntent,
  setCredentials,
  setFieldErrors,
  setRemoteError,
  setRequiredAttributes,
  setTotpSecretCode,
  setUnverifiedContactMethods,
  setUser,
  setUsernameAuthAttributes,
} from '../actions';
import { defaultServices } from '../defaultServices';
import { groupLog } from '../../../utils';

export type SignInMachineOptions = {
  services?: Partial<typeof defaultServices>;
};

const SIGN_IN_STEP_MFA_CONFIRMATION: string[] = [
  'CONFIRM_SIGN_IN_WITH_SMS_CODE',
  'CONFIRM_SIGN_IN_WITH_TOTP_CODE',
];

export function signInActor({ services }: SignInMachineOptions) {
  return createMachine<SignInContext, AuthEvent>(
    {
      initial: 'init',
      id: 'signInActor',
      predictableActionArguments: true,
      states: {
        init: {
          always: [
            { target: 'autoSignIn.submit', cond: 'shouldAutoSubmit' },
            { target: 'autoSignIn', cond: 'shouldAutoSignIn' },
            { target: 'signIn' },
          ],
        },
        signIn: {
          initial: 'edit',
          exit: ['clearFormValues', 'clearTouched'],
          states: {
            edit: {
              entry: 'sendUpdate',
              on: {
                SUBMIT: { actions: 'handleSubmit', target: 'submit' },
                CHANGE: { actions: 'handleInput' },
                FEDERATED_SIGN_IN: 'federatedSignIn',
              },
            },
            federatedSignIn: {
              tags: ['pending'],
              entry: ['sendUpdate', 'clearError'],
              invoke: {
                src: 'federatedSignIn',
                onError: { actions: 'setRemoteError' },
              },
            },
            submit: {
              tags: ['pending'],
              entry: ['parsePhoneNumber', 'clearError', 'sendUpdate'],
              invoke: {
                /**
                 * @migration SignInOutput
                 */
                src: 'signIn',
                onDone: [
                  {
                    cond: 'shouldSetupTOTP',
                    actions: ['setUser', 'setChallengeName'],
                    target: '#signInActor.setupTOTP',
                  },
                  {
                    cond: 'shouldConfirmSignIn',
                    actions: ['setUser', 'setChallengeName'],
                    target: '#signInActor.confirmSignIn',
                  },
                  {
                    cond: 'shouldForceChangePassword',
                    actions: [
                      'setUser',
                      'setChallengeName',
                      'setRequiredAttributes',
                    ],
                    target: '#signInActor.forceNewPassword',
                  },
                  {
                    cond: 'shouldRedirectToConfirmSignUp',
                    actions: ['setCredentials', 'setConfirmSignUpIntent'],
                    target: 'rejected',
                  },
                  {
                    cond: 'shouldRedirectToConfirmResetPassword',
                    actions: [
                      'setUsernameAuthAttributes',
                      'setConfirmResetPasswordIntent',
                    ],
                    target: 'rejected',
                  },
                  {
                    actions: 'setUser',
                    target: 'verifying',
                  },
                ],
                onError: [
                  {
                    actions: 'setRemoteError',
                    target: 'edit',
                  },
                ],
              },
            },
            verifying: {
              tags: ['pending'],
              entry: ['clearError', 'sendUpdate'],
              invoke: {
                /**
                 * @migration FetchUserAttributesOutput
                 */
                src: 'checkVerifiedContact',
                onDone: [
                  {
                    cond: 'shouldRequestVerification',
                    target: '#signInActor.verifyUser',
                    actions: 'setUnverifiedContactMethods',
                  },
                  {
                    target: 'resolved',
                  },
                ],
                onError: {
                  actions: 'setRemoteError',
                  target: 'edit',
                },
              },
            },
            // resolved: { always: '#signInActor.resolved' },
            resolved: { always: '#signInActor.updateCurrentUser' },
            rejected: { always: '#signInActor.rejected' },
          },
        },
        autoSignIn: {
          initial: 'signIn',
          states: {
            signIn: {
              entry: ['clearError', 'sendUpdate'],
              invoke: {
                src: 'autoSignIn',
                onDone: [
                  {
                    cond: 'shouldSetupTOTP',
                    actions: ['setUser', 'setChallengeName'],
                    target: '#signInActor.setupTOTP',
                  },
                  {
                    cond: 'shouldConfirmSignIn',
                    actions: ['setUser', 'setChallengeName'],
                    target: '#signInActor.confirmSignIn',
                  },
                  {
                    cond: 'shouldForceChangePassword',
                    actions: [
                      'setUser',
                      'setChallengeName',
                      'setRequiredAttributes',
                    ],
                    target: '#signInActor.forceNewPassword',
                  },
                  {
                    actions: ['setUser'],
                    target: '#signInActor.updateCurrentUser',
                  },
                ],
              },
            },
            submit: {
              tags: ['pending'],
              entry: ['clearError', 'sendUpdate'],
              invoke: {
                src: 'signIn',
                onDone: [
                  {
                    cond: 'shouldSetupTOTP',
                    actions: ['setUser', 'setChallengeName'],
                    target: '#signInActor.setupTOTP',
                  },
                  {
                    cond: 'shouldConfirmSignIn',
                    actions: ['setUser', 'setChallengeName'],
                    target: '#signInActor.confirmSignIn',
                  },
                  {
                    cond: 'shouldForceChangePassword',
                    actions: [
                      'setUser',
                      'setChallengeName',
                      'setRequiredAttributes',
                    ],
                    target: '#signInActor.forceNewPassword',
                  },
                  {
                    actions: 'setUser',
                    target: 'resolved',
                  },
                ],
                onError: {
                  actions: 'setRemoteError',
                  target: '#signInActor.signIn',
                },
              },
            },
            // resolved: { always: '#signInActor.resolved' },
            resolved: { always: '#signInActor.updateCurrentUser' },
            rejected: { always: '#signInActor.rejected' },
          },
        },
        confirmSignIn: {
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
              tags: ['pending'],
              entry: ['clearError', 'sendUpdate'],
              invoke: {
                src: 'confirmSignIn',
                onDone: {
                  target: '#signInActor.updateCurrentUser',
                  actions: [
                    'setUser',
                    'clearChallengeName',
                    'clearRequiredAttributes',
                  ],
                },
                onError: {
                  target: 'edit',
                  actions: 'setRemoteError',
                },
              },
            },
          },
        },
        forceNewPassword: {
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
                SIGN_IN: '#signInActor.signIn',
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
                      target: 'pending',
                      actions: 'clearValidationError',
                    },
                    onError: {
                      target: 'idle',
                      actions: 'setFieldErrors',
                    },
                  },
                },
                pending: {
                  tags: ['pending'],
                  entry: ['sendUpdate', 'clearError'],
                  invoke: {
                    /**
                     * @migration is this recursive
                     */
                    src: 'forceNewPassword',
                    onDone: [
                      {
                        cond: 'shouldConfirmSignIn',
                        actions: ['setUser', 'setChallengeName'],
                        target: '#signInActor.confirmSignIn',
                      },
                      {
                        cond: 'shouldSetupTOTP',
                        actions: ['setUser', 'setChallengeName'],
                        target: '#signInActor.setupTOTP',
                      },
                      {
                        target: 'resolved',
                        actions: ['setUser', 'setCredentials'],
                      },
                    ],
                    onError: {
                      target: 'idle',
                      actions: 'setRemoteError',
                    },
                  },
                },
                resolved: {
                  type: 'final',
                  always: '#signInActor.updateCurrentUser',
                },
              },
            },
          },
        },
        setupTOTP: {
          initial: 'getTotpSecretCode',
          exit: ['clearFormValues', 'clearError', 'clearTouched'],
          states: {
            getTotpSecretCode: {
              invoke: {
                src: 'getTotpSecretCode',
                onDone: {
                  target: 'edit',
                  actions: 'setTotpSecretCode',
                },
                onError: {
                  target: 'edit',
                  actions: 'setRemoteError',
                },
              },
            },
            edit: {
              entry: 'sendUpdate',
              on: {
                SUBMIT: { actions: 'handleSubmit', target: 'submit' },
                SIGN_IN: '#signInActor.signIn',
                CHANGE: { actions: 'handleInput' },
              },
            },
            submit: {
              tags: ['pending'],
              entry: ['sendUpdate', 'clearError'],
              invoke: {
                src: 'confirmSignInSetupTotp',
                onDone: {
                  actions: ['clearChallengeName', 'clearRequiredAttributes'],
                  target: '#signInActor.updateCurrentUser',
                },
                onError: {
                  actions: 'setRemoteError',
                  target: 'edit',
                },
              },
            },
          },
        },
        verifyUser: {
          initial: 'edit',
          exit: ['clearFormValues', 'clearError', 'clearTouched'],
          states: {
            edit: {
              entry: 'sendUpdate',
              on: {
                SUBMIT: { actions: 'handleSubmit', target: 'submit' },
                SKIP: '#signInActor.updateCurrentUser',
                CHANGE: { actions: 'handleInput' },
              },
            },
            submit: {
              tags: ['pending'],
              entry: 'clearError',
              invoke: {
                src: 'verifyUser',
                onDone: {
                  target: '#signInActor.confirmVerifyUser',
                },
                onError: {
                  actions: 'setRemoteError',
                  target: 'edit',
                },
              },
            },
          },
        },
        confirmVerifyUser: {
          initial: 'edit',
          exit: [
            'clearFormValues',
            'clearError',
            'clearUnverifiedContactMethods',
            'clearAttributeToVerify',
            'clearTouched',
          ],
          states: {
            edit: {
              entry: 'sendUpdate',
              on: {
                SUBMIT: { actions: 'handleSubmit', target: 'submit' },
                SKIP: '#signInActor.updateCurrentUser',
                CHANGE: { actions: 'handleInput' },
              },
            },
            submit: {
              tags: ['pending'],
              entry: 'clearError',
              invoke: {
                src: 'confirmVerifyUser',
                onDone: {
                  target: '#signInActor.updateCurrentUser',
                },
                onError: {
                  actions: 'setRemoteError',
                  target: 'edit',
                },
              },
            },
          },
        },
        updateCurrentUser: {
          invoke: {
            src: 'getCurrentUserResolved',
            onDone: {
              actions: 'setUser',
              target: '#signInActor.resolved',
            },
          },
        },
        resolved: {
          type: 'final',
          data: (context, event) => {
            groupLog('+++signIn.resolved.final', context, event);
            return { ...event.data, authAttributes: context.authAttributes };
          },
        },
        rejected: {
          type: 'final',
          data: (context) => {
            groupLog('+++signIn.rejected.final', context);

            return {
              intent: context.redirectIntent,
              authAttributes: context.authAttributes,
            };
          },
        },
      },
    },
    {
      actions: {
        clearAttributeToVerify,
        clearChallengeName,
        clearRequiredAttributes,
        clearError,
        clearFormValues,
        clearTouched,
        clearUnverifiedContactMethods,
        clearValidationError,
        handleInput,
        handleSubmit,
        handleBlur,
        parsePhoneNumber,
        setChallengeName,
        setConfirmResetPasswordIntent,
        setConfirmSignUpIntent,
        setRequiredAttributes,
        setCredentials,
        setFieldErrors,
        setRemoteError,
        setTotpSecretCode,
        setUnverifiedContactMethods,
        setUser,
        setUsernameAuthAttributes,
        sendUpdate: sendUpdate(), // sendUpdate is a HOC
      },
      guards: {
        shouldAutoSignIn: (context) => {
          groupLog(
            '+++signIn.shouldAutoSignIn',
            context?.intent === 'autoSignIn'
          );
          return context?.intent === 'autoSignIn';
        },
        shouldAutoSubmit: (context) => {
          groupLog(
            '+++signIn.shouldAutoSubmit',
            context?.intent === 'autoSignInSubmit'
          );
          return context?.intent === 'autoSignInSubmit';
        },
        shouldConfirmSignIn: (_, event): boolean => {
          groupLog(
            '+++shouldConfirmSignIn',
            SIGN_IN_STEP_MFA_CONFIRMATION.includes(
              event.data.nextStep?.signInStep
            )
          );
          return SIGN_IN_STEP_MFA_CONFIRMATION.includes(
            event.data.nextStep?.signInStep
          );
        },
        shouldForceChangePassword: (_, event): boolean => {
          groupLog(
            '+++shouldForceChangePassword',
            event.data.nextStep?.signInStep ===
              'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED'
          );
          return (
            event.data.nextStep?.signInStep ===
            'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED'
          );
        },
        shouldRedirectToConfirmResetPassword: (_, event): boolean => {
          groupLog(
            '+++shouldRedirectToConfirmResetPassword',
            event.data.nextStep?.signInStep === 'RESET_PASSWORD'
          );
          return event.data.nextStep?.signInStep === 'RESET_PASSWORD';
        },
        shouldRedirectToConfirmSignUp: (_, event): boolean => {
          groupLog(
            '+++shouldRedirectToConfirmSignUp',
            event.data.nextStep?.signInStep === 'CONFIRM_SIGN_UP'
          );
          return event.data.nextStep?.signInStep === 'CONFIRM_SIGN_UP';
        },
        shouldRequestVerification: (context, event): boolean => {
          const { phone_number_verified, email_verified } =
            event.data as FetchUserAttributesOutput;

          // email/phone_verified is returned as a string
          const emailNotVerified =
            email_verified === undefined || email_verified === 'false';
          const phoneNotVerified =
            phone_number_verified === undefined ||
            phone_number_verified === 'false';

          // only request verification if both email and phone are not verified
          return emailNotVerified && phoneNotVerified;
        },
        shouldSetupTOTP: (context, event): boolean => {
          groupLog(
            '+++shouldSetupTOTP',
            event.data.nextStep?.signInStep ===
              'CONTINUE_SIGN_IN_WITH_TOTP_SETUP'
          );
          //   event.data ={
          //     "isSignedIn": false,
          //     "nextStep": {
          //         "signInStep": "CONTINUE_SIGN_IN_WITH_TOTP_SETUP",
          //         "totpSetupDetails": {
          //             "sharedSecret": "xxxx"
          //         }
          //     }
          // }
          return (
            event.data.nextStep?.signInStep ===
            'CONTINUE_SIGN_IN_WITH_TOTP_SETUP'
          );
        },
      },
      services: {
        async signIn(context) {
          /**
           * `authAttributes` are any username/password combo we remembered in
           * memory. This is used in autoSignIn flow usually to pass username/pw
           * from `confirmSignUp`.
           */
          const { authAttributes = {}, formValues = {} } = context;

          const credentials = { ...authAttributes, ...formValues };
          const { username, password } = credentials;

          groupLog('+++signIn', 'credentials', credentials);

          return await services.handleSignIn({
            username,
            password,
          });
        },
        async confirmSignIn(context) {
          groupLog('+++confirmSignIn');

          const { confirmation_code: challengeResponse } = context.formValues;

          return services.handleConfirmSignIn({ challengeResponse });
          // return await getCurrentUser();
        },
        async forceNewPassword(context) {
          groupLog('+++forceNewPassword');
          const { formValues } = context;
          let {
            password,
            confirm_password,
            phone_number,
            country_code,
            ...rest
          } = formValues;

          let phoneNumberWithCountryCode;
          if (phone_number) {
            phoneNumberWithCountryCode =
              `${country_code}${phone_number}`.replace(/[^A-Z0-9+]/gi, '');
            rest = { ...rest, phone_number: phoneNumberWithCountryCode };
          }

          try {
            // complete forceNewPassword flow and get updated CognitoUser
            const input: ConfirmSignInInput = {
              challengeResponse: password,
              options: {
                userAttributes: rest,
              },
            };

            const output = await confirmSignIn(input);
            const { signInStep } = output.nextStep;

            if (signInStep === 'DONE') {
              /**
               * Else, user has signed in! Return up-to-date user with
               * `getCurrentUser`. Note that we're calling this extra
               * API because this gets all `user.attributes` as well.
               */
              // @todo-migration needs attributes
              return getCurrentUser();
            } else {
              /**
               * User still needs to complete MFA challenge. Return back the
               * `completeNewPassword` result to start confirmSignIn flow.
               */
              return output;
            }
          } catch (err) {
            return Promise.reject(err);
          }
        },
        async getTotpSecretCode(_, event) {
          //   event.data = {
          //     "isSignedIn": false,
          //     "nextStep": {
          //         "signInStep": "CONTINUE_SIGN_IN_WITH_TOTP_SETUP",
          //         "totpSetupDetails": {
          //             "sharedSecret": "xxxx"
          //         }
          //     }
          // }
          groupLog(
            '+++getTotpSecretCode',
            'event',
            event.data.nextStep.totpSetupDetails.sharedSecret
          );
          return event.data.nextStep.totpSetupDetails.sharedSecret;
        },
        async confirmSignInSetupTotp(context) {
          const { confirmation_code: code } = context.formValues;
          groupLog('+++confirmSignInSetupTotp', 'code', code);
          const input: ConfirmSignInInput = { challengeResponse: code };
          return await confirmSignIn(input);
        },
        async federatedSignIn(_, event) {
          groupLog('+++signIn.signInWithRedirect', event);
          const { provider } = event.data;
          return await signInWithRedirect({ provider });
        },
        async checkVerifiedContact(): Promise<FetchUserAttributesOutput> {
          groupLog('+++checkVerifiedContacts', await fetchUserAttributes());

          return await fetchUserAttributes();
        },
        async verifyUser(context) {
          const { unverifiedAttr } = context.formValues;
          groupLog('+++verifyUser', unverifiedAttr, context);

          const input: SendUserAttributeVerificationCodeInput = {
            userAttributeKey:
              unverifiedAttr as SendUserAttributeVerificationCodeInput['userAttributeKey'],
          };
          const result = await sendUserAttributeVerificationCode(input);

          context.attributeToVerify = unverifiedAttr;

          return result;
        },
        async confirmVerifyUser(context) {
          groupLog('+++confirmVerifyUser');
          const { attributeToVerify } = context;
          const { confirmation_code } = context.formValues;

          const input: ConfirmUserAttributeInput = {
            confirmationCode: confirmation_code,
            userAttributeKey:
              attributeToVerify as ConfirmUserAttributeInput['userAttributeKey'],
          };
          return await confirmUserAttribute(input);
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
        async getCurrentUserResolved(context) {
          groupLog('+++getCurrentUserResolved', context);
          return {
            ...(await getCurrentUser()),
            attributes: { ...(await fetchUserAttributes()) },
          };
        },
        async autoSignIn() {
          groupLog('+++autoSignIn');
          return await autoSignIn();
        },
      },
    }
  );
}
