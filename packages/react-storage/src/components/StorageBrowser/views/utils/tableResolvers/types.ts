import type {
  CopyHandlerData,
  DeleteHandlerData,
  UploadHandlerData,
  TaskData,
} from '../../../actions';
import type { OptionalFileData } from '../../../actions/handlers';
import type {
  CopyViewDisplayText,
  DeleteViewDisplayText,
  UploadViewDisplayText,
} from '../../../displayText';
import type { Task } from '../../../tasks';
import type { DataTableResolvers } from '../../hooks/useResolveTableData';

export interface CopyActionTask extends Task<CopyHandlerData> {}
export interface DeleteActionTask extends Task<DeleteHandlerData> {}
export interface UploadActionTask extends Task<UploadHandlerData> {}
export interface ActionTask
  extends Task<TaskData & OptionalFileData & { fileKey: string }> {}

interface ActionTableResolverProps<TDisplayText, TTask> {
  displayText: TDisplayText;
  isProcessing: boolean;
  onTaskRemove?: (task: TTask) => void;
}

export interface CopyTableResolverProps
  extends ActionTableResolverProps<CopyViewDisplayText, CopyActionTask> {}

export interface DeleteTableResolverProps
  extends ActionTableResolverProps<DeleteViewDisplayText, DeleteActionTask> {}

export interface UploadTableResolverProps
  extends ActionTableResolverProps<UploadViewDisplayText, UploadActionTask> {
  isMultipartUpload: (file: File) => boolean;
}

export type FileActionTableResolverProps =
  | CopyTableResolverProps
  | DeleteTableResolverProps;

export type ActionTableKey =
  | 'name'
  | 'folder'
  | 'type'
  | 'size'
  | 'status'
  | 'cancel';

export type UploadTableKey = ActionTableKey | 'progress';

export interface ActionTaskTableResolvers
  extends DataTableResolvers<
    ActionTableKey,
    FileActionTableResolverProps,
    ActionTask
  > {}

export interface UploadTableResolvers
  extends DataTableResolvers<
    UploadTableKey,
    UploadTableResolverProps,
    UploadActionTask
  > {}

export type GetActionCell = ActionTaskTableResolvers['getCell'];

export type GetUploadCell = UploadTableResolvers['getCell'];
