import { createMachine, assign, sendUpdate } from 'xstate';
import { get } from 'lodash';

import { AuthEvent, AuthChallengeNames, SignInContext } from '../../../types';
import { Auth } from 'aws-amplify';

export const signInActor = createMachine<SignInContext, AuthEvent>(
  {
    initial: 'init',
    id: 'signInActor',
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
              // onDone: '#signInActor.resolved',
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
                  target: '#signInActor.setupTOTP',
                },
                {
                  cond: 'shouldConfirmSignIn',
                  actions: ['setUser', 'setChallengeName'],
                  target: '#signInActor.confirmSignIn',
                },
                {
                  cond: 'shouldForceChangePassword',
                  actions: ['setUser', 'setChallengeName'],
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
                  actions: 'setUsername',
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
                  target: '#signInActor.verifyUser',
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
        exit: ['clearFormValues', 'clearError'],
        states: {
          edit: {
            entry: sendUpdate(),
            on: {
              SUBMIT: 'submit',
              SIGN_IN: '#signInActor.signIn',
              CHANGE: { actions: 'handleInput' },
            },
          },
          submit: {
            entry: ['clearError', sendUpdate()],
            invoke: {
              src: 'confirmSignIn',
              onDone: {
                target: '#signInActor.resolved',
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
              SIGN_IN: '#signInActor.signIn',
              CHANGE: { actions: 'handleInput' },
            },
          },
          submit: {
            entry: 'clearError',
            invoke: {
              src: 'forceNewPassword',
              onDone: {
                actions: ['setUser', 'clearChallengeName'],
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
      setupTOTP: {
        initial: 'edit',
        exit: ['clearFormValues', 'clearError'],
        states: {
          edit: {
            entry: sendUpdate(),
            on: {
              SUBMIT: 'submit',
              SIGN_IN: '#signInActor.signIn',
              CHANGE: { actions: 'handleInput' },
            },
          },
          submit: {
            entry: [sendUpdate(), 'clearError'],
            invoke: {
              src: 'verifyTotpToken',
              onDone: {
                actions: ['setUser', 'clearChallengeName'],
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
        exit: ['clearFormValues', 'clearError'],
        states: {
          edit: {
            entry: sendUpdate(),
            on: {
              SUBMIT: 'submit',
              SKIP: '#signInActor.resolved',
              CHANGE: { actions: 'handleInput' },
            },
          },
          submit: {
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
        ],
        states: {
          edit: {
            entry: sendUpdate(),
            on: {
              SUBMIT: 'submit',
              SKIP: '#signInActor.resolved',
              CHANGE: { actions: 'handleInput' },
            },
          },
          submit: {
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
        data: (context) => ({
          intent: 'confirmSignUp',
          authAttributes: context.authAttributes,
        }),
      },
    },
  },
  {
    actions: {
      handleInput: assign({
        formValues(context, event) {
          const { name, value } = event.data;
          return { ...context.formValues, [name]: value };
        },
      }),
      setUser: assign({
        user: (_, event) => event.data.user || event.data,
      }),
      setUsername: assign({
        authAttributes: (context) => ({
          username: context.formValues.username,
        }),
      }),
      setRemoteError: assign({
        remoteError: (_, event) => event.data?.message || event.data,
      }),
      setChallengeName: assign({
        challengeName: (_, event) => event.data?.challengeName,
      }),
      clearChallengeName: assign({ challengeName: undefined }),
      clearError: assign({ remoteError: '' }),
      clearFormValues: assign({ formValues: {} }),
      clearUnverifiedAttributes: assign({ unverifiedAttributes: undefined }),
      clearAttributeToVerify: assign({ attributeToVerify: undefined }),
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
      shouldRequestVerification: (context, event): boolean => {
        const { unverified } = event.data;

        if (Object.keys(unverified).length > 0) {
          context.unverifiedAttributes = unverified;

          return true;
        }

        return false;
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
