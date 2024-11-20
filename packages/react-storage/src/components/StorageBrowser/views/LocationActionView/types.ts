import {
  ComponentName,
  DefaultActionKey,
  LocationData,
  TaskActionConfig,
  TaskData,
  TaskHandler,
  TaskHandlerInput,
} from '../../actions';

import { LocationState } from '../../providers/store/location';

import { StatusCounts, Task, Tasks } from '../../tasks';
import { DataTableProps } from '../../composables/DataTable';
import { WithKey } from '../../components/types';

export interface ActionViewState<T extends TaskData = TaskData> {
  isProcessing: boolean;
  isProcessingComplete: boolean;
  location: LocationState;
  onActionCancel: () => void;
  onActionExit: () => void;
  onActionStart: () => void;
  onTaskRemove?: (task: Task<T>) => void;
  statusCounts: StatusCounts;
  tasks: Tasks<T>;
}

export interface ActionViewProps {
  children?: React.ReactNode;
  className?: string;
  onExit?: (location?: LocationData) => void;
}

export interface LocationActionViewProps<
  T = string,
  K extends TaskData = TaskData,
> extends Partial<ActionViewState<K>>,
    ActionViewProps {
  type?: T;
}

export type LocationActionViewType<
  T = string,
  K extends TaskData = TaskData,
> = (props: LocationActionViewProps<T, K>) => React.JSX.Element | null;

export interface ActionViewType<T extends TaskData = TaskData, K = {}> {
  (
    props: ActionViewProps & Partial<ActionViewState<T>> & K
  ): React.JSX.Element | null;
  displayName: string;
}

// Custom actions derived views
export type DerivedActionViews<T> = {
  readonly [K in keyof T as K extends DefaultActionKey
    ? never
    : T[K] extends { componentName: ComponentName }
    ? T[K]['componentName']
    : never]: ActionViewType<
    T[K] extends TaskActionConfig<TaskHandler<TaskHandlerInput<infer X>>>
      ? X
      : never
  >;
};

export type HeaderKeys =
  | 'name'
  | 'folder'
  | 'type'
  | 'size'
  | 'status'
  | 'progress'
  | 'cancel';

export type ActionViewHeaders = WithKey<
  DataTableProps['headers'][number],
  HeaderKeys
>[];
