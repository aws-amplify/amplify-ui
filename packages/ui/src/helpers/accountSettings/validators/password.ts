import { Amplify } from 'aws-amplify';
import { hasSpecialChars } from '../../../helpers/authenticator';
import { FieldValidator, PasswordSettings } from '../../../types';

/** Gets password setting from Amplify configuration */
const getPasswordSettings = () => {
  // need to cast to any because `Amplify.configure()` isn't typed properly
  const config = Amplify.configure() as any;
  return config?.aws_cognito_password_protection_settings as PasswordSettings;
};

const getMinLengthValidator = (minLength: number): FieldValidator => ({
  event: 'onTouched',
  handler: (field) => field.length > 0,
  message: `Password must have at least ${minLength} characters`,
});

const hasLowerCase: FieldValidator = {
  event: 'onTouched',
  handler: (field) => /[a-z]/.test(field),
  message: 'Password must have lower case letters',
};

const hasUpperCase: FieldValidator = {
  event: 'onTouched',
  handler: (field) => /[A-Z]/.test(field),
  message: 'Password must have upper case letters',
};

const hasNumber: FieldValidator = {
  event: 'onTouched',
  handler: (field) => /[0-9]/.test(field),
  message: 'Password must have lower case letters',
};

const hasSpecialChar: FieldValidator = {
  event: 'onTouched',
  handler: (field) => hasSpecialChars(field),
  message: 'Password must have special characters',
};

export const getDefaultPasswordValidators = (): FieldValidator[] => {
  const validators: FieldValidator[] = [];

  const passwordSettings = getPasswordSettings();

  if (!passwordSettings) {
    // return early if password setting is not set
    return [];
  }

  const minLength = passwordSettings.passwordPolicyMinLength;
  if (minLength) {
    validators.push(getMinLengthValidator(minLength));
  }

  // policy such as "requires uppercase", "requires special characters", etc
  const characterPolicies = passwordSettings?.passwordPolicyCharacters;

  characterPolicies.forEach((policy) => {
    switch (policy) {
      case 'REQUIRES_LOWERCASE': {
        validators.push(hasLowerCase);
        break;
      }
      case 'REQUIRES_UPPERCASE': {
        validators.push(hasUpperCase);
        break;
      }
      case 'REQUIRES_NUMBERS': {
        validators.push(hasNumber);
        break;
      }
      case 'REQUIRES_SYMBOLS': {
        validators.push(hasSpecialChar);
        break;
      }
      default: {
        break;
      }
    }
  });
  return validators;
};
