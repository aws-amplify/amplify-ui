import { ImageContentBlock, DocumentContentBlock } from '../../types';

export function formatDate(date: Date): string {
  const dateString = date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  const timeString = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return `${dateString} at ${timeString}`;
}

export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  // Use node-based buffer if available
  // fall back on browser if not
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(new Uint8Array(buffer)).toString('base64');
  } else {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
}

export function convertBufferToBase64(
  buffer: ArrayBuffer,
  format: ImageContentBlock['format']
): string {
  const base64string = arrayBufferToBase64(buffer);
  return `data:image/${format};base64,${base64string}`;
}

// This function will return the file extension or mime type
export function getAttachmentFormat(file: File): string {
  // try to get format from mime type first
  const mimeType = file.type.split('/')[1];
  const fileNameParts = file.name.split('.');

  if (fileNameParts.length > 1) {
    return fileNameParts[fileNameParts.length - 1];
  }
  return mimeType;
}

export function getValidDocumentName(file: File): string {
  const fileNameParts = file.name.split('.');

  const baseFileName =
    fileNameParts.length > 1 ? fileNameParts.slice(0, -1).join('') : file.name;

  return baseFileName
    .replace(/[!@#$%^&*()+\-=[\]{};':"\\|,.<>/?]/g, '')
    .replace(/\s+/g, '_');
}

// Using Sets instead of Arrays for faster and easier lookups
export const documentFileTypes = new Set([
  'docx',
  'csv',
  'html',
  'txt',
  'pdf',
  'md',
  'doc',
  'xlsx',
  'xls',
]);
export const imageFileTypes = new Set(['png', 'jpeg', 'gif', 'webp']);
export const validFileTypes = new Set([
  ...documentFileTypes,
  ...imageFileTypes,
]);

export function isDocumentFormat(
  format: string
): format is DocumentContentBlock['format'] {
  return documentFileTypes.has(format);
}

export function isImageFormat(
  format: string
): format is ImageContentBlock['format'] {
  return imageFileTypes.has(format);
}

export async function attachmentsValidator({
  files,
  maxAttachments,
  maxAttachmentSize,
}: {
  files: File[];
  maxAttachments: number;
  maxAttachmentSize: number;
}): Promise<{
  acceptedFiles: File[];
  rejectedFiles: File[];
  hasMaxAttachmentSizeError: boolean;
  hasMaxAttachmentsError: boolean;
  hasUnsupportedFileError: boolean;
}> {
  const acceptedFiles: File[] = [];
  const rejectedFiles: File[] = [];
  let hasMaxAttachmentSizeError = false;
  let hasUnsupportedFileError = false;

  for (const file of files) {
    const format = getAttachmentFormat(file);
    if (!validFileTypes.has(format)) {
      rejectedFiles.push(file);
      hasUnsupportedFileError = true;
      continue;
    }
    const arrayBuffer = await file.arrayBuffer();
    const base64 = arrayBufferToBase64(arrayBuffer);
    if (base64.length < maxAttachmentSize) {
      acceptedFiles.push(file);
    } else {
      rejectedFiles.push(file);
      hasMaxAttachmentSizeError = true;
    }
  }
  if (acceptedFiles.length > maxAttachments) {
    return {
      acceptedFiles: acceptedFiles.slice(0, maxAttachments),
      rejectedFiles: [...acceptedFiles.slice(maxAttachments), ...rejectedFiles],
      hasMaxAttachmentSizeError,
      hasUnsupportedFileError,
      hasMaxAttachmentsError: true,
    };
  }
  return {
    acceptedFiles,
    rejectedFiles,
    hasMaxAttachmentSizeError,
    hasUnsupportedFileError,
    hasMaxAttachmentsError: false,
  };
}
