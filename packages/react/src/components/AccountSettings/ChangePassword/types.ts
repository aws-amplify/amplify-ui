import {
  AccountSettingsPasswordField,
  AccountSettingsSubmitButton,
} from '../types';

export interface ChangePasswordOverrides {
  CurrentPassword?: AccountSettingsPasswordField;
  NewPassword?: AccountSettingsPasswordField;
  ConfirmPassword?: AccountSettingsPasswordField;
  Button?: AccountSettingsSubmitButton;
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
