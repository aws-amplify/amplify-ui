// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { LocationAccess } from '../../actions/handlers';
import {
  ListLocations,
  ListLocationsOutput,
  listPaths,
  ListPathsOutput,
} from '../../storage-internal';
import { getPaginatedLocations } from './getPaginatedLocations';
import { mapAmplifyPermissions } from './mapAmplifyPermissions';

export const createAmplifyListLocationsHandler = (): ListLocations => {
  const cachedResult: Record<
    string,
    { locations: ListLocationsOutput['locations'] }
  > = {};

  return async function listLocations(input = {}) {
    const { pageSize, nextToken } = input;
    const cacheKey = 'listPathsCache';

    if (cachedResult && cachedResult[cacheKey]) {
      return getPaginatedLocations({
        locations: cachedResult[cacheKey].locations,
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

    cachedResult[cacheKey] = { locations: sanitizedLocations };

    return getPaginatedLocations({
      locations: cachedResult[cacheKey].locations,
      pageSize,
      nextToken,
    });
  };
};
