import { CognitoUser, CodeDeliveryDetails } from 'amazon-cognito-identity-js';
import { EventObject, Interpreter, State } from 'xstate';
import { ValidationError } from './validator';
import { defaultServices } from '../machines/authenticator/defaultServices';
import { AuthenticatorMachineOptions } from '../machines';
import { FederatedIdentityProviders } from '../helpers';
import { Typegen0 as SignInType } from '../machines/authenticator/actors/signIn.typegen';
import { Auth } from 'aws-amplify';
import { ICredentials } from '@aws-amplify/core';

export type AuthFormData = Record<string, string>;

export interface ActorDoneData {
  authAttributes?: AuthFormData;
  intent?: string;
  user?: CognitoUserAmplify;
}

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
  actorDoneData?: Omit<ActorDoneData, 'user'>; // data returned from actors when they finish and reach their final state
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
  challengeName?: string;
  challengeParam: {
    requiredAttributes: string[];
  };
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

export type AuthEventData = Record<PropertyKey, any>; // TODO: this should be typed further

export type AuthServices = {
  getCurrentUser: {
    data: CognitoUserAmplify;
  };
  getAmplifyConfig: {
    data: Record<PropertyKey, any>;
  };
};

export type ResetPasswordServices = {
  resetPassword: {
    data: any;
  };
  confirmResetPassword: {
    data: string;
  };
};

export type SignInServices = {
  signIn: {
    data: CognitoUserAmplify;
    error: any;
  };
  forceNewPassword: {
    data: CognitoUserAmplify;
  };
  checkVerifiedContact: {
    data: {
      verified: Record<string, string>;
      unverified: Record<string, string>;
    };
  };
  federatedSignIn: {
    data: ICredentials;
  };
  confirmVerifyUser: {
    data: string;
  };
  verifyUser: {
    data: void;
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
    }
  | {
      type: SignInType['eventsCausingGuards']['shouldRedirectToConfirmSignUp'];
      data: {
        code: string;
      };
    };

export interface EventWithUserData extends EventObject {
  data: CognitoUserAmplify;
}

export type AuthMachineState = State<AuthContext, AuthEvent>;

export type AuthInterpreter = Interpreter<AuthContext, any, AuthEvent>;

export type AuthMachineSend = AuthInterpreter['send'];
