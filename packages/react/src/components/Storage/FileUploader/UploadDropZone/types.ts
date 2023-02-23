import { FileUploaderDisplayText } from '../displayText';
import { DragActionHandlers } from '../hooks/useFileUploader/types';

export interface UploadDropZoneProps extends DragActionHandlers {
  children?: React.ReactNode;
  inDropZone?: boolean;
  displayText: Pick<FileUploaderDisplayText, 'dropFiles'>;
}
