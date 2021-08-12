import { createMachine, sendParent, assign } from 'xstate';
import { passwordMatches, runValidators } from '../../../validators';

import {
  AuthFormData,
  ValidationError,
  AuthEvent,
  CognitoUserAmplify,
  PassedContext,
} from '../../../types';
import { Auth } from 'aws-amplify';

interface SignUpContext {
  remoteError?: string;
  validationError?: ValidationError;
  formValues?: AuthFormData;
  user?: CognitoUserAmplify;
  config?: {
    login_mechanisms: string[];
  };
  passedContext?: PassedContext;
}

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
        exit: 'clearError',
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
              valid: {},
              invalid: {},
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
            // onDone: '#auth.confirmSignUp',
            states: {
              idle: {
                on: {
                  SUBMIT: 'validate',
                  FEDERATED_SIGN_IN: 'federatedSignIn',
                },
              },
              federatedSignIn: {
                invoke: {
                  src: 'federatedSignIn',
                  onDone: '#signUpActor.resolved',
                  onError: { actions: 'setRemoteError' },
                },
              },
              validate: {
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
            on: {
              SUBMIT: 'submit',
              SIGN_IN: '#signUpActor.signUp',
              CHANGE: { actions: 'handleInput' },
            },
          },
          submit: {
            entry: 'clearError',
            invoke: {
              src: 'confirmSignUp',
              onDone: {
                target: '#signUpActor.resolved',
                actions: ['setUser'],
              },
              onError: {
                target: 'edit',
                actions: 'setRemoteError',
              },
            },
          },
        },
      },
      resolved: {
        type: 'final',
        entry: 'reportDone',
      },
    },
  },
  {
    guards: {
      shouldInitConfirmSignUp: (context) => {
        const intent = context.passedContext?.intent;
        return intent && intent === 'confirmSignUp';
      },
    },
    actions: {
      reportDone: sendParent((context) => ({
        type: 'DONE',
        data: { passedContext: context.passedContext },
      })),
      setUser: assign({
        user: (_, event) => event.data,
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
      async validateFields(context, _event) {
        const { formValues } = context;
        const validators = [passwordMatches]; // this can contain custom validators too
        return runValidators(formValues, validators);
      },
    },
  }
);
