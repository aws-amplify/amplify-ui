import { LocationData, UploadHandlerData } from '../../../actions';
import { FileItem } from '../../../providers';
import {
  ActionViewComponent,
  ActionViewProps,
  ActionViewState,
} from '../types';

export interface UploadViewMessage {
  id: string;
  content: string;
}

export interface UploadViewState extends ActionViewState<FileItem> {
  isOverwritingEnabled: boolean;
  onDropFiles: (files: File[]) => void;
  onSelectFiles: (type: 'FILE' | 'FOLDER') => void;
  onToggleOverwrite: () => void;
  invalidFilesMessage: UploadViewMessage | undefined;
  onInvalidFilesMessageDismiss: (() => void) | undefined;
}

export interface UploadViewProps
  extends ActionViewProps,
    Partial<UploadViewState> {}

export interface UploadViewComponent
  extends ActionViewComponent<UploadHandlerData, UploadViewProps> {}

export interface UseUploadViewOptions {
  onExit?: (location?: LocationData) => void;
}
