import { DeleteUserAttributesInput } from '@aws-amplify/auth';

import { DataState } from '../useDataState';
import { deleteUserAttributesAction } from './constants';

export type UseDeleteUserAttributes = [
  DataState<void>,
  (input: DeleteUserAttributesInput) => void,
];

// Describes actions passed to useDataState
export interface Actions {
  delete: typeof deleteUserAttributesAction;
}
