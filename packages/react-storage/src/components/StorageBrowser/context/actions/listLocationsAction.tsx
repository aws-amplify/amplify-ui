import { PERMISSION_TYPES, EXTENSIONS } from './constants';
import { generateString, randomNumberInRange, timeout } from './utils';

type Permission = 'READ' | 'READWRITE' | 'WRITE';
type LocationType = 'OBJECT' | 'PREFIX' | 'BUCKET';

interface LocationData {
  name: string;
  permission: Permission;
  type: LocationType;
}

interface ListLocationsActionInput {
  options?:
    | {
        nextToken?: string;
        pageSize?: number;
        refresh?: never;
      }
    | {
        nextToken?: never;
        pageSize?: number;
        refresh?: boolean;
      };
}

interface ListLocationsOutput {
  locations: LocationData[];
  nextToken: string | undefined;
}

// 1 as max range ensures WRITE is never returned
const getRandomPermission = (): Permission =>
  PERMISSION_TYPES[randomNumberInRange(0, 1)] as Permission;

const generateBucketData = (count: number): LocationData[] => {
  const result: LocationData[] = [];
  // bucket: <bucket>/*
  const bucketName = `${generateString(randomNumberInRange(10, 24))}/`;
  const hasPrefixes = !!((randomNumberInRange(0, 31) / 2) % 2);
  const prefixCount = !hasPrefixes ? 0 : randomNumberInRange(1, 4);

  const prefixes = Array(prefixCount)
    .fill('')
    .map(
      // prefix: <bucket>/<prefix-with-path>*
      () => `${bucketName}${generateString(randomNumberInRange(6, 20))}*`
    );

  result.push({
    name: bucketName,
    permission: getRandomPermission(),
    type: 'BUCKET',
  });

  while (result.length < count) {
    if (!hasPrefixes) {
      // object: <bucket>/<prefix-with-path>/<object>
      result.push({
        name: `${bucketName}${generateString(randomNumberInRange(6, 20))}.${
          EXTENSIONS[randomNumberInRange(0, EXTENSIONS.length)]
        }`,
        permission: getRandomPermission(),
        type: 'OBJECT',
      });
    } else {
      const selectedPrefix =
        prefixes[randomNumberInRange(0, prefixes.length - 1)];

      const hasPrefixBeenAdded = result.some(
        ({ name }) => name === selectedPrefix
      );

      const name = hasPrefixBeenAdded
        ? // object: <bucket>/<prefix-with-path>/<object>
          `${selectedPrefix}/${generateString(randomNumberInRange(6, 20))}.${
            EXTENSIONS[randomNumberInRange(0, EXTENSIONS.length)]
          }`
        : selectedPrefix;
      const type = hasPrefixBeenAdded ? 'OBJECT' : 'PREFIX';

      result.push({ name, permission: getRandomPermission(), type });
    }
  }

  return result;
};

const generateLocationsData = (count = 100): LocationData[] => {
  const locations: LocationData[] = [];

  while (count > locations.length) {
    const remaining = count - locations.length;
    const bucket = generateBucketData(
      remaining === 1
        ? remaining
        : randomNumberInRange(0, Math.round(remaining / 2))
    );
    locations.push(...bucket);
  }

  return locations;
};

export default async function listLocationsAction(
  prevResult: ListLocationsOutput,
  input?: ListLocationsActionInput
): Promise<ListLocationsOutput> {
  const { options } = input ?? {};
  const locations = generateLocationsData(options?.pageSize);
  const nextToken =
    prevResult.locations.length < 1000 ? generateString(100) : undefined;

  await timeout(1000);

  return Promise.resolve({
    locations: [...prevResult.locations, ...locations],
    nextToken,
  });
}
