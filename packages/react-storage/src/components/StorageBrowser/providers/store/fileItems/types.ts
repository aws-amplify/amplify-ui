import { LocationItemType, TaskData } from '../../../actions';

/**
 * native OS file picker type. to restrict selectable file types, define the picker types
 * followed by accepted file types as strings
 * @example
 * ```ts
 * // selecy folder and restrict to jpeg files
 * type JPEGOnly = ['FOLDER', '.jpeg'];
 * ```
 */
export type SelectionType = LocationItemType | [LocationItemType, ...string[]];

export type FilesActionType =
  | { type: 'ADD_FILE_ITEMS'; files?: File[]; invalidFiles?: File[] }
  | { type: 'REMOVE_FILE_ITEM'; id: string }
  | { type: 'SELECT_FILES'; selectionType?: SelectionType }
  | { type: 'RESET_FILE_ITEMS' };

export type HandleFilesAction = (input: FilesActionType) => void;

export interface FileItem extends TaskData {
  file: File;
}

export type FileItems = FileItem[];

export interface FileItemsState {
  items: FileItems | undefined;
  invalidFiles: File[] | undefined;
}

export type FilesContextType = [FileItemsState, HandleFilesAction];

export interface FilesProviderProps {
  acceptedFileTypes?: string[];
  children?: React.ReactNode;
}
