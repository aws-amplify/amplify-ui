import { AsyncDataAction } from '@aws-amplify/ui-react-core';
import { Permission } from '../../storage-internal';

import {
  ListHandlerInput,
  ListHandlerOptions,
  ListHandlerOutput,
  TaskHandlerOptions,
} from '../types';

export type LocationType = 'OBJECT' | 'PREFIX' | 'BUCKET';

export interface LocationData {
  bucket: string;
  permission: Permission;
  prefix: string;
  type: LocationType;
}

export interface LocationAccess<T = Permission> {
  type: LocationType;
  permission: T;
  scope: string;
}

export interface TaskHandlerCallbacks
  extends Pick<TaskHandlerOptions, 'onComplete' | 'onError'> {
  onCancel?: (key: string) => void;
}

export interface ListActionHandlerOptions {
  refresh?: boolean;
  reset?: boolean;
}

export type ListActionHandler<
  T extends ListHandlerOptions,
  K,
> = AsyncDataAction<
  ListHandlerOutput<K>,
  ListHandlerInput<T & ListActionHandlerOptions>
>;
