import {
  list,
  ListAllWithPathInput,
  ListPaginateWithPathInput,
  ListPaginateWithPathOutput,
} from 'aws-amplify/storage';

import { LocationItem } from './types';

type ListOutputItem = ListPaginateWithPathOutput['items'][number];
type SubpathStrategy = NonNullable<
  NonNullable<
    (ListPaginateWithPathInput | ListAllWithPathInput)['options']
  >['subpathStrategy']
>;

interface ListLocationItemsActionInput {
  prefix: string;
  options?: { delimiter?: string; pageSize?: number } & (
    | { nextToken?: string; refresh?: never }
    | { nextToken?: never; refresh?: boolean }
  );
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

export default async function listLocationItemsAction(
  prevState: ListLocationItemsActionOutput,
  input: ListLocationItemsActionInput
): Promise<ListLocationItemsActionOutput> {
  const { options = {}, prefix: path } = input ?? {};
  const { delimiter, nextToken: _nextToken, pageSize, refresh } = options;

  const subpathStrategy: SubpathStrategy = {
    delimiter,
    strategy: delimiter ? 'exclude' : 'include',
  };
  const listInput: ListPaginateWithPathInput = {
    path,
    options: {
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
