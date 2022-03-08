import { Auth } from 'aws-amplify';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { createMachine, sendUpdate } from 'xstate';
import { AuthChallengeNames, AuthEvent, SignInContext } from '../../../types';
import { runValidators } from '../../../validators';
import {
  clearAttributeToVerify,
  clearChallengeName,
  clearRequiredAttributes,
  clearError,
  clearFormValues,
  clearTouched,
  clearUnverifiedAttributes,
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
  setUnverifiedAttributes,
  setUser,
  setUsernameAuthAttributes,
} from '../actions';
import { defaultServices } from '../defaultServices';

export type SignInMachineOptions = {
  services?: Partial<typeof defaultServices>;
};

export function signInActor({ services }: SignInMachineOptions) {
  return createMachine<SignInContext, AuthEvent>(
    {
      initial: 'init',
      id: 'signInActor',
      states: {
        init: {
          always: [{ target: 'signIn' }],
        },
        signIn: {
          initial: 'edit',
          exit: ['clearFormValues', 'clearTouched'],
          states: {
            edit: {
              entry: sendUpdate(),
              on: {
                SUBMIT: { actions: 'handleSubmit', target: 'submit' },
                CHANGE: { actions: 'handleInput' },
                FEDERATED_SIGN_IN: 'federatedSignIn',
              },
            },
            federatedSignIn: {
              tags: ['pending'],
              entry: [sendUpdate(), 'clearError'],
              invoke: {
                src: 'federatedSignIn',
                // getting navigated out anyway, only track errors.
                // onDone: '#signInActor.resolved',
                onError: { actions: 'setRemoteError' },
              },
            },
            submit: {
              tags: ['pending'],
              entry: ['parsePhoneNumber', 'clearError', sendUpdate()],
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
                    target: 'verifying',
                  },
                ],
                onError: [
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
                    actions: 'setRemoteError',
                    target: 'edit',
                  },
                ],
              },
            },
            verifying: {
              tags: ['pending'],
              entry: ['clearError', sendUpdate()],
              invoke: {
                src: 'checkVerifiedContact',
                onDone: [
                  {
                    cond: 'shouldRequestVerification',
                    target: '#signInActor.verifyUser',
                    actions: 'setUnverifiedAttributes',
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
            resolved: { always: '#signInActor.resolved' },
            rejected: { always: '#signInActor.rejected' },
          },
        },
        confirmSignIn: {
          initial: 'edit',
          exit: ['clearFormValues', 'clearError', 'clearTouched'],
          states: {
            edit: {
              entry: sendUpdate(),
              on: {
                SUBMIT: { actions: 'handleSubmit', target: 'submit' },
                SIGN_IN: '#signInActor.signIn',
                CHANGE: { actions: 'handleInput' },
              },
            },
            submit: {
              tags: ['pending'],
              entry: ['clearError', sendUpdate()],
              invoke: {
                src: 'confirmSignIn',
                onDone: {
                  target: '#signInActor.resolved',
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
                valid: { entry: sendUpdate() },
                invalid: { entry: sendUpdate() },
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
                  entry: sendUpdate(),
                  on: {
                    SUBMIT: { actions: 'handleSubmit', target: 'validate' },
                  },
                },
                validate: {
                  entry: sendUpdate(),
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
                  entry: [sendUpdate(), 'clearError'],
                  invoke: {
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
                resolved: { type: 'final', always: '#signInActor.resolved' },
              },
            },
          },
        },
        setupTOTP: {
          initial: 'edit',
          exit: ['clearFormValues', 'clearError', 'clearTouched'],
          states: {
            edit: {
              entry: sendUpdate(),
              on: {
                SUBMIT: { actions: 'handleSubmit', target: 'submit' },
                SIGN_IN: '#signInActor.signIn',
                CHANGE: { actions: 'handleInput' },
              },
            },
            submit: {
              tags: ['pending'],
              entry: [sendUpdate(), 'clearError'],
              invoke: {
                src: 'verifyTotpToken',
                onDone: {
                  actions: [
                    'setUser',
                    'clearChallengeName',
                    'clearRequiredAttributes',
                  ],
                  target: '#signInActor.resolved',
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
              entry: sendUpdate(),
              on: {
                SUBMIT: { actions: 'handleSubmit', target: 'submit' },
                SKIP: '#signInActor.resolved',
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
            'clearUnverifiedAttributes',
            'clearAttributeToVerify',
            'clearTouched',
          ],
          states: {
            edit: {
              entry: sendUpdate(),
              on: {
                SUBMIT: { actions: 'handleSubmit', target: 'submit' },
                SKIP: '#signInActor.resolved',
                CHANGE: { actions: 'handleInput' },
              },
            },
            submit: {
              tags: ['pending'],
              entry: 'clearError',
              invoke: {
                src: 'confirmVerifyUser',
                onDone: {
                  target: '#signInActor.resolved',
                },
                onError: {
                  actions: 'setRemoteError',
                  target: 'edit',
                },
              },
            },
          },
        },
        resolved: {
          type: 'final',
          data: (context) => ({
            user: context.user,
          }),
        },
        rejected: {
          type: 'final',
          data: (context, event) => {
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
        clearUnverifiedAttributes,
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
        setUnverifiedAttributes,
        setUser,
        setUsernameAuthAttributes,
      },
      guards: {
        shouldConfirmSignIn: (_, event): boolean => {
          const challengeName = get(event, 'data.challengeName');
          const validChallengeNames = [
            AuthChallengeNames.SMS_MFA,
            AuthChallengeNames.SOFTWARE_TOKEN_MFA,
          ];

          return validChallengeNames.includes(challengeName);
        },
        shouldRedirectToConfirmSignUp: (_, event): boolean => {
          return event.data.code === 'UserNotConfirmedException';
        },
        shouldRedirectToConfirmResetPassword: (_, event): boolean => {
          return event.data.code === 'PasswordResetRequiredException';
        },
        shouldSetupTOTP: (_, event): boolean => {
          const challengeName = get(event, 'data.challengeName');

          return challengeName === AuthChallengeNames.MFA_SETUP;
        },
        shouldForceChangePassword: (_, event): boolean => {
          const challengeName = get(event, 'data.challengeName');

          return challengeName === AuthChallengeNames.NEW_PASSWORD_REQUIRED;
        },
        shouldRequestVerification: (_, event): boolean => {
          const { unverified, verified } = event.data;

          return isEmpty(verified) && !isEmpty(unverified);
        },
      },
      services: {
        async signIn(context) {
          const { username, password } = context.formValues;

          return await services.handleSignIn({
            username,
            password,
          });
        },
        async confirmSignIn(context, event) {
          const { challengeName, user } = context;
          const { confirmation_code: code } = context.formValues;

          let mfaType;
          if (
            challengeName === AuthChallengeNames.SMS_MFA ||
            challengeName === AuthChallengeNames.SOFTWARE_TOKEN_MFA
          ) {
            mfaType = challengeName;
          }

          await services.handleConfirmSignIn({ user, code, mfaType });
          return await Auth.currentAuthenticatedUser();
        },
        async forceNewPassword(context, event) {
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

          return Auth.completeNewPassword(user, password, rest);
        },
        async verifyTotpToken(context, event) {
          const { user } = context;
          const { confirmation_code } = context.formValues;

          return Auth.verifyTotpToken(user, confirmation_code);
        },
        async federatedSignIn(_, event) {
          const { provider } = event.data;

          return await Auth.federatedSignIn({ provider });
        },
        async checkVerifiedContact(context, event) {
          const { user } = context;
          const result = await Auth.verifiedContact(user);

          return result;
        },
        async verifyUser(context, event) {
          const { unverifiedAttr } = context.formValues;
          const result = await Auth.verifyCurrentUserAttribute(unverifiedAttr);

          context.attributeToVerify = unverifiedAttr;

          return result;
        },
        async confirmVerifyUser(context, event) {
          const { attributeToVerify } = context;
          const { confirmation_code } = context.formValues;

          return await Auth.verifyCurrentUserAttributeSubmit(
            attributeToVerify,
            confirmation_code
          );
        },
        async validateFields(context, event) {
          return runValidators(
            context.formValues,
            context.touched,
            context.passwordSettings,
            [defaultServices.validateConfirmPassword]
          );
        },
      },
    }
  );
}
