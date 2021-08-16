import { createMachine, assign, sendUpdate } from 'xstate';

import { AuthEvent, ResetPasswordContext } from '../../../types';
import { Auth } from 'aws-amplify';

export const resetPasswordActor = createMachine<
  ResetPasswordContext,
  AuthEvent
>(
  {
    id: 'resetPasswordActor',
    initial: 'resetPassword',
    states: {
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
                target: '#resetPasswordActor.resolved',
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
      setRemoteError: assign({
        remoteError: (_, event) => event.data?.message || event.data,
      }),
      setUsername: assign({
        username: (context) => context.formValues.username,
      }),
      handleInput: assign({
        formValues: (context, event) => {
          const { name, value } = event.data;
          return { ...context.formValues, [name]: value };
        },
      }),
      clearFormValues: assign({ formValues: {} }),
      clearError: assign({ remoteError: '' }),
      clearUsername: assign({ username: undefined }),
    },
    services: {
      async resetPassword(context, event) {
        const { username } = context.formValues;
        context.username = username;

        return Auth.forgotPassword(username);
      },
      async confirmResetPassword(context, event) {
        const { username } = context;
        const { confirmation_code: code, password } = event.data;

        return Auth.forgotPasswordSubmit(username, code, password);
      },
    },
  }
);
