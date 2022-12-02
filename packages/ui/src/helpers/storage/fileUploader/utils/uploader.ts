import { Storage } from 'aws-amplify';
import { StorageAccessLevel } from '@aws-amplify/storage';
import { translate } from '../../../../i18n';

export function uploadFile({
  file,
  fileName,
  level = 'private',
  progressCallback,
  errorCallback,
  completeCallback,
  isResumable = false,
  ...rest
}: {
  file: File;
  fileName: string;
  level: StorageAccessLevel;
  isResumable?: boolean;
  progressCallback: (progress: { loaded: number; total: number }) => void;
  errorCallback: (err: string) => void;
  completeCallback: (event) => void;
}) {
  if (isResumable === true) {
    return Storage.put(fileName, file, {
      level,
      resumable: isResumable,
      progressCallback,
      errorCallback,
      completeCallback,
      ...rest,
    });
  } else {
    return Storage.put(fileName, file, {
      level,
      resumable: false,
      progressCallback,
      ...rest,
    }).then(completeCallback, errorCallback);
  }
}
/**
 * Format bytes as human-readable text.
 *
 * @param bytes Number of bytes.
 * @param si True to use metric (SI) units, aka powers of 1000. False to use
 *           binary (IEC), aka powers of 1024.
 * @param dp Number of decimal places to display.
 *
 * @return Formatted string.
 */
export function humanFileSize(bytes, si = false, dp = 1) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }

  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let unit = -1;
  const range = 10 ** dp;

  do {
    bytes /= thresh;
    ++unit;
  } while (
    Math.round(Math.abs(bytes) * range) / range >= thresh &&
    unit < units.length - 1
  );

  return bytes.toFixed(dp) + ' ' + units[unit];
}

export const checkMaxSize = (maxSize: number, file: File): string | null => {
  if (!maxSize) return null;
  if (file.size > maxSize) {
    return translate('Above max ') + humanFileSize(maxSize, true);
  }
  return null;
};

export const returnAcceptedFiles = (
  files: File[],
  acceptedFileTypes: string[]
): File[] => {
  // Remove any files that are not in the accepted file list
  return files.filter((file) => {
    const fileName = file.name || '';
    const mimeType = (file.type || '').toLowerCase();
    const baseMimeType = mimeType.replace(/\/.*$/, '');
    return acceptedFileTypes.some((type) => {
      const validType = type.trim().toLowerCase();
      if (validType.charAt(0) === '.') {
        return fileName.toLowerCase().endsWith(validType);
      } else if (validType.endsWith('/*')) {
        // This is something like a image/* mime type
        return baseMimeType === validType.replace(/\/.*$/, '');
      }
      return mimeType === validType;
    });
  });
};
export const isValidExtension = (
  fileName: string,
  fileName2: string
): boolean => {
  const extension = fileName.split('.').pop();
  const fileExtension = fileName2.split('.').pop();
  return fileExtension === extension;
};
