import { get, isEmpty } from 'lodash';
import { createMachine, sendUpdate } from 'xstate';

import { Auth } from 'aws-amplify';

import {
  clearAttributeToVerify,
  clearChallengeName,
  clearError,
  clearFormValues,
  clearUnverifiedAttributes,
  handleInput,
  setChallengeName,
  setConfirmResetPasswordIntent,
  setConfirmSignUpIntent,
  setRemoteError,
  setUnverifiedAttributes,
  setUser,
  setUsernameAuthAttributes,
} from '../../actions';
import { AuthEvent, AuthChallengeNames, SignInContext } from '../../../types';

export const signInMachine = createMachine<SignInContext, AuthEvent>(
  {
    initial: 'init',
    id: 'signIn',
    states: {
      init: {
        always: [
          { target: 'signIn.submit', cond: 'shouldAutoSignIn' },
          { target: 'signIn' },
        ],
      },
      signIn: {
        initial: 'edit',
        exit: 'clearFormValues',
        states: {
          edit: {
            entry: sendUpdate(),
            on: {
              SUBMIT: 'submit',
              CHANGE: { actions: 'handleInput' },
              FEDERATED_SIGN_IN: 'federatedSignIn',
            },
          },
          federatedSignIn: {
            entry: [sendUpdate(), 'clearError'],
            invoke: {
              src: 'federatedSignIn',
              // getting navigated out anyway, only track errors.
              // onDone: '#signInMachine.resolved',
              onError: { actions: 'setRemoteError' },
            },
          },
          submit: {
            entry: ['clearError', sendUpdate()],
            invoke: {
              src: 'signIn',
              onDone: [
                {
                  cond: 'shouldSetupTOTP',
                  actions: ['setUser', 'setChallengeName'],
                  target: '#signInMachine.setupTOTP',
                },
                {
                  cond: 'shouldConfirmSignIn',
                  actions: ['setUser', 'setChallengeName'],
                  target: '#signInMachine.confirmSignIn',
                },
                {
                  cond: 'shouldForceChangePassword',
                  actions: ['setUser', 'setChallengeName'],
                  target: '#signInMachine.forceNewPassword',
                },
                {
                  actions: 'setUser',
                  target: 'verifying',
                },
              ],
              onError: [
                {
                  cond: 'shouldRedirectToConfirmSignUp',
                  actions: [
                    'setUsernameAuthAttributes',
                    'setConfirmSignUpIntent',
                  ],
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
            entry: ['clearError', sendUpdate()],
            invoke: {
              src: 'checkVerifiedContact',
              onDone: [
                {
                  cond: 'shouldRequestVerification',
                  target: '#signInMachine.verifyUser',
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
          resolved: { always: '#signInMachine.resolved' },
          rejected: { always: '#signInMachine.rejected' },
        },
      },
      confirmSignIn: {
        initial: 'edit',
        exit: ['clearFormValues', 'clearError'],
        states: {
          edit: {
            entry: sendUpdate(),
            on: {
              SUBMIT: 'submit',
              SIGN_IN: '#signInMachine.signIn',
              CHANGE: { actions: 'handleInput' },
            },
          },
          submit: {
            entry: ['clearError', sendUpdate()],
            invoke: {
              src: 'confirmSignIn',
              onDone: {
                target: '#signInMachine.resolved',
                actions: ['setUser', 'clearChallengeName'],
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
        initial: 'edit',
        exit: ['clearFormValues', 'clearError'],
        states: {
          edit: {
            entry: sendUpdate(),
            on: {
              SUBMIT: 'submit',
              SIGN_IN: '#signInMachine.signIn',
              CHANGE: { actions: 'handleInput' },
            },
          },
          submit: {
            entry: 'clearError',
            invoke: {
              src: 'forceNewPassword',
              onDone: {
                actions: ['setUser', 'clearChallengeName'],
                target: '#signInMachine.resolved',
              },
              onError: {
                actions: 'setRemoteError',
                target: 'edit',
              },
            },
          },
        },
      },
      setupTOTP: {
        initial: 'edit',
        exit: ['clearFormValues', 'clearError'],
        states: {
          edit: {
            entry: sendUpdate(),
            on: {
              SUBMIT: 'submit',
              SIGN_IN: '#signInMachine.signIn',
              CHANGE: { actions: 'handleInput' },
            },
          },
          submit: {
            entry: [sendUpdate(), 'clearError'],
            invoke: {
              src: 'verifyTotpToken',
              onDone: {
                actions: ['setUser', 'clearChallengeName'],
                target: '#signInMachine.resolved',
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
        exit: ['clearFormValues', 'clearError'],
        states: {
          edit: {
            entry: sendUpdate(),
            on: {
              SUBMIT: 'submit',
              SKIP: '#signInMachine.resolved',
              CHANGE: { actions: 'handleInput' },
            },
          },
          submit: {
            entry: 'clearError',
            invoke: {
              src: 'verifyUser',
              onDone: {
                target: '#signInMachine.confirmVerifyUser',
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
        ],
        states: {
          edit: {
            entry: sendUpdate(),
            on: {
              SUBMIT: 'submit',
              SKIP: '#signInMachine.resolved',
              CHANGE: { actions: 'handleInput' },
            },
          },
          submit: {
            entry: 'clearError',
            invoke: {
              src: 'confirmVerifyUser',
              onDone: {
                target: '#signInMachine.resolved',
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
      clearError,
      clearFormValues,
      clearUnverifiedAttributes,
      handleInput,
      setChallengeName,
      setConfirmResetPasswordIntent,
      setConfirmSignUpIntent,
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
      shouldAutoSignIn: (context) => {
        return !!(context.intent && context.intent === 'autoSignIn');
      },
      shouldRequestVerification: (_, event): boolean => {
        const { unverified, verified } = event.data;

        return isEmpty(verified) && !isEmpty(unverified);
      },
    },
    services: {
      async signIn(context) {
        const source = !!(context.intent && context.intent === 'autoSignIn')
          ? context.authAttributes
          : context.formValues;
        const { username, password } = source;
        return Auth.signIn(username, password);
      },
      async confirmSignIn(context, event) {
        const { challengeName, user } = context;
        const { confirmation_code: code } = event.data;

        let mfaType;
        if (
          challengeName === AuthChallengeNames.SMS_MFA ||
          challengeName === AuthChallengeNames.SOFTWARE_TOKEN_MFA
        ) {
          mfaType = challengeName;
        }

        return Auth.confirmSignIn(user, code, mfaType);
      },
      async forceNewPassword(context, event) {
        const { user } = context;
        const password = get(event, 'data.password');

        return Auth.completeNewPassword(user, password);
      },
      async verifyTotpToken(context, event) {
        const { user } = context;
        const { confirmation_code } = event.data;

        return Auth.verifyTotpToken(user, confirmation_code);
      },
      async federatedSignIn(_, event) {
        const { provider } = event.data;
        const result = await Auth.federatedSignIn({ provider });

        return result;
      },
      async checkVerifiedContact(context, event) {
        const { user } = context;
        const result = await Auth.verifiedContact(user);

        return result;
      },
      async verifyUser(context, event) {
        const result = await Auth.verifyCurrentUserAttribute(
          event.data.unverifiedAttr
        );

        context.attributeToVerify = event.data.unverifiedAttr;

        return result;
      },
      async confirmVerifyUser(context, event) {
        const { attributeToVerify } = context;
        const { confirmation_code: code } = event.data;

        const result = await Auth.verifyCurrentUserAttributeSubmit(
          attributeToVerify,
          code
        );

        return result;
      },
    },
  }
);
