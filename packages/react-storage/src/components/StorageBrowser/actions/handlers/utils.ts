import { LocationAccess, Permission } from '../../storage-internal';
import { ActionInputConfig } from '../types';
import { LocationData, LocationType } from './types';

export const constructBucket = ({
  bucket: bucketName,
  region,
}: Pick<ActionInputConfig, 'bucket' | 'region'>): {
  bucketName: string;
  region: string;
} => ({ bucketName, region });

export const parseLocationAccess = (location: LocationAccess): LocationData => {
  const { permission, scope, type } = location;
  if (!scope.startsWith('s3://')) {
    throw new Error(`Invalid scope: ${scope}`);
  }

  const id = crypto.randomUUID();

  // remove default path
  const slicedScope = scope.slice(5);
  let bucket, prefix;

  switch (type) {
    case 'BUCKET': {
      // { scope: 's3://bucket/*', type: 'BUCKET', },
      bucket = slicedScope.slice(0, -2);
      prefix = '';
      break;
    }
    case 'PREFIX': {
      // { scope: 's3://bucket/path/*', type: 'PREFIX', },
      bucket = slicedScope.slice(0, slicedScope.indexOf('/'));
      prefix = `${slicedScope.slice(bucket.length + 1, -1)}`;

      break;
    }
    case 'OBJECT': {
      // { scope: 's3://bucket/path/to/object', type: 'OBJECT', },
      bucket = slicedScope.slice(0, slicedScope.indexOf('/'));
      prefix = slicedScope.slice(bucket.length + 1);
      break;
    }
    default: {
      throw new Error(`Invalid location type: ${type}`);
    }
  }

  return { bucket, id, permission, prefix, type };
};

export type ExcludeType = Permission | LocationType;

const shouldExclude = (
  permission: Permission,
  type: LocationType,
  exclude?: ExcludeType | ExcludeType[]
) =>
  exclude
    ? typeof exclude === 'string'
      ? exclude === permission || exclude === type
      : exclude.includes(permission) || exclude.includes(type)
    : false;

export const parseLocations = (
  locations: LocationAccess[],
  exclude?: ExcludeType | ExcludeType[]
): LocationData[] =>
  locations.reduce(
    (filteredLocations: LocationData[], location: LocationAccess) => {
      const parsedLocation = parseLocationAccess(location);
      if (
        shouldExclude(parsedLocation.permission, parsedLocation.type, exclude)
      ) {
        filteredLocations.push(parsedLocation);
      }
      return filteredLocations;
    },
    []
  );
