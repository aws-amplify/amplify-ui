import { SelectionType } from '../../../actions/configs';

export type FilesActionType =
  | { type: 'ADD_FILE_ITEMS'; files?: File[] }
  | { type: 'REMOVE_FILE_ITEM'; id: string }
  | { type: 'SELECT_FILES'; selectionType?: SelectionType }
  | { type: 'RESET_FILE_ITEMS' };

export type HandleFilesAction = (input: FilesActionType) => void;

export interface FileItem {
  id: string;
  key: string;
  item: File;
}

export type FileItems = FileItem[];

export type FilesContextType = [FileItems | undefined, HandleFilesAction];

export interface FilesProviderProps {
  children?: React.ReactNode;
}
