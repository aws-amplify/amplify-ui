import * as xstate from 'xstate';
import { State, Interpreter } from 'xstate';
import { CognitoUser } from 'amazon-cognito-identity-js';

declare type ValidationError = Record<string, string>;
/**
 * Return type of validator. This is `null` if there are no error, and `ValidationError` otherwise.
 */
declare type ValidatorResult = null | ValidationError;
/**
 * Validates the given formData. This can be synchronous or asynchronous.
 */
declare type Validator = (
  formData: AuthFormData
) => ValidatorResult | Promise<ValidatorResult>;

declare type AuthFormData = Record<string, string>;
interface AuthContext {
  user?: CognitoUserAmplify;
  config?: {
    login_mechanisms: string[];
  };
  actorRef?: any;
}
interface SignInContext {
  remoteError?: string;
  validationError?: ValidationError;
  formValues?: AuthFormData;
  user?: CognitoUserAmplify;
  challengeName?: string;
  authAttributes?: Record<string, any>;
  intent?: string;
  redirectIntent?: string;
  unverifiedAttributes?: Record<string, string>;
  attributeToVerify?: string;
}
interface SignUpContext {
  remoteError?: string;
  validationError?: ValidationError;
  formValues?: AuthFormData;
  user?: CognitoUserAmplify;
  login_mechanisms?: string[];
  intent?: string;
  authAttributes?: Record<string, any>;
  challengeName?: string;
}
interface ResetPasswordContext {
  validationError?: ValidationError;
  remoteError?: string;
  formValues?: ValidationError;
  username?: string;
  intent?: string;
  user?: CognitoUserAmplify;
  authAttributes?: Record<string, any>;
  challengeName?: string;
}
interface SignOutContext {
  user?: CognitoUserAmplify;
  authAttributes?: Record<string, any>;
  challengeName?: string;
}
declare type ActorContextWithForms =
  | SignInContext
  | SignUpContext
  | ResetPasswordContext;
declare type SignInState = State<SignInContext, AuthEvent>;
declare type SignUpState = State<SignUpContext, AuthEvent>;
declare type SignOutState = State<SignOutContext, AuthEvent>;
declare type ResetPasswordState = State<ResetPasswordContext, AuthEvent>;
declare type AuthActorContext = ActorContextWithForms | SignOutContext;
declare type AuthActorState = State<AuthActorContext, AuthEvent>;
interface CognitoUserAmplify extends CognitoUser {
  username?: string;
}
declare type InvokeActorEventTypes =
  | 'done.invoke.signInActor'
  | 'done.invoke.signUpActor'
  | 'done.invoke.signOutActor'
  | 'done.invoke.resetPasswordActor';
declare type AuthEventTypes =
  | 'SIGN_IN'
  | 'SIGN_UP'
  | 'SIGN_OUT'
  | 'SUBMIT'
  | 'RESEND'
  | 'CHANGE'
  | 'FEDERATED_SIGN_IN'
  | 'RESET_PASSWORD'
  | 'SKIP'
  | InvokeActorEventTypes;
declare enum AuthChallengeNames {
  SMS_MFA = 'SMS_MFA',
  SOFTWARE_TOKEN_MFA = 'SOFTWARE_TOKEN_MFA',
  NEW_PASSWORD_REQUIRED = 'NEW_PASSWORD_REQUIRED',
  RESET_REQUIRED = 'RESET_REQUIRED',
  MFA_SETUP = 'MFA_SETUP',
}
interface InputAttributes {
  label: string;
  type: string;
  placeholder: string;
}
declare const userNameAliasArray: readonly [
  'username',
  'email',
  'phone_number'
];
declare type UserNameAlias = typeof userNameAliasArray[number];
declare const socialProviderLoginMechanisms: string[];
declare type AuthInputNames = UserNameAlias | 'confirmation_code' | 'password';
declare type AuthInputAttributes = Record<AuthInputNames, InputAttributes>;
interface AuthEvent {
  type: AuthEventTypes;
  data?: Record<PropertyKey, any>;
}
declare type AuthMachineState = State<AuthContext, AuthEvent>;
declare type AuthInterpreter = Interpreter<AuthContext, any, AuthEvent>;

declare const authMachine: xstate.StateMachine<
  AuthContext,
  any,
  AuthEvent,
  {
    value: any;
    context: AuthContext;
  }
>;

declare const authService: xstate.Interpreter<
  AuthContext,
  any,
  AuthEvent,
  {
    value: any;
    context: AuthContext;
  }
>;

declare const authInputAttributes: AuthInputAttributes;
declare enum FederatedIdentityProviders {
  Amazon = 'LoginWithAmazon',
  Facebook = 'Facebook',
  Google = 'Google',
}
/**
 * Given xstate context from AuthMachine, this returns the input label, type,
 * and error attributes of the configured login_mechanisms.
 */
declare const getAliasInfoFromContext: (context: AuthContext) => {
  label: string;
  type: string;
  error: any;
};
/**
 * Given xstate context from AuthMachine, returns the primaryAlias and
 * secondaryAliases.
 */
declare const getConfiguredAliases: (context: AuthContext) => {
  primaryAlias: string;
  secondaryAliases: string[];
};
/**
 * Get the state of current actor. This is useful for checking which screen
 * to render: e.g. `getActorState(state).matches('confirmSignUp.edit').
 */
declare const getActorState: (state: AuthMachineState) => AuthActorState;
/**
 * Get the context of current actor. Useful for getting any nested context
 * like remoteError.
 */
declare const getActorContext: (state: AuthMachineState) => AuthActorContext;

declare const dict: {
  de: {
    'Account recovery requires verified contact information': string;
    'An account with the given email already exists.': string;
    'Back to Sign In': string;
    'Change Password': string;
    Code: string;
    Confirm: string;
    'Confirm a Code': string;
    'Confirm Sign In': string;
    'Confirm Sign Up': string;
    'Confirmation Code': string;
    'Create a new account': string;
    'Create account': string;
    'Create Account': string;
    Email: string;
    'Enter your password': string;
    'Enter your username': string;
    'Forgot Password': string;
    'Forgot your password? ': string;
    'Have an account? ': string;
    'Incorrect username or password': string;
    'Invalid password format': string;
    'Invalid phone number format': string;
    'Lost your code? ': string;
    'New Password': string;
    'No account? ': string;
    Password: string;
    'Password attempts exceeded': string;
    'Phone Number': string;
    'Resend Code': string;
    'Reset password': string;
    'Reset your password': string;
    'Send Code': string;
    'Sign in': string;
    'Sign In': string;
    'Sign in to your account': string;
    'Sign Out': string;
    'Sign Up': string;
    'Signing in': string;
    Skip: string;
    Submit: string;
    'User already exists': string;
    'User does not exist': string;
    Username: string;
    'Username cannot be empty': string;
    Verify: string;
    'Verify Contact': string;
  };
  es: {
    'Account recovery requires verified contact information': string;
    'Back to Sign In': string;
    'Change Password': string;
    Code: string;
    Confirm: string;
    'Confirm a Code': string;
    'Confirm Sign In': string;
    'Confirm Sign Up': string;
    'Confirmation Code': string;
    'Create a new account': string;
    Email: string;
    'Forgot Password': string;
    'Incorrect username or password': string;
    'Invalid password format': string;
    'Invalid phone number format': string;
    'Loading...': string;
    'New Password': string;
    Password: string;
    'Phone Number': string;
    'Resend a Code': string;
    'Resend Code': string;
    'Send Code': string;
    'Sign In': string;
    'Sign in to your account': string;
    'Sign Out': string;
    'Sign Up': string;
    Skip: string;
    Submit: string;
    'User already exists': string;
    'User does not exist': string;
    Username: string;
    'Username cannot be empty': string;
    Verify: string;
    'Verify Contact': string;
  };
  fr: {
    'Account recovery requires verified contact information': string;
    'An account with the given email already exists.': string;
    'Back to Sign In': string;
    Change: string;
    'Change Password': string;
    Code: string;
    Confirm: string;
    'Confirm a Code': string;
    'Confirm Sign In': string;
    'Confirm Sign Up': string;
    'Confirm SMS Code': string;
    'Confirm TOTP Code': string;
    'Confirmation Code': string;
    'Create a new account': string;
    'Create account': string;
    'Create Account': string;
    Email: string;
    'Enter your code': string;
    'Enter your email': string;
    'Enter your password': string;
    'Enter your phone number': string;
    'Enter your username': string;
    'Forgot Password': string;
    'Forgot your password? ': string;
    'Have an account? ': string;
    Hello: string;
    'Incorrect username or password': string;
    'Invalid password format': string;
    'Invalid phone number format': string;
    'Loading...': string;
    'Lost your code? ': string;
    'Network error': string;
    'New Password': string;
    'No account? ': string;
    or: string;
    Password: string;
    'Phone Number': string;
    'Resend a Code': string;
    'Resend Code': string;
    'Reset password': string;
    'Reset your password': string;
    Send: string;
    'Send Code': string;
    'Sign in': string;
    'Sign In': string;
    'Sign in to your account': string;
    'Sign In with Amazon': string;
    'Sign In with AWS': string;
    'Sign In with Facebook': string;
    'Sign In with Google': string;
    'Sign Out': string;
    'Sign Up': string;
    Skip: string;
    SMS: string;
    Submit: string;
    'User already exists': string;
    'User does not exist': string;
    Username: string;
    'Username cannot be empty': string;
    'Username/client id combination not found.': string;
    Verify: string;
    'Verify Contact': string;
  };
  it: {
    'Account recovery requires verified contact information': string;
    'An account with the given email already exists.': string;
    'Back to Sign In': string;
    'Change Password': string;
    Code: string;
    Confirm: string;
    'Confirm a Code': string;
    'Confirm Sign In': string;
    'Confirm Sign Up': string;
    'Confirmation Code': string;
    'Create a new account': string;
    'Create account': string;
    'Create Account': string;
    Email: string;
    'Enter your password': string;
    'Enter your username': string;
    'Forgot Password': string;
    'Forgot your password? ': string;
    'Have an account? ': string;
    'Incorrect username or password': string;
    'Invalid password format': string;
    'Invalid phone number format': string;
    'Lost your code?': string;
    'New Password': string;
    'No account? ': string;
    Password: string;
    'Password attempts exceeded': string;
    'Phone Number': string;
    'Resend Code': string;
    'Reset password': string;
    'Reset your password': string;
    'Send Code': string;
    'Sign in': string;
    'Sign In': string;
    'Sign in to your account': string;
    'Sign Out': string;
    'Sign Up': string;
    Skip: string;
    Submit: string;
    'User already exists': string;
    'User does not exist': string;
    Username: string;
    'Username cannot be empty': string;
    Verify: string;
    'Verify Contact': string;
  };
  ja: {
    'Account recovery requires verified contact information': string;
    'An account with the given email already exists.': string;
    'Back to Sign In': string;
    'Change Password': string;
    Code: string;
    Confirm: string;
    'Confirm a Code': string;
    'Confirm Sign In': string;
    'Confirm Sign Up': string;
    'Confirmation Code': string;
    'Create a new account': string;
    'Create account': string;
    'Create Account': string;
    Email: string;
    'Enter your password': string;
    'Enter your username': string;
    'Forgot Password': string;
    'Forgot your password? ': string;
    'Have an account? ': string;
    'Incorrect username or password': string;
    'Invalid password format': string;
    'Invalid phone number format': string;
    'Lost your code? ': string;
    'New Password': string;
    'No account? ': string;
    Password: string;
    'Password attempts exceeded': string;
    'Phone Number': string;
    'Resend Code': string;
    'Reset password': string;
    'Reset your password': string;
    'Send Code': string;
    'Sign in': string;
    'Sign In': string;
    'Sign in to your account': string;
    'Sign In with Amazon': string;
    'Sign In with Facebook': string;
    'Sign In with Google': string;
    'Sign Out': string;
    'Sign Up': string;
    Skip: string;
    Submit: string;
    'User already exists': string;
    'User does not exist': string;
    Username: string;
    'Username cannot be empty': string;
    Verify: string;
    'Verify Contact': string;
  };
  zh: {
    'Account recovery requires verified contact information': string;
    'Back to Sign In': string;
    'Change Password': string;
    Code: string;
    Confirm: string;
    'Confirm a Code': string;
    'Confirm Sign In': string;
    'Confirm Sign Up': string;
    Email: string;
    'Forgot Password': string;
    'Incorrect username or password': string;
    'Invalid password format': string;
    'Invalid phone number format': string;
    'New Password': string;
    Password: string;
    'Phone Number': string;
    'Resend a Code': string;
    'Send Code': string;
    'Sign In': string;
    'Sign Out': string;
    'Sign Up': string;
    Skip: string;
    Submit: string;
    'User already exists': string;
    'User does not exist': string;
    Username: string;
    Verify: string;
    'Verify Contact': string;
  };
};

export {
  ActorContextWithForms,
  AuthActorContext,
  AuthActorState,
  AuthChallengeNames,
  AuthContext,
  AuthEvent,
  AuthEventTypes,
  AuthFormData,
  AuthInputAttributes,
  AuthInputNames,
  AuthInterpreter,
  AuthMachineState,
  CognitoUserAmplify,
  FederatedIdentityProviders,
  InputAttributes,
  InvokeActorEventTypes,
  ResetPasswordContext,
  ResetPasswordState,
  SignInContext,
  SignInState,
  SignOutContext,
  SignOutState,
  SignUpContext,
  SignUpState,
  UserNameAlias,
  ValidationError,
  Validator,
  ValidatorResult,
  authInputAttributes,
  authMachine,
  authService,
  dict,
  getActorContext,
  getActorState,
  getAliasInfoFromContext,
  getConfiguredAliases,
  socialProviderLoginMechanisms,
  userNameAliasArray,
};
