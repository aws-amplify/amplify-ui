import { PasswordSettings } from '.';
import { AuthFormData } from './form';

/**
 * Maps each input to its validation error, if any
 */
// todo(breaking): enforce error to always be array
export type ValidationError = Record<string, string | string[]>;

/**
 * Return type of validator. This is `null` if there are no error, and `ValidationError` otherwise.
 */
export type ValidatorResult = void | null | ValidationError;
export type SignInResult = string; // null if there are no error, `ValidationError` otherwise

/**
 * Validates the given formData. This can be synchronous or asynchronous.
 */
export type Validator = (
  formData: AuthFormData,
  touchData?: AuthFormData,
  passwordSettings?: PasswordSettings
) => ValidatorResult | Promise<ValidatorResult>;
