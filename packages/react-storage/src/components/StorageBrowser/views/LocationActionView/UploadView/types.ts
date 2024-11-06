import { UploadHandlerData } from '../../../actions';
import { FileItem } from '../../../providers';
import {
  ActionViewComponent,
  ActionViewProps,
  ActionViewState,
} from '../types';

export interface UploadViewState extends ActionViewState<FileItem> {
  isProcessing: boolean;
  isProcessingComplete: boolean;
  isOverwriteEnabled: boolean;
  onDropFiles: (files?: File[]) => void;
  onSelectFiles: (type?: 'FILE' | 'FOLDER') => void;
  onToggleOverwrite: () => void;
}

export interface UploadViewProps
  extends ActionViewProps,
    Partial<UploadViewState> {}

export interface UploadViewComponent
  extends ActionViewComponent<UploadHandlerData, UploadViewProps> {}
