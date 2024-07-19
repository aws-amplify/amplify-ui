import { ConfirmUserAttributeInput } from '@aws-amplify/auth';

import { DataState } from '../useDataState';
import { confirmUserAttributeAction } from './constants';

export type UseConfirmUserAttribute = [
  DataState<void>,
  (input: ConfirmUserAttributeInput) => void,
];

// Describes actions passed to useDataState
export interface Actions {
  confirm: typeof confirmUserAttributeAction;
}
