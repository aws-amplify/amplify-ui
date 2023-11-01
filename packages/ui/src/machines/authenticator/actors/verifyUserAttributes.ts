import { assign, createMachine, sendUpdate } from 'xstate';
import {
  confirmUserAttribute,
  ConfirmUserAttributeInput,
  fetchUserAttributes,
  FetchUserAttributesOutput,
  sendUserAttributeVerificationCode,
  SendUserAttributeVerificationCodeInput,
} from 'aws-amplify/auth';

import { runValidators } from '../../../validators';

import { AuthEvent, VerifyUserContext } from '../types';
import actions from '../actions';
import { defaultServices } from '../defaultServices';
import { groupLog } from '../../../utils';

export const clearUnverifiedUserAttributes = assign({
  unverifiedContactMethods: (_) => undefined,
});

export function verifyUserAttributesActor() {
  return createMachine<VerifyUserContext, AuthEvent>(
    {
      initial: 'selectUserAttributes',
      id: 'verifyUserAttributesActor',
      predictableActionArguments: true,
      states: {
        selectUserAttributes: {
          initial: 'edit',
          exit: ['clearFormValues', 'clearError', 'clearTouched'],
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
                    'setSelectedUserAttributes',
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
            'clearUnverifiedUserAttributes',
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
            groupLog('+++verifyUserAttribute.resolved.final', context, event);
            return { ...event.data, step: 'VERIFIED' };
          },
        },
      },
    },
    {
      // sendUpdate is a HOC
      actions: { ...actions, sendUpdate: sendUpdate() },
      services: {
        fetchUserAttributes(
          context,
          event
        ): Promise<FetchUserAttributesOutput> {
          groupLog('+++signIn.fetchUserAttributes', context, event);
          return fetchUserAttributes();
        },
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
