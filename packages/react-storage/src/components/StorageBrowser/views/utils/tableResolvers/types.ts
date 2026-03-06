import type {
  CopyHandlerData,
  DeleteHandlerData,
  DownloadHandlerData,
  OptionalFileData,
  TaskData,
  UploadHandlerData,
} from '../../../actions';
import type {
  CopyViewDisplayText,
  DeleteViewDisplayText,
  DownloadViewDisplayText,
  UploadViewDisplayText,
} from '../../../displayText';
import type { Task } from '../../../tasks';
import type { DataTableResolvers } from '../../hooks/useResolveTableData';

export interface CopyActionTask extends Task<CopyHandlerData> {}
export interface DeleteActionTask extends Task<DeleteHandlerData> {}
export interface DownloadActionTask extends Task<DownloadHandlerData> {}
export interface UploadActionTask extends Task<UploadHandlerData> {}
export interface FileDataTask
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

export interface DownloadTableResolverProps
  extends ActionTableResolverProps<
    DownloadViewDisplayText,
    DownloadActionTask
  > {}

export interface UploadTableResolverProps
  extends ActionTableResolverProps<UploadViewDisplayText, UploadActionTask> {
  isMultipartUpload: (file: File) => boolean;
}

export type FileDataTaskTableResolverProps =
  | CopyTableResolverProps
  | DeleteTableResolverProps;

export type ActionTableKey =
  | 'name'
  | 'folder'
  | 'type'
  | 'size'
  | 'status'
  | 'cancel';

export type DeleteTableKey = ActionTableKey | 'progress';

export type UploadTableKey = ActionTableKey | 'progress';
export type DownloadTableKey = ActionTableKey | 'progress';

export interface FileDataTaskTableResolvers
  extends DataTableResolvers<
    ActionTableKey,
    FileDataTaskTableResolverProps,
    FileDataTask
  > {}

export interface DeleteTableResolvers
  extends DataTableResolvers<
    DeleteTableKey,
    DeleteTableResolverProps,
    DeleteActionTask
  > {}

export interface UploadTableResolvers
  extends DataTableResolvers<
    UploadTableKey,
    UploadTableResolverProps,
    UploadActionTask
  > {}

export interface DownloadTableResolvers
  extends DataTableResolvers<
    DownloadTableKey,
    DownloadTableResolverProps,
    DownloadActionTask
  > {}

export type GetFileDataCell = FileDataTaskTableResolvers['getCell'];

export type GetDeleteCell = DeleteTableResolvers['getCell'];

export type GetDownloadCell = DownloadTableResolvers['getCell'];

export type GetUploadCell = UploadTableResolvers['getCell'];
