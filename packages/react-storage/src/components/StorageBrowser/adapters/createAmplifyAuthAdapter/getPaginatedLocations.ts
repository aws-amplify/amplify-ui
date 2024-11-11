// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { ListLocationsOutput } from '../types';

export const getPaginatedLocations = ({
  locations,
  pageSize,
  nextToken,
}: {
  locations: ListLocationsOutput['locations'];
  pageSize?: number;
  nextToken?: string;
}): { locations: ListLocationsOutput['locations']; nextToken?: string } => {
  if (pageSize) {
    if (nextToken) {
      if (Number(nextToken) > locations.length) {
        return { locations: [], nextToken: undefined };
      }
      const start = -nextToken;
      const end = start + pageSize < 0 ? start + pageSize : undefined;

      return {
        locations: locations.slice(start, end),
        nextToken: end ? `${-end}` : undefined,
      };
    }

    return {
      locations: locations.slice(0, pageSize),
      nextToken:
        locations.length > pageSize
          ? `${locations.length - pageSize}`
          : undefined,
    };
  }

  return {
    locations,
  };
};
