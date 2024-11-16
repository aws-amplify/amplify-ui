import { SelectionType, TaskData } from '../../../actions';

export type FilesActionType =
  | { type: 'ADD_FILE_ITEMS'; files?: File[] }
  | { type: 'REMOVE_FILE_ITEM'; id: string }
  | { type: 'SELECT_FILES'; selectionType?: SelectionType }
  | { type: 'RESET_FILE_ITEMS' }
  | { type: 'RESET_INVALID_FILE_ITEMS' };

export type HandleFilesAction = (input: FilesActionType) => void;

export interface FileItem extends TaskData {
  file: File;
}

export type FileItems = FileItem[];

export interface FileItemsState {
  validFiles: FileItems;
  invalidFiles: FileItems;
}

export type FilesContextType = [FileItemsState | undefined, HandleFilesAction];

export interface FilesProviderProps {
  children?: React.ReactNode;
}
