/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { LocationAccess } from '../../actions/handlers';
import {
  ListLocations,
  ListLocationsOutput,
  listPaths,
  ListPathsOutput,
  StorageAccess,
} from '../../storage-internal';
import { mapAmplifyPermissions } from './mapAmplifyPermissions';

export const createAmplifyListLocationsHandler = (): ListLocations => {
  return async function listLocations(_input = {}) {
    const { locations }: { locations: ListPathsOutput['locations'] } =
      await listPaths();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const sanitizedLocations: LocationAccess[] = locations.map(
      ({ bucket, permission, prefix, type }) => {
        return {
          type,
          permission: mapAmplifyPermissions(permission),
          scope: `s3://${bucket}/${prefix}`,
        };
      }
    );

    const result: ListLocationsOutput = {
      locations: sanitizedLocations,
      nextToken: undefined,
    };

    return result;
  };
};
