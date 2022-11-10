import { InputEventType, ValidatorOptions } from '@aws-amplify/ui';
import { BlurredFields, FormValues } from '../types';

export type ValidateParams = {
  formValues: FormValues;
  blurredFields: BlurredFields;
  eventType: InputEventType;
};
export interface ChangePasswordProps {
  /** callback once password is successfully updated */
  onSuccess?: () => void;
  /** callback when there's an error */
  onError?: (error: Error) => void;
  /** custom password validations */
  validators?: ValidatorOptions[];
}
