import { LocationData, UploadHandlerData } from '../../../actions';
import { FileItem, FileItems } from '../../../providers';
import { ActionViewType, ActionViewProps, ActionViewState } from '../types';

export interface UploadViewState extends ActionViewState<FileItem> {
  isOverwritingEnabled: boolean;
  invalidFiles: FileItems | undefined;
  onDropFiles: (files: File[]) => void;
  onSelectFiles: (type: 'FILE' | 'FOLDER') => void;
  onToggleOverwrite: () => void;
  onDismissFilesValidationMessage: () => void;
}

export interface UploadViewProps
  extends ActionViewProps,
    Partial<UploadViewState> {}

export interface UploadViewProviderProps extends UploadViewState {
  children?: React.ReactNode;
}

export interface UploadViewType
  extends ActionViewType<UploadHandlerData, UploadViewProps> {
  Provider: (props: UploadViewProviderProps) => React.JSX.Element;
  AddFiles: () => React.JSX.Element | null;
  AddFolder: () => React.JSX.Element | null;
  Cancel: () => React.JSX.Element | null;
  DropZone: (props: { children: React.ReactNode }) => React.JSX.Element | null;
  Destination: () => React.JSX.Element | null;
  Exit: () => React.JSX.Element | null;
  Message: () => React.JSX.Element | null;
  OverwriteToggle: () => React.JSX.Element | null;
  Start: () => React.JSX.Element | null;
  Statuses: () => React.JSX.Element | null;
  TasksTable: () => React.JSX.Element | null;
  Title: () => React.JSX.Element | null;
}

export interface UseUploadViewOptions {
  onExit?: (location?: LocationData) => void;
}
