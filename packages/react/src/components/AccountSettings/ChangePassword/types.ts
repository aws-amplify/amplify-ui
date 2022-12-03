import { InputEventType, ValidatorOptions } from '@aws-amplify/ui';
import {
  ErrorMessageComponent,
  PasswordFieldComponent,
  SubmitButtonComponent,
  FormValues,
} from '../types';

export interface ChangePasswordComponents {
  CurrentPassword?: PasswordFieldComponent;
  NewPassword?: PasswordFieldComponent;
  ConfirmPassword?: PasswordFieldComponent;
  SubmitButton?: SubmitButtonComponent;
  ErrorMessage?: ErrorMessageComponent;
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
