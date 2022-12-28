import React from 'react';

import {
  AuthChallengeName,
  AuthenticatorServiceFacade,
  LegacyFormFieldOptions,
} from '@aws-amplify/ui';

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

export type GetTotpSecretCode = () => Promise<string>;

interface HeaderProps {
  children?: React.ReactNode;
}

interface FooterProps {
  children?: React.ReactNode;
}

type FormFieldsProps = {
  isPending: AuthenticatorMachineContext['isPending'];
  validationErrors?: AuthenticatorMachineContext['validationErrors'];
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
  error?: AuthenticatorMachineContext['error'];
  isPending: AuthenticatorMachineContext['isPending'];
  handleBlur: AuthenticatorMachineContext['updateBlur'];
  handleChange: AuthenticatorMachineContext['updateForm'];
  handleSubmit: AuthenticatorMachineContext['submitForm'];
};

/**
 * Base Route component props
 */
export type ConfirmResetPasswordBaseProps<FieldType = {}> = {
  resendCode: AuthenticatorMachineContext['resendCode'];
  validationErrors?: AuthenticatorMachineContext['validationErrors'];
} & CommonRouteProps &
  ComponentSlots<FieldType>;

export type ConfirmSignInBaseProps<FieldType = {}> = {
  challengeName: AuthChallengeName;
  toSignIn: AuthenticatorMachineContext['toSignIn'];
} & CommonRouteProps &
  ComponentSlots<FieldType>;

export type ConfirmSignUpBaseProps<FieldType = {}> = {
  codeDeliveryDetails: AuthenticatorMachineContext['codeDeliveryDetails'];
  resendCode: AuthenticatorMachineContext['resendCode'];
} & CommonRouteProps &
  ComponentSlots<FieldType>;

export type ConfirmVerifyUserProps<FieldType = {}> = {
  skipVerification: AuthenticatorMachineContext['skipVerification'];
} & CommonRouteProps &
  ComponentSlots<FieldType>;

export type ForceResetPasswordBaseProps<FieldType = {}> = {
  toSignIn: AuthenticatorMachineContext['toSignIn'];
  validationErrors?: AuthenticatorMachineContext['validationErrors'];
} & CommonRouteProps &
  ComponentSlots<FieldType>;

export type ResetPasswordBaseProps<FieldType = {}> = {
  toSignIn: AuthenticatorMachineContext['toSignIn'];
} & CommonRouteProps &
  ComponentSlots<FieldType>;

export type SetupTOTPBaseProps<FieldType = {}> = {
  getTotpSecretCode: GetTotpSecretCode;
  toSignIn: AuthenticatorMachineContext['toSignIn'];
} & CommonRouteProps &
  ComponentSlots<FieldType>;

export type SignInBaseProps<FieldType = {}> = {
  hideSignUp?: boolean;
  toFederatedSignIn: AuthenticatorMachineContext['toFederatedSignIn'];
  toResetPassword: AuthenticatorMachineContext['toResetPassword'];
  toSignUp: AuthenticatorMachineContext['toSignUp'];
} & CommonRouteProps &
  ComponentSlots<FieldType>;

export type SignUpBaseProps<FieldType = {}> = {
  hideSignIn?: boolean;
  toFederatedSignIn: AuthenticatorMachineContext['toFederatedSignIn'];
  toSignIn: AuthenticatorMachineContext['toSignIn'];
  validationErrors?: AuthenticatorMachineContext['validationErrors'];
} & CommonRouteProps &
  ComponentSlots<FieldType>;

export type VerifyUserProps<FieldType = {}> = {
  skipVerification: AuthenticatorMachineContext['skipVerification'];
} & CommonRouteProps &
  ComponentSlots<FieldType>;

export interface DefaultProps<FieldType = {}> {
  ConfirmSignIn: ConfirmSignInBaseProps<FieldType>;
  ConfirmSignUp: ConfirmSignUpBaseProps<FieldType>;
  ConfirmResetPassword: ConfirmResetPasswordBaseProps<FieldType>;
  ConfirmVerifyUser: ConfirmVerifyUserProps<FieldType>;
  ForceNewPassword: ForceResetPasswordBaseProps<FieldType>;
  ResetPassword: ResetPasswordBaseProps<FieldType>;
  SetupTOTP: SetupTOTPBaseProps<FieldType>;
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
