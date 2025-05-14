import type { LocationData } from '../../actions';
import type { ListPathsOutput } from '../../storage-internal';
import { listPaths } from '../../storage-internal';
import type { ListLocations, ListLocationsInput } from '../../actions';

import { parseAmplifyAuthPermission } from '../permissionParsers';
import { getPaginatedLocations } from './getPaginatedLocations';

export const createAmplifyListLocationsHandler = (): ListLocations => {
  let cachedItems: LocationData[] = [];

  return async function listLocations(input: ListLocationsInput) {
    const { options } = input ?? {};
    const { nextToken, pageSize } = options ?? {};

    if (cachedItems.length > 0) {
      return getPaginatedLocations({
        items: cachedItems,
        pageSize,
        nextToken,
      });
    }

    const { locations }: { locations: ListPathsOutput['locations'] } =
      await listPaths();

    const sanitizedItems: LocationData[] = locations.map(
      ({ bucket, permission, prefix, type }) => {
        return {
          type,
          permissions: parseAmplifyAuthPermission(permission),
          bucket,
          prefix: prefix.endsWith('*') ? prefix.slice(0, -1) : prefix,
          id: crypto.randomUUID(),
        };
      }
    );

    cachedItems = sanitizedItems;

    return getPaginatedLocations({
      items: cachedItems,
      pageSize,
      nextToken,
    });
  };
};
