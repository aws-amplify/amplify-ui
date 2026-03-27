import { createMachine, sendUpdate } from 'xstate';
import type {
  ConfirmUserAttributeInput,
  SendUserAttributeVerificationCodeInput,
} from 'aws-amplify/auth';
import {
  confirmUserAttribute,
  sendUserAttributeVerificationCode,
} from 'aws-amplify/auth';

import { runValidators } from '../../../validators';

import type { AuthEvent, VerifyUserContext } from '../types';
import actions from '../actions';
import { validateFormPassword, validateConfirmPassword } from '../defaultServices';

export function verifyUserAttributesActor() {
  return createMachine<VerifyUserContext, AuthEvent>(
    {
      id: 'verifyUserAttributesActor',
      initial: 'selectUserAttributes',
      predictableActionArguments: true,
      states: {
        selectUserAttributes: {
          initial: 'edit',
          exit: ['clearError', 'clearTouched', 'sendUpdate'],
          states: {
            edit: {
              entry: 'sendUpdate',
              on: {
                SUBMIT: { actions: 'handleSubmit', target: 'submit' },
                SKIP: { target: '#verifyUserAttributesActor.resolved' },
                CHANGE: { actions: 'handleInput' },
              },
            },
            submit: {
              tags: 'pending',
              entry: ['clearError', 'sendUpdate'],
              invoke: {
                src: 'sendUserAttributeVerificationCode',
                onDone: {
                  actions: [
                    'setSelectedUserAttribute',
                    'setCodeDeliveryDetails',
                  ],
                  target:
                    '#verifyUserAttributesActor.confirmVerifyUserAttribute',
                },
                onError: {
                  actions: 'setRemoteError',
                  target: 'edit',
                },
              },
            },
          },
        },
        confirmVerifyUserAttribute: {
          initial: 'edit',
          exit: ['clearError', 'clearFormValues', 'clearTouched'],
          states: {
            edit: {
              entry: 'sendUpdate',
              on: {
                SUBMIT: { actions: 'handleSubmit', target: 'submit' },
                SKIP: '#verifyUserAttributesActor.resolved',
                CHANGE: { actions: 'handleInput' },
              },
            },
            submit: {
              tags: 'pending',
              entry: ['clearError', 'sendUpdate'],
              invoke: {
                src: 'confirmVerifyUserAttribute',
                onDone: {
                  actions: [
                    'setConfirmAttributeCompleteStep',
                    'clearSelectedUserAttribute',
                  ],
                  target: '#verifyUserAttributesActor.resolved',
                },
                onError: {
                  actions: 'setRemoteError',
                  target: 'edit',
                },
              },
            },
          },
        },
        resolved: { type: 'final', data: ({ step }) => ({ step }) },
      },
    },
    {
      // sendUpdate is a HOC
      actions: { ...actions, sendUpdate: sendUpdate() },
      services: {
        sendUserAttributeVerificationCode({
          formValues: { unverifiedAttr },
          amplifyContext: ctx,
        }) {
          const input: SendUserAttributeVerificationCodeInput = {
            userAttributeKey:
              unverifiedAttr as SendUserAttributeVerificationCodeInput['userAttributeKey'],
          };
          return sendUserAttributeVerificationCode(ctx, input);
        },
        async confirmVerifyUserAttribute({
          formValues: { confirmation_code: confirmationCode },
          selectedUserAttribute,
          amplifyContext: ctx,
        }) {
          const input: ConfirmUserAttributeInput = {
            confirmationCode,
            userAttributeKey:
              selectedUserAttribute as ConfirmUserAttributeInput['userAttributeKey'],
          };
          return confirmUserAttribute(ctx, input);
        },
        async validateFields(context) {
          return runValidators(
            context.formValues,
            context.touched,
            context.passwordSettings,
            [
              validateFormPassword,
              validateConfirmPassword,
            ]
          );
        },
      },
    }
  );
}
