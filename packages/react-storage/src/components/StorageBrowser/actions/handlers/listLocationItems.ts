import {
  list,
  ListPaginateWithPathInput,
  ListPaginateWithPathOutput,
} from 'aws-amplify/storage';

import { StorageSubpathStrategy } from '../../storage-internal';
import {
  ListHandler,
  ListHandlerInput,
  ListHandlerOptions,
  ListHandlerOutput,
} from '../types';

const DEFAULT_PAGE_SIZE = 1000;

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

type ListOutputItem = ListPaginateWithPathOutput['items'][number];

export type LocationItemData = FileData | FolderData;

export type LocationItemDataType = LocationItemData['type'];

export interface ListLocationItemsHandlerOptions
  extends ListHandlerOptions<LocationItemDataType> {
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

const parseResultItems = (
  items: ListOutputItem[],
  prefix: string
): LocationItemData[] =>
  items.map(({ path, lastModified, size }) => {
    const key = path.slice(prefix.length);
    // Mark zero byte files as Folders
    if (size === 0 && key.endsWith('/')) {
      return { key, type: 'FOLDER' };
    }

    return {
      key,
      lastModified: lastModified!,
      size: size!,
      type: 'FILE',
    };
  });

const parseResultExcludedPaths = (
  paths: string[] | undefined,
  path: string
): LocationItemData[] =>
  paths?.map((key) => ({ key: key.slice(path.length), type: 'FOLDER' })) ?? [];

export const parseResult = (
  { excludedSubpaths, items }: ListPaginateWithPathOutput,
  prefix: string
): LocationItemData[] => [
  ...parseResultExcludedPaths(excludedSubpaths, prefix),
  ...parseResultItems(items, prefix),
];

export const listLocationItemsHandler: ListLocationItemsHandler = async (
  input
) => {
  const { config, prefix, options } = input;
  const { bucket: _bucket, credentials, region } = config;

  const {
    delimiter,
    nextToken,
    pageSize: _pageSize = DEFAULT_PAGE_SIZE,
    ..._options
  } = options ?? {};

  const bucket = { bucketName: _bucket, region };
  const subpathStrategy: StorageSubpathStrategy = {
    delimiter,
    strategy: delimiter ? 'exclude' : 'include',
  };

  // `ListObjectsV2` returns the root `key` on initial request, which is from
  // filtered from `results` by `parseResult`, creatimg a scenario where the
  // return count of `results` to be one item less than provided the `pageSize`.
  // To mitigate, if a `pageSize` is provided and there are no previous `results`
  // or `refresh` is `true` increment the provided `pageSize` by `1`
  const hasOffset = !nextToken;
  const pageSize = hasOffset ? _pageSize + 1 : _pageSize;

  const listInput: ListPaginateWithPathInput = {
    path: prefix,
    options: {
      ..._options,
      bucket,
      locationCredentialsProvider: credentials,
      pageSize,
      subpathStrategy,
    },
  };

  const output = await list(listInput);

  const items = hasOffset
    ? parseResult(output, prefix).filter(({ key }) => key !== prefix)
    : parseResult(output, prefix);

  return { items, nextToken: output.nextToken };
};
