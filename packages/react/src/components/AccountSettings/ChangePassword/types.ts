import { InputEventType, ValidatorOptions } from '@aws-amplify/ui';
import {
  ComponentError,
  ComponentPasswordField,
  ComponentSubmitButton,
  FormValues,
} from '../types';

export interface ChangePasswordComponents {
  CurrentPassword?: ComponentPasswordField;
  NewPassword?: ComponentPasswordField;
  ConfirmPassword?: ComponentPasswordField;
  SubmitButton?: ComponentSubmitButton;
  Error?: ComponentError;
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
  /** custom component overrides */
  components?: ChangePasswordComponents;
}
