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
  | { type: 'ADD_FILE_ITEMS'; files?: File[] }
  | { type: 'REMOVE_FILE_ITEM'; id: string }
  | { type: 'SELECT_FILES'; selectionType?: SelectionType }
  | { type: 'RESET_FILE_ITEMS' };

export type HandleFilesAction = (input: FilesActionType) => void;

export type FileItems = FileItem[];

export type FilesContextType = [FileItems | undefined, HandleFilesAction];

export interface FilesProviderProps {
  children?: React.ReactNode;
}
