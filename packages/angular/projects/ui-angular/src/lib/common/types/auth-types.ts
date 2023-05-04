import {
  DefaultFormFieldOptions,
  AuthenticatorServiceFacade,
  getServiceFacade,
} from '@aws-amplify/ui';

// maps auth attribute to its repsective labels and placeholder
export type AttributeInfoProvider = () => DefaultFormFieldOptions;

export type AuthSubscriptionCallback = (
  state: AuthenticatorServiceFacade
) => void;

export type UseAuthenticator = ReturnType<typeof getServiceFacade>;
