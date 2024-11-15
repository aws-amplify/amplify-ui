import { listPaths, ListPathsOutput } from '../../storage-internal';
import { parseAmplifyAuthPermission } from '../permissionParsers';
import { ListLocations, ListLocationsOutput } from '../types';
import { getPaginatedLocations } from './getPaginatedLocations';

export const createAmplifyListLocationsHandler = (): ListLocations => {
  let cachedLocations: ListLocationsOutput['locations'] = [];

  return async function listLocations(input = {}) {
    const { pageSize, nextToken } = input;

    if (cachedLocations.length > 0) {
      return getPaginatedLocations({
        locations: cachedLocations,
        pageSize,
        nextToken,
      });
    }

    const { locations }: { locations: ListPathsOutput['locations'] } =
      await listPaths();

    const sanitizedLocations = locations.map(
      ({ bucket, permission, prefix, type }) => {
        return {
          type,
          permissions: parseAmplifyAuthPermission(permission),
          scope: `s3://${bucket}/${prefix}`,
        };
      }
    );

    cachedLocations = sanitizedLocations;

    return getPaginatedLocations({
      locations: cachedLocations,
      pageSize,
      nextToken,
    });
  };
};
