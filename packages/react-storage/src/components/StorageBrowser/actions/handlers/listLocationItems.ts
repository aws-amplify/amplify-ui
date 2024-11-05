import {
  list,
  StorageSubpathStrategy,
  ListPaginateInput,
  ListOutput,
} from '../../storage-internal';
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

type ListOutputItem = ListOutput['items'][number];

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

const parseItems = (
  items: ListOutputItem[],
  excludedPath: string
): LocationItemData[] =>
  items
    // remove root `key` from results
    .filter(({ path }) => path !== excludedPath)
    .map(({ path: key, lastModified, size }) => {
      const id = crypto.randomUUID();
      // Mark zero byte files as Folders
      if (size === 0 && key.endsWith('/')) {
        return { key, id, type: 'FOLDER' };
      }

      return {
        key,
        id,
        lastModified: lastModified!,
        size: size!,
        type: 'FILE',
      };
    });

const parseExcludedPaths = (paths: string[] | undefined): LocationItemData[] =>
  paths?.map((key) => ({ key, id: crypto.randomUUID(), type: 'FOLDER' })) ?? [];

export const parseResult = (
  { excludedSubpaths, items }: ListOutput,
  prefix: string
): LocationItemData[] => [
  ...parseExcludedPaths(excludedSubpaths),
  ...parseItems(items, prefix),
];

export const listLocationItemsHandler: ListLocationItemsHandler = async (
  input
) => {
  const { config, prefix, options } = input;
  const { bucket: _bucket, credentials, customEndpoint, region } = config;

  const {
    delimiter,
    nextToken,
    pageSize: _pageSize = DEFAULT_PAGE_SIZE,
    ..._options
  } = options ?? {};

  const excludedType = 'FILE';

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

  const result: LocationItemData[] = [];
  let nextNextToken = nextToken;

  do {
    const listInput: ListPaginateInput = {
      path: prefix,
      options: {
        nextToken: nextNextToken,
        ..._options,
        bucket,
        customEndpoint,
        locationCredentialsProvider: credentials,
        pageSize,
        subpathStrategy,
      },
    };

    const output = await list(listInput);
    nextNextToken = output.nextToken;

    const items = parseResult(output, prefix);

    result.push(
      ...(excludedType
        ? items.filter((item) => item.type !== excludedType)
        : items)
    );
  } while (nextNextToken && result.length < pageSize);

  return { items: result, nextToken: nextNextToken };
};
