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
  fields: AuthenticatorLegacyFields;
  validationErrors?: AuthenticatorMachineContext['validationErrors'];
}

type FooterComponent<Props = {}> = React.ComponentType<FooterProps & Props>;

type FormFieldsComponent<Props = {}> = React.ComponentType<
  FormFieldsProps & Props
>;

type HeaderComponent<Props = {}> = React.ComponentType<HeaderProps & Props>;

export interface ComponentSlots {
  Footer: FooterComponent;
  Header: HeaderComponent;
  FormFields: FormFieldsComponent;
}

type WithComponentSlots<Component> = Component & ComponentSlots;

type RouteComponent<
  RouteProps = {},
  PlatformProps = {},
  OverrideProps = {}
> = React.ComponentType<RouteProps & PlatformProps & OverrideProps>;

/**
 * Common component prop types used for both RWA and RNA implementations
 */
interface CommonRouteProps extends ComponentSlots {
  error?: AuthenticatorMachineContext['error'];
  fields: AuthenticatorLegacyFields;
  isPending: AuthenticatorMachineContext['isPending'];
}

export interface CommonConfirmResetPasswordProps extends CommonRouteProps {
  resendCode: AuthenticatorMachineContext['resendCode'];
  validationErrors?: AuthenticatorMachineContext['validationErrors'];
}

export interface CommonConfirmSignInProps extends CommonRouteProps {
  challengeName: AuthChallengeName;
  toSignIn: AuthenticatorMachineContext['toSignIn'];
}

export interface CommonConfirmSignUpProps extends CommonRouteProps {
  codeDeliveryDetails: AuthenticatorMachineContext['codeDeliveryDetails'];
  resendCode: AuthenticatorMachineContext['resendCode'];
}

export interface CommonConfirmVerifyUserProps extends CommonRouteProps {
  skipVerification: AuthenticatorMachineContext['skipVerification'];
}

export interface CommonForceNewPasswordProps extends CommonRouteProps {
  toSignIn: AuthenticatorMachineContext['toSignIn'];
  validationErrors?: AuthenticatorMachineContext['validationErrors'];
}

export interface CommonResetPasswordProps extends CommonRouteProps {
  toSignIn: AuthenticatorMachineContext['toSignIn'];
}

export interface CommonSetupTOTPProps extends CommonRouteProps {
  getTotpSecretCode: GetTotpSecretCode;
  totpIssuer: string;
  totpUsername: string;
}

export interface CommonSignInProps extends CommonRouteProps {
  hideSignUp?: boolean;
  socialProviders?: AuthenticatorMachineContext['socialProviders'];
  toResetPassword: AuthenticatorMachineContext['toResetPassword'];
  toSignUp: AuthenticatorMachineContext['toSignUp'];
}

export interface CommonSignUpProps extends CommonRouteProps {
  toSignIn: AuthenticatorMachineContext['toSignIn'];
  validationErrors: AuthenticatorMachineContext['validationErrors'];
}

export interface CommonVerifyUserProps extends CommonRouteProps {
  skipVerification: AuthenticatorMachineContext['skipVerification'];
}

/**
 * common types extended for default component types/implementations and override component types
 */
export type CommonConfirmResetPasswordComponent<
  PlatformProps = {},
  OverrideProps = {}
> = RouteComponent<
  CommonConfirmResetPasswordProps,
  PlatformProps,
  OverrideProps
>;

export type CommonConfirmSignInComponent<
  PlatformProps = {},
  OverrideProps = {}
> = RouteComponent<CommonConfirmSignInProps, PlatformProps, OverrideProps>;

export type CommonConfirmSignUpComponent<
  PlatformProps = {},
  OverrideProps = {}
> = RouteComponent<CommonConfirmSignUpProps, PlatformProps, OverrideProps>;

export type CommonConfirmVerifyUserComponent<
  PlatformProps = {},
  OverrideProps = {}
> = RouteComponent<CommonConfirmVerifyUserProps, PlatformProps, OverrideProps>;

export type CommonForceNewPasswordComponent<
  PlatformProps = {},
  OverrideProps = {}
> = RouteComponent<CommonForceNewPasswordProps, PlatformProps, OverrideProps>;

export type CommonResetPasswordComponent<
  PlatformProps = {},
  OverrideProps = {}
> = RouteComponent<CommonResetPasswordProps, PlatformProps, OverrideProps>;

export type CommonSetupTOTPComponent<
  PlatformProps = {},
  OverrideProps = {}
> = RouteComponent<CommonSetupTOTPProps, PlatformProps, OverrideProps>;

export type CommonSignInComponent<
  PlatformProps = {},
  OverrideProps = {}
> = RouteComponent<CommonSignInProps, PlatformProps, OverrideProps>;

export type CommonSignUpComponent<
  PlatformProps = {},
  OverrideProps = {}
> = RouteComponent<CommonSignUpProps, PlatformProps, OverrideProps>;

export type CommonVerifyUserComponent<
  PlatformProps = {},
  OverrideProps = {}
> = RouteComponent<CommonVerifyUserProps, PlatformProps, OverrideProps>;

/**
 * Default common types for RNA and RWA component implementations
 */
export type DefaultConfirmResetPasswordComponent<PlatformProps = {}> =
  WithComponentSlots<CommonConfirmResetPasswordComponent<PlatformProps>>;

export type DefaultConfirmSignInComponent<PlatformProps = {}> =
  WithComponentSlots<CommonConfirmSignInComponent<PlatformProps>>;

export type DefaultConfirmSignUpComponent<PlatformProps = {}> =
  WithComponentSlots<CommonConfirmSignUpComponent<PlatformProps>>;

export type DefaultConfirmVerifyUserComponent<PlatformProps = {}> =
  WithComponentSlots<CommonConfirmVerifyUserComponent<PlatformProps>>;

export type DefaultForceNewPasswordComponent<PlatformProps = {}> =
  WithComponentSlots<CommonForceNewPasswordComponent<PlatformProps>>;

export type DefaultResetPasswordComponent<PlatformProps = {}> =
  WithComponentSlots<CommonResetPasswordComponent<PlatformProps>>;

export type DefaultSetupTOTPComponent<PlatformProps = {}> = WithComponentSlots<
  CommonSetupTOTPComponent<PlatformProps>
>;

export type DefaultSignInComponent<PlatformProps = {}> = WithComponentSlots<
  CommonSignInComponent<PlatformProps>
>;

export type DefaultSignUpComponent<PlatformProps = {}> = WithComponentSlots<
  CommonSignUpComponent<PlatformProps>
>;

export type DefaultVerifyUserComponent<PlatformProps = {}> = WithComponentSlots<
  CommonVerifyUserComponent<PlatformProps>
>;

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
