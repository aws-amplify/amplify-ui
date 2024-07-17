import { FetchUserAttributesOutput } from '@aws-amplify/auth';

import { DataState } from '../useDataState';

export type UseFetchUserAttributes = [
  DataState<FetchUserAttributesOutput>,
  () => void,
];
