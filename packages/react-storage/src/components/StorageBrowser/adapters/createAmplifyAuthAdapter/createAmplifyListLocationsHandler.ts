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
  let cachedLocations: ListLocationsOutput['locations'] = [];

  return async function listLocations(input = {}) {
    const { pageSize, nextToken } = input;

    if (cachedLocations) {
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
