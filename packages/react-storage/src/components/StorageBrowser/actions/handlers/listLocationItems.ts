import {
  ListHandler,
  ListHandlerInput,
  ListHandlerOptions,
  ListHandlerOutput,
} from '../types';

export interface FolderData {
  key: string;
  id: string;
  type: 'FOLDER';
}

export interface FileData {
  key: string;
  lastModified: Date;
  id: string;
  size: number;
  type: 'FILE';
}

export type LocationItemData = FileData | FolderData;

export type LocationItemType = LocationItemData['type'];

export interface ListLocationItemsHandlerOptions
  extends ListHandlerOptions<LocationItemType> {
  delimiter?: string;
  query?: string;
}

export interface ListLocationItemsHandlerInput
  extends ListHandlerInput<ListLocationItemsHandlerOptions> {}

export interface ListLocationItemsHandlerOutput
  extends ListHandlerOutput<LocationItemData> {}

export interface ListLocationItemsHandler
  extends ListHandler<
    ListLocationItemsHandlerInput,
    ListLocationItemsHandlerOutput
  > {}

export const listLocationItemsHandler: ListLocationItemsHandler =
  null as unknown as ListLocationItemsHandler;
