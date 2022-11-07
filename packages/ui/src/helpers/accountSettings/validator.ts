import {
  ConfirmPasswordValidator,
  FieldValidator,
  MinLengthValidator,
} from '../../types/accountSettings/validator';
import { hasAllowedSpecialChars } from '../authenticator';
import { getPasswordSettings } from './utils';

// TODO: consolidate these with Authenticator validators
const minLength: MinLengthValidator = (minLength: number) => {
  return (field: string) => {
    if (field?.length < minLength) {
      return `Password must have at least ${minLength} characters`;
    }
  };
};

const hasLowerCase: FieldValidator = (field: string) => {
  if (!/[a-z]/.test(field)) {
    return 'Password must have lower case letters';
  }
};

const hasUpperCase: FieldValidator = (field: string) => {
  if (!/[a-z]/.test(field)) {
    return 'Password must have lower case letters';
  }
};

const hasNumbers: FieldValidator = (field: string) => {
  if (!/[0-9]/.test(field)) {
    return 'Password must have numbers';
  }
};

const hasSpecialCharacters = (field: string) => {
  if (!hasAllowedSpecialChars(field)) {
    return 'Password must have special characters';
  }
};

const confirmPasswordMatch: ConfirmPasswordValidator = (
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
          validators.push(hasSpecialCharacters);
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
