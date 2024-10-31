import { TaskCounts } from '../../../controls/types';
import { Task } from '../../../tasks';

export interface UseActionView {
  disableCancel: boolean;
  disableClose: boolean;
  disableStart: boolean;
  onActionCancel: () => void;
  onClose: () => void;
  onActionStart: () => void;
  taskCounts: TaskCounts;
  tasks: Task<File>[];
}
