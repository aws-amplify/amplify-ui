import { Amplify } from 'aws-amplify';
import { hasSpecialChars } from '../authenticator';
import {
  ValidatorOptions,
  PasswordSettings,
  PasswordRequirement,
  ValidationMode,
  InputEventType,
} from '../../types';

// gets password requirement from Amplify.configure data
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
    minLength,
    needsLowerCase: characterPolicy.includes('REQUIRES_LOWERCASE'),
    needsUpperCase: characterPolicy.includes('REQUIRES_UPPERCASE'),
    needsNumber: characterPolicy.includes('REQUIRES_NUMBERS'),
    needsSpecialChar: characterPolicy.includes('REQUIRES_SYMBOLS'),
  };
};

export const getHasMinLength = (minLength: number): ValidatorOptions => ({
  validationMode: 'onTouched',
  validator: (field) => field.length >= minLength,
  message: `Password must have at least ${minLength} characters`,
});

export const hasLowerCase: ValidatorOptions = {
  validationMode: 'onTouched',
  validator: (field) => /[a-z]/.test(field),
  message: 'Password must have lower case letters',
};

export const hasUpperCase: ValidatorOptions = {
  validationMode: 'onTouched',
  validator: (field) => /[A-Z]/.test(field),
  message: 'Password must have upper case letters',
};

export const hasNumber: ValidatorOptions = {
  validationMode: 'onTouched',
  validator: (field) => /[0-9]/.test(field),
  message: 'Password must have numbers',
};

export const hasSpecialChar: ValidatorOptions = {
  validationMode: 'onTouched',
  validator: (field) => hasSpecialChars(field),
  message: 'Password must have special characters',
};

export const getMatchesConfirmPassword = (
  password: string
): ValidatorOptions => {
  return {
    validationMode: 'onTouched',
    validator: (confirmPassword) => password === confirmPassword,
    message: 'Your passwords must match',
  };
};

export const getDefaultPasswordValidators = (): ValidatorOptions[] => {
  const requirement = getPasswordRequirement();
  if (!requirement) return [];

  const validators: ValidatorOptions[] = [];

  const {
    minLength,
    needsLowerCase,
    needsUpperCase,
    needsNumber,
    needsSpecialChar,
  } = requirement;

  if (minLength) {
    validators.push(getHasMinLength(minLength));
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

export const getDefaultConfirmPasswordValidators = (
  password: string
): ValidatorOptions[] => {
  return [getMatchesConfirmPassword(password)];
};

/*
 * `shouldValidate` determines whether validator should be run, based on validation mode,
 * input event type, and whether it has been blurred yet.
 */
export const shouldValidate = ({
  validationMode,
  eventType,
  hasBlurred,
}: {
  validationMode: ValidationMode;
  eventType: InputEventType;
  hasBlurred: boolean;
}) => {
  switch (validationMode) {
    case 'onBlur': {
      // only run validator on blur event
      return eventType === 'blur';
    }
    case 'onChange': {
      // only run validator on change event
      return eventType === 'change';
    }
    case 'onTouched': {
      /**
       * run validator on first blur event, and then every subsequent
       * blur/change event.
       */
      return eventType === 'blur' || hasBlurred;
    }
  }
};

// `runFieldValidator` runs all validators, and returns error messages.
export const runFieldValidators = ({
  value,
  validators,
  eventType,
  hasBlurred,
}: {
  value: string;
  validators: ValidatorOptions[];
  eventType: InputEventType;
  hasBlurred: boolean;
}): string[] => {
  if (!value) return [];

  return validators.reduce((prevErrors, validatorSpec) => {
    const { validator, validationMode, message } = validatorSpec;

    if (shouldValidate({ validationMode, eventType, hasBlurred })) {
      const hasError = !validator(value);
      return hasError ? [...prevErrors, message] : prevErrors;
    }
  }, []);
};
