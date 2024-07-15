import { ConfirmUserAttributeInput } from '@aws-amplify/auth';

import { ActionState } from '../useDataState';

export type UseConfirmUserAttribute = [
  ActionState<void>,
  (input: ConfirmUserAttributeInput) => void,
];
