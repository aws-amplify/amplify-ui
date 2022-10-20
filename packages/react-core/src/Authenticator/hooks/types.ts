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

export type AuthenticatorLegacyFields = LegacyFormFieldOptions[];

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

interface FormFieldsProps {
  isPending: AuthenticatorMachineContext['isPending'];
  validationErrors?: AuthenticatorMachineContext['validationErrors'];
}

export type FooterComponent<Props = {}> = React.ComponentType<
  FooterProps & Props
>;

export type FormFieldsComponent<Props = {}> = React.ComponentType<
  FormFieldsProps & Props
>;

export type HeaderComponent<Props = {}> = React.ComponentType<
  HeaderProps & Props
>;

export interface ComponentSlots<PlatformProps = {}> {
  Footer: FooterComponent;
  Header: HeaderComponent;

  // `FormFieldsComponent` requires platform specific props
  FormFields: FormFieldsComponent<PlatformProps>;
}

type RouteComponent<
  RouteProps = {},
  PlatformProps = {},
  OverrideProps = {}
> = React.ComponentType<RouteProps & PlatformProps & OverrideProps>;

/**
 * Common component prop types used for both RWA and RNA implementations
 */

// use `PlatformProps` generic for `FormFieldsCompoennt`
export interface CommonRouteProps<PlatformProps = {}>
  extends ComponentSlots<PlatformProps> {
  error?: AuthenticatorMachineContext['error'];
  isPending: AuthenticatorMachineContext['isPending'];
  handleBlur: AuthenticatorMachineContext['updateBlur'];
  handleChange: AuthenticatorMachineContext['updateForm'];
  handleSubmit: AuthenticatorMachineContext['submitForm'];
}

export interface CommonConfirmResetPasswordProps<PlatformProps = {}>
  extends CommonRouteProps<PlatformProps> {
  resendCode: AuthenticatorMachineContext['resendCode'];
  validationErrors?: AuthenticatorMachineContext['validationErrors'];
}

export interface CommonConfirmSignInProps<PlatformProps = {}>
  extends CommonRouteProps<PlatformProps> {
  challengeName: AuthChallengeName;
  toSignIn: AuthenticatorMachineContext['toSignIn'];
}

export interface CommonConfirmSignUpProps<PlatformProps = {}>
  extends CommonRouteProps<PlatformProps> {
  codeDeliveryDetails: AuthenticatorMachineContext['codeDeliveryDetails'];
  resendCode: AuthenticatorMachineContext['resendCode'];
}

export interface CommonConfirmVerifyUserProps<PlatformProps = {}>
  extends CommonRouteProps<PlatformProps> {
  skipVerification: AuthenticatorMachineContext['skipVerification'];
}

export interface CommonForceNewPasswordProps<PlatformProps = {}>
  extends CommonRouteProps<PlatformProps> {
  toSignIn: AuthenticatorMachineContext['toSignIn'];
  validationErrors?: AuthenticatorMachineContext['validationErrors'];
}

export interface CommonResetPasswordProps<PlatformProps = {}>
  extends CommonRouteProps<PlatformProps> {
  toSignIn: AuthenticatorMachineContext['toSignIn'];
}

export interface CommonSetupTOTPProps<PlatformProps = {}>
  extends CommonRouteProps<PlatformProps> {
  getTotpSecretCode: GetTotpSecretCode;
  totpIssuer: string;
  totpUsername: string;
}

export interface CommonSignInProps<PlatformProps = {}>
  extends CommonRouteProps<PlatformProps> {
  hideSignUp?: boolean;
  socialProviders?: AuthenticatorMachineContext['socialProviders'];
  toResetPassword: AuthenticatorMachineContext['toResetPassword'];
  toSignUp: AuthenticatorMachineContext['toSignUp'];
}

export interface CommonSignUpProps<PlatformProps = {}>
  extends CommonRouteProps<PlatformProps> {
  toSignIn: AuthenticatorMachineContext['toSignIn'];
  validationErrors: AuthenticatorMachineContext['validationErrors'];
}

export interface CommonVerifyUserProps<PlatformProps = {}>
  extends CommonRouteProps<PlatformProps> {
  skipVerification: AuthenticatorMachineContext['skipVerification'];
}

/**
 * common types extended for default component types/implementations and override component types
 */
export type CommonConfirmResetPasswordComponent<
  PlatformProps = {},
  OverrideProps = {}
> = RouteComponent<
  CommonConfirmResetPasswordProps<PlatformProps>,
  PlatformProps,
  OverrideProps
>;

export type CommonConfirmSignInComponent<
  PlatformProps = {},
  OverrideProps = {}
> = RouteComponent<
  CommonConfirmSignInProps<PlatformProps>,
  PlatformProps,
  OverrideProps
>;

export type CommonConfirmSignUpComponent<
  PlatformProps = {},
  OverrideProps = {}
> = RouteComponent<
  CommonConfirmSignUpProps<PlatformProps>,
  PlatformProps,
  OverrideProps
>;

export type CommonConfirmVerifyUserComponent<
  PlatformProps = {},
  OverrideProps = {}
> = RouteComponent<
  CommonConfirmVerifyUserProps<PlatformProps>,
  PlatformProps,
  OverrideProps
>;

export type CommonForceNewPasswordComponent<
  PlatformProps = {},
  OverrideProps = {}
> = RouteComponent<
  CommonForceNewPasswordProps<PlatformProps>,
  PlatformProps,
  OverrideProps
>;

export type CommonResetPasswordComponent<
  PlatformProps = {},
  OverrideProps = {}
> = RouteComponent<
  CommonResetPasswordProps<PlatformProps>,
  PlatformProps,
  OverrideProps
>;

export type CommonSetupTOTPComponent<
  PlatformProps = {},
  OverrideProps = {}
> = RouteComponent<
  CommonSetupTOTPProps<PlatformProps>,
  PlatformProps,
  OverrideProps
>;

export type CommonSignInComponent<
  PlatformProps = {},
  OverrideProps = {}
> = RouteComponent<
  CommonSignInProps<PlatformProps>,
  PlatformProps,
  OverrideProps
>;

export type CommonSignUpComponent<
  PlatformProps = {},
  OverrideProps = {}
> = RouteComponent<
  CommonSignUpProps<PlatformProps>,
  PlatformProps,
  OverrideProps
>;

export type CommonVerifyUserComponent<
  PlatformProps = {},
  OverrideProps = {}
> = RouteComponent<
  CommonVerifyUserProps<PlatformProps>,
  PlatformProps,
  OverrideProps
>;

/**
 * Default common types for RNA and RWA component implementations
 */
export type DefaultConfirmResetPasswordComponent<PlatformProps = {}> =
  CommonConfirmResetPasswordComponent<PlatformProps> &
    ComponentSlots<PlatformProps>;

export type DefaultConfirmSignInComponent<PlatformProps = {}> =
  CommonConfirmSignInComponent<PlatformProps> & ComponentSlots<PlatformProps>;

export type DefaultConfirmSignUpComponent<PlatformProps = {}> =
  CommonConfirmSignUpComponent<PlatformProps> & ComponentSlots<PlatformProps>;

export type DefaultConfirmVerifyUserComponent<PlatformProps = {}> =
  CommonConfirmVerifyUserComponent<PlatformProps> &
    ComponentSlots<PlatformProps>;

export type DefaultForceNewPasswordComponent<PlatformProps = {}> =
  CommonForceNewPasswordComponent<PlatformProps> &
    ComponentSlots<PlatformProps>;

export type DefaultResetPasswordComponent<PlatformProps = {}> =
  CommonResetPasswordComponent<PlatformProps> & ComponentSlots<PlatformProps>;

export type DefaultSetupTOTPComponent<PlatformProps = {}> =
  CommonSetupTOTPComponent<PlatformProps> & ComponentSlots<PlatformProps>;

export type DefaultSignInComponent<PlatformProps = {}> =
  CommonSignInComponent<PlatformProps> & ComponentSlots<PlatformProps>;

export type DefaultSignUpComponent<PlatformProps = {}> =
  CommonSignUpComponent<PlatformProps> & ComponentSlots<PlatformProps>;

export type DefaultVerifyUserComponent<PlatformProps = {}> =
  CommonVerifyUserComponent<PlatformProps> & ComponentSlots<PlatformProps>;

/**
 * Authenticator Route Component Default types
 */
export type Defaults<PlatformProps = {}> = {
  ConfirmResetPassword: DefaultConfirmResetPasswordComponent<PlatformProps>;
  ConfirmSignIn: DefaultConfirmSignInComponent<PlatformProps>;
  ConfirmSignUp: DefaultConfirmSignUpComponent<PlatformProps>;
  ConfirmVerifyUser: DefaultConfirmVerifyUserComponent<PlatformProps>;
  ForceNewPassword: DefaultForceNewPasswordComponent<PlatformProps>;
  ResetPassword: DefaultResetPasswordComponent<PlatformProps>;
  SetupTOTP: DefaultSetupTOTPComponent<PlatformProps>;
  SignIn: DefaultSignInComponent<PlatformProps>;
  SignUp: DefaultSignUpComponent<PlatformProps>;
  VerifyUser: DefaultVerifyUserComponent<PlatformProps>;
};

/**
 * Default Route Component union type
 */
export type DefaultComponent<PlatformProps = {}> =
  Defaults<PlatformProps>[keyof Defaults];

/**
 * Authenticator Route Component Override types
 */
export type Overrides<PlatformProps = {}, OverrideProps = {}> = {
  ConfirmResetPassword?: CommonConfirmResetPasswordComponent<
    PlatformProps,
    OverrideProps
  >;
  ConfirmSignIn?: CommonConfirmSignInComponent<PlatformProps, OverrideProps>;
  ConfirmSignUp?: CommonConfirmSignUpComponent<PlatformProps, OverrideProps>;
  ConfirmVerifyUser?: CommonConfirmVerifyUserComponent<
    PlatformProps,
    OverrideProps
  >;
  ForceNewPassword?: CommonForceNewPasswordComponent<
    PlatformProps,
    OverrideProps
  >;
  ResetPassword?: CommonResetPasswordComponent<PlatformProps, OverrideProps>;
  SetupTOTP?: CommonSetupTOTPComponent<PlatformProps, OverrideProps>;
  SignIn?: CommonSignInComponent<PlatformProps, OverrideProps>;
  SignUp?: CommonSignUpComponent<PlatformProps, OverrideProps>;
  VerifyUser?: CommonVerifyUserComponent<PlatformProps, OverrideProps>;
};
