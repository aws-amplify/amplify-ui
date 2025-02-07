import { ListLocations, ListLocationsInput, LocationData } from '../../actions';
import {
  listPaths,
  ListPathsOutput,
  StorageAccess,
} from '../../storage-internal';

import { parseAmplifyAuthPermissions } from '../permissionParsers';
import { getPaginatedLocations } from './getPaginatedLocations';

// omit both 'permission' and 'permissions' from base interface
interface PathAccessBase
  extends Omit<
    ListPathsOutput['locations'][number],
    'permission' | 'permissions'
  > {}

// includes legacy "permission" key
export interface PathAccessWithPermission extends PathAccessBase {
  permission: StorageAccess[];
}

export interface PathAccessWithPermissions extends PathAccessBase {
  permissions: StorageAccess[];
}

export interface ExtendedListPathsOutput {
  locations: (PathAccessWithPermission | PathAccessWithPermissions)[];
}

export type ExtendedListPaths = () => Promise<ExtendedListPathsOutput>;

const extendedListPaths: ExtendedListPaths = listPaths;

const isPathAccessWithPermissions = (
  value: unknown
): value is PathAccessWithPermissions =>
  !!(value as PathAccessWithPermissions)?.['permissions'];

export const createAmplifyListLocationsHandler = (): ListLocations => {
  let cachedItems: LocationData[] = [];

  return async function listLocations(input: ListLocationsInput) {
    const { options } = input ?? {};
    const { nextToken, pageSize } = options ?? {};

    if (cachedItems.length > 0) {
      return getPaginatedLocations({ items: cachedItems, pageSize, nextToken });
    }

    const { locations } = await extendedListPaths();

    const sanitizedItems: LocationData[] = locations.map((location) => {
      const { bucket, prefix: _prefix, type } = location;
      const prefix = !_prefix.endsWith('*') ? _prefix : _prefix.slice(0, -1);

      const permissions = parseAmplifyAuthPermissions(
        isPathAccessWithPermissions(location)
          ? location.permissions
          : location.permission
      );

      return { bucket, id: crypto.randomUUID(), permissions, prefix, type };
    });

    cachedItems = sanitizedItems;

    return getPaginatedLocations({ items: cachedItems, pageSize, nextToken });
  };
};
