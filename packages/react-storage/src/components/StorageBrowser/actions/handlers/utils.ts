import type { TransferProgressEvent } from 'aws-amplify/storage';
import type { LocationAccess as AccessGrantLocation } from '../../storage-internal';

import { MULTIPART_UPLOAD_THRESHOLD_BYTES } from './constants';
import type {
  ActionInputConfig,
  FileData,
  FileDataItem,
  FileItem,
  ListLocationsExcludeOptions,
  LocationData,
  LocationPermissions,
  LocationType,
} from './types';

export const constructBucket = ({
  bucket: bucketName,
  region,
}: Pick<ActionInputConfig, 'bucket' | 'region'>): {
  bucketName: string;
  region: string;
} => ({ bucketName, region });

export const parseAccessGrantLocation = (
  location: AccessGrantLocation
): LocationData => {
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

  let permissions: LocationPermissions;
  switch (permission) {
    case 'READ':
      permissions = ['get', 'list'];
      break;
    case 'READWRITE':
      permissions = ['delete', 'get', 'list', 'write'];
      break;
    case 'WRITE':
      permissions = ['delete', 'write'];
      break;
    default:
      throw new Error(`Invalid location permission: ${permission}`);
  }

  return { bucket, id, permissions: permissions, prefix, type };
};

const isSamePermissions = (
  permissionsToExclude: LocationPermissions,
  locationPermissions: LocationPermissions
) => {
  if (permissionsToExclude.length !== locationPermissions.length) {
    return false;
  }
  const sortedLocationPermissions = locationPermissions.sort();
  return permissionsToExclude
    .sort()
    .every(
      (permission, index) => permission === sortedLocationPermissions[index]
    );
};

const isSameType = (
  typeToExclude: LocationType | LocationType[],
  locationType: LocationType
) =>
  typeof typeToExclude === 'string'
    ? typeToExclude === locationType
    : typeToExclude.includes(locationType);

export const shouldExcludeLocation = (
  { permissions, type }: LocationData,
  exclude?: ListLocationsExcludeOptions
): boolean => {
  const excludedByPermssions = !!(
    exclude?.exactPermissions &&
    isSamePermissions(exclude.exactPermissions, permissions)
  );

  const excludedByType = !!(exclude?.type && isSameType(exclude.type, type));

  return excludedByPermssions || excludedByType;
};

export const getFilteredLocations = (
  locations: AccessGrantLocation[],
  exclude?: ListLocationsExcludeOptions
): LocationData[] =>
  locations.reduce(
    (filteredLocations: LocationData[], location: AccessGrantLocation) => {
      const parsedLocation = parseAccessGrantLocation(location);

      const isNonFolderLikePrefix =
        !parsedLocation.prefix.endsWith('/') &&
        parsedLocation.type === 'PREFIX';

      if (isNonFolderLikePrefix) {
        return filteredLocations;
      }

      if (!shouldExcludeLocation(parsedLocation, exclude)) {
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

export const isMultipartUpload = (file: File): boolean =>
  file.size > MULTIPART_UPLOAD_THRESHOLD_BYTES;
