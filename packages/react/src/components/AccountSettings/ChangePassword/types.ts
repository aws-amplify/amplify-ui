import { PasswordFieldOverride, SubmitButtonOverride } from '../types';

export interface ChangePasswordOverrides {
  CurrentPassword?: PasswordFieldOverride;
  NewPassword?: PasswordFieldOverride;
  ConfirmPassword?: PasswordFieldOverride;
  Button?: SubmitButtonOverride;
}

export type PasswordValidator = (password: string) => string;

export interface ChangePasswordProps {
  // custom validator function if customer want to override default validations
  validate?: PasswordValidator;
  // callback once password is successfully updated
  onSuccess?: () => void;
  // callback when there's an error
  onError?: (error: Error) => void;
}
