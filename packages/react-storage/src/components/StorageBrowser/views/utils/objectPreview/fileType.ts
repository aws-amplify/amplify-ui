import type { FileType } from './const';
import { EXTENSION_MAPPINGS, GENERIC_CONTENT_TYPES } from './const';

export function isGenericContentType(contentType?: string): boolean {
  if (!contentType || typeof contentType !== 'string') {
    return true;
  }

  const normalizedContentType = contentType.toLowerCase().trim();

  return GENERIC_CONTENT_TYPES.has(normalizedContentType);
}

export function getFileTypeFromContentType(
  contentType?: string
): FileType | null {
  if (!contentType || typeof contentType !== 'string') {
    return null;
  }

  const normalizedContentType = contentType.toLowerCase().trim();

  if (normalizedContentType.startsWith('image/')) {
    return 'image';
  }

  if (normalizedContentType.startsWith('video/')) {
    return 'video';
  }

  if (normalizedContentType.startsWith('text/')) {
    return 'text';
  }

  if (
    normalizedContentType === 'application/json' ||
    normalizedContentType === 'application/xml' ||
    normalizedContentType === 'application/csv'
  ) {
    return 'text';
  }

  return null;
}

interface DetermineFileTypeOptions {
  fileTypeResolver?: (p: any) => FileType | undefined;
  contentType?: string;
  filename: string;
}

export function getFileExtension(filename: string): string | null {
  if (!filename || typeof filename !== 'string') {
    return null;
  }

  const lastDotIndex = filename.lastIndexOf('.');
  if (lastDotIndex === -1 || lastDotIndex === filename.length - 1) {
    return null;
  }

  return filename.slice(lastDotIndex + 1).toLowerCase();
}

export function getFileTypeFromExtension(
  extension?: string | null
): FileType | null {
  if (!extension || typeof extension !== 'string') {
    return null;
  }

  const normalizedExtension = extension.toLowerCase().trim();
  return EXTENSION_MAPPINGS[normalizedExtension] || null;
}

export function determineFileType(
  options: DetermineFileTypeOptions
): FileType | string | null {
  const { filename, contentType, fileTypeResolver } = options;

  if (typeof fileTypeResolver === 'function') {
    try {
      const customResult = fileTypeResolver({
        filename,
        contentType,
      });

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

  const extension = getFileExtension(filename);
  if (extension) {
    return getFileTypeFromExtension(extension);
  }

  return 'unknown';
}
