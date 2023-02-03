import React from 'react';

import {
  AuthChallengeName,
  AuthenticatorServiceFacade,
  LegacyFormFieldOptions,
} from '@aws-amplify/ui';

import { UseAuthenticator } from './useAuthenticator';

export type AuthenticatorRouteComponentKey =
  | 'confirmResetPassword'
  | 'confirmSignIn'
  | 'confirmSignUp'
  | 'confirmVerifyUser'
  | 'forceNewPassword'
  | 'resetPassword'
  | 'setupTOTP'
  | 'signIn'
  | 'signUp'
  | 'verifyUser';

export type AuthenticatorLegacyField = LegacyFormFieldOptions;
export type AuthenticatorLegacyFields = AuthenticatorLegacyField[];

/**
 * These are the "facades" that we provide, which contains contexts respective
 * to current authenticator state.
 */
export type AuthenticatorMachineContext = AuthenticatorServiceFacade;
export type AuthenticatorMachineContextKey = keyof AuthenticatorMachineContext;

export type AuthenticatorRouteComponentName =
  Capitalize<AuthenticatorRouteComponentKey>;

interface HeaderProps {
  children?: React.ReactNode;
}

interface FooterProps {
  children?: React.ReactNode;
}

type FormFieldsProps = {
  isPending: UseAuthenticator['isPending'];
  validationErrors?: UseAuthenticator['validationErrors'];
};

export type FooterComponent<Props = {}> = React.ComponentType<
  FooterProps & Props
>;

export type FormFieldsComponent<FieldType, Props = {}> = React.ComponentType<
  FormFieldsProps & { fields: FieldType[] } & Props
>;

export type HeaderComponent<Props = {}> = React.ComponentType<
  HeaderProps & Props
>;

export interface ComponentSlots<FieldType = {}> {
  Footer: FooterComponent;
  Header: HeaderComponent;

  // `FormFieldsComponent` requires `FieldType`
  FormFields: FormFieldsComponent<FieldType>;
}

/**
 * Common component prop types used for both RWA and RNA implementations
 */
export type CommonRouteProps = {
  error?: UseAuthenticator['error'];
  isPending: UseAuthenticator['isPending'];
  handleBlur: UseAuthenticator['updateBlur'];
  handleChange: UseAuthenticator['updateForm'];
  handleSubmit: UseAuthenticator['submitForm'];
};

/**
 * Base Route component props
 */
export type ConfirmResetPasswordRouteProps = {
  resendCode: UseAuthenticator['resendCode'];
  validationErrors?: UseAuthenticator['validationErrors'];
} & CommonRouteProps;

export type ConfirmSignInRouteProps = {
  challengeName: AuthChallengeName;
  toSignIn: UseAuthenticator['toSignIn'];
} & CommonRouteProps;

export type ConfirmSignUpRouteProps = {
  codeDeliveryDetails: UseAuthenticator['codeDeliveryDetails'];
  resendCode: UseAuthenticator['resendCode'];
} & CommonRouteProps;

export type ConfirmVerifyUserRouteProps = {
  skipVerification: UseAuthenticator['skipVerification'];
} & CommonRouteProps;

export type ForceResetPasswordRouteProps = {
  toSignIn: UseAuthenticator['toSignIn'];
  validationErrors?: UseAuthenticator['validationErrors'];
} & CommonRouteProps;

export type ResetPasswordRouteProps = {
  toSignIn: UseAuthenticator['toSignIn'];
} & CommonRouteProps;

export type SetupTOTPRouteProps = {
  toSignIn: UseAuthenticator['toSignIn'];
  totpSecretCode: UseAuthenticator['totpSecretCode'];
} & CommonRouteProps;

export type SignInRouteProps = {
  hideSignUp?: boolean;
  toFederatedSignIn: UseAuthenticator['toFederatedSignIn'];
  toResetPassword: UseAuthenticator['toResetPassword'];
  toSignUp: UseAuthenticator['toSignUp'];
} & CommonRouteProps;

export type SignUpRouteProps = {
  hideSignIn?: boolean;
  toFederatedSignIn: UseAuthenticator['toFederatedSignIn'];
  toSignIn: UseAuthenticator['toSignIn'];
  validationErrors?: UseAuthenticator['validationErrors'];
} & CommonRouteProps;

export type VerifyUserRouteProps = {
  skipVerification: UseAuthenticator['skipVerification'];
} & CommonRouteProps;

export interface DefaultProps {
  ConfirmSignIn: ConfirmSignInRouteProps;
  ConfirmSignUp: ConfirmSignUpRouteProps;
  ConfirmResetPassword: ConfirmResetPasswordRouteProps;
  ConfirmVerifyUser: ConfirmVerifyUserRouteProps;
  ForceNewPassword: ForceResetPasswordRouteProps;
  ResetPassword: ResetPasswordRouteProps;
  SetupTOTP: SetupTOTPRouteProps;
  SignIn: SignInRouteProps;
  SignUp: SignUpRouteProps;
  VerifyUser: VerifyUserRouteProps;
}

export interface AuthenticatorRouteProps {
  ConfirmSignIn: ConfirmSignInRouteProps;
  ConfirmSignUp: ConfirmSignUpRouteProps;
  ConfirmResetPassword: ConfirmResetPasswordRouteProps;
  ConfirmVerifyUser: ConfirmVerifyUserRouteProps;
  ForceNewPassword: ForceResetPasswordRouteProps;
  ResetPassword: ResetPasswordRouteProps;
  SetupTOTP: SetupTOTPRouteProps;
  SignIn: SignInRouteProps;
  SignUp: SignUpRouteProps;
  VerifyUser: VerifyUserRouteProps;
}

/**
 * common types extended for default component types/implementations and override component types
 */
type BaseComponent<
  // Route specifc props
  ComponentRouteProps = {},
  // Route specific `FieldType`
  FieldType = {},
  // additional props assigned in the UI layer
  Props = {}
> = React.ComponentType<
  ComponentSlots<FieldType> &
    ComponentRouteProps & { fields: FieldType[] } & Props
>;

/**
 * Authenticator Route Component Default types
 */
export type Defaults<FieldType = {}, PlatformProps = {}> = {
  [Key in AuthenticatorRouteComponentName]: BaseComponent<
    DefaultProps[Key],
    FieldType,
    PlatformProps
  > &
    // add component slots for Defaults
    ComponentSlots<FieldType>;
};

export type Overrides<FieldType = {}, PlatformProps = {}> = {
  [Key in AuthenticatorRouteComponentName]?: BaseComponent<
    DefaultProps[Key],
    FieldType,
    PlatformProps
  >;
};

/**
 * Default Route Component union type
 */
export type DefaultComponentType<FieldType = {}> =
  Defaults<FieldType>[keyof Defaults<FieldType>];

/**
 * Default Route Component union type
 */
export type DefaultPropsType = DefaultProps[keyof DefaultProps];
