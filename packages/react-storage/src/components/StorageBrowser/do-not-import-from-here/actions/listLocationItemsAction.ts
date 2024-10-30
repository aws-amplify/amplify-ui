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
  SearchOptions,
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

interface ListWithSearchInput {
  listInputOptions: ListActionOptions;
  searchOptions: SearchOptions;
  prevState: ListLocationItemsActionOutput;
  path: string;
}

function filter<K>(state: K[], query: string, searchKey: keyof K) {
  return state.filter((item) => {
    const test = item[searchKey];
    if (typeof test === 'string') {
      return test.includes(query);
    }
  });
}

const MAX_ITEMS = 10000;

async function listWithSearch({
  listInputOptions,
  searchOptions,
  prevState,
  path,
}: ListWithSearchInput): Promise<ListLocationItemsActionOutput> {
  const { query, includeSubfolders } = searchOptions;

  if (!includeSubfolders) {
    // TODO: we lose state for the current page after filtering
    const result = filter<LocationItem>(prevState.result, query, 'key');
    return { result, nextToken: undefined };
  } else {
    const result: LocationItem[] = [];
    let nextNextToken = listInputOptions?.nextToken;

    do {
      const output = await list({
        path,
        options: {
          ...listInputOptions,
          subpathStrategy: {
            strategy: 'include',
          },
          nextToken: nextNextToken,
        },
      });
      const parsedOutput = parseResult(output, path);
      result.push(...parsedOutput);
      nextNextToken = output.nextToken;
    } while (nextNextToken && result.length < MAX_ITEMS);

    const filteredResult = filter<LocationItem>(result, query, 'key');
    return { result: filteredResult, nextToken: undefined };
  }
}

export async function listLocationItemsAction(
  prevState: ListLocationItemsActionOutput,
  input: ListLocationItemsActionInput
): Promise<ListLocationItemsActionOutput> {
  const { config, options, prefix: path } = input ?? {};
  const { delimiter, nextToken, pageSize, refresh, reset, searching } =
    options ?? {};

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

  if (searching) {
    return await listWithSearch({
      listInputOptions: { ...listInput, pageSize: 1000 },
      searchOptions: searching,
      prevState,
      path,
    });
  }

  const output = await list(listInput);

  const result = [
    ...(refresh ? [] : prevState.result),
    ...parseResult(output, path),
  ];

  return { result, nextToken: output.nextToken };
}
