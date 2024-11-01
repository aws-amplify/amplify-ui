import {
  ListHandler,
  ListHandlerInput,
  ListHandlerOptions,
  ListHandlerOutput,
} from '../types';
import {
  list,
  ListPaginateInput,
  StorageSubpathStrategy,
} from '../../storage-internal';
import { parseResult } from '../../do-not-import-from-here/actions/listLocationItemsAction';

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
  async function listLocationItemsAction(
    input: ListLocationItemsHandlerInput
  ): Promise<ListLocationItemsHandlerOutput> {
    const { config, options, prefix: path } = input ?? {};
    const { delimiter, nextToken, pageSize } = options ?? {};

    const { accountId, bucket: bucketName, region } = config ?? {};

    const bucket = { bucketName, region };
    const subpathStrategy: StorageSubpathStrategy = {
      delimiter,
      strategy: delimiter ? 'exclude' : 'include',
    };

    const listInput: ListPaginateInput = {
      path,
      options: {
        bucket,
        expectedBucketOwner: accountId,
        nextToken,
        pageSize,
        subpathStrategy,
      },
    };

    const output = await list(listInput);

    return { items: parseResult(output, path), nextToken: output.nextToken };
  };
