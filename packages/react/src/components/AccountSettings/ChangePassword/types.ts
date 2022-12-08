import { InputEventType, ValidatorOptions } from '@aws-amplify/ui';
import {
  SubmitButtonComponent,
  ErrorMessageComponent,
  PasswordFieldComponent,
  FormValues,
} from '../types';

export interface ChangePasswordComponents {
  ConfirmPasswordField?: PasswordFieldComponent;
  CurrentPasswordField?: PasswordFieldComponent;
  ErrorMessage?: ErrorMessageComponent;
  NewPasswordField?: PasswordFieldComponent;
  SubmitButton?: SubmitButtonComponent;
}

export interface ValidateParams {
  formValues: FormValues;
  eventType: InputEventType;
}

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
