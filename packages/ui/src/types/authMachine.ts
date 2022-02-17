import { CognitoUser, CodeDeliveryDetails } from 'amazon-cognito-identity-js';
import { Interpreter, State } from 'xstate';
import { ValidationError } from './validator';
import { defaultServices } from '../machines/authenticator/defaultServices';
import { AuthenticatorMachineOptions } from '../machines';
import { FederatedIdentityProviders } from '../helpers';

export type AuthFormData = Record<string, string>;

export interface AuthContext {
  actorRef?: any;
  config?: {
    loginMechanisms?: LoginMechanism[];
    signUpAttributes?: SignUpAttribute[];
    socialProviders?: SocialProvider[];
    initialState?: 'signIn' | 'signUp' | 'resetPassword';
  };
  services?: Partial<typeof defaultServices>;
  user?: CognitoUserAmplify;
  username?: string;
  password?: string;
  code?: string;
  mfaType?: AuthChallengeNames.SMS_MFA | AuthChallengeNames.SOFTWARE_TOKEN_MFA;
}

export interface ServicesContext {
  username?: string;
  password?: string;
  user?: string;
  code?: string;
  mfaType: AuthChallengeNames.SMS_MFA | AuthChallengeNames.SOFTWARE_TOKEN_MFA;
}

interface BaseFormContext {
  authAttributes?: Record<string, any>;
  challengeName?: string;
  requiredAttributes?: Array<string>;
  formValues?: AuthFormData;
  touched?: AuthFormData;
  intent?: string;
  remoteError?: string;
  user?: CognitoUserAmplify;
  validationError?: ValidationError;
  codeDeliveryDetails?: CodeDeliveryDetails;
  country_code?: string;
}

export interface SignInContext extends BaseFormContext {
  loginMechanisms: Required<AuthContext>['config']['loginMechanisms'];
  socialProviders: Required<AuthContext>['config']['socialProviders'];
  attributeToVerify?: string;
  redirectIntent?: string;
  unverifiedAttributes?: Record<string, string>;
}

// https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html
export const signUpFieldsWithDefault = [
  'birthdate',
  'email',
  'family_name',
  'given_name',
  'middle_name',
  'name',
  'nickname',
  'phone_number',
  'preferred_username',
  'profile',
  'website',
] as const;

export const signUpFieldsWithoutDefault = [
  'address',
  'gender',
  'locale',
  'picture',
  'updated_at',
  'zoneinfo',
] as const;

export type SignUpFieldsWithDefaults = typeof signUpFieldsWithDefault[number];

export type SignUpFieldsWithoutDefaults =
  typeof signUpFieldsWithoutDefault[number];

export type SignUpAttribute =
  | SignUpFieldsWithDefaults
  | SignUpFieldsWithoutDefaults;

export interface SignUpContext extends BaseFormContext {
  loginMechanisms: Required<AuthContext>['config']['loginMechanisms'];
  socialProviders: Required<AuthContext>['config']['socialProviders'];
  unverifiedAttributes?: Record<string, string>;
}

export interface ResetPasswordContext extends BaseFormContext {
  username?: string;
  unverifiedAttributes?: Record<string, string>;
}

export interface SignOutContext {
  authAttributes?: Record<string, any>;
  challengeName?: string;
  unverifiedAttributes?: Record<string, string>;
  user?: CognitoUserAmplify;
}

// actors that have forms. Has `formValues, remoteErrror, and validationError in common.
export type ActorContextWithForms =
  | SignInContext
  | SignUpContext
  | ResetPasswordContext;

export type SignInState = State<SignInContext, AuthEvent>;
export type SignUpState = State<SignUpContext, AuthEvent>;
export type SignOutState = State<SignOutContext, AuthEvent>;
export type ResetPasswordState = State<ResetPasswordContext, AuthEvent>;
export type AuthActorContext = ActorContextWithForms | SignOutContext;
export type AuthActorState = State<AuthActorContext, AuthEvent>;
export interface CognitoUserAmplify extends CognitoUser {
  username?: string;
  attributes?: CognitoAttributes;
}

export interface CognitoAttributes {
  email: string;
  phone_number: string;
  [key: string]: string;
}

export type InvokeActorEventTypes =
  | 'done.invoke.signInActor'
  | 'done.invoke.signUpActor'
  | 'done.invoke.signOutActor'
  | 'done.invoke.resetPasswordActor';

export type AuthEventTypes =
  | 'CHANGE'
  | 'BLUR'
  | 'FEDERATED_SIGN_IN'
  | 'RESEND'
  | 'RESET_PASSWORD'
  | 'SIGN_IN'
  | 'SIGN_OUT'
  | 'SIGN_UP'
  | 'SKIP'
  | 'SUBMIT'
  | 'INIT'
  | InvokeActorEventTypes;

export enum AuthChallengeNames {
  SMS_MFA = 'SMS_MFA',
  SOFTWARE_TOKEN_MFA = 'SOFTWARE_TOKEN_MFA',
  NEW_PASSWORD_REQUIRED = 'NEW_PASSWORD_REQUIRED',
  RESET_REQUIRED = 'RESET_REQUIRED',
  MFA_SETUP = 'MFA_SETUP',
}

export interface InputAttributes {
  label: string;
  type: string;
  placeholder: string;
  autocomplete?: string;
}

export const LoginMechanismArray = [
  'username',
  'email',
  'phone_number',
] as const;

export type LoginMechanism = typeof LoginMechanismArray[number];

export type SocialProvider = 'amazon' | 'apple' | 'facebook' | 'google';

// Auth fields that we provide default fields with
export type AuthFieldsWithDefaults =
  | LoginMechanism
  | SignUpFieldsWithDefaults
  | 'confirmation_code'
  | 'password';

export type AuthInputAttributes = Record<
  AuthFieldsWithDefaults,
  InputAttributes
>;

export interface ActorDoneData {
  user?: CognitoUserAmplify;
  authAttributes?: {
    username?: string;
    password?: string;
    [other_attributes: string]: string;
  };
  intent?: string;
}

export type AuthEventData = Record<PropertyKey, any>; // TODO: this should be typed further

export type AuthServices = {
  getCurrentUser: {
    data: CognitoUserAmplify;
  };
  getAmplifyConfig: {
    data: Record<PropertyKey, any>;
  };
};

export type AuthEvent =
  | {
      type: 'INIT';
      data: AuthenticatorMachineOptions;
    }
  | {
      type: 'SIGN_UP' | 'RESET_PASSWORD' | 'SIGN_IN' | 'SIGN_OUT';
    }
  | {
      /**
       * This event is called after signUp actor is done.
       */
      type: 'done.invoke.signInActor';
      data: {
        user: CognitoUserAmplify;
        intent: string;
        authAttributes: Record<string, any>;
      };
    }
  | {
      /**
       * This event is called after signUp actor is done.
       */
      type: 'done.invoke.signUpActor';
      data: ActorDoneData;
    }
  | {
      type: 'done.invoke.resetPasswordActor';
      data: ActorDoneData;
    }
  | {
      type: 'done.invoke.signOutActor';
    }
  | {
      /**
       * This event is called when `getCurrentUser` invocation fails on `setup`
       * state.
       */
      type: 'error.platform.authenticator.setup:invocation[0]';
      data: Partial<CognitoUserAmplify & ActorDoneData>;
    }
  | {
      type: 'CHANGE';
      data: {
        name: string;
        value: string;
      };
    }
  | {
      type: 'BLUR';
      data: {
        name: string;
      };
    }
  | {
      type: 'SUBMIT';
      data: Record<string, string>;
    }
  | {
      type: 'FEDERATED_SIGN_IN';
      data: { provider: FederatedIdentityProviders };
    }
  | {
      type: 'RESEND';
    }
  | {
      type: 'SKIP';
    };

export type AuthMachineState = State<AuthContext, AuthEvent>;

export type AuthInterpreter = Interpreter<AuthContext, any, AuthEvent>;

export type AuthMachineSend = AuthInterpreter['send'];
