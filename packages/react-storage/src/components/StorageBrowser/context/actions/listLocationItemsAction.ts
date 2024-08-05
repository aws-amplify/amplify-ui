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

const parseResultItems = (items: ListOutputItem[]): LocationItem[] =>
  items.map(({ path: key, lastModified, size }) => {
    if (size === 0 && key.endsWith('/')) {
      return { key, type: 'FOLDER' };
    }

    return { key, lastModified: lastModified!, size: size!, type: 'FILE' };
  });

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

  const bucket = bucketName && region ? { bucketName, region } : undefined;
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
    ...parseResultItems(output.items),
  ];

  return { result, nextToken: output.nextToken };
}
