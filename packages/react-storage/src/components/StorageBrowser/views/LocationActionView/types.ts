import { LocationData, TaskData } from '../../actions';

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

export interface LocationActionViewProps<T = string> {
  onExit?: () => void;
  type?: T;
}

export type LocationActionViewType<T = string> = (
  props: LocationActionViewProps<T>
) => React.JSX.Element | null;

export interface ActionViewType<T extends TaskData = TaskData, K = {}> {
  (
    props: ActionViewProps & Partial<ActionViewState<T>> & K
  ): React.JSX.Element | null;
  displayName: string;
}

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
