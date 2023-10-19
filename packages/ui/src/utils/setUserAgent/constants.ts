import {
  AuthUserAgentInput,
  GeoUserAgentInput,
  InAppMessagingUserAgentInput,
  StorageUserAgentInput,
  setCustomUserAgent,
  SetCustomUserAgentInput,
  AuthAction,
  GeoAction,
  InAppMessagingAction,
  StorageAction,
  Category,
} from '@aws-amplify/core/internals/utils';

// replace type once Category input types are available
export const ACCOUNT_SETTINGS_INPUT_BASE: Omit<
  AuthUserAgentInput,
  'additionalDetails'
> = {
  apis: [AuthAction.DeleteUser, AuthAction.UpdatePassword],
  category: Category.Auth,
};

export const AUTHENTICATOR_INPUT_BASE: Omit<
  SetCustomUserAgentInput,
  'additionalDetails'
> = {
  apis: [
    AuthAction.SignUp,
    AuthAction.ConfirmSignUp,
    AuthAction.ResendSignUpCode,
    AuthAction.SignIn,
    AuthAction.FetchMFAPreference,
    AuthAction.UpdateMFAPreference,
    AuthAction.SetUpTOTP,
    AuthAction.VerifyTOTPSetup,
    AuthAction.ConfirmSignIn,
    AuthAction.FetchUserAttributes,
    AuthAction.SignOut,
    AuthAction.ResetPassword,
    AuthAction.ConfirmResetPassword,
    AuthAction.FederatedSignIn,
  ],
  category: Category.Auth,
};

export const GEO_INPUT_BASE: Omit<GeoUserAgentInput, 'additionalDetails'> = {
  category: Category.Geo,
  apis: [GeoAction.SearchByText],
};

export const IN_APP_MESSAGING_INPUT_BASE: Omit<
  InAppMessagingUserAgentInput,
  'additionalDetails'
> = {
  apis: [InAppMessagingAction.SyncMessages],
  category: Category.InAppMessaging,
};

export const STORAGE_INPUT_BASE: Omit<
  StorageUserAgentInput,
  'additionalDetails'
> = {
  apis: [StorageAction.GetUrl, StorageAction.UploadData],
  category: Category.Storage,
};
