import type {
  CopyHandlerData,
  DeleteHandlerData,
  DownloadHandlerData,
  TaskData,
  UploadHandlerData,
} from '../../../actions';
import type { OptionalFileData } from '../../../actions/handlers';
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

export interface DownloadTableResolverProps
  extends ActionTableResolverProps<
    DownloadViewDisplayText,
    DownloadActionTask
  > {}

export interface UploadTableResolverProps
  extends ActionTableResolverProps<UploadViewDisplayText, UploadActionTask> {
  isMultipartUpload: (file: File) => boolean;
}

export type ActionTableKey =
  | 'name'
  | 'folder'
  | 'type'
  | 'size'
  | 'status'
  | 'cancel';

export type CopyTableKey = ActionTableKey;
export type DeleteTableKey = ActionTableKey;
export type DownloadTableKey = ActionTableKey;
export type UploadTableKey = ActionTableKey | 'progress';

export interface ActionTaskTableResolvers
  extends DataTableResolvers<
    ActionTableKey,
    FileTaskTableResolverProps,
    ActionTask
  > {}

export type FileTaskTableResolverProps =
  | CopyTableResolverProps
  | DeleteTableResolverProps
  | DownloadTableResolverProps;
export interface CopyTaskTableResolvers
  extends DataTableResolvers<
    CopyTableKey,
    CopyTableResolverProps,
    CopyActionTask
  > {}

export interface DeleteTableResolvers
  extends DataTableResolvers<
    DeleteTableKey,
    DeleteTableResolverProps,
    DeleteActionTask
  > {}

export interface DownloadTableResolvers
  extends DataTableResolvers<
    DownloadTableKey,
    DownloadTableResolverProps,
    DownloadActionTask
  > {}

export interface UploadTableResolvers
  extends DataTableResolvers<
    UploadTableKey,
    UploadTableResolverProps,
    UploadActionTask
  > {}

export type GetCopyCell = CopyTaskTableResolvers['getCell'];
export type GetDeleteCell = DeleteTableResolvers['getCell'];
export type GetDownloadCell = DownloadTableResolvers['getCell'];
export type GetUploadCell = UploadTableResolvers['getCell'];

export type GetActionCell<
  T extends { getCell: unknown } = ActionTaskTableResolvers,
> = T['getCell'];
