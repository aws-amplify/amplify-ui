import { InputEventType, ValidatorOptions } from '@aws-amplify/ui';
import { FormValues } from '../types';

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
  /** @internal if set to true, changePassword will mock `useAuth` and `Auth` API calls */
  isDemo?: boolean;
}
