import { createMachine, sendUpdate } from 'xstate';

import {
  autoSignIn,
  ConfirmSignUpInput,
  resendSignUpCode,
  signInWithRedirect,
  fetchUserAttributes,
} from 'aws-amplify/auth';

import { AuthEvent, SignUpContext } from '../types';
import { getSignUpInput } from '../utils';

import { runValidators } from '../../../validators';

import actions from '../actions';
import { defaultServices } from '../defaultServices';
import guards from '../guards';

export type SignUpMachineOptions = {
  services?: Partial<typeof defaultServices>;
};

const handleResetPasswordResponse = {
  onDone: [
    { actions: 'setCodeDeliveryDetails', target: '#signUpActor.resolved' },
  ],
  onError: { actions: ['setRemoteError', 'sendUpdate'] },
};

const handleAutoSignInResponse = {
  onDone: [
    {
      cond: 'hasCompletedSignIn',
      actions: 'setNextSignInStep',
      target: '#signUpActor.fetchUserAttributes',
    },
    {
      cond: 'shouldConfirmSignInWithNewPassword',
      actions: 'setNextSignInStep',
      target: '#signUpActor.resolved',
    },
    {
      cond: 'shouldResetPasswordFromSignIn',
      actions: 'setNextSignInStep',
      target: '#signUpActor.resetPassword',
    },
    {
      cond: 'shouldConfirmSignUpFromSignIn',
      actions: 'setNextSignInStep',
      target: '#signUpActor.resendSignUpCode',
    },
    {
      actions: [
        'setNextSignInStep',
        'setChallengeName',
        'setMissingAttributes',
        'setTotpSecretCode',
      ],
      target: '#signUpActor.resolved',
    },
  ],
  onError: {
    actions: 'setRemoteError',
    target: '#signUpActor.resolved',
  },
};

const handleFetchUserAttributesResponse = {
  onDone: [
    {
      cond: 'shouldVerifyAttribute',
      actions: [
        'setShouldVerifyUserAttributeStep',
        'setUnverifiedUserAttributes',
      ],
      target: '#signUpActor.resolved',
    },
    {
      actions: 'setConfirmAttributeCompleteStep',
      target: '#signUpActor.resolved',
    },
  ],
  onError: {
    actions: 'setConfirmAttributeCompleteStep',
    target: '#signUpActor.resolved',
  },
};

export function signUpActor({ services }: SignUpMachineOptions) {
  return createMachine<SignUpContext, AuthEvent>(
    {
      id: 'signUpActor',
      initial: 'init',
      predictableActionArguments: true,
      states: {
        init: {
          always: [
            { cond: 'shouldConfirmSignUp', target: 'confirmSignUp' },
            { target: 'signUp' },
          ],
        },
        autoSignIn: {
          tags: 'pending',
          invoke: { src: 'autoSignIn', ...handleAutoSignInResponse },
        },
        fetchUserAttributes: {
          invoke: {
            src: 'fetchUserAttributes',
            ...handleFetchUserAttributesResponse,
          },
        },
        resetPassword: {
          invoke: { src: 'resetPassword', ...handleResetPasswordResponse },
        },
        resendSignUpCode: {
          tags: 'pending',
          entry: 'sendUpdate',
          exit: 'sendUpdate',
          invoke: {
            src: 'resendSignUpCode',
            onDone: {
              actions: ['setCodeDeliveryDetails', 'sendUpdate'],
              target: '#signUpActor.confirmSignUp',
            },
            onError: [
              {
                cond: 'isUserAlreadyConfirmed',
                target: '#signUpActor.resolved',
              },
              { actions: ['setRemoteError', 'sendUpdate'] },
            ],
          },
        },
        signUp: {
          type: 'parallel',
          exit: 'clearTouched',
          states: {
            validation: {
              initial: 'pending',
              states: {
                pending: {
                  invoke: {
                    src: 'validateSignUp',
                    onDone: {
                      actions: 'clearValidationError',
                      target: 'valid',
                    },
                    onError: { actions: 'setFieldErrors', target: 'invalid' },
                  },
                },
                valid: { entry: 'sendUpdate' },
                invalid: { entry: 'sendUpdate' },
              },
              on: {
                CHANGE: { actions: 'handleInput', target: '.pending' },
                BLUR: { actions: 'handleBlur', target: '.pending' },
              },
            },
            submission: {
              initial: 'idle',
              states: {
                idle: {
                  entry: ['sendUpdate'],
                  on: {
                    SUBMIT: { actions: 'handleSubmit', target: 'validate' },
                    FEDERATED_SIGN_IN: 'federatedSignIn',
                  },
                },
                federatedSignIn: {
                  entry: ['sendUpdate', 'clearError'],
                  invoke: {
                    src: 'federatedSignIn',
                    onError: { actions: 'setRemoteError' },
                  },
                },
                validate: {
                  entry: 'sendUpdate',
                  invoke: {
                    src: 'validateSignUp',
                    onDone: {
                      target: 'signUp',
                      actions: 'clearValidationError',
                    },
                    onError: { actions: 'setFieldErrors', target: 'idle' },
                  },
                },
                signUp: {
                  tags: 'pending',
                  entry: ['setUsernameSignUp', 'clearError'],
                  exit: 'sendUpdate',

                  invoke: {
                    src: 'handleSignUp',
                    onDone: [
                      {
                        cond: 'hasCompletedSignUp',
                        actions: 'setNextSignUpStep',
                        target: '#signUpActor.resolved',
                      },
                      {
                        cond: 'shouldAutoSignIn',
                        actions: 'setNextSignUpStep',
                        target: '#signUpActor.autoSignIn',
                      },
                      {
                        actions: [
                          'setCodeDeliveryDetails',
                          'setNextSignUpStep',
                        ],
                        target: '#signUpActor.init',
                      },
                    ],
                    onError: {
                      actions: ['sendUpdate', 'setRemoteError'],
                      target: 'idle',
                    },
                  },
                },
              },
            },
          },
        },
        confirmSignUp: {
          initial: 'edit',
          entry: 'sendUpdate',
          states: {
            edit: {
              on: {
                SUBMIT: { actions: 'handleSubmit', target: 'submit' },
                CHANGE: { actions: 'handleInput' },
                BLUR: { actions: 'handleBlur' },
                RESEND: '#signUpActor.resendSignUpCode',
              },
            },
            submit: {
              tags: 'pending',
              entry: ['clearError', 'sendUpdate'],

              invoke: {
                src: 'confirmSignUp',
                onDone: [
                  {
                    cond: 'shouldAutoSignIn',
                    actions: ['setNextSignUpStep', 'clearFormValues'],
                    target: '#signUpActor.autoSignIn',
                  },
                  {
                    actions: 'setNextSignUpStep',
                    target: '#signUpActor.init',
                  },
                ],
                onError: {
                  actions: ['setRemoteError', 'sendUpdate'],
                  target: 'edit',
                },
              },
            },
          },
        },
        resolved: {
          type: 'final',
          data: (context) => ({
            challengeName: context.challengeName,
            missingAttributes: context.missingAttributes,
            remoteError: context.remoteError,
            step: context.step,
            totpSecretCode: context.totpSecretCode,
            unverifiedUserAttributes: context.unverifiedUserAttributes,
          }),
        },
      },
    },
    {
      // sendUpdate is a HOC
      actions: { ...actions, sendUpdate: sendUpdate() },
      guards,
      services: {
        autoSignIn() {
          return autoSignIn();
        },
        async fetchUserAttributes() {
          return fetchUserAttributes();
        },
        confirmSignUp({ formValues, username }) {
          const { confirmation_code: confirmationCode } = formValues;
          const input: ConfirmSignUpInput = { username, confirmationCode };
          return services.handleConfirmSignUp(input);
        },
        resendSignUpCode({ username }) {
          return resendSignUpCode({ username });
        },
        async federatedSignIn(_, { data }) {
          return signInWithRedirect(data);
        },
        async handleSignUp(context) {
          const { formValues, loginMechanisms, username } = context;
          const loginMechanism = loginMechanisms[0];
          const input = getSignUpInput(username, formValues, loginMechanism);

          return services.handleSignUp(input);
        },
        async validateSignUp(context) {
          // This needs to exist in the machine to reference new `services`

          return runValidators(
            context.formValues,
            context.touched,
            context.passwordSettings,
            [
              // Validation of password
              services.validateFormPassword,
              // Validation for default form fields
              services.validateConfirmPassword,
              services.validatePreferredUsername,
              // Validation for any custom Sign Up fields
              services.validateCustomSignUp,
            ]
          );
        },
      },
    }
  );
}
