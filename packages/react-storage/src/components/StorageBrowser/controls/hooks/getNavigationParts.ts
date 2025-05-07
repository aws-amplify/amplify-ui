import type { LocationData } from '../../actions';

interface GetNavigationPartsInput {
  location: LocationData;
  path: string;
  includeBucketInPrefix?: boolean;
}

export const getNavigationParts = ({
  location,
  path,
  includeBucketInPrefix,
}: GetNavigationPartsInput): string[] => {
  const { bucket, prefix = '', type } = location;

  const trimmedPrefix = prefix.endsWith('/') ? prefix.slice(0, -1) : prefix;
  const trimmedPath = path.endsWith('/') ? path.slice(0, -1) : path;

  const firstPrefixPart = [];
  if (type !== 'BUCKET') {
    if (includeBucketInPrefix) {
      firstPrefixPart.push(bucket);
    }
    if (trimmedPrefix) {
      if (includeBucketInPrefix) {
        firstPrefixPart.push('/');
      }
      firstPrefixPart.push(trimmedPrefix);
    }
  }

  const prefixParts = type === 'BUCKET' ? [bucket] : [firstPrefixPart.join('')];

  if (type === 'BUCKET' && trimmedPrefix) {
    prefixParts.push(trimmedPrefix);
  }

  const pathParts = trimmedPath ? trimmedPath.split('/') : [];

  return prefixParts.concat(pathParts);
};
