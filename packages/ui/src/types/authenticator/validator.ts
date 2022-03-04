import { AuthFormData } from './form';
import { AuthChallengeNames } from './user';

/**
 * Maps each input to its validation error, if any
 */
export type ValidationError = Record<string, string>;

/**
 * Return type of validator. This is `null` if there are no error, and `ValidationError` otherwise.
 */
export type ValidatorResult = void | null | ValidationError; // null if there are no error, `ValidationError` otherwise
export type SignInResult = string; // null if there are no error, `ValidationError` otherwise

/**
 * Validates the given formData. This can be synchronous or asynchronous.
 */
export type Validator = (
  formData: AuthFormData,
  touchData?: AuthFormData
) => ValidatorResult | Promise<ValidatorResult>;

export type SignInTypes = (
  user: string,
  code: string,
  mfaType: AuthChallengeNames.SMS_MFA | AuthChallengeNames.SOFTWARE_TOKEN_MFA
) => SignInResult | Promise<SignInResult>;
