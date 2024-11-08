import {
  ListLocations,
  ListLocationsOutput,
  listPaths,
  ListPathsOutput,
  LocationAccess,
} from '../../storage-internal';
import { getPaginatedLocations } from './getPaginatedLocations';
import { mapAmplifyPermissions } from './mapAmplifyPermissions';

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

    const sanitizedLocations: LocationAccess[] = locations.map(
      ({ bucket, permission, prefix, type }) => {
        return {
          type,
          permission: mapAmplifyPermissions(permission),
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
