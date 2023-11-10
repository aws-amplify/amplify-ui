import React from 'react';

import {
  ChallengeName,
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
  | 'forgotPassword'
  | 'setupTotp'
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

export interface ValidationProps {
  hasValidationErrors: UseAuthenticator['hasValidationErrors'];
  validationErrors?: UseAuthenticator['validationErrors'];
}

/**
 * Base Route component props
 */
export type ConfirmResetPasswordBaseProps<FieldType = {}> = {
  resendCode: UseAuthenticator['resendCode'];
} & CommonRouteProps &
  ComponentSlots<FieldType> &
  ValidationProps;

export type ConfirmSignInBaseProps<FieldType = {}> = {
  challengeName: ChallengeName | undefined;
  toSignIn: UseAuthenticator['toSignIn'];
} & CommonRouteProps &
  ComponentSlots<FieldType> &
  ValidationProps;

export type ConfirmSignUpBaseProps<FieldType = {}> = {
  codeDeliveryDetails: UseAuthenticator['codeDeliveryDetails'];
  resendCode: UseAuthenticator['resendCode'];
} & CommonRouteProps &
  ComponentSlots<FieldType> &
  ValidationProps;

export type ConfirmVerifyUserProps<FieldType = {}> = {
  skipVerification: UseAuthenticator['skipVerification'];
} & CommonRouteProps &
  ComponentSlots<FieldType> &
  ValidationProps;

export type ForceResetPasswordBaseProps<FieldType = {}> = {
  toSignIn: UseAuthenticator['toSignIn'];
} & CommonRouteProps &
  ComponentSlots<FieldType> &
  ValidationProps;

export type ResetPasswordBaseProps<FieldType = {}> = {
  toSignIn: UseAuthenticator['toSignIn'];
} & CommonRouteProps &
  ComponentSlots<FieldType> &
  ValidationProps;

export type SetupTotpBaseProps<FieldType = {}> = {
  toSignIn: UseAuthenticator['toSignIn'];
  totpSecretCode: UseAuthenticator['totpSecretCode'];
  username: UseAuthenticator['username'];
} & CommonRouteProps &
  ComponentSlots<FieldType> &
  ValidationProps;

export type SignInBaseProps<FieldType = {}> = {
  hideSignUp?: boolean;
  socialProviders?: UseAuthenticator['socialProviders'];
  toFederatedSignIn: UseAuthenticator['toFederatedSignIn'];
  toForgotPassword: UseAuthenticator['toForgotPassword'];
  toSignUp: UseAuthenticator['toSignUp'];
} & CommonRouteProps &
  ComponentSlots<FieldType> &
  ValidationProps;

export type SignUpBaseProps<FieldType = {}> = {
  hideSignIn?: boolean;
  socialProviders?: UseAuthenticator['socialProviders'];
  toFederatedSignIn: UseAuthenticator['toFederatedSignIn'];
  toSignIn: UseAuthenticator['toSignIn'];
} & CommonRouteProps &
  ComponentSlots<FieldType> &
  ValidationProps;

export type VerifyUserProps<FieldType = {}> = {
  skipVerification: UseAuthenticator['skipVerification'];
} & CommonRouteProps &
  ComponentSlots<FieldType> &
  ValidationProps;

export interface DefaultProps<FieldType = {}> {
  ConfirmSignIn: ConfirmSignInBaseProps<FieldType>;
  ConfirmSignUp: ConfirmSignUpBaseProps<FieldType>;
  ConfirmResetPassword: ConfirmResetPasswordBaseProps<FieldType>;
  ConfirmVerifyUser: ConfirmVerifyUserProps<FieldType>;
  ForceNewPassword: ForceResetPasswordBaseProps<FieldType>;
  ForgotPassword: ResetPasswordBaseProps<FieldType>;
  SetupTotp: SetupTotpBaseProps<FieldType>;
  SignIn: SignInBaseProps<FieldType>;
  SignUp: SignUpBaseProps<FieldType>;
  VerifyUser: VerifyUserProps<FieldType>;
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
  Props = {},
> = React.ComponentType<
  ComponentSlots<FieldType> &
    ComponentRouteProps & { fields: FieldType[] } & Props
>;

/**
 * Authenticator Route Component Default types
 */
export type Defaults<FieldType = {}, PlatformProps = {}> = {
  [Key in AuthenticatorRouteComponentName]: BaseComponent<
    DefaultProps<FieldType>[Key],
    FieldType,
    PlatformProps
  > &
    // add component slots for Defaults
    ComponentSlots<FieldType>;
};

export type Overrides<FieldType = {}, PlatformProps = {}> = {
  [Key in AuthenticatorRouteComponentName]?: BaseComponent<
    DefaultProps<FieldType>[Key],
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
export type DefaultPropsType<FieldType = {}> =
  DefaultProps<FieldType>[keyof DefaultProps<FieldType>];
