import { Task } from '../../tasks';

export interface UseActionView {
  isProcessing: boolean;
  onCancel: () => void;
  onStart: () => void;
  // statuses: Status[];
  tasks: Task[];
  onClose: () => void;
}
