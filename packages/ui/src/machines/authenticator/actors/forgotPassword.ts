import { createMachine, sendUpdate } from 'xstate';

import { runValidators } from '../../../validators';
import actions from '../actions';
import guards from '../guards';
import { defaultServices } from '../defaultServices';
import { AuthEvent, ResetPasswordContext } from '../types';

export type ForgotPasswordMachineOptions = {
  services?: Partial<typeof defaultServices>;
};

export function forgotPasswordActor({
  services,
}: ForgotPasswordMachineOptions) {
  return createMachine<ResetPasswordContext, AuthEvent>(
    {
      id: 'forgotPasswordActor',
      initial: 'init',
      predictableActionArguments: true,
      states: {
        init: {
          always: [
            {
              cond: 'shouldResetPassword',
              target: 'confirmResetPassword',
            },
            {
              cond: 'shouldConfirmResetPassword',
              target: 'confirmResetPassword',
            },
            {
              target: 'forgotPassword',
            },
          ],
        },
        forgotPassword: {
          initial: 'edit',
          entry: 'sendUpdate',
          exit: ['clearError', 'clearTouched'],
          states: {
            edit: {
              entry: 'sendUpdate',
              on: {
                SUBMIT: { actions: 'handleSubmit', target: 'submit' },
                CHANGE: { actions: 'handleInput' },
                BLUR: { actions: 'handleBlur' },
              },
            },
            submit: {
              tags: 'pending',
              entry: ['sendUpdate', 'clearError', 'setUsernameForgotPassword'],
              invoke: {
                src: 'handleResetPassword',
                onDone: {
                  actions: [
                    'setCodeDeliveryDetails',
                    'setNextResetPasswordStep',
                  ],
                  target: '#forgotPasswordActor.confirmResetPassword',
                },
                onError: {
                  actions: 'setRemoteError',
                  target: 'edit',
                },
              },
            },
          },
        },
        confirmResetPassword: {
          type: 'parallel',
          exit: ['clearFormValues', 'clearError', 'clearTouched'],
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
                    RESEND: 'resendCode',
                    CHANGE: { actions: 'handleInput' },
                    BLUR: { actions: 'handleBlur' },
                  },
                },
                validate: {
                  entry: 'sendUpdate',
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
                  tags: 'pending',
                  entry: ['clearError', 'sendUpdate'],
                  invoke: {
                    src: 'handleResetPassword',
                    onDone: { target: 'idle' },
                    onError: { actions: 'setRemoteError', target: 'idle' },
                  },
                },
                pending: {
                  tags: 'pending',
                  entry: ['clearError', 'sendUpdate'],
                  invoke: {
                    src: 'handleConfirmResetPassword',
                    onDone: [
                      {
                        cond: 'hasCompletedResetPassword',
                        actions: 'setNextResetPasswordStep',
                        target: '#forgotPasswordActor.resolved',
                      },
                      {
                        actions: 'setSignInStep',
                        target: '#forgotPasswordActor.resolved',
                      },
                    ],
                    onError: { actions: 'setRemoteError', target: 'idle' },
                  },
                },
              },
            },
          },
        },
        resolved: {
          type: 'final',
          data: ({ step }) => ({ step }),
        },
      },
    },
    {
      // sendUpdate is a HOC
      actions: { ...actions, sendUpdate: sendUpdate() },
      guards,
      services: {
        handleResetPassword({ username }: ResetPasswordContext) {
          return services.handleForgotPassword({ username });
        },
        handleConfirmResetPassword({ formValues, username }) {
          const { confirmation_code: confirmationCode, password: newPassword } =
            formValues;

          return services.handleForgotPasswordSubmit({
            confirmationCode,
            newPassword,
            username,
          });
        },
        validateFields(context) {
          return runValidators(
            context.formValues,
            context.touched,
            context.passwordSettings,
            [
              defaultServices.validateFormPassword,
              defaultServices.validateConfirmPassword,
            ]
          );
        },
      },
    }
  );
}
