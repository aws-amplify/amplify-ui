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
  statusCounts: StatusCounts;
  tasks: Tasks<T>;
  onActionStart: () => void;
  onActionCancel: () => void;
  onActionExit: () => void;
  onTaskRemove?: (task: Task<T>) => void;
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

export type LocationActionViewComponent<
  T = string,
  K extends TaskData = TaskData,
> = (props: LocationActionViewProps<T, K>) => React.JSX.Element | null;

export interface ActionViewComponent<T extends TaskData = TaskData, K = {}> {
  (
    props: ActionViewProps & Partial<ActionViewState<T>> & K
  ): React.JSX.Element | null;
  displayName: string;
  Cancel: () => React.JSX.Element | null;
  Destination: () => React.JSX.Element | null;
  Exit: () => React.JSX.Element | null;
  Start: () => React.JSX.Element | null;
  StatusDisplay: () => React.JSX.Element | null;
  Table: () => React.JSX.Element | null;
  Title: () => React.JSX.Element | null;
}

// Custom actions derived views
export type DerivedActionViews<T> = {
  readonly [K in keyof T as K extends DefaultActionKey
    ? never
    : T[K] extends { componentName: ComponentName }
    ? T[K]['componentName']
    : never]: ActionViewComponent<
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
