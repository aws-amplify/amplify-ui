import { createMachine, assign, sendUpdate } from 'xstate';
import { passwordMatches, runValidators } from '../../../validators';

import { AuthEvent, SignUpContext } from '../../../types';
import { Auth } from 'aws-amplify';

export const signUpActor = createMachine<SignUpContext, AuthEvent>(
  {
    id: 'signUpActor',
    initial: 'init',
    context: {
      remoteError: '',
      formValues: {},
      validationError: {},
    },
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
                    target: '#signUpActor.confirmSignUp',
                    actions: 'setUser',
                  },
                  onError: {
                    target: 'idle',
                    actions: 'setRemoteError',
                  },
                },
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
              SUBMIT: 'submit',
              SIGN_IN: '#signUpActor.signUp',
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
          const { username, password } = context.formValues;
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
      setUser: assign({
        user: (_, event) => event.data.user ?? event.data,
      }),
      setRemoteError: assign({
        remoteError: (_, event) => event.data?.message || event.data,
      }),
      setFieldErrors: assign({
        validationError: (_, event) => event.data,
      }),
      handleInput: assign({
        formValues: (context, event) => {
          const { name, value } = event.data;
          return { ...context.formValues, [name]: value };
        },
      }),
      clearError: assign({ remoteError: '' }),
      clearFormValues: assign({ formValues: {} }),
      clearValidationError: assign({ validationError: {} }),
    },
    services: {
      async confirmSignUp(_, event) {
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
          login_mechanisms,
        } = context;

        const [primaryAlias] = login_mechanisms ?? ['username'];

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
      async validateFields(context, _event) {
        const { formValues } = context;
        const validators = [passwordMatches]; // this can contain custom validators too
        return runValidators(formValues, validators);
      },
    },
  }
);
