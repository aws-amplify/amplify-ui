import { DeleteUserAttributesInput } from '@aws-amplify/auth';

import { ActionState } from '../useDataState';
import { deleteUserAttributesAction } from './constants';

export type UseDeleteUserAttributes = [
  ActionState<void>,
  (input: DeleteUserAttributesInput) => void,
];

// Describes actions passed to useDataState
export interface Actions {
  delete: typeof deleteUserAttributesAction;
}
