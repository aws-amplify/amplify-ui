import type { FileData } from '../../../actions';
import type { AllFileTypes } from '../../../createStorageBrowser/types';
import { EXTENSION_MAPPINGS, GENERIC_CONTENT_TYPES } from './const';

export function isGenericContentType(contentType?: string): boolean {
  if (!contentType || typeof contentType !== 'string') {
    return true;
  }

  const normalizedContentType = contentType.toLowerCase().trim();

  return GENERIC_CONTENT_TYPES.has(normalizedContentType);
}

function isTextBasedApplicationType(contentType: string): boolean {
  if (
    contentType === 'application/json' ||
    (contentType.startsWith('application/') && contentType.includes('+json'))
  ) {
    return true;
  }

  if (
    contentType === 'application/xml' ||
    (contentType.startsWith('application/') && contentType.includes('+xml'))
  ) {
    return true;
  }

  const textBasedTypes = [
    'application/csv',
    'application/yaml',
    'application/toml',
  ];

  return textBasedTypes.includes(contentType);
}

export function getFileTypeFromContentType(
  contentType?: string
): AllFileTypes | null {
  if (!contentType || typeof contentType !== 'string') {
    return null;
  }

  const normalizedContentType = contentType.toLowerCase().trim().split(';')[0];

  if (normalizedContentType.startsWith('image/')) {
    return 'image';
  }

  if (normalizedContentType.startsWith('video/')) {
    return 'video';
  }

  if (
    normalizedContentType.startsWith('text/') ||
    isTextBasedApplicationType(normalizedContentType)
  ) {
    return 'text';
  }

  return null;
}

interface DetermineFileTypeOptions {
  fileTypeResolver?: (p: FileData) => AllFileTypes | undefined;
  fileData: FileData;
}

export function getFileExtension(key?: string): string | null {
  if (!key || typeof key !== 'string') {
    return null;
  }

  const lastDotIndex = key.lastIndexOf('.');
  if (lastDotIndex === -1 || lastDotIndex === key.length - 1) {
    return null;
  }

  return key.slice(lastDotIndex + 1).toLowerCase();
}

export function getFileTypeFromExtension(
  extension?: string | null
): AllFileTypes | null {
  if (!extension || typeof extension !== 'string') {
    return null;
  }

  const normalizedExtension = extension.toLowerCase().trim();
  return EXTENSION_MAPPINGS[normalizedExtension] || null;
}

export function determineFileType(
  options: DetermineFileTypeOptions
): AllFileTypes | null {
  const { fileData, fileTypeResolver } = options;
  const { contentType, key } = fileData ?? {};

  if (typeof fileTypeResolver === 'function') {
    try {
      const customResult = fileTypeResolver(fileData);

      if (customResult !== undefined && customResult !== null) {
        return customResult;
      }
    } catch (error) {
      //
    }
  }

  if (!isGenericContentType(contentType)) {
    const typeFromContentType = getFileTypeFromContentType(contentType);
    if (typeFromContentType) {
      return typeFromContentType;
    }
  }

  const extension = getFileExtension(key);
  if (extension) {
    return getFileTypeFromExtension(extension);
  }

  return null;
}
