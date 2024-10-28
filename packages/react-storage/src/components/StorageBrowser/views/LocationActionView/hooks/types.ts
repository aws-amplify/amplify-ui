import { TaskCounts } from '../../../controls/types';
import { Task } from '../../../tasks';

export interface UseActionView {
  disableCancel: boolean;
  disableClose: boolean;
  disablePrimary: boolean;
  onCancel: () => void;
  onClose: () => void;
  onStart: () => void;
  taskCounts: TaskCounts;
  tasks: Task[];
}
