import {
  AuthenticatorComponentOverrides,
  AuthenticatorComponentDefaults,
} from '@aws-amplify/ui-react-core';
import { RadioFieldOptions, TextFieldOptionsType } from '../hooks';

// TODO fill these interfaces with custom style override types
export interface ConfirmResetPasswordStyle {}
export interface ConfirmSignInStyle {}
export interface ConfirmSignUpStyle {}
export interface ConfirmVerifyUserStyle {}
export interface ForceNewPasswordStyle {}
export interface ResetPasswordStyle {}
export interface SetupTOTPStyle {}
export interface SignInStyle {}
export interface SignUpStyle {}
export interface VerifyUserStyle {}

export type DefaultComponents<
  FieldType = {},
  Props = {}
> = AuthenticatorComponentDefaults<FieldType, Props>;

export type DefaultConfirmResetPasswordComponent = DefaultComponents<
  TextFieldOptionsType,
  { style?: ConfirmResetPasswordStyle }
>['ConfirmResetPassword'];

export type DefaultConfirmSignInComponent = DefaultComponents<
  TextFieldOptionsType,
  { style?: ConfirmSignInStyle }
>['ConfirmSignIn'];

export type DefaultConfirmSignUpComponent = DefaultComponents<
  TextFieldOptionsType,
  { style?: ConfirmSignUpStyle }
>['ConfirmSignUp'];

export type DefaultConfirmVerifyUserComponent = DefaultComponents<
  TextFieldOptionsType,
  { style?: ConfirmVerifyUserStyle }
>['ConfirmVerifyUser'];

export type DefaultForceNewPasswordComponent = DefaultComponents<
  TextFieldOptionsType,
  { style?: ForceNewPasswordStyle }
>['ForceNewPassword'];

export type DefaultResetPasswordComponent = DefaultComponents<
  TextFieldOptionsType,
  { style?: ResetPasswordStyle }
>['ResetPassword'];

export type DefaultSetupTOTPComponent = DefaultComponents<
  TextFieldOptionsType,
  { style?: SetupTOTPStyle }
>['SetupTOTP'];

export type DefaultSignInComponent = DefaultComponents<
  TextFieldOptionsType,
  { style?: SignInStyle }
>['SignIn'];

export type DefaultSignUpComponent = DefaultComponents<
  TextFieldOptionsType,
  { style?: SignUpStyle }
>['SignUp'];

export type DefaultVerifyUserComponent = DefaultComponents<
  RadioFieldOptions,
  { style?: VerifyUserStyle }
>['VerifyUser'];

/**
 * Custom Authenticator components
 */
type OverrideComponents<
  FieldType = {},
  Props = {}
> = AuthenticatorComponentOverrides<FieldType, Props>;

type ConfirmSignInComponent<P = {}> = OverrideComponents<
  TextFieldOptionsType,
  { style?: ConfirmSignInStyle } & P
>['ConfirmSignIn'];

type ConfirmSignUpComponent<P = {}> = OverrideComponents<
  TextFieldOptionsType,
  { style?: ConfirmSignUpStyle } & P
>['ConfirmSignUp'];

type ConfirmResetPasswordComponent<P = {}> = OverrideComponents<
  TextFieldOptionsType,
  { style?: ConfirmResetPasswordStyle } & P
>['ConfirmResetPassword'];

type ConfirmVerifyUserComponent<P = {}> = OverrideComponents<
  TextFieldOptionsType,
  { style?: ConfirmVerifyUserStyle } & P
>['ConfirmVerifyUser'];

type ForceNewPasswordComponent<P = {}> = OverrideComponents<
  TextFieldOptionsType,
  { style?: ForceNewPasswordStyle } & P
>['ForceNewPassword'];

type ResetPasswordComponent<P = {}> = OverrideComponents<
  TextFieldOptionsType,
  { style?: ResetPasswordStyle } & P
>['ResetPassword'];

type SetupTOTPComponent<P = {}> = OverrideComponents<
  TextFieldOptionsType,
  { style?: SetupTOTPStyle } & P
>['SetupTOTP'];

type SignInComponent<P = {}> = OverrideComponents<
  TextFieldOptionsType,
  { style?: SignInStyle } & P
>['SignIn'];

type SignUpComponent<P = {}> = OverrideComponents<
  TextFieldOptionsType,
  { style?: SignUpStyle } & P
>['SignUp'];

type VerifyUserComponent<P = {}> = OverrideComponents<
  RadioFieldOptions,
  { style?: VerifyUserStyle } & P
>['VerifyUser'];

/**
 * Override `Authenticator` components param
 */
export interface Components {
  ConfirmSignIn?: ConfirmSignInComponent;
  ConfirmSignUp?: ConfirmSignUpComponent;
  ConfirmResetPassword?: ConfirmResetPasswordComponent;
  ConfirmVerifyUser?: ConfirmVerifyUserComponent;
  ForceNewPassword?: ForceNewPasswordComponent;
  ResetPassword?: ResetPasswordComponent;
  SetupTOTP?: SetupTOTPComponent;
  SignIn?: SignInComponent;
  SignUp?: SignUpComponent;
  VerifyUser?: VerifyUserComponent;
}
