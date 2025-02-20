import { LocationData, TaskData } from '../actions';

import { LocationState } from '../providers/store/location';

import { Task, TasksState } from '../tasks';

export interface ActionViewState<T extends TaskData = TaskData>
  extends Omit<TasksState<T>, 'reset'> {
  location: LocationState;
  onActionCancel: () => void;
  onActionExit: () => void;
  onActionStart: () => void;
  onTaskRemove?: (task: Task<T>) => void;
}

export interface ActionViewProps {
  children?: React.ReactNode;
  className?: string;
  onExit?: (location?: LocationData) => void;
}
