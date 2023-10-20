import {
  AuthUserAgentInput,
  GeoUserAgentInput,
  InAppMessagingUserAgentInput,
  StorageUserAgentInput,
  AuthAction,
  GeoAction,
  InAppMessagingAction,
  StorageAction,
  Category,
} from '@aws-amplify/core/internals/utils';

export const AUTHENTICATOR_INPUT_BASE: Omit<
  AuthUserAgentInput,
  'additionalDetails'
> = {
  apis: [
    AuthAction.SignUp,
    AuthAction.ConfirmSignUp,
    AuthAction.ResendSignUpCode,
    AuthAction.SignIn,
    AuthAction.ConfirmSignIn,
    AuthAction.FetchUserAttributes,
    AuthAction.SignOut,
    AuthAction.ResetPassword,
    AuthAction.ConfirmResetPassword,
    AuthAction.SignInWithRedirect,
  ],
  category: Category.Auth,
};

export const CHANGE_PASSWORD_INPUT_BASE: Omit<
  AuthUserAgentInput,
  'additionalDetails'
> = {
  apis: [AuthAction.UpdatePassword],
  category: Category.Auth,
};

export const DELETE_USER_INPUT_BASE: Omit<
  AuthUserAgentInput,
  'additionalDetails'
> = {
  apis: [AuthAction.DeleteUser],
  category: Category.Auth,
};

export const IN_APP_MESSAGING_INPUT_BASE: Omit<
  InAppMessagingUserAgentInput,
  'additionalDetails'
> = {
  apis: [InAppMessagingAction.DispatchEvent],
  category: Category.InAppMessaging,
};

export const LOCATION_SEARCH_INPUT_BASE: Omit<
  GeoUserAgentInput,
  'additionalDetails'
> = {
  category: Category.Geo,
  apis: [
    GeoAction.SearchByText,
    GeoAction.SearchForSuggestions,
    GeoAction.SearchByPlaceId,
  ],
};

export const MAP_VIEW_INPUT_BASE: Omit<GeoUserAgentInput, 'additionalDetails'> =
  {
    category: Category.Geo,
    apis: [],
  };

export const STORAGE_INPUT_BASE: Omit<
  StorageUserAgentInput,
  'additionalDetails'
> = {
  apis: [StorageAction.UploadData],
  category: Category.Storage,
};
