import { FetchUserAttributesOutput } from '@aws-amplify/auth';

import { ActionState } from '../useDataState';

export type UseFetchUserAttributes = [
  ActionState<FetchUserAttributesOutput>,
  () => void,
];
