import type { FileItem, LocationItemType } from '../actions';

/**
 * native OS file picker type. to restrict selectable file types, define the picker types
 * followed by accepted file types as strings
 * @example
 * ```ts
 * type JPEGOnly = ['FOLDER', '.jpeg'];
 * ```
 */
export type SelectionType = LocationItemType | [LocationItemType, ...string[]];

export type FilesActionType =
  | { type: 'ADD_FILES'; files?: File[] }
  | { type: 'ADD_FILE_ITEMS'; validFiles?: File[]; invalidFiles?: File[] }
  | { type: 'REMOVE_FILE_ITEM'; id: string }
  | { type: 'SELECT_FILES'; selectionType?: SelectionType }
  | { type: 'RESET_FILE_ITEMS' };

export type FilesActionDispatchType = Exclude<
  FilesActionType,
  { type: 'ADD_FILE_ITEMS' }
>;

export type HandleFilesAction = (input: FilesActionDispatchType) => void;

export interface ResolvedFiles {
  validFiles: File[] | undefined;
  invalidFiles: File[] | undefined;
}

export type FileItems = FileItem[];

export interface FileItemsState {
  validItems: FileItems | undefined;
  invalidItems: FileItems | undefined;
}

export type FilesContextType = [FileItemsState, HandleFilesAction];

export interface FilesProviderProps {
  children?: React.ReactNode;
}
