import {
  list,
  ListAllWithPathInput,
  ListPaginateWithPathInput,
  ListPaginateWithPathOutput,
} from 'aws-amplify/storage';

import { LocationItem } from './types';

type ListInput = NonNullable<ListPaginateWithPathInput | ListAllWithPathInput>;
type _ListOptions = NonNullable<ListInput['options']>;

type LocationCredentialsProvider = NonNullable<
  _ListOptions['locationCredentialsProvider']
>;
type ListOutputItem = ListPaginateWithPathOutput['items'][number];

type SubpathStrategy = NonNullable<_ListOptions['subpathStrategy']>;

interface LocationConfig {
  bucket: string;
  credentialsProvider: LocationCredentialsProvider;
  region: string;
}

type Options = { delimiter?: string; pageSize?: number } & (
  | { nextToken?: string; refresh?: never }
  | { nextToken?: never; refresh?: boolean }
);

export interface ListLocationItemsActionInput {
  prefix: string;
  config: LocationConfig;
  options?: Options;
}

export interface ListLocationItemsActionOutput {
  items: LocationItem[];
  nextToken: string | undefined;
}

const parseResultItems = (items: ListOutputItem[]): LocationItem[] =>
  items.map(({ path: key, lastModified, size }) =>
    lastModified
      ? // `size` is marked as potentially `undefined` in `ListOutputItem`
        // but is populated when the item is a file
        { key, lastModified, size: size!, type: 'FILE' }
      : { key, type: 'FOLDER' }
  );

export async function listLocationItemsAction(
  prevState: ListLocationItemsActionOutput,
  input: ListLocationItemsActionInput
): Promise<ListLocationItemsActionOutput> {
  const { config, options, prefix: path } = input ?? {};
  const { bucket, credentialsProvider, region } = config;
  const { delimiter, nextToken: _nextToken, pageSize, refresh } = options ?? {};

  const subpathStrategy: SubpathStrategy = {
    delimiter,
    strategy: delimiter ? 'exclude' : 'include',
  };

  const listInput: ListPaginateWithPathInput = {
    path,
    options: {
      bucket: { bucketName: bucket, region },
      locationCredentialsProvider: credentialsProvider,
      nextToken: refresh ? undefined : _nextToken,
      pageSize,
      subpathStrategy,
    },
  };

  const { items, nextToken } = await list(listInput);

  return {
    items: [...(refresh ? [] : prevState.items), ...parseResultItems(items)],
    nextToken,
  };
}
