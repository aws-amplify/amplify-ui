import {
  ListAction,
  ListActionInput,
  ListActionOptions,
  ListActionOutput,
} from '../types';

/**
 * handler types
 */
export interface FolderItem {
  key: string;
  type: 'FOLDER';
}

export interface FileItem {
  key: string;
  data?: File;
  lastModified: Date;
  size: number;
  type: 'FILE';
}

export type LocationItem = FileItem | FolderItem;

export type LocationItemType = LocationItem['type'];

export interface ListLocationItemsOptions
  extends ListActionOptions<LocationItemType> {
  delimiter?: string;
  query?: string;
}

export interface ListLocationItemsActionInput
  extends ListActionInput<ListLocationItemsOptions> {}

export interface ListLocationItemsActionOutput
  extends ListActionOutput<LocationItem> {}

export interface ListLocationItemsAction
  extends ListAction<
    ListLocationItemsActionInput,
    ListLocationItemsActionOutput
  > {}

export const listLocationItemsAction: ListLocationItemsAction =
  null as unknown as ListLocationItemsAction;
