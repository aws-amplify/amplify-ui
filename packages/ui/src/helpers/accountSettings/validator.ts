import {
  ConfirmPasswordValidator,
  FieldValidator,
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

export const hasLowerCase: FieldValidator = (field: string) => {
  if (!/[a-z]/.test(field)) {
    return 'Password must have lower case letters';
  }
};

export const hasUpperCase: FieldValidator = (field: string) => {
  if (!/[a-z]/.test(field)) {
    return 'Password must have lower case letters';
  }
};

export const hasNumbers: FieldValidator = (field: string) => {
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

export const getDefaultPasswordValidator = (): FieldValidator[] => {
  const validators: FieldValidator[] = [];
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
        }
        case 'REQUIRES_UPPERCASE': {
          validators.push(hasUpperCase);
        }
        case 'REQUIRES_NUMBERS': {
          validators.push(hasNumbers);
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
