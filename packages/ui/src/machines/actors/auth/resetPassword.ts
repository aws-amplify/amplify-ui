import { createMachine, sendUpdate } from 'xstate';

import { Auth } from 'aws-amplify';

import { AuthEvent, ResetPasswordContext } from '../../../types';
import {
  clearError,
  clearFormValues,
  clearUsername,
  handleInput,
  setRemoteError,
  setUsername,
} from '../../actions';

export const resetPasswordMachine = createMachine<
  ResetPasswordContext,
  AuthEvent
>(
  {
    id: 'resetPassword',
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
        exit: ['clearFormValues', 'clearError'],
        states: {
          edit: {
            entry: sendUpdate(),
            on: {
              SUBMIT: 'submit',
              CHANGE: { actions: 'handleInput' },
            },
          },
          submit: {
            entry: [sendUpdate(), 'setUsername', 'clearError'],
            invoke: {
              src: 'resetPassword',
              onDone: {
                target: '#resetPasswordMachine.confirmResetPassword',
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
        initial: 'edit',
        exit: ['clearFormValues', 'clearError', 'clearUsername'],
        states: {
          edit: {
            entry: sendUpdate(),
            on: {
              SUBMIT: 'submit',
              RESEND: 'resendCode',
              CHANGE: { actions: 'handleInput' },
            },
          },
          resendCode: {
            entry: ['clearError', sendUpdate()],
            invoke: {
              src: 'resetPassword',
              onDone: { target: 'edit' },
              onError: {
                actions: 'setRemoteError',
                target: 'edit',
              },
            },
          },
          submit: {
            entry: ['clearError', sendUpdate()],
            invoke: {
              src: 'confirmResetPassword',
              onDone: {
                actions: 'clearUsername',
                target: '#resetPasswordMachine.resolved',
              },
              onError: {
                actions: 'setRemoteError',
                target: 'edit',
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
      clearUsername,
      handleInput,
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
    },
  }
);
