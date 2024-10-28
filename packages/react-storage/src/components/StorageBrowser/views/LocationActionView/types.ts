import { LocationData } from '../../actions';
import {
  ComponentName,
  DefaultActionKey,
  TaskActionConfig,
} from '../../actions/configs';
import { TaskCounts } from '../../controls/types';
import { Task } from '../../tasks';

export interface ActionViewState<T = any> {
  onExit: (location: LocationData) => void;
  onActionStart: () => void;
  onActionCancel: () => void;
  taskCounts: TaskCounts;
  tasks: Task<T>[];
}

export interface ActionViewProps {
  children?: React.ReactNode;
  className?: string;
}

export interface LocationActionViewProps<T = string, K = any>
  extends Partial<ActionViewState<K>>,
    ActionViewProps {
  type?: T;
}

export type LocationActionViewComponent<T = string, K = any> = (
  props: LocationActionViewProps<T, K>
) => React.JSX.Element | null;

export interface ActionViewComponent<T = any, K = {}> {
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
    Partial<ActionViewState<T[K] extends TaskActionConfig<infer U> ? U : never>>
  >;
};
