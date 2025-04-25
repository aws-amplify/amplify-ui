import type {
  StorageSubpathStrategy,
  ListPaginateInput,
  ListOutput,
} from '../../storage-internal';
import { list } from '../../storage-internal';
import type {
  ListHandler,
  ListHandlerInput,
  ListHandlerOptions,
  ListHandlerOutput,
  LocationItemData,
} from './types';

const DEFAULT_PAGE_SIZE = 1000;

type ListOutputItem = ListOutput['items'][number];

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
    .map(({ path: key, lastModified, size, eTag }) => {
      const id = crypto.randomUUID();
      // Mark zero byte files as Folders
      if (size === 0 && key.endsWith('/')) {
        return { key, id, type: 'FOLDER' };
      }

      return {
        key,
        id,
        eTag,
        lastModified: lastModified!,
        size: size!,
        type: 'FILE',
      };
    });

const parseExcludedPaths = (paths: string[] | undefined): LocationItemData[] =>
  paths?.map((key) => ({ key, id: crypto.randomUUID(), type: 'FOLDER' })) ?? [];

export const filterDotItems = (
  items: LocationItemData[],
  prefix: string
): LocationItemData[] =>
  items.filter((item) => {
    const key = (
      item.key.startsWith(prefix) ? item.key.substring(prefix.length) : item.key
    ).trim();
    // matches object keys that would cause problems either as folder names in navigation (`/`, `./`, `../`) or as objects (`.`, `..`)
    return !(
      key === '/' ||
      key === './' ||
      key === '../' ||
      key === '.' ||
      key === '..'
    );
  });

export const parseResult = (
  { excludedSubpaths, items }: ListOutput,
  prefix: string
): LocationItemData[] =>
  filterDotItems(
    [...parseExcludedPaths(excludedSubpaths), ...parseItems(items, prefix)],
    prefix
  );

export const listLocationItemsHandler: ListLocationItemsHandler = async (
  input
) => {
  const { config, prefix, options } = input;
  const {
    bucket: _bucket,
    credentials,
    customEndpoint,
    region,
    accountId,
  } = config;

  const {
    exclude,
    delimiter,
    nextToken: _nextToken,
    pageSize: _pageSize = DEFAULT_PAGE_SIZE,
    ..._options
  } = options ?? {};

  const bucket = { bucketName: _bucket, region };
  const subpathStrategy: StorageSubpathStrategy = {
    delimiter,
    strategy: delimiter ? 'exclude' : 'include',
  };

  // `ListObjectsV2` returns the root `key` on initial request which, when from
  // filtered from `results` by `parseResult`, creates a scenario where the
  // return count of `results` is one item less than the provided `pageSize`.
  // To mitigate, if a `pageSize` is provided and there are no previous `results`
  // or `refresh` is `true` increment the provided `pageSize` by `1`
  const hasOffset = !_nextToken;
  const pageSize = hasOffset ? _pageSize + 1 : _pageSize;

  const items = [];
  let nextToken = _nextToken;

  // const startAfter = `${prefix}7BD2A859-1DD8-B71B-0B08A3C94545130F copy 11.jpg`;
  // // eslint-disable-next-line no-console
  // console.log('startAfter', startAfter);

  do {
    const listInput: ListPaginateInput = {
      path: prefix,
      options: {
        nextToken: nextToken,
        ..._options,
        bucket,
        customEndpoint,
        expectedBucketOwner: accountId,
        locationCredentialsProvider: credentials,
        pageSize,
        // startAfter,
        subpathStrategy,
      },
    };

    const output = await list(listInput);
    // eslint-disable-next-line prefer-destructuring
    nextToken = output.nextToken;

    const parsedItems = parseResult(output, prefix);

    items.push(
      ...(exclude
        ? parsedItems.filter(({ type }) => type !== exclude)
        : parsedItems)
    );
  } while (nextToken && items.length < pageSize);

  return { items, nextToken };
};
