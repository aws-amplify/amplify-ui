import { Auth } from 'aws-amplify';
import { createMachine, sendUpdate } from 'xstate';

import { AuthEvent, ResetPasswordContext } from '../../../types';
import { runValidators } from '../../../validators';
import {
  clearError,
  clearFormValues,
  clearTouched,
  clearUsername,
  clearValidationError,
  handleInput,
  handleBlur,
  setFieldErrors,
  setRemoteError,
  setUsername,
} from '../actions';
import { defaultServices } from '../defaultServices';

// TODO `createResetPasswordMachine` that accepts `services`
export const resetPasswordActor = createMachine<
  ResetPasswordContext,
  AuthEvent
>(
  {
    id: 'resetPasswordActor',
    initial: 'init',
    states: {
      init: {
        always: [
          { target: 'confirmResetPassword', cond: 'shouldAutoConfirmReset' },
          { target: 'resetPassword' },
        ],
      },
      resetPassword: {
        initial: 'edit',
        exit: ['clearFormValues', 'clearError', 'clearTouched'],
        states: {
          edit: {
            entry: sendUpdate(),
            on: {
              SUBMIT: 'submit',
              CHANGE: { actions: 'handleInput' },
              BLUR: { actions: 'handleBlur' },
            },
          },
          submit: {
            tags: ['pending'],
            entry: [sendUpdate(), 'setUsername', 'clearError'],
            invoke: {
              src: 'resetPassword',
              onDone: {
                target: '#resetPasswordActor.confirmResetPassword',
              },
              onError: {
                actions: ['setRemoteError'],
                target: 'edit',
              },
            },
          },
        },
      },
      confirmResetPassword: {
        type: 'parallel',
        exit: [
          'clearFormValues',
          'clearError',
          'clearUsername',
          'clearTouched',
        ],
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
                  SUBMIT: 'validate',
                  RESEND: 'resendCode',
                  CHANGE: { actions: 'handleInput' },
                  BLUR: { actions: 'handleBlur' },
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
              resendCode: {
                tags: ['pending'],
                entry: ['clearError', sendUpdate()],
                invoke: {
                  src: 'resetPassword',
                  onDone: { target: 'idle' },
                  onError: {
                    actions: 'setRemoteError',
                    target: 'idle',
                  },
                },
              },
              pending: {
                tags: ['pending'],
                entry: ['clearError', sendUpdate()],
                invoke: {
                  src: 'confirmResetPassword',
                  onDone: {
                    actions: 'clearUsername',
                    target: '#resetPasswordActor.resolved',
                  },
                  onError: {
                    actions: 'setRemoteError',
                    target: 'idle',
                  },
                },
              },
            },
          },
        },
      },
      resolved: { type: 'final' },
    },
  },
  {
    actions: {
      clearError,
      clearFormValues,
      clearTouched,
      clearUsername,
      clearValidationError,
      handleInput,
      handleBlur,
      setFieldErrors,
      setRemoteError,
      setUsername,
    },
    guards: {
      shouldAutoConfirmReset: (context, event): boolean => {
        return !!(context.intent && context.intent === 'confirmPasswordReset');
      },
    },
    services: {
      async resetPassword(context) {
        const username = context.formValues?.username ?? context.username;

        return Auth.forgotPassword(username);
      },
      async confirmResetPassword(context) {
        const { username } = context;
        const { confirmation_code: code, password } = context.formValues;

        return Auth.forgotPasswordSubmit(username, code, password);
      },
      async validateFields(context, event) {
        return runValidators(context.formValues, context.touched, [
          defaultServices.validateConfirmPassword,
        ]);
      },
    },
  }
);
