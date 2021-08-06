import { assign, createMachine, forwardTo } from 'xstate';
import { Auth, Amplify } from 'aws-amplify';
import { get } from 'lodash';
import { AuthChallengeNames, AuthContext, AuthEvent } from '../types';
import { passwordMatches, runValidators } from '../validators';
import { inspect } from '@xstate/inspect';
import { signInMachine } from './actors';
import { stop } from 'xstate/lib/actions';
import { spawnActor } from './actions';

// TODO: Remove this before it's merged.
if (typeof window !== 'undefined') {
  inspect({
    // options
    // url: 'https://statecharts.io/inspect', // (default)
    iframe: false, // open in new window
  });
}

export const authMachine = createMachine<AuthContext, AuthEvent>(
  {
    id: 'auth',
    initial: 'idle',
    context: {
      remoteError: '',
      formValues: {},
      validationError: {},
      user: undefined,
      session: undefined,
    },
    states: {
      // See: https://xstate.js.org/docs/guides/communication.html#invoking-promises
      idle: {
        invoke: [
          {
            // TODO Wait for Auth to be configured
            src: 'getCurrentUser',
            onDone: {
              actions: 'setUser',
              target: 'authenticated',
            },
            onError: 'signIn',
          },
          {
            src: 'getAmplifyConfig',
            onDone: {
              actions: 'setAuthConfig',
            },
          },
        ],
      },
      signIn: {
        entry: spawnActor(signInMachine, 'signIn'),
        exit: 'stopActor',
        // {
        //   cond: 'shouldSetupTOTP',
        //   actions: ['setUser', 'setChallengeName'],
        //   target: '#auth.setupTOTP',
        // },
        // {
        //   cond: 'shouldConfirmSignIn',
        //   actions: ['setUser', 'setChallengeName'],
        //   target: '#auth.confirmSignIn',
        // },
        // {
        //   cond: 'shouldForceChangePassword',
        //   actions: ['setUser', 'setChallengeName'],
        //   target: '#auth.forceNewPassword',
        // },
        on: {
          SIGN_UP: 'signUp',
          FEDERATED_SIGN_IN: 'federatedSignIn',
          CONFIRM_SIGN_UP: 'confirmSignUp',
        },
      },
      signUp: {
        on: {
          SIGN_IN: 'signIn',
        },
      },
      federatedSignIn: {},
      authenticated: {
        on: {
          SIGN_OUT: 'signOut',
        },
      },
      forceNewPassword: {},
      confirmSignIn: {},
      setupTOTP: {},
      confirmSignUp: {},
      signOut: {
        initial: 'pending',
        onDone: 'idle',
        states: {
          pending: {
            invoke: {
              src: 'signOut',
              onDone: {
                actions: 'setUser',
                target: 'resolved',
              },
              // See: https://xstate.js.org/docs/guides/communication.html#the-invoke-property
              onError: 'rejected',
            },
          },
          rejected: {
            // TODO Why would signOut be rejected?
            type: 'final',
          },
          resolved: {
            type: 'final',
          },
        },
      },
    },
    on: {
      CHANGE: {
        actions: forwardTo((context) => context.actorRef),
      },
      SUBMIT: {
        actions: forwardTo((context) => context.actorRef),
      },
    },
  },
  {
    actions: {
      stopActor: stop((context) => context.actorRef),
      setUser: assign({
        user(_, event) {
          return event.data?.user || event.data;
        },
      }),
      setAuthConfig: assign({
        config(_, event) {
          return event.data.auth;
        },
      }),
      setRemoteError: assign({
        remoteError(_, event) {
          return event.data?.message || event.data;
        },
      }),
      clearFormValues: assign({ formValues: {} }),
      clearValidationError: assign({ validationError: {} }),
      clearError: assign({ remoteError: '' }),
      handleInput: assign({
        formValues(context, event) {
          const { name, value } = event.data;
          return { ...context.formValues, [name]: value };
        },
      }),
      setFieldErrors: assign({
        validationError(_, event) {
          return event.data;
        },
      }),
      setChallengeName: assign({
        challengeName(_, event) {
          return event.data?.challengeName;
        },
      }),
      clearChallengeName: assign({ challengeName: undefined }),
    },
    // See: https://xstate.js.org/docs/guides/guards.html#guards-condition-functions
    guards: {
      shouldConfirmSignIn: (context, event): boolean => {
        const challengeName = get(event, 'data.challengeName');
        const validChallengeNames = [
          AuthChallengeNames.SMS_MFA,
          AuthChallengeNames.SOFTWARE_TOKEN_MFA,
        ];

        return validChallengeNames.includes(challengeName);
      },
      shouldSetupTOTP: (context, event): boolean => {
        const challengeName = get(event, 'data.challengeName');

        return challengeName === AuthChallengeNames.MFA_SETUP;
      },
      shouldRedirectToConfirmSignUp: (context, event): boolean => {
        return event.data.code === 'UserNotConfirmedException';
      },
      shouldForceChangePassword: (context, event): boolean => {
        const challengeName = get(event, 'data.challengeName');

        return challengeName === AuthChallengeNames.NEW_PASSWORD_REQUIRED;
      },
    },
    services: {
      async validateFields(context, _event) {
        const { formValues } = context;
        const validators = [passwordMatches]; // this can contain custom validators too
        return runValidators(formValues, validators);
      },
      async getCurrentUser() {
        return Auth.currentAuthenticatedUser();
      },
      async getAmplifyConfig() {
        return Amplify.configure();
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
      async federatedSignIn(context, event) {
        const { provider } = event.data;
        const result = await Auth.federatedSignIn({ provider });

        return result;
      },
      async confirmFederatedSignIn(context, event) {
        const result = await Auth.currentAuthenticatedUser();

        return result;
      },
      async verifyTotpToken(context, event) {
        const { user } = context;
        const { confirmation_code } = event.data;

        return Auth.verifyTotpToken(user, confirmation_code);
      },
      async confirmSignUp(context, event) {
        const { username, confirmation_code: code } = event.data;

        return Auth.confirmSignUp(username, code);
      },
      async resendConfirmationCode(context, event) {
        const { username } = event.data;

        return Auth.resendSignUp(username);
      },
      async signUp(context, _event) {
        const {
          formValues: { password, ...formValues },
          config,
        } = context;

        const [primaryAlias] = config?.login_mechanisms ?? ['username'];

        if (formValues.phone_number) {
          formValues.phone_number = formValues.phone_number.replace(
            /[^A-Z0-9+]/gi,
            ''
          );
        }

        const username = formValues[primaryAlias];
        delete formValues[primaryAlias];
        delete formValues.confirm_password; // confirm_password field should not be sent to Cognito

        const result = await Auth.signUp({
          username,
          password,
          attributes: formValues,
        });

        // TODO `cond`itionally transition to `signUp.confirm` or `resolved` based on result
        return result;
      },
      async signOut() {
        await Auth.signOut(/* global? */);
      },
      async forceNewPassword(context, event) {
        const { user } = context;
        const password = get(event, 'data.password');

        const result = await Auth.completeNewPassword(user, password);

        return result;
      },
    },
  }
);
