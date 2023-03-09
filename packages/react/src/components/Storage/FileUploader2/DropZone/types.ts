import { FileUploaderDisplayText } from '../displayText';
import { DragActionHandlers } from '../hooks/useFileUploader/types';

export interface DropZoneProps
  extends DragActionHandlers,
    Pick<FileUploaderDisplayText, 'dropFilesText'> {
  children?: React.ReactNode;
  inDropZone?: boolean;
}
