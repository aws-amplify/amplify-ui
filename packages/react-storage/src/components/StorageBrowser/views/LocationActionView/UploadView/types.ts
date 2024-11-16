import { LocationData, UploadHandlerData } from '../../../actions';
import { FileItem, FileItems } from '../../../providers';
import {
  ActionViewComponent,
  ActionViewProps,
  ActionViewState,
} from '../types';

export type InvalidFileReason = 'FILE_TOO_BIG';

export interface UploadViewState extends ActionViewState<FileItem> {
  isOverwritingEnabled: boolean;
  onDropFiles: (files: File[]) => void;
  onSelectFiles: (type: 'FILE' | 'FOLDER') => void;
  onToggleOverwrite: () => void;
  invalidFiles: FileItems | undefined;
}

export interface UploadViewProps
  extends ActionViewProps,
    Partial<UploadViewState> {}

export interface UploadViewComponent
  extends ActionViewComponent<UploadHandlerData, UploadViewProps> {}

export interface UseUploadViewOptions {
  onExit?: (location?: LocationData) => void;
}
