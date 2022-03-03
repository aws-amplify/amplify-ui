import { ValidationError } from '../validator';
import { AuthFormData, FormFields } from '../authForm';
import { AuthChallengeNames, CognitoUserAmplify } from '../authUser';
import { CodeDeliveryDetails } from 'amazon-cognito-identity-js';
import { LoginMechanism, SignUpAttribute, SocialProvider } from '../authFields';
import { defaultServices } from '../../../machines/authenticator/defaultServices';

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
    formFields?: FormFields;
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

export interface SignInContext extends BaseFormContext {
  loginMechanisms: Required<AuthContext>['config']['loginMechanisms'];
  socialProviders: Required<AuthContext>['config']['socialProviders'];
  formFields?: FormFields;
  attributeToVerify?: string;
  redirectIntent?: string;
  unverifiedAttributes?: Record<string, string>;
}
export interface SignUpContext extends BaseFormContext {
  loginMechanisms: Required<AuthContext>['config']['loginMechanisms'];
  socialProviders: Required<AuthContext>['config']['socialProviders'];
  formFields: FormFields;
  unverifiedAttributes?: Record<string, string>;
}

export interface ResetPasswordContext extends BaseFormContext {
  username?: string;
  unverifiedAttributes?: Record<string, string>;
  formFields?: FormFields;
}

export interface SignOutContext {
  authAttributes?: Record<string, any>;
  challengeName?: string;
  unverifiedAttributes?: Record<string, string>;
  user?: CognitoUserAmplify;
  formFields?: FormFields;
}

// actors that have forms. Has `formValues, remoteErrror, and validationError in common.
export type ActorContextWithForms =
  | SignInContext
  | SignUpContext
  | ResetPasswordContext;

export type AuthActorContext = ActorContextWithForms | SignOutContext;
