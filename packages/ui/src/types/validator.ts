import { AuthFormData } from './authMachine';

export type ValidationError = Record<string, string>;

/**
 * Return type of validator. This is `null` if there are no error, and `ValidationError` otherwise.
 */
export type ValidatorResult = void | null | ValidationError; // null if there are no error, `ValidationError` otherwise

/**
 * Validates the given formData. This can be synchronous or asynchronous.
 */
export type Validator = (
  formData: AuthFormData,
  touchData?: AuthFormData
) => ValidatorResult | Promise<ValidatorResult>;
