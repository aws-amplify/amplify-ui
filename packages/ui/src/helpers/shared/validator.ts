import { PasswordSettings } from '../../types';
import { hasSpecialChars } from '../authenticator/utils';

type PasswordValidator = (password: string) => string[];

/** Checks password against password settings from `Amplify.configure()`  */
export const getDefaultPasswordValidator = (
  passwordSettings: PasswordSettings
): PasswordValidator => {
  return (password: string) => {
    const errors = [];

    const policyMinLength = passwordSettings?.passwordPolicyMinLength;
    if (password.length < policyMinLength) {
      errors.push(`Password must have at least ${policyMinLength} characters`);
    }

    const passwordPolicyCharacters = passwordSettings?.passwordPolicyCharacters;

    passwordPolicyCharacters?.forEach((errorCheck) => {
      switch (errorCheck) {
        case 'REQUIRES_LOWERCASE':
          if (!/[a-z]/.test(password))
            errors.push('Password must have lower case letters');
          break;
        case 'REQUIRES_UPPERCASE':
          if (!/[A-Z]/.test(password))
            errors.push('Password must have upper case letters');
          break;
        case 'REQUIRES_NUMBERS':
          if (!/[0-9]/.test(password))
            errors.push('Password must have numbers');
          break;
        case 'REQUIRES_SYMBOLS':
          // https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-policies.html
          if (!hasSpecialChars(password))
            errors.push('Password must have special characters');
          break;
        default:
          break;
      }
    });

    return errors;
  };
};
