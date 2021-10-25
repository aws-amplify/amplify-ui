import { assign, createMachine, forwardTo, spawn } from 'xstate';

import { AuthContext, AuthEvent, LoginMechanism } from '../../types';
import { stopActor } from './actions';
import { resetPasswordActor, signInActor, signOutActor } from './actors';
import { createSignUpMachine } from './signUp';
import { defaultServices } from './defaultServices';

const DEFAULT_COUNTRY_CODE = '+1';

export type AuthenticatorMachineOptions = {
  initialState?: 'signIn' | 'signUp' | 'resetPassword';
  loginMechanisms?: LoginMechanism[];
  services?: typeof defaultServices;
};

export function createAuthenticatorMachine({
  initialState = 'signIn',
  /** @TODO Prefer `usernameAttributes` and `socialProviders` */
  loginMechanisms,
  services,
}: AuthenticatorMachineOptions) {
  return createMachine<AuthContext, AuthEvent>(
    {
      id: 'authenticator',
      initial: 'idle',
      context: {
        user: undefined,
        config: {
          login_mechanisms: loginMechanisms,
        },
        actorRef: undefined,
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
              onError: initialState,
            },
            {
              src: 'getAmplifyConfig',
              onDone: {
                actions: 'applyAmplifyConfig',
              },
            },
          ],
        },
        signIn: {
          entry: 'spawnSignInActor',
          exit: stopActor('signInActor'),
          on: {
            SIGN_UP: 'signUp',
            RESET_PASSWORD: 'resetPassword',
            'done.invoke.signInActor': [
              {
                target: 'signUp',
                cond: 'shouldRedirectToSignUp',
              },
              {
                target: 'resetPassword',
                cond: 'shouldRedirectToResetPassword',
              },
              {
                target: 'authenticated',
                actions: 'setUser',
              },
            ],
          },
        },
        signUp: {
          entry: 'spawnSignUpActor',
          exit: stopActor('signUpActor'),
          on: {
            SIGN_IN: 'signIn',
            'done.invoke.signUpActor': {
              target: 'idle',
              actions: 'setUser',
            },
          },
        },
        resetPassword: {
          entry: 'spawnResetPasswordActor',
          exit: stopActor('resetPasswordActor'),
          on: {
            SIGN_IN: 'signIn',
            'done.invoke.resetPasswordActor': 'signIn',
          },
        },
        signOut: {
          entry: 'spawnSignOutActor',
          exit: [stopActor('signOutActor'), 'clearUser'],
          on: { 'done.invoke.signOutActor': 'signIn' },
        },
        authenticated: {
          on: { SIGN_OUT: 'signOut' },
        },
      },
      on: {
        CHANGE: { actions: 'forwardToActor' },
        SUBMIT: { actions: 'forwardToActor' },
        FEDERATED_SIGN_IN: { actions: 'forwardToActor' },
        RESEND: { actions: 'forwardToActor' },
        SIGN_OUT: { actions: 'forwardToActor' },
        SIGN_IN: { actions: 'forwardToActor' },
        SKIP: { actions: 'forwardToActor' },
      },
    },
    {
      actions: {
        forwardToActor: forwardTo((context) => context.actorRef),
        setUser: assign({
          user: (_, event) => event.data.user || event.data,
        }),
        clearUser: assign({
          user: undefined,
        }),
        applyAmplifyConfig: assign({
          config(context, event) {
            const configuredLoginMechanisms =
              event.data.aws_cognito_login_mechanisms?.map((login) => {
                switch (login) {
                  case 'PREFERRED_USERNAME':
                    return 'username';

                  case 'EMAIL':
                  case 'PHONE_NUMBER':
                  case 'FACEBOOK':
                  case 'GOOGLE':
                  case 'AMAZON':
                  case 'APPLE':
                    return login.toLowerCase();

                  default:
                    console.warn(
                      `Unknown login mechanism from Amplify CLI: ${login}.\nOpen an issue: https://github.com/aws-amplify/amplify-ui/issues/choose`
                    );
                }
              });

            const defaultLoginMechanisms = configuredLoginMechanisms ?? [
              'username',
            ];

            // Prefer explicitly set login mechanisms from machine instantiation over defaults
            const { login_mechanisms = defaultLoginMechanisms } =
              context.config;

            return { login_mechanisms };
          },
        }),
        spawnSignInActor: assign({
          actorRef: (_, event) => {
            const actor = signInActor.withContext({
              authAttributes: event.data?.authAttributes,
              user: event.data?.user,
              intent: event.data?.intent,
              country_code: DEFAULT_COUNTRY_CODE,
              formValues: {},
              validationError: {},
            });
            return spawn(actor, { name: 'signInActor' });
          },
        }),
        spawnSignUpActor: assign({
          actorRef: (context, event) => {
            const actor = createSignUpMachine({ services }).withContext({
              authAttributes: event.data?.authAttributes ?? {},
              country_code: DEFAULT_COUNTRY_CODE,
              intent: event.data?.intent,
              formValues: {},
              validationError: {},
              login_mechanisms: context.config?.login_mechanisms,
            });
            return spawn(actor, { name: 'signUpActor' });
          },
        }),
        spawnResetPasswordActor: assign({
          actorRef: (context, event) => {
            const actor = resetPasswordActor.withContext({
              formValues: {},
              intent: event.data?.intent,
              username: event.data?.authAttributes?.username,
              validationError: {},
            });
            return spawn(actor, { name: 'resetPasswordActor' });
          },
        }),
        spawnSignOutActor: assign({
          actorRef: (context) => {
            const actor = signOutActor.withContext({
              user: context.user,
            });
            return spawn(actor, { name: 'signOutActor' });
          },
        }),
      },
      guards: {
        shouldRedirectToSignUp: (_, event): boolean => {
          if (!event.data?.intent) return false;
          return event.data.intent === 'confirmSignUp';
        },
        shouldRedirectToResetPassword: (_, event): boolean => {
          if (!event.data?.intent) return false;
          return event.data.intent === 'confirmPasswordReset';
        },
      },
      services: {
        ...defaultServices,
        ...services,
      },
    }
  );
}
