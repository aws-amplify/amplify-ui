import * as Auth from '@aws-amplify/auth';
import get from 'lodash/get.js';
import pickBy from 'lodash/pickBy.js';
import { assign, createMachine, sendUpdate } from 'xstate';

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
import { groupLog, noop } from '../../utils';

export type SignUpMachineOptions = {
  services?: Partial<typeof defaultServices>;
};

export function createSignUpMachine({ services }: SignUpMachineOptions) {
  return createMachine<SignUpContext, AuthEvent>(
    {
      id: 'signUpActor',
      initial: 'init',
      predictableActionArguments: true,
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
                valid: { entry: 'sendUpdate' },
                invalid: { entry: 'sendUpdate' },
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
                  entry: 'sendUpdate',
                  on: {
                    SUBMIT: { actions: 'handleSubmit', target: 'validate' },
                    FEDERATED_SIGN_IN: 'federatedSignIn',
                  },
                },
                federatedSignIn: {
                  tags: ['pending'],
                  entry: ['sendUpdate', 'clearError'],
                  invoke: {
                    src: 'federatedSignIn',
                    onDone: '#signUpActor.resolved',
                    onError: { actions: 'setRemoteError' },
                  },
                },
                validate: {
                  entry: 'sendUpdate',
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
                  entry: ['parsePhoneNumber', 'sendUpdate', 'clearError'],
                  invoke: {
                    src: 'signUp',
                    onDone: [
                      {
                        cond: 'shouldSkipConfirm',
                        target: 'skipConfirm',
                        actions: [
                          'setAutoSignInIntent', // Moved assign action here due to bug with always transition - https://github.com/statelyai/xstate/issues/890
                          'setUser',
                          'setCredentials',
                        ],
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
                  always: {
                    target: '#signUpActor.resolved',
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
              entry: 'sendUpdate',
              on: {
                SUBMIT: { actions: 'handleSubmit', target: 'submit' },
                CHANGE: { actions: 'handleInput' },
                BLUR: { actions: 'handleBlur' },
                RESEND: 'resend',
              },
            },
            resend: {
              tags: ['pending'],
              entry: 'sendUpdate',
              invoke: {
                src: 'resendConfirmationCode',
                onDone: { target: 'edit' },
                onError: [
                  {
                    target: '#signUpActor.resolved',
                    actions: 'setAutoSignInIntent',
                    cond: 'isUserAlreadyConfirmed',
                  },
                  { target: 'edit', actions: 'setRemoteError' },
                ],
              },
            },
            submit: {
              tags: ['pending'],
              entry: ['sendUpdate', 'clearError'],
              invoke: {
                src: 'confirmSignUp',
                onDone: {
                  target: '#signUpActor.resolved',
                  actions: 'setAutoSignInIntent',
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

            const user = get(event, 'data.user') || context.user;

            groupLog(
              '+++signUpActor.resolved',
              'context',
              context,
              'event',
              event,
              'user',
              user
            );

            return {
              user,
              authAttributes: { username, password },
              intent: context.intent,
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
          console.log('+++isUserAlreadyConfirmed');
          return event.data.message === 'User is already confirmed.';
        },
        shouldInitConfirmSignUp: (context) => {
          console.log('+++shouldInitConfirmSignUp', context);
          /**
           * @migration this lookup is broken, lookup prev event
           */

          return context.intent && context.intent === 'confirmSignUp';
        },
        /**
         * @migration data is Auth.SignUpOutput
         */
        shouldSkipConfirm: (context, { data }) => {
          return data.isSignUpComplete;
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
        sendUpdate: sendUpdate(), // sendUpdate is a HOC
        setAutoSignInIntent: assign({
          intent: (context, event) => {
            groupLog(
              '+++setAutoSignInIntent',
              'context',
              context,
              'event',
              event
            );
            const { nextStep } = event.data as Auth.ConfirmSignUpOutput;
            const { signUpStep } = nextStep;

            if (context?.intent === 'confirmSignUp') {
              return 'autoSignInSubmit';
            } else if (signUpStep === 'COMPLETE_AUTO_SIGN_IN') {
              return 'autoSignIn';
            }
          },
        }),
      },
      services: {
        // async confirmSignUp(context, event) {
        //   const { user, authAttributes, formValues } = context;
        //   const { confirmation_code: code } = formValues;

        //   const username =
        //     get(user, 'username') || get(authAttributes, 'username');

        //   return await services.handleConfirmSignUp({ username, code });
        // },
        async confirmSignUp(context, event) {
          console.group('+++confirmSignUp');

          const { user, authAttributes, formValues } = context;
          const { confirmation_code: confirmationCode } = formValues;
          console.log('context', context);

          const username =
            get(user, 'username') || get(authAttributes, 'username');

          console.groupEnd();

          const input: Auth.ConfirmSignUpInput = {
            username,
            confirmationCode,
          };

          return await services.handleConfirmSignUp(input);
        },
        // async resendConfirmationCode(context, event) {
        //   const { user, authAttributes } = context;
        //   const username =
        //     get(user, 'username') || get(authAttributes, 'username');

        //   return Auth.resendSignUp(username);
        // },
        async resendConfirmationCode(context, event) {
          console.log('+++resendConfirmationCode');

          const { user, authAttributes } = context;
          const username =
            get(user, 'username') || get(authAttributes, 'username');

          const input: Auth.ResendSignUpCodeInput = { username };
          return Auth.resendSignUpCode(input);
        },
        async federatedSignIn(_, event) {
          const { provider } = event.data;
          return await Auth.signInWithRedirect({ provider });
        },
        async signUp(context, _event) {
          console.group('+++signUp');

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

          console.groupEnd();

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
