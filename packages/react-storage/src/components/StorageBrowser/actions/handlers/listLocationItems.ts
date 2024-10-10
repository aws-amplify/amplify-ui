import {
  ListHandler,
  ListHandlerInput,
  ListHandlerOptions,
  ListHandlerOutput,
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

export interface ListLocationItemsHandlerOptions
  extends ListHandlerOptions<LocationItemType> {
  delimiter?: string;
  query?: string;
}

export interface ListLocationItemsHandlerInput
  extends ListHandlerInput<ListLocationItemsHandlerOptions> {}

export interface ListLocationItemsHandlerOutput
  extends ListHandlerOutput<LocationItem> {}

export interface ListLocationItemsHandler
  extends ListHandler<
    ListLocationItemsHandlerInput,
    ListLocationItemsHandlerOutput
  > {}

export const listLocationItemsHandler: ListLocationItemsHandler =
  null as unknown as ListLocationItemsHandler;
