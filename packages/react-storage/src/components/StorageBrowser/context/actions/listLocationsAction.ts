import { ListLocations } from '@aws-amplify/storage/storage-browser';

import {
  ListActionInput,
  ListActionOptions,
  ListActionOutput,
  LocationAccess,
  Permission,
} from '../types';

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
    const { exclude, nextToken, pageSize, refresh, reset } = options ?? {};

    if (reset) {
      return { result: [], nextToken: undefined };
    }

    const output = await listLocations(
      refresh ? { pageSize } : { nextToken, pageSize }
    );

    const locations = output.locations.filter(
      ({ permission }) => !shouldExclude(permission, exclude)
    );

    const result = refresh
      ? locations
      : [...(prevState.result ?? []), ...locations];

    return { result, nextToken: output.nextToken };
  };
