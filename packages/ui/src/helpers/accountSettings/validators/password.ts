import { Amplify } from 'aws-amplify';
import { hasSpecialChars } from '../../../helpers/authenticator';
import {
  ValidatorSpec,
  PasswordSettings,
  PasswordRequirement,
} from '../../../types';

/** Gets password setting from Amplify configuration */
export const getPasswordRequirement = (): PasswordRequirement => {
  // need to cast to any because `Amplify.configure()` isn't typed properly
  const config = Amplify.configure() as any;
  const passwordSettings =
    config?.aws_cognito_password_protection_settings as PasswordSettings;

  if (!passwordSettings) {
    return null;
  }

  const {
    passwordPolicyCharacters: characterPolicy = [],
    passwordPolicyMinLength: minLength,
  } = passwordSettings;

  return {
    minLength: minLength ? minLength : undefined,
    needsLowerCase: characterPolicy.includes('REQUIRES_LOWERCASE'),
    needsUpperCase: characterPolicy.includes('REQUIRES_UPPERCASE'),
    needsNumber: characterPolicy.includes('REQUIRES_NUMBERS'),
    needsSpecialChar: characterPolicy.includes('REQUIRES_SYMBOLS'),
  };
};

export const getMinLengthValidator = (minLength: number): ValidatorSpec => ({
  validationMode: 'onTouched',
  validator: (field) => field.length >= minLength,
  message: `Password must have at least ${minLength} characters`,
});

export const hasLowerCase: ValidatorSpec = {
  validationMode: 'onTouched',
  validator: (field) => /[a-z]/.test(field),
  message: 'Password must have lower case letters',
};

export const hasUpperCase: ValidatorSpec = {
  validationMode: 'onTouched',
  validator: (field) => /[A-Z]/.test(field),
  message: 'Password must have upper case letters',
};

export const hasNumber: ValidatorSpec = {
  validationMode: 'onTouched',
  validator: (field) => /[0-9]/.test(field),
  message: 'Password must have numbers',
};

export const hasSpecialChar: ValidatorSpec = {
  validationMode: 'onTouched',
  validator: (field) => hasSpecialChars(field),
  message: 'Password must have special characters',
};

export const getDefaultPasswordValidators = (): ValidatorSpec[] => {
  const requirement = getPasswordRequirement();
  if (!requirement) return [];

  const validators: ValidatorSpec[] = [];

  const {
    minLength,
    needsLowerCase,
    needsUpperCase,
    needsNumber,
    needsSpecialChar,
  } = requirement;

  if (minLength) {
    validators.push(getMinLengthValidator(minLength));
  }

  if (needsLowerCase) {
    validators.push(hasLowerCase);
  }
  if (needsUpperCase) {
    validators.push(hasUpperCase);
  }
  if (needsNumber) {
    validators.push(hasNumber);
  }
  if (needsSpecialChar) {
    validators.push(hasSpecialChar);
  }

  return validators;
};
