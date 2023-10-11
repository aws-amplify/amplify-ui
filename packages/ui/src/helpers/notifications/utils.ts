import {
  Category,
  InAppMessagingAction,
  SetCustomUserAgentInput,
} from '@aws-amplify/core/internals/utils';

export const notificationsDataPlaneState: SetCustomUserAgentInput = {
  category: Category.InAppMessaging,
  apis: [InAppMessagingAction.SyncMessages],
  additionalDetails: [['component', 'inappmessaging']],
};
