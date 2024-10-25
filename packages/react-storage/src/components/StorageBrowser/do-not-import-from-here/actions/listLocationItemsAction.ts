import {
  StorageSubpathStrategy,
  list,
  ListPaginateInput,
  ListOutput,
} from '../../storage-internal';

import {
  ListActionInput,
  ListActionOptions,
  ListActionOutput,
  LocationItem,
} from '../types';

export interface ListLocationItemsActionInput
  extends ListActionInput<ListActionOptions> {}

export interface ListLocationItemsActionOutput
  extends ListActionOutput<LocationItem> {}

type ListOutputItem = ListOutput['items'][number];

const parseItems = (
  items: ListOutputItem[],
  excludedPath: string
): LocationItem[] =>
  items
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

const parseExcludedPaths = (paths: string[] | undefined): LocationItem[] =>
  paths?.map((key) => ({ key, id: crypto.randomUUID(), type: 'FOLDER' })) ?? [];

export const parseResult = (
  output: ListOutput,
  path: string
): LocationItem[] => [
  ...parseExcludedPaths(output.excludedSubpaths),
  ...parseItems(output.items, path),
];

export async function listLocationItemsAction(
  prevState: ListLocationItemsActionOutput,
  input: ListLocationItemsActionInput
): Promise<ListLocationItemsActionOutput> {
  const { config, options, prefix: path } = input ?? {};
  const { delimiter, nextToken, pageSize, refresh, reset } = options ?? {};

  if (reset) {
    return { result: [], nextToken: undefined };
  }

  const {
    accountId,
    bucket: bucketName,
    credentialsProvider,
    region,
  } = (typeof config === 'function' ? config() : config) ?? {};

  const bucket = { bucketName, region };
  const subpathStrategy: StorageSubpathStrategy = {
    delimiter,
    strategy: delimiter ? 'exclude' : 'include',
  };

  // `ListObjectsV2` returns the root `key` on initial request, which is from
  // filtered from `results` by `parseResult`, creatimg a scenario where the
  // return count of `results` to be one item less than provided the `pageSize`.
  // To mitigate, if a `pageSize` is provided and there are no previous `results`
  // or `refresh` is `true` increment the provided `pageSize` by `1`
  const hasPrevResults = !!prevState.result.length;
  const resolvedPageSize =
    pageSize && (!hasPrevResults || refresh) ? pageSize + 1 : pageSize;

  const listInput: ListPaginateInput = {
    path,
    options: {
      bucket,
      expectedBucketOwner: accountId,
      locationCredentialsProvider: credentialsProvider,
      // ignore provided `nextToken` on `refresh`
      nextToken: refresh ? undefined : nextToken,
      pageSize: resolvedPageSize,
      subpathStrategy,
    },
  };

  const output = await list(listInput);

  const result = [
    ...(refresh ? [] : prevState.result),
    ...parseResult(output, path),
  ];

  return { result, nextToken: output.nextToken };
}
