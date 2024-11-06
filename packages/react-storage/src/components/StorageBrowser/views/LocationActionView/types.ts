import {
  LocationData,
  TaskData,
  TaskHandler,
  TaskHandlerInput,
} from '../../actions';
import {
  ComponentName,
  DefaultActionKey,
  TaskActionConfig,
} from '../../actions/configs';
import { TaskCounts } from '../../controls/types';
import { Tasks } from '../../tasks';

export interface ActionViewState<T extends TaskData = TaskData> {
  disableCancel: boolean;
  disableClose: boolean;
  disableStart: boolean;
  onExit: (location: LocationData) => void;
  onActionStart: () => void;
  onActionCancel: () => void;
  taskCounts: TaskCounts;
  tasks: Tasks<T>;
}

export interface ActionViewProps {
  children?: React.ReactNode;
  className?: string;
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
