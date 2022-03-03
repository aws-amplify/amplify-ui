import { ValidationError } from '../validator';
import { AuthFormData, FormFields } from '../form';
import { AuthChallengeNames, CognitoUserAmplify } from '../user';
import { CodeDeliveryDetails } from 'amazon-cognito-identity-js';
import { LoginMechanism, SignUpAttribute, SocialProvider } from '../attributes';
import { defaultServices } from '../../../machines/authenticator/defaultServices';

/**
 * Data that actor returns when they are done and reach the final state
 */
export interface ActorDoneData {
  /** Any auth form values that needs to be persisted between the actors */
  authAttributes?: AuthFormData;
  /** String that indicates where authMachine should next transition to */
  intent?: string; // TODO: name it more intuitively -- e.g. targetState
  /** User returned by the actor it's done */
  user?: CognitoUserAmplify;
}

/**
 * Context interface for the top-level machine
 */
export interface AuthContext {
  /** Reference to the spawned actor */
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

/**
 * Base context for all actors that have auth forms associated
 */
interface BaseFormContext {
  /** Any user attributes set that needs to persist between states */
  authAttributes?: Record<string, any>;
  /** Current challengeName issued by Cognnito */
  challengeName?: string;
  /** Required attributes for form submission */
  requiredAttributes?: Array<string>;
  /** Maps each input name to tis value */
  formValues?: AuthFormData;
  /** Input (names) that has been blurred at least ones */
  touched?: AuthFormData;
  /** String that indicates where authMachine should next transition to */
  intent?: string;
  /** Error returned from remote service / API */
  remoteError?: string;
  /** Current user inteface the actor is working with */
  user?: CognitoUserAmplify;
  /** Maps each input to its validation error, if any */
  validationError?: ValidationError;
  /** Denotes where a confirmation code has been sent to */
  codeDeliveryDetails?: CodeDeliveryDetails;
  /** Default country code for all phone number fields. */
  country_code?: string; // TODO: this one should be customizable as well
}

// Actor context types
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

/**
 * Context for actors that have forms
 */
export type ActorContextWithForms =
  | SignInContext
  | SignUpContext
  | ResetPasswordContext;

export type AuthActorContext = ActorContextWithForms | SignOutContext;
