import { assign, createMachine, sendUpdate } from 'xstate';
import {
  confirmUserAttribute,
  ConfirmUserAttributeInput,
  // fetchUserAttributes,
  // FetchUserAttributesOutput,
  sendUserAttributeVerificationCode,
  SendUserAttributeVerificationCodeInput,
} from 'aws-amplify/auth';

import { runValidators } from '../../../validators';

import { AuthEvent, VerifyUserContext } from '../types';
import actions from '../actions';
import { defaultServices } from '../defaultServices';
import { groupLog } from '../../../utils';

export function verifyUserAttributesActor() {
  return createMachine<VerifyUserContext, AuthEvent>(
    {
      id: 'verifyUserAttributesActor',
      initial: 'selectUserAttributes',
      predictableActionArguments: true,
      states: {
        selectUserAttributes: {
          initial: 'edit',
          exit: ['clearError', 'clearTouched'],
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
              entry: 'clearError',
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
          exit: [
            'clearError',
            'clearFormValues',
            'clearTouched',
            'clearSelectedUserAttribute',
          ],
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
              entry: 'clearError',
              invoke: {
                src: 'confirmVerifyUserAttribute',
                onDone: {
                  actions: 'setConfirmAttributeCompleteStep',
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
        resolved: {
          type: 'final',
          data: (context, event) => {
            groupLog(
              '+++verifyUserAttributesActor.resolved.final',
              context,
              event
            );
            return { step: context.step };
          },
        },
      },
    },
    {
      // sendUpdate is a HOC
      actions: { ...actions, sendUpdate: sendUpdate() },
      services: {
        sendUserAttributeVerificationCode(context) {
          const { unverifiedAttr } = context.formValues;
          groupLog(
            '+++sendUserAttributeVerificationCode',
            unverifiedAttr,
            context
          );

          const input: SendUserAttributeVerificationCodeInput = {
            userAttributeKey:
              unverifiedAttr as SendUserAttributeVerificationCodeInput['userAttributeKey'],
          };
          return sendUserAttributeVerificationCode(input);
        },
        confirmVerifyUserAttribute(context) {
          groupLog('+++confirmVerifyUserAttribute', context);
          const { selectedUserAttribute } = context;
          const { confirmation_code } = context.formValues;

          const input: ConfirmUserAttributeInput = {
            confirmationCode: confirmation_code,
            userAttributeKey:
              selectedUserAttribute as ConfirmUserAttributeInput['userAttributeKey'],
          };
          return confirmUserAttribute(input);
        },
        async validateFields(context) {
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
