import { ConfirmUserAttributeInput } from '@aws-amplify/auth';

import { ActionState } from '../useDataState';
import { confirmUserAttributeAction } from './constants';

export type UseConfirmUserAttribute = [
  ActionState<void>,
  (input: ConfirmUserAttributeInput) => void,
];

// Describes actions passed to useDataState
export interface Actions {
  confirm: typeof confirmUserAttributeAction;
}
