import { get } from 'lodash';
import { createMachine, sendUpdate } from 'xstate';

import { Auth } from 'aws-amplify';

import { passwordMatches, runValidators } from '../../../validators';
import { AuthEvent, SignUpContext } from '../../../types';
import {
  clearError,
  clearFormValues,
  clearValidationError,
  handleInput,
  setCredentials,
  setFieldErrors,
  setRemoteError,
  setUser,
} from '../../actions';

export const signUpActor = createMachine<SignUpContext, AuthEvent>(
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
        exit: ['clearError', 'clearFormValues'],
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
              CHANGE: {
                actions: 'handleInput',
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
                  SUBMIT: 'validate',
                  FEDERATED_SIGN_IN: 'federatedSignIn',
                },
              },
              federatedSignIn: {
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
                entry: [sendUpdate(), 'clearError'],
                invoke: {
                  src: 'signUp',
                  onDone: {
                    target: 'resolved',
                    actions: ['setUser', 'setCredentials'],
                  },
                  onError: {
                    target: 'idle',
                    actions: 'setRemoteError',
                  },
                },
              },
              resolved: { type: 'final', always: '#signUpActor.confirmSignUp' },
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
              SUBMIT: 'submit',
              CHANGE: { actions: 'handleInput' },
              RESEND: 'resend',
            },
          },
          resend: {
            entry: sendUpdate(),
            invoke: {
              src: 'resendConfirmationCode',
              onDone: { target: 'edit' },
              onError: { target: 'edit', actions: 'setRemoteError' },
            },
          },
          submit: {
            entry: [sendUpdate(), 'clearError'],
            invoke: {
              src: 'confirmSignUp',
              onDone: { target: '#signUpActor.resolved' },
              onError: { target: 'edit', actions: 'setRemoteError' },
            },
          },
        },
      },
      resolved: {
        type: 'final',
        data: (context) => {
          const { username, password } = context.authAttributes;
          const canAutoSignIn = !!(username && password);
          return {
            user: context.user,
            intent: canAutoSignIn ? 'autoSignIn' : null,
            authAttributes: { username, password },
          };
        },
      },
    },
  },
  {
    guards: {
      shouldInitConfirmSignUp: (context) => {
        return context.intent && context.intent === 'confirmSignUp';
      },
    },
    actions: {
      clearError,
      clearFormValues,
      clearValidationError,
      handleInput,
      setCredentials,
      setFieldErrors,
      setRemoteError,
      setUser,
    },
    services: {
      async confirmSignUp(context, event) {
        const { user, authAttributes } = context;
        const { confirmation_code: code } = event.data;

        const username =
          get(user, 'username') || get(authAttributes, 'username');

        return Auth.confirmSignUp(username, code);
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
        const {
          formValues: { password, ...formValues },
          login_mechanisms,
        } = context;

        const [primaryAlias = 'username'] = login_mechanisms;

        if (formValues.phone_number) {
          formValues.phone_number =
            `${formValues.country_code}${formValues.phone_number}`.replace(
              /[^A-Z0-9+]/gi,
              ''
            );
        }

        const username = formValues[primaryAlias];
        delete formValues[primaryAlias];
        delete formValues.confirm_password; // confirm_password field should not be sent to Cognito
        delete formValues.country_code;

        const result = await Auth.signUp({
          username,
          password,
          attributes: formValues,
        });

        // TODO `cond`itionally transition to `signUp.confirm` or `resolved` based on result
        return result;
      },
      async validateFields(context, _event) {
        const { formValues } = context;
        const validators = [passwordMatches]; // this can contain custom validators too
        return runValidators(formValues, validators);
      },
    },
  }
);
