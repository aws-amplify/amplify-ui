import {
  AuthenticatorMachineContext,
  AuthenticatorMachineContextKey,
  AuthenticatorRouteComponentName,
  CommonRouteProps,
  ConfirmResetPasswordBaseProps,
  ConfirmSignInBaseProps,
  ConfirmSignUpBaseProps,
  Defaults,
  DefaultProps,
  ForceResetPasswordBaseProps,
  ResetPasswordBaseProps,
  SetupTotpBaseProps,
  SignInBaseProps,
  SignUpBaseProps,
  VerifyUserProps,
  ConfirmVerifyUserProps,
} from '../types';

export type UseAuthenticatorRouteParams<FieldType> = {
  components: Defaults<FieldType>;
};
export type UseAuthenticatorRoute<
  ComponentName extends AuthenticatorRouteComponentName,
  FieldType = {},
> = {
  Component: Defaults<FieldType>[ComponentName];
  props: DefaultProps<FieldType>[ComponentName];
};

export type UseAuthenticatorRouteDefault<FieldType> = {
  Component: Defaults<FieldType>[AuthenticatorRouteComponentName];
  props: DefaultProps<FieldType>[AuthenticatorRouteComponentName];
};

// extract machine prop keys required for a sub-component route
type ExtractMachineKey<RouteProps> = Extract<
  AuthenticatorMachineContextKey,
  keyof RouteProps
>;

// map to `handleBlur`, `handleChange`, and `handleSubmit` props
export type FormEventHandlerMachineKey =
  | 'updateBlur'
  | 'updateForm'
  | 'submitForm';

export type FormEventHandlerPropKey =
  | `handleBlur`
  | `handleChange`
  | `handleSubmit`;

// common route keys shared by all routes
export type CommonRouteMachineKey =
  | ExtractMachineKey<CommonRouteProps>
  | FormEventHandlerMachineKey;

/**
 * `route` sub-component machine selector key types
 */
export type ConfirmResetPasswordMachineKey =
  | ExtractMachineKey<ConfirmResetPasswordBaseProps>
  | CommonRouteMachineKey;

export type ConfirmSignInMachineKey =
  | ExtractMachineKey<ConfirmSignInBaseProps>
  | CommonRouteMachineKey;

export type ConfirmSignUpMachineKey =
  | ExtractMachineKey<ConfirmSignUpBaseProps>
  | CommonRouteMachineKey;

export type ConfirmVerifyUserMachineKey =
  | ExtractMachineKey<ConfirmVerifyUserProps>
  | CommonRouteMachineKey;

export type ForceNewPasswordMachineKey =
  | ExtractMachineKey<ForceResetPasswordBaseProps>
  | CommonRouteMachineKey;

export type ResetPasswordMachineKey =
  | ExtractMachineKey<ResetPasswordBaseProps>
  | CommonRouteMachineKey;

export type SetupTotpMachineKey =
  | ExtractMachineKey<SetupTotpBaseProps>
  | CommonRouteMachineKey;

export type SignInMachineKey =
  | ExtractMachineKey<SignInBaseProps>
  | CommonRouteMachineKey;

export type SignUpMachineKey =
  | ExtractMachineKey<SignUpBaseProps>
  | CommonRouteMachineKey;

export type VerifyUserMachineKey =
  | ExtractMachineKey<VerifyUserProps>
  | CommonRouteMachineKey;

/**
 * machine values with machine form event handlers keys mapped to UI form event handlers
 */
export type ConvertedMachineProps = Omit<
  AuthenticatorMachineContext,
  FormEventHandlerMachineKey
> & {
  handleBlur: AuthenticatorMachineContext['updateBlur'];
  handleChange: AuthenticatorMachineContext['updateForm'];
  handleSubmit: AuthenticatorMachineContext['submitForm'];
};
