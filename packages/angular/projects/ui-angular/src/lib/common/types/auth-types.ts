import {
  DefaultFormFieldOptions,
  AuthenticatorServiceFacade,
} from '@aws-amplify/ui';

// maps auth attribute to its repsective labels and placeholder
export type AttributeInfoProvider = () => DefaultFormFieldOptions;

export type AuthSubscriptionCallback = (
  state: AuthenticatorServiceFacade
) => void;
