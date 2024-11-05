import { SelectionType, TaskData } from '../../../actions';

export type FilesActionType =
  | { type: 'ADD_FILE_ITEMS'; files?: File[] }
  | { type: 'REMOVE_FILE_ITEM'; id: string }
  | { type: 'SELECT_FILES'; selectionType?: SelectionType }
  | { type: 'RESET_FILE_ITEMS' };

export type HandleFilesAction = (input: FilesActionType) => void;

export interface FileItem extends TaskData {
  file: File;
}

export type FileItems = FileItem[];

export type FilesContextType = [FileItems | undefined, HandleFilesAction];

export interface FilesProviderProps {
  children?: React.ReactNode;
}
