import { ValidatorOptions } from '@aws-amplify/ui';

export interface ChangePasswordProps {
  /** callback once password is successfully updated */
  onSuccess?: () => void;
  /** callback when there's an error */
  onError?: (error: Error) => void;
  /** custom password validations */
  validators?: ValidatorOptions[];
}
