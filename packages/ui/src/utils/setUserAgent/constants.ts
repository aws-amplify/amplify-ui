import {
  setCustomUserAgent,
  SetCustomUserAgentInput,
  AuthAction,
  Category,
} from '@aws-amplify/core/internals/utils';

// replace type once Category input types are available
export const ACCOUNT_SETTINGS_INPUT_BASE: Omit<
  SetCustomUserAgentInput,
  'additionalDetails'
> = {
  apis: [AuthAction.DeleteUser, AuthAction.UpdatePassword],
  category: Category.Auth,
};

// replace type once Category input types are available
export const IN_APP_MESSAGING_INPUT_BASE: Omit<
  SetCustomUserAgentInput,
  'additionalDetails'
> = {
  apis: undefined, // TODO
  category: Category.InAppMessaging,
};
