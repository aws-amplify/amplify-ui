import {
  ListLocations,
  ListLocationsOutput,
} from '@aws-amplify/storage/storage-browser';

import {
  ListActionInput,
  ListActionOptions,
  ListActionOutput,
  LocationAccess,
  Permission,
} from '../types';

const PAGE_SIZE = 1000;

export interface ListLocationsActionOptions<T>
  extends Omit<ListActionOptions<T>, 'delimiter'> {}

export interface ListLocationsActionInput<T = never>
  extends Omit<
    ListActionInput<ListLocationsActionOptions<T>>,
    'prefix' | 'config'
  > {}

export interface ListLocationsActionOutput<K = Permission>
  extends ListActionOutput<LocationAccess<K>> {}

export type ListLocationsAction<T = never> = (
  prevState: ListLocationsActionOutput,
  input: ListLocationsActionInput<T>
) => Promise<ListLocationsActionOutput<Exclude<Permission, T>>>;

const shouldExclude = <T extends Permission>(
  permission: T,
  exclude?: T | T[]
) =>
  !exclude
    ? false
    : typeof exclude === 'string'
    ? exclude === permission
    : exclude.includes(permission);

export const createListLocationsAction = (
  listLocations: ListLocations
): ListLocationsAction =>
  async function listLocationsAction(prevState, input) {
    const { options } = input ?? {};
    const {
      exclude,
      nextToken,
      pageSize = PAGE_SIZE,
      refresh,
      reset,
    } = options ?? {};

    if (reset) {
      return { result: [], nextToken: undefined };
    }

    let locationsResult: ListLocationsOutput['locations'] = [];
    let nextNextToken: ListLocationsOutput['nextToken'] = refresh
      ? undefined
      : nextToken;
    let remainingPageSize = pageSize;

    do {
      remainingPageSize = remainingPageSize - locationsResult.length;

      const output = await listLocations({
        nextToken: nextNextToken,
        pageSize: remainingPageSize,
      });
      nextNextToken = output.nextToken;

      locationsResult = [...locationsResult, ...output.locations].filter(
        ({ permission }) => !shouldExclude(permission, exclude)
      );
    } while (nextNextToken && locationsResult.length < pageSize);

    const result = refresh
      ? locationsResult
      : [...(prevState.result ?? []), ...locationsResult];

    return { result, nextToken: nextNextToken };
  };
