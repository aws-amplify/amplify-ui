import { createMachine, sendUpdate } from 'xstate';
import pickBy from 'lodash/pickBy.js';

import {
  autoSignIn,
  ConfirmSignUpInput,
  resendSignUpCode,
  signInWithRedirect,
  fetchUserAttributes,
  SignUpInput,
} from 'aws-amplify/auth';

import { AuthEvent, SignUpContext } from '../types';

import { runValidators } from '../../../validators';

import { groupLog } from '../../../utils';
import actions from '../actions';
import { defaultServices } from '../defaultServices';
import guards from '../guards';

export type SignUpMachineOptions = {
  services?: Partial<typeof defaultServices>;
};

const getUserAttributes = (formValues) =>
  pickBy(formValues, (_, key) => {
    // Allowlist of Cognito User Pool Attributes (from OpenID Connect specification)
    // See: https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html
    switch (key) {
      case 'address':
      case 'birthdate':
      case 'email':
      case 'family_name':
      case 'gender':
      case 'given_name':
      case 'locale':
      case 'middle_name':
      case 'name':
      case 'nickname':
      case 'phone_number':
      case 'picture':
      case 'preferred_username':
      case 'profile':
      case 'updated_at':
      case 'website':
      case 'zoneinfo':
        return true;

      // Otherwise, it's a custom attribute
      default:
        return key.startsWith('custom:');
    }
  });

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
      cond: 'shouldResetPassword',
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
  groupLog('+++createSignUpMachine');
  return createMachine<SignUpContext, AuthEvent>(
    {
      id: 'signUpActor',
      initial: 'init',
      predictableActionArguments: true,
      states: {
        init: {
          always: [
            {
              cond: (context, event) => {
                groupLog('go to CONFIRM_SIGN_UP ', context);
                return context.step === 'CONFIRM_SIGN_UP';
              },
              target: 'confirmSignUp',
            },
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
          invoke: {
            src: 'resetPassword',
            ...handleResetPasswordResponse,
          },
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
          data: (context, event) => {
            groupLog('+++signUpActor.resolved.final', context, event);
            return {
              challengeName: context.challengeName,
              missingAttributes: context.missingAttributes,
              remoteError: context.remoteError,
              step: context.step,
              totpSecretCode: context.totpSecretCode,
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
        autoSignIn: () => {
          console.log('+++autoSignIn');
          return autoSignIn();
        },
        async fetchUserAttributes(context) {
          groupLog('+++fetchUserAttributes', context);
          return fetchUserAttributes();
        },
        confirmSignUp(context, event) {
          groupLog('+++confirmSignUp', context, event);
          const { formValues, username } = context;
          const { confirmation_code: confirmationCode } = formValues;
          const input: ConfirmSignUpInput = { username, confirmationCode };
          return services.handleConfirmSignUp(input);
        },
        resendSignUpCode({ username }) {
          console.log('+++resendSignUpCode username:', username);
          return resendSignUpCode({ username });
        },
        async federatedSignIn(_, { data }) {
          groupLog('+++signUp.signInWithRedirect', data);
          return signInWithRedirect(data);
        },
        async handleSignUp(context, _event) {
          groupLog('+++handleSignUp', context);
          const { formValues, loginMechanisms, username } = context;
          const loginMechanism = loginMechanisms[0];
          const { password } = formValues;

          const options: SignUpInput['options'] = {
            autoSignIn: true,
            userAttributes: {
              // use `username` value for `phone_number`
              ...(loginMechanism === 'phone_number'
                ? { ...getUserAttributes(formValues), phone_number: username }
                : getUserAttributes(formValues)),
            },
          };

          return services.handleSignUp({ username, password, options });
        },
        async validateSignUp(context, event) {
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
