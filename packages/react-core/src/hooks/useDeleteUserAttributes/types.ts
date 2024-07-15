import { DeleteUserAttributesInput } from '@aws-amplify/auth';

import { ActionState } from '../useDataState';

export type UseDeleteUserAttributes = [
  ActionState<void>,
  (input: DeleteUserAttributesInput) => void,
];
