import { DataState } from '@aws-amplify/ui-react-core';

import { ListHandler, TaskHandler } from './handlers';

export type ActionState<T = any, K = any> = [
  state: DataState<T>,
  handleAction: (...input: K[]) => void,
];

export type UseAction<T> = T extends
  | ListHandler<infer K, infer U>
  | TaskHandler<infer K, infer U>
  ? ActionState<U, K>
  : never;

export type CreateUseAction = <T>(
  actions: T
) => <K extends keyof T>(key: K) => UseAction<T[K]>;
