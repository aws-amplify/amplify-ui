import { FileUploaderDisplayText } from '../displayText';
import { DragActionHandlers } from '../hooks/useFileUploader/types';

export interface UploadDropZoneProps
  extends DragActionHandlers,
    Pick<FileUploaderDisplayText, 'dropFilesText'> {
  children?: React.ReactNode;
  inDropZone?: boolean;
}
