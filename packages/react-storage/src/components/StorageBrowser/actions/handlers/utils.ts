import { TransferProgressEvent } from 'aws-amplify/storage';

import { LocationAccess, Permission } from '../../storage-internal';
import {
  ActionInputConfig,
  FileData,
  FileDataItem,
  FileItem,
  LocationData,
  LocationType,
} from './types';

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

export const shouldExcludeLocation = (
  { permission, type }: LocationData,
  exclude?: ExcludeType | ExcludeType[]
): boolean =>
  !exclude
    ? false
    : typeof exclude === 'string'
    ? exclude === permission || exclude === type
    : exclude.includes(permission) || exclude.includes(type);

export const parseLocations = (
  locations: LocationAccess[],
  exclude?: ExcludeType | ExcludeType[]
): LocationData[] =>
  locations.reduce(
    (filteredLocations: LocationData[], location: LocationAccess) => {
      const parsedLocation = parseLocationAccess(location);
      if (shouldExcludeLocation(parsedLocation, exclude)) {
        filteredLocations.push(parsedLocation);
      }
      return filteredLocations;
    },
    []
  );

export const getFileKey = (key: string): string =>
  key.slice(key.lastIndexOf('/') + 1, key.length);

export const createFileDataItem = (data: FileData): FileDataItem => ({
  ...data,
  fileKey: getFileKey(data.key),
});

export const isFileItem = (value: unknown): value is FileItem =>
  !!(value as FileItem).file;

export const isFileDataItem = (item: unknown): item is FileDataItem =>
  !!(item as FileDataItem).fileKey;

export const getProgress = ({
  totalBytes,
  transferredBytes,
}: TransferProgressEvent): number | undefined =>
  totalBytes ? transferredBytes / totalBytes : undefined;
