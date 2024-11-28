import { State } from 'xstate';
import { AuthUser } from 'aws-amplify/auth';

import {
  LoginMechanism,
  SignUpAttribute,
  SocialProvider,
  UnverifiedUserAttributes,
  AuthFormData,
  AuthFormFields,
  AuthTouchData,
  ValidationError,
  PasswordSettings,
} from '../../types';

import { defaultServices } from './defaultServices';

// copied from JS v6 types
export type ChallengeName =
  | 'EMAIL_OTP'
  | 'SMS_MFA'
  | 'SOFTWARE_TOKEN_MFA'
  | 'SELECT_MFA_TYPE'
  | 'MFA_SETUP'
  | 'PASSWORD_VERIFIER'
  | 'CUSTOM_CHALLENGE'
  | 'DEVICE_SRP_AUTH'
  | 'DEVICE_PASSWORD_VERIFIER'
  | 'ADMIN_NO_SRP_AUTH'
  | 'NEW_PASSWORD_REQUIRED';

/**
 * `AuthDeliveryMedium` is deeply nested in the v6 types, added this as utility
 */
export type V6AuthDeliveryMedium = 'EMAIL' | 'SMS' | 'PHONE' | 'UNKNOWN';

// Utility type representing the `codeDeliveryDetails` from JS v5
export interface V5CodeDeliveryDetails {
  AttributeName: string;
  DeliveryMedium: V6AuthDeliveryMedium;
  Destination: string;
}

// v6 `codeDeliveryDetails`
export interface CodeDeliveryDetails {
  destination?: string;
  deliveryMedium?: V6AuthDeliveryMedium;
  attributName?: string;
}

/**
 * Authenticator routes that can be directly navigated to by user interaction.
 */
export type NavigableRoute = 'signIn' | 'signUp' | 'forgotPassword';
export type InitialRoute = 'signIn' | 'signUp' | 'forgotPassword';

/**
 * `AuthTOTPSetupDetails` is deeply nested in the v6 types, added this as utility
 */
export interface AuthTOTPSetupDetails {
  sharedSecret: string;
  getSetupUri: (appName: string, accountName?: string) => URL;
}

/**
 * Events that occur when actors are done
 */
export type InvokeActorEventTypes =
  | 'done.invoke.forgotPasswordActor'
  | 'done.invoke.signInActor'
  | 'done.invoke.signUpActor'
  | 'done.invoke.signOutActor'
  | 'done.invoke.verifyUserAttributesActor';

/**
 * All known explicit events for xstate
 */
export type AuthEventTypes =
  | 'CHANGE'
  | 'BLUR'
  | 'FEDERATED_SIGN_IN'
  | 'RESEND'
  | 'FORGOT_PASSWORD'
  | 'AUTO_SIGN_IN_FAILURE'
  | 'SIGN_IN_WITH_REDIRECT'
  | 'SIGN_IN'
  | 'SIGN_OUT'
  | 'SIGN_UP'
  | 'SKIP'
  | 'SUBMIT'
  | 'INIT'
  | 'TOKEN_REFRESH'
  | InvokeActorEventTypes;

/**
 * Data payload for auth events
 */
export type AuthEventData = Record<PropertyKey, any>; // TODO: this should be typed further

/** Top-level auth machine event interface */
export interface AuthEvent {
  type: AuthEventTypes;
  data?: AuthEventData;
}

/**
 * Data that actor returns when they are done and reach the final state
 */
export interface ActorDoneData {
  challengeName?: ChallengeName;
  codeDeliveryDetails?: V5CodeDeliveryDetails;
  missingAttributes?: string[];
  remoteError?: string;
  step: Step;
  totpSecretCode?: string;
  username?: string;
  unverifiedUserAttributes?: UnverifiedUserAttributes;
}

/**
 * Context interface for the top-level machine
 */
export interface AuthContext {
  actorRef?: any;
  config?: {
    loginMechanism?: LoginMechanism;
    loginMechanisms?: LoginMechanism[];
    signUpAttributes?: SignUpAttribute[];
    socialProviders?: SocialProvider[];
    formFields?: AuthFormFields;
    initialState?: 'signIn' | 'signUp' | 'forgotPassword';
    passwordSettings?: PasswordSettings;
  };
  services?: Partial<typeof defaultServices>;
  user?: AuthUser;
  // data returned from actors when they finish and reach their final state
  actorDoneData?: ActorDoneData;
  hasSetup?: boolean;
}

// maps to `initialState`
export type InitialStep = 'FORGOT_PASSWORD' | 'SIGN_IN' | 'SIGN_UP';

export type SignInStep =
  | 'CONFIRM_SIGN_IN_WITH_SMS_CODE'
  | 'CONFIRM_SIGN_IN_WITH_EMAIL_CODE'
  | 'CONFIRM_SIGN_IN_WITH_TOTP_CODE'
  | 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED'
  | 'CONFIRM_SIGN_UP'
  | 'CONTINUE_SIGN_IN_WITH_TOTP_SETUP'
  | 'RESET_PASSWORD'
  | 'SIGN_IN_COMPLETE'; // 'DONE'

export type ResetPasswordStep =
  | 'CONFIRM_RESET_PASSWORD_WITH_CODE'
  | 'RESET_PASSWORD_COMPLETE'; // 'DONE'

export type SignUpStep =
  | 'CONFIRM_SIGN_UP'
  | 'COMPLETE_AUTO_SIGN_IN'
  | 'SIGN_UP_COMPLETE'; // 'DONE'

export type UserAttributeStep =
  | 'SHOULD_CONFIRM_USER_ATTRIBUTE'
  | 'CONFIRM_ATTRIBUTE_WITH_CODE'
  | 'CONFIRM_ATTRIBUTE_COMPLETE'; // 'DONE'

export type Step =
  | InitialStep
  | SignInStep
  | SignUpStep
  | ResetPasswordStep
  | UserAttributeStep;

/**
 * Base context for all actors that have auth forms associated
 */
interface BaseFormContext {
  // key/values derived directly from Auth API return values
  challengeName?: ChallengeName;
  missingAttributes?: Array<string>;
  remoteError?: string;
  step: Step;
  totpSecretCode?: string;
  unverifiedUserAttributes?: UnverifiedUserAttributes;

  // kept in memory for submission to relevnat APIs
  username?: string;
  selectedUserAttribute?: string;

  // retrieved from the Auth module on sign in,
  // cleared on sign out
  user?: AuthUser;

  // configuration override key/values
  loginMechanisms: Required<AuthContext>['config']['loginMechanisms'];
  passwordSettings?: PasswordSettings;
  socialProviders: Required<AuthContext>['config']['socialProviders'];
  signUpAttributes?: SignUpAttribute[];

  // form state key/values
  formFields?: AuthFormFields;
  formValues?: AuthFormData;
  touched?: AuthTouchData;
  validationError?: ValidationError;
}

export interface ResetPasswordContext extends BaseFormContext, ActorDoneData {}
export interface SignInContext extends BaseFormContext, ActorDoneData {}
export interface SignUpContext extends BaseFormContext, ActorDoneData {}
export interface VerifyUserContext extends BaseFormContext, ActorDoneData {}

export interface SignOutContext extends Pick<BaseFormContext, 'user'> {}

export type AuthActorContext =
  | SignInContext
  | SignUpContext
  | ResetPasswordContext;

// Actor States
export type SignInState = State<SignInContext, AuthEvent>;
export type SignUpState = State<SignUpContext, AuthEvent>;
export type SignOutState = State<SignOutContext, AuthEvent>;
export type ResetPasswordState = State<ResetPasswordContext, AuthEvent>;
export type AuthActorState = State<AuthActorContext, AuthEvent>;

// Top level machine state
export type AuthMachineState = State<AuthContext, AuthEvent>;
