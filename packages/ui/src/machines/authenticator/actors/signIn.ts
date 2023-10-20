import * as Auth from '@aws-amplify/auth';
import get from 'lodash/get.js';
import { createMachine, sendUpdate } from 'xstate';

import {
  AuthChallengeName,
  AuthEvent,
  // AmplifyUser,
  SignInContext,
} from '../../../types';
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
import { groupLog, isEmpty, noop } from '../../../utils';

export type SignInMachineOptions = {
  services?: Partial<typeof defaultServices>;
};

const MFA_CHALLENGE_NAMES: AuthChallengeName[] = [
  'SMS_MFA',
  'SOFTWARE_TOKEN_MFA',
];

const SIGN_IN_STEP_MFA_CONFIRMATION: string[] = [
  'CONFIRM_SIGN_IN_WITH_SMS_CODE',
  'CONFIRM_SIGN_IN_WITH_TOTP_CODE',
];

const getChallengeName = (event: AuthEvent): AuthChallengeName =>
  get(event, 'data.challengeName');

const isExpectedChallengeName = (
  challengeName: AuthChallengeName,
  expectedChallengeName: AuthChallengeName
) => challengeName === expectedChallengeName;

const isSignInStepMFAConfirmation = (signInStep: string) =>
  SIGN_IN_STEP_MFA_CONFIRMATION.includes(signInStep);

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
                 * @migration Auth.SignInOutput
                 */
                src: 'signIn',
                onDone: [
                  {
                    cond: 'shouldSetupTOTP',
                    // actions: ['setUser', 'setChallengeName'],
                    actions: ['setChallengeName'],
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
                    actions: 'setUser',
                    target: 'verifying',
                  },
                ],
                onError: [
                  {
                    cond: 'shouldRedirectToConfirmResetPassword',
                    actions: [
                      'setUsernameAuthAttributes',
                      'setConfirmResetPasswordIntent',
                    ],
                    target: 'rejected',
                  },
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
                 * @migration Auth.FetchUserAttributesOutput
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
                src: 'verifyTotpToken',
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
          data: (context, event) => {
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
          groupLog('+++signIn.shouldAutoSignIn', 'context', context);
          return context?.intent === 'autoSignIn';
        },
        shouldAutoSubmit: (context) => {
          groupLog('+++signIn.shouldAutoSubmit', 'context', context);
          return context?.intent === 'autoSignInSubmit';
        },
        shouldConfirmSignIn: (_, event): boolean => {
          groupLog('+++shouldConfirmSignIn', 'event', event);
          return isSignInStepMFAConfirmation(event.data.nextStep?.signInStep);
        },
        shouldForceChangePassword: (_, event): boolean => {
          groupLog('+++shouldForceChangePassword', 'event', event);
          return (
            event.data.nextStep?.signInStep ===
            'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED'
          );
        },

        shouldRedirectToConfirmResetPassword: (_, event): boolean => {
          groupLog('+++shouldRedirectToConfirmResetPassword', 'event', event);
          return event.data.code === 'PasswordResetRequiredException';
        },
        shouldRedirectToConfirmSignUp: (_, event): boolean => {
          groupLog('+++shouldRedirectToConfirmSignUp', 'event', event);
          return event.data.nextStep?.signInStep === 'CONFIRM_SIGN_UP';
        },
        shouldRequestVerification: (context, event): boolean => {
          const { phone_number_verified, email_verified } =
            event.data as Auth.FetchUserAttributesOutput;

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
          // return isExpectedChallengeName(getChallengeName(event), 'MFA_SETUP');
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
        // async confirmSignIn(context) {
        //   const { challengeName, user } = context;
        //   const { confirmation_code: code } = context.formValues;

        //   const mfaType = isMfaChallengeName(challengeName)
        //     ? challengeName
        //     : undefined;

        //   await services.handleConfirmSignIn({ user, code, mfaType });
        //   return await Auth.getCurrentUser();
        // },
        async confirmSignIn(context) {
          groupLog('+++confirmSignIn');

          const { confirmation_code: challengeResponse } = context.formValues;

          await services.handleConfirmSignIn({ challengeResponse });
          return await Auth.getCurrentUser();
        },
        // async forceNewPassword(context) {
        //   const { user, formValues } = context;
        //   let {
        //     password,
        //     confirm_password,
        //     phone_number,
        //     country_code,
        //     ...rest
        //   } = formValues;

        //   let phoneNumberWithCountryCode;
        //   if (phone_number) {
        //     phoneNumberWithCountryCode =
        //       `${country_code}${phone_number}`.replace(/[^A-Z0-9+]/gi, '');
        //     rest = { ...rest, phone_number: phoneNumberWithCountryCode };
        //   }

        //   try {
        //     // complete forceNewPassword flow and get updated CognitoUser
        //     const newUser: AmplifyUser = await Auth.completeNewPassword(
        //       user,
        //       password,
        //       rest
        //     );

        //     if (newUser.challengeName) {
        //       /**
        //        * User still needs to complete MFA challenge. Return back the
        //        * `completeNewPassword` result to start confirmSignIn flow.
        //        */
        //       return newUser;
        //     } else {
        //       /**
        //        * Else, user has signed in! Return up-to-date user with
        //        * `getCurrentUser`. Note that we're calling this extra
        //        * API because this gets all `user.attributes` as well.
        //        */
        //       return Auth.getCurrentUser();
        //     }
        //   } catch (err) {
        //     return Promise.reject(err);
        //   }
        // },
        async forceNewPassword(context) {
          groupLog('+++forceNewPassword');
          const { user, formValues } = context;
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
            const input: Auth.ConfirmSignInInput = {
              challengeResponse: password,
              options: {
                userAttributes: rest,
              },
            };

            const output = await Auth.confirmSignIn(input);
            const { signInStep } = output.nextStep;

            if (signInStep === 'DONE') {
              /**
               * Else, user has signed in! Return up-to-date user with
               * `getCurrentUser`. Note that we're calling this extra
               * API because this gets all `user.attributes` as well.
               */
              return Auth.getCurrentUser();
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
        // async getTotpSecretCode(context) {
        //   const { user } = context;
        //   return Auth.setUpTOTP(user);
        // },
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
          // const secretCode = await Auth.setUpTOTP();

          return event.data.nextStep.totpSetupDetails.sharedSecret;
        },
        // async verifyTotpToken(context) {
        //   const { formValues, user } = context;
        //   const { confirmation_code } = formValues;

        //   return Auth.verifyTotpToken(user, confirmation_code);
        // },
        async verifyTotpToken(context) {
          const { confirmation_code: code } = context.formValues;
          /**
           * @migration not sure if renaming makes sense vs explaining
           * confusing API interaction in comment
           */
          groupLog('+++verifyTotpToken', 'code', code);
          // const input: Auth.VerifyTOTPSetupInput = { code };
          // return Auth.verifyTOTPSetup(input);
          // return await Auth.verifyTOTPSetup(input);
          const input: Auth.ConfirmSignInInput = { challengeResponse: code };
          return await Auth.confirmSignIn(input);
        },
        async federatedSignIn(_, event) {
          const { provider } = event.data;
          return await Auth.signInWithRedirect({ provider });
        },

        async checkVerifiedContact(): Promise<Auth.FetchUserAttributesOutput> {
          groupLog(
            '+++checkVerifiedContacts',
            await Auth.fetchUserAttributes()
          );

          return await Auth.fetchUserAttributes();
        },
        // async verifyUser(context) {
        //   const { unverifiedAttr } = context.formValues;
        //   const result = await Auth.verifyCurrentUserAttribute(unverifiedAttr);

        //   context.attributeToVerify = unverifiedAttr;

        //   return result;
        // },
        async verifyUser(context) {
          const { unverifiedAttr } = context.formValues;
          groupLog('+++verifyUser', unverifiedAttr, context);

          const input: Auth.SendUserAttributeVerificationCodeInput = {
            userAttributeKey:
              unverifiedAttr as Auth.SendUserAttributeVerificationCodeInput['userAttributeKey'],
          };
          const result = await Auth.sendUserAttributeVerificationCode(input);

          context.attributeToVerify = unverifiedAttr;

          return result;
        },
        // async confirmVerifyUser(context) {
        //   const { attributeToVerify } = context;
        //   const { confirmation_code } = context.formValues;

        //   return await Auth.verifyCurrentUserAttributeSubmit(
        //     attributeToVerify,
        //     confirmation_code
        //   );
        // },
        async confirmVerifyUser(context) {
          groupLog('+++confirmVerifyUser');
          const { attributeToVerify } = context;
          const { confirmation_code } = context.formValues;

          const input: Auth.ConfirmUserAttributeInput = {
            confirmationCode: confirmation_code,
            userAttributeKey: attributeToVerify,
          };
          return await Auth.confirmUserAttribute(input);
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
          groupLog('+++getCurrentUserResolved', context, event);
          return {
            ...(await Auth.getCurrentUser()),
            attributes: { ...(await Auth.fetchUserAttributes()) },
          };
        },
        async autoSignIn() {
          return await Auth.autoSignIn();
        },
      },
    }
  );
}
