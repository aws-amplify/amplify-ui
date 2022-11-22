import { InputEventType, ValidatorOptions } from '@aws-amplify/ui';
import {
  AccountSettingsError,
  AccountSettingsPasswordField,
  AccountSettingsSubmitButton,
  FormValues,
} from '../types';

export interface ChangePasswordComponents {
  CurrentPassword?: AccountSettingsPasswordField;
  NewPassword?: AccountSettingsPasswordField;
  ConfirmPassword?: AccountSettingsPasswordField;
  SubmitButton?: AccountSettingsSubmitButton;
  Error?: AccountSettingsError;
}

export type ValidateParams = {
  formValues: FormValues;
  eventType: InputEventType;
};
export interface ChangePasswordProps {
  /** callback once password is successfully updated */
  onSuccess?: () => void;
  /** callback when there's an error */
  onError?: (error: Error) => void;
  /** custom password validations */
  validators?: ValidatorOptions[];
  /** Custom component overrides */
  components?: ChangePasswordComponents;
}
