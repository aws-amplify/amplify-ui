import { LocationData, LocationType, Permission } from './types';

// import { ListLocations as _ListLocations } from '@aws-amplify/storage/storage-browser';
interface _ListLocationsOutput<T extends _LocationAccess> {
  locations: T[];
  nextToken?: string;
}
interface _ListLocationsInput {
  pageSize?: number;
  nextToken?: string;
}
interface _LocationAccess {
  readonly type: LocationType;
  readonly permission: Permission;
  readonly scope: string;
}
// Temp type until JS releases next "storage-browser" tag
export type _ListLocations = (
  input?: _ListLocationsInput
) => Promise<_ListLocationsOutput<_LocationAccess>>;

export type ListLocationsActionInput =
  | { nextToken?: string; pageSize?: number; refresh?: never }
  | { nextToken?: never; pageSize?: number; refresh?: boolean };

export interface ListLocationsActionOutput<K = Permission> {
  locations: LocationData<K>[];
  nextToken: string | undefined;
}

export type ListLocations<T = Permission> = (input: {
  nextToken?: string;
  pageSize?: number;
}) => Promise<ListLocationsActionOutput<T>>;

type ListLocationsAction<T = Permission> = (
  prevState: ListLocationsActionOutput,
  input: ListLocationsActionInput
) => Promise<ListLocationsActionOutput<T>>;

export const createListLocationsAction = (
  listLocations: ListLocations
): ListLocationsAction => {
  return async (
    prevState,
    { nextToken: _nextToken, pageSize, refresh } = {}
  ) => {
    const { locations, nextToken } = await listLocations(
      refresh ? { pageSize } : { nextToken: _nextToken, pageSize }
    );

    return {
      locations: [...(refresh ? [] : locations), ...prevState.locations],
      nextToken,
    };
  };
};
