import { DragActionHandlers } from '../hooks/useFileUploader/types';

export interface UploadDropZoneProps extends DragActionHandlers {
  children?: React.ReactNode;
  inDropZone?: boolean;
}
