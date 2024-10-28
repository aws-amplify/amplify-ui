import { TableData, TaskCounts } from '../../../controls/types';

export interface UseActionView {
  disableCancel: boolean;
  disableClose: boolean;
  disablePrimary: boolean;
  onCancel: () => void;
  onClose: () => void;
  onStart: () => void;
  taskCounts: TaskCounts;
  tableData: TableData;
}
