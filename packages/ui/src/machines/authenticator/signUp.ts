import { Auth } from 'aws-amplify';
import get from 'lodash/get';
import pickBy from 'lodash/pickBy';
import { createMachine, sendUpdate } from 'xstate';

import { AuthEvent, SignUpContext } from '../../types';
import { runValidators } from '../../validators';
import {
  clearError,
  clearFormValues,
  clearTouched,
  clearValidationError,
  handleInput,
  handleBlur,
  parsePhoneNumber,
  setCredentials,
  setFieldErrors,
  setRemoteError,
  setCodeDeliveryDetails,
  setUser,
  handleSubmit,
} from './actions';
import { defaultServices } from './defaultServices';

export type SignUpMachineOptions = {
  services?: Partial<typeof defaultServices>;
};

export function createSignUpMachine({ services }: SignUpMachineOptions) {
  return createMachine<SignUpContext, AuthEvent>(
    {
      id: 'signUpActor',
      initial: 'init',
      states: {
        init: {
          always: [
            { target: 'confirmSignUp', cond: 'shouldInitConfirmSignUp' },
            { target: 'signUp' },
          ],
        },
        signUp: {
          type: 'parallel',
          exit: ['clearError', 'clearFormValues', 'clearTouched'],
          states: {
            validation: {
              initial: 'pending',
              states: {
                pending: {
                  invoke: {
                    src: 'validateSignUp',
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
            submission: {
              initial: 'idle',
              states: {
                idle: {
                  entry: sendUpdate(),
                  on: {
                    SUBMIT: { actions: 'handleSubmit', target: 'validate' },
                    FEDERATED_SIGN_IN: 'federatedSignIn',
                  },
                },
                federatedSignIn: {
                  tags: ['pending'],
                  entry: [sendUpdate(), 'clearError'],
                  invoke: {
                    src: 'federatedSignIn',
                    onDone: '#signUpActor.resolved',
                    onError: { actions: 'setRemoteError' },
                  },
                },
                validate: {
                  entry: sendUpdate(),
                  invoke: {
                    src: 'validateSignUp',
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
                  entry: ['parsePhoneNumber', sendUpdate(), 'clearError'],
                  invoke: {
                    src: 'signUp',
                    onDone: [
                      {
                        cond: 'shouldSkipConfirm',
                        target: 'skipConfirm',
                        actions: ['setUser'],
                      },
                      {
                        target: 'resolved',
                        actions: [
                          'setUser',
                          'setCredentials',
                          'setCodeDeliveryDetails',
                        ],
                      },
                    ],
                    onError: {
                      target: 'idle',
                      actions: 'setRemoteError',
                    },
                  },
                },
                skipConfirm: {
                  invoke: {
                    src: 'signIn',
                    onDone: {
                      target: '#signUpActor.resolved',
                      actions: 'setUser',
                    },
                    onError: {
                      target: 'idle',
                      actions: 'setRemoteError',
                    },
                  },
                },

                resolved: {
                  type: 'final',
                  always: '#signUpActor.confirmSignUp',
                },
              },
            },
          },
        },
        confirmSignUp: {
          initial: 'edit',
          states: {
            edit: {
              entry: sendUpdate(),
              on: {
                SUBMIT: { actions: 'handleSubmit', target: 'submit' },
                CHANGE: { actions: 'handleInput' },
                BLUR: { actions: 'handleBlur' },
                RESEND: 'resend',
              },
            },
            resend: {
              tags: ['pending'],
              entry: sendUpdate(),
              invoke: {
                src: 'resendConfirmationCode',
                onDone: { target: 'edit' },
                onError: [
                  {
                    target: '#signUpActor.resolved',
                    actions: 'setUser',
                    cond: 'isUserAlreadyConfirmed',
                  },
                  { target: 'edit', actions: 'setRemoteError' },
                ],
              },
            },
            submit: {
              tags: ['pending'],
              entry: [sendUpdate(), 'clearError'],
              invoke: {
                src: 'confirmSignUp',
                onDone: {
                  target: '#signUpActor.resolved',
                  actions: ['setUser'],
                },
                onError: { target: 'edit', actions: 'setRemoteError' },
              },
            },
          },
        },
        resolved: {
          type: 'final',
          data: (context, event) => {
            const { username, password } = context.authAttributes;

            return {
              user: get(event, 'data.user') || context.user,
              authAttributes: { username, password },
            };
          },
        },
      },
    },
    {
      guards: {
        /**
         * This guard covers an edge case that exists in the current state of the UI.
         * As of now, our ConfirmSignUp screen only supports showing an input for a
         * confirmation code. However, a Cognito UserPool can instead verify users
         * through a link that gets emailed to them. If a user verifies through the
         * link and then they click on the "Resend Code" button, they will get an error
         * saying that the user has already been confirmed. If we encounter that error,
         * we want to just funnel them through the rest of the flow. In the future, we will
         * want to update our UI to support both confirmation codes and links.
         *
         * https://github.com/aws-amplify/amplify-ui/issues/219
         */
        isUserAlreadyConfirmed: (context, event) => {
          return event.data.message === 'User is already confirmed.';
        },
        shouldInitConfirmSignUp: (context) => {
          return context.intent && context.intent === 'confirmSignUp';
        },
        shouldSkipConfirm: (context, event) => {
          return event.data.userConfirmed;
        },
      },
      actions: {
        clearError,
        clearFormValues,
        clearTouched,
        clearValidationError,
        handleInput,
        handleSubmit,
        handleBlur,
        parsePhoneNumber,
        setCredentials,
        setFieldErrors,
        setRemoteError,
        setCodeDeliveryDetails,
        setUser,
      },
      services: {
        async signIn(context, event) {
          const { user, authAttributes, formValues } = context;

          const username =
            get(user, 'username') || get(authAttributes, 'username');
          const password = get(formValues, 'password');

          return await Auth.signIn(username, password);
        },
        async confirmSignUp(context, event) {
          const { user, authAttributes, formValues } = context;
          const { confirmation_code: code } = formValues;

          const username =
            get(user, 'username') || get(authAttributes, 'username');
          const { password } = authAttributes;

          await services.handleConfirmSignUp({ username, code });

          return await Auth.signIn(username, password);
        },
        async resendConfirmationCode(context, event) {
          const { user, authAttributes } = context;
          const username =
            get(user, 'username') || get(authAttributes, 'username');

          return Auth.resendSignUp(username);
        },
        async federatedSignIn(_, event) {
          const { provider } = event.data;
          const result = await Auth.federatedSignIn({ provider });
          return result;
        },
        async signUp(context, _event) {
          const { formValues, loginMechanisms } = context;
          const [primaryAlias = 'username'] = loginMechanisms;
          const { [primaryAlias]: username, password } = formValues;

          const attributes = pickBy(formValues, (_, key) => {
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

          return await services.handleSignUp({
            username,
            password,
            attributes,
          });
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
