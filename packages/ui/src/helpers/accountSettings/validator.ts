import {
  ConfirmPasswordValidator,
  PasswordValidator,
  MinLengthValidator,
} from '../../types/accountSettings/validator';
import { hasAllowedSpecialChars } from '../authenticator';
import { getPasswordSettings } from './utils';

// TODO: consolidate these with Authenticator validators
export const minLength: MinLengthValidator = (minLength: number) => {
  return (field: string) => {
    if (field?.length < minLength) {
      return `Password must have at least ${minLength} characters`;
    }
  };
};

export const hasLowerCase: PasswordValidator = (field: string) => {
  if (!/[a-z]/.test(field)) {
    return 'Password must have lower case letters';
  }
};

export const hasUpperCase: PasswordValidator = (field: string) => {
  if (!/[a-z]/.test(field)) {
    return 'Password must have lower case letters';
  }
};

export const hasNumbers: PasswordValidator = (field: string) => {
  if (!/[0-9]/.test(field)) {
    return 'Password must have numbers';
  }
};

export const hasSpecialChars = (field: string) => {
  if (!hasAllowedSpecialChars(field)) {
    return 'Password must have special characters';
  }
};

export const confirmPasswordMatch: ConfirmPasswordValidator = (
  newPassword,
  confirmPassword
) => {
  if (newPassword !== confirmPassword) {
    return 'Your passwords must match';
  }
};

export const getDefaultPasswordValidator = (): PasswordValidator[] => {
  const validators: PasswordValidator[] = [];
  const passwordSettings = getPasswordSettings();

  const minLengthPoilicy = passwordSettings?.passwordPolicyMinLength as number;
  if (minLengthPoilicy) {
    validators.push(minLength(minLengthPoilicy));
  }

  const passwordPolicy = passwordSettings?.passwordPolicyCharacters as string[];
  if (passwordPolicy) {
    passwordPolicy.forEach((policyName) => {
      switch (policyName) {
        case 'REQUIRES_LOWERCASE': {
          validators.push(hasLowerCase);
          break;
        }
        case 'REQUIRES_UPPERCASE': {
          validators.push(hasUpperCase);
          break;
        }
        case 'REQUIRES_NUMBERS': {
          validators.push(hasNumbers);
          break;
        }
        case 'REQUIRES_SYMBOLS': {
          validators.push(hasSpecialChars);
          break;
        }
        default: {
          break;
        }
      }
    });
    return validators;
  }
};
