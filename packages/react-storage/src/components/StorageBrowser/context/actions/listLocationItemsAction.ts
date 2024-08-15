import {
  list,
  ListPaginateWithPathInput,
  ListPaginateWithPathOutput,
} from 'aws-amplify/storage';

import { StorageSubpathStrategy } from '@aws-amplify/storage/storage-browser';

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

type ListOutputItem = ListPaginateWithPathOutput['items'][number];

const parseResultItems = (
  items: ListOutputItem[],
  path: string
): LocationItem[] =>
  items.map(({ path: key, lastModified, size }) => {
    const keyWithoutPath = key.slice(path.length);
    if (size === 0 && key.endsWith('/')) {
      return { key: keyWithoutPath, type: 'FOLDER' };
    }

    return {
      key: keyWithoutPath,
      lastModified: lastModified!,
      size: size!,
      type: 'FILE',
    };
  });

const parseResultExcludedPaths = (
  paths: string[] | undefined,
  path: string
): LocationItem[] => {
  if (!paths) {
    return [];
  }

  return paths.map((key) => {
    return { key: key.slice(path.length), type: 'FOLDER' };
  });
};

const sortLocationItemsAlphabetically = (
  locationA: LocationItem,
  locationB: LocationItem
) => {
  if (locationA.key > locationB.key) {
    return -1;
  } else if (locationA.key < locationB.key) {
    return 1;
  } else {
    return 0;
  }
};

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
    bucket: bucketName,
    credentialsProvider,
    region,
  } = (typeof config === 'function' ? config() : config) ?? {};

  const bucket = { bucketName, region };
  const subpathStrategy: StorageSubpathStrategy = {
    delimiter,
    strategy: delimiter ? 'exclude' : 'include',
  };

  const listInput: ListPaginateWithPathInput = {
    path,
    options: {
      bucket,
      locationCredentialsProvider: credentialsProvider,
      nextToken: refresh ? undefined : nextToken,
      pageSize,
      subpathStrategy,
    },
  };

  const output = await list(listInput);

  const result = [
    ...(refresh ? [] : prevState.result),
    ...parseResultItems(output.items, path),
    ...parseResultExcludedPaths(output.excludedSubpaths, path),
  ].sort(sortLocationItemsAlphabetically);

  return { result, nextToken: output.nextToken };
}
