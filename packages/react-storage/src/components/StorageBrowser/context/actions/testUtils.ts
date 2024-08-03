// @ts-nocheck
import { LocationItem, LocationData } from './types';

type Permission = 'READ' | 'READWRITE' | 'WRITE';

const CHARACTERS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const CHARACTERS_LENGTH = CHARACTERS.length;

const EXTENSION_CONTENT = {
  mp3: 'audio/mp3',
  wav: 'audio/wav',
  aac: 'audio/aac',
  png: 'image/png',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  gif: 'image/gif',
  bmp: 'image/bmp',
  tiff: 'image/tiff',
  svg: 'image/svg+xml',
  txt: 'text/plain',
  rtf: 'text/rtf',
  css: 'text/css',
  html: 'text/html',
  csv: 'text/csv',
  doc: 'application/msword',
  zip: 'application/zip',
  json: 'application/json',
  js: 'application/javascript',
  pdf: 'application/pdf',
  gz: 'application/x-gzip',
  gzip: 'application/x-gzip',
  z: 'application/x-compressed',
  '7z': 'application/x-7z-compressed',
  apk: 'application/vnd.android.package-archive',
  azw: 'application/vnd.amazon.ebook',
  dmg: 'application/x-apple-diskimage',
  mpkg: 'application/vnd.apple.installer+xml',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  m3u8: 'application/x-mpegURL',
  flv: 'video/x-flv',
  mp4: 'video/mp4',
  mpeg: 'video/mpeg',
  ts: 'video/MP2T',
  '3gp': 'video/3gpp',
  mov: 'video/quicktime',
  avi: 'video/x-msvideo',
  wmv: 'video/x-ms-wmv',
};

export const EXTENSIONS = Object.keys(EXTENSION_CONTENT);

export const PERMISSION_TYPES = ['READ', 'READWRITE', 'WRITE'];
export const LOCATION_TYPES = ['OBJECT', 'PREFIX', 'BUCKET'] as const;

export const generateString = (length: number): string => {
  let result = '';
  let counter = 0;
  while (counter < length) {
    result += CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS_LENGTH));
    counter += 1;
  }
  return result;
};

export const randomDate = (start: Date, end: Date): Date =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

export const randomNumberInRange = (min: number, max: number): number =>
  Math.round(Math.random() * (max - min) + min);

export async function timeout(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export const generateListLocationItemsData = (
  count: number
): LocationItem[] => {
  const items: LocationItem[] = [];

  const startDate = new Date(2012, 0, 1);
  const endDate = new Date();

  while (count > items.length) {
    // bias towards generating FILE over FOLDER
    const type = randomNumberInRange(0, 12) > 8 ? 'FOLDER' : 'FILE';
    const key = `${generateString(randomNumberInRange(6, 23))}${
      type === 'FOLDER'
        ? ''
        : `.${EXTENSIONS[randomNumberInRange(0, EXTENSIONS.length - 1)]}`
    }`;

    items.push({
      key,
      lastModified: randomDate(startDate, endDate),
      size: randomNumberInRange(120, 10000),
      type,
    });
  }

  return items;
};

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
      () => `${bucketName}/${generateString(randomNumberInRange(6, 20))}*`
    );

  const scope = `s3://${bucketName}/*`;
  result.push({
    bucket: bucketName,
    prefix: undefined,
    permission: getRandomPermission(),
    scope,
    type: 'BUCKET',
  });

  while (result.length < count) {
    if (!hasPrefixes) {
      // object: <bucket>/<prefix-with-path>/<object>
      result.push({
        bucket: bucketName,
        prefix: undefined,
        scope: `${scope}${generateString(randomNumberInRange(6, 20))}.${
          EXTENSIONS[randomNumberInRange(0, EXTENSIONS.length)]
        }`,
        permission: getRandomPermission(),
        type: 'OBJECT',
      });
    } else {
      const selectedPrefix =
        prefixes[randomNumberInRange(0, prefixes.length - 1)];

      const hasPrefixBeenAdded = result.some(
        ({ scope }) => scope === selectedPrefix
      );

      const scope = hasPrefixBeenAdded
        ? // object: <bucket>/<prefix-with-path>/<object>
          `${selectedPrefix}/${generateString(randomNumberInRange(6, 20))}.${
            EXTENSIONS[randomNumberInRange(0, EXTENSIONS.length)]
          }`
        : selectedPrefix;
      const type = hasPrefixBeenAdded ? 'OBJECT' : 'PREFIX';

      result.push({
        bucket: bucketName,
        prefix: undefined,
        scope,
        permission: getRandomPermission(),
        type,
      });
    }
  }

  return result;
};

export const generateLocationsData = (count = 100): LocationData[] => {
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
