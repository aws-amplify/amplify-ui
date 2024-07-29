import { LocationData, LocationType, Permission } from './types';

// import { ListLocations as _ListLocations } from '@aws-amplify/storage/storage-browser';
export interface _ListLocationsOutput<T> {
  locations: T[];
  nextToken?: string;
}
interface _ListLocationsInput {
  pageSize?: number;
  nextToken?: string;
}
export interface _LocationAccess<T = Permission> {
  readonly type: LocationType;
  readonly permission: T;
  readonly scope: string;
}

// Temp type until JS releases next "storage-browser" tag
export type _ListLocations<T = Permission> = (
  input?: _ListLocationsInput
) => Promise<_ListLocationsOutput<_LocationAccess<T>>>;

export type ListLocationsActionInput<T = never> = {
  exclude?: T | T[];
  pageSize?: number;
} & (
  | { nextToken?: string; refresh?: never }
  | { nextToken?: never; refresh?: boolean }
);

export interface ListLocationsActionOutput<K = Permission> {
  locations: LocationData<K>[];
  nextToken: string | undefined;
}

const EMPTY_LOCATIONS: LocationData[] = [];

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

// @TODO: needs refactor to handle non-bucket locations
const getBucket = (scope: string) => {
  if (scope.startsWith('s3://') && scope.endsWith('/*')) {
    return scope.slice(5, -2);
  }
  return scope;
};

export const createListLocationsAction = (
  listLocations: _ListLocations
): ListLocationsAction =>
  async function listLocationsAction(prevState, input) {
    const { exclude, nextToken: _nextToken, pageSize, refresh } = input ?? {};

    const output = await listLocations(
      refresh ? { pageSize } : { nextToken: _nextToken, pageSize }
    );

    const nextLocations = output.locations.reduce(
      (acc, { scope, permission, type }) =>
        shouldExclude(permission, exclude)
          ? acc
          : [...acc, { bucket: getBucket(scope), scope, permission, type }],
      [] as LocationData[]
    );

    return {
      locations: [
        ...(refresh ? EMPTY_LOCATIONS : prevState.locations),
        ...nextLocations,
      ],
      nextToken: output.nextToken,
    };
  };
