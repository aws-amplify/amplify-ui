import { createMachine, sendUpdate } from 'xstate';

import { groupLog } from '../../../utils';
import { runValidators } from '../../../validators';
import actions from '../actions';
import { defaultServices } from '../defaultServices';
import { AuthEvent, ResetPasswordContext } from '../types';

export type ForgotPasswordMachineOptions = {
  services?: Partial<typeof defaultServices>;
};

export function forgotPasswordActor({
  services,
}: ForgotPasswordMachineOptions) {
  groupLog('+++forgotPasswordActor (machine)');
  return createMachine<ResetPasswordContext, AuthEvent>(
    {
      id: 'forgotPasswordActor',
      initial: 'init',
      predictableActionArguments: true,
      states: {
        init: {
          always: [
            {
              cond: ({ step }) => {
                groupLog('is FORGOT_PASSWORD', step);
                return step === 'FORGOT_PASSWORD';
              },
              target: 'forgotPassword',
            },
            {
              cond: ({ step }) => {
                groupLog('is CONFIRM_RESET_PASSWORD_WITH_CODE', step);
                return step === 'CONFIRM_RESET_PASSWORD_WITH_CODE';
              },
              target: 'confirmPasswordUpdate',
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
              entry: ['sendUpdate', 'clearError'],
              invoke: {
                src: 'forgotPassword',
                onDone: {
                  actions: [
                    'setUsername',
                    'setCodeDeliveryDetails',
                    'setNextResetPasswordStep',
                  ],
                  target: '#forgotPasswordActor.confirmPasswordUpdate',
                },
                onError: {
                  actions: ['setRemoteError'],
                  target: 'edit',
                },
              },
            },
          },
        },
        confirmPasswordUpdate: {
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
                    src: 'resetPassword',
                    onDone: { target: 'idle' },
                    onError: { actions: 'setRemoteError', target: 'idle' },
                  },
                },
                pending: {
                  tags: 'pending',
                  entry: ['clearError', 'sendUpdate'],
                  invoke: {
                    src: 'handleConfirmPasswordUpdate',
                    onDone: {
                      cond: 'hasCompletePasswordUpdate',
                      actions: 'setNextResetPasswordStep',
                      target: '#forgotPasswordActor.resolved',
                    },
                    onError: { actions: 'setRemoteError', target: 'idle' },
                  },
                },
              },
            },
          },
        },
        resolved: {
          type: 'final',
          data: (context, event) => {
            groupLog('+++resetPassword.resolved.final', context, event);
            return { step: context.step };
          },
        },
      },
    },
    {
      // sendUpdate is a HOC
      actions: { ...actions, sendUpdate: sendUpdate() },
      services: {
        forgotPassword({ formValues }: ResetPasswordContext) {
          groupLog('+++forgotPassword', formValues);
          const { username } = formValues;

          groupLog('+++forgotPassword username:', username);
          return services.handleForgotPassword({ username });
        },
        handleConfirmPasswordUpdate(context) {
          groupLog('+++handleConfirmPasswordUpdate', context);
          const { username } = context;
          const { confirmation_code: confirmationCode, password } =
            context.formValues;

          return services.handleForgotPasswordSubmit({
            confirmationCode,
            newPassword: password,
            username,
          });
        },
        validateFields(context, event) {
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
