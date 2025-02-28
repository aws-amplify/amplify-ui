import { ImageContentBlock } from '../../types';

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

function arrayBufferToBase64(buffer: ArrayBuffer) {
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

export function getAttachmentFormat(file: File): string {
  // try to get format from mime type first
  const mimeType = file.type.split('/')[1];
  const extension = file.name.split('.')[1];
  if (extension) {
    return extension;
  }
  return mimeType;
}

export function getValidDocumentName(file: File): string {
  return file.name
    .split('.')
    .slice(0, -1)
    .join('')
    .replace(/[!@#$%^&*()+\-=[\]{};':"\\|,.<>/?]/g, '');
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
}> {
  const acceptedFiles: File[] = [];
  const rejectedFiles: File[] = [];
  let hasMaxSizeError = false;

  for (const file of files) {
    if (!validFileTypes.has(getAttachmentFormat(file))) {
      rejectedFiles.push(file);
      continue;
    }
    const arrayBuffer = await file.arrayBuffer();
    const base64 = arrayBufferToBase64(arrayBuffer);
    if (base64.length < maxAttachmentSize) {
      acceptedFiles.push(file);
    } else {
      rejectedFiles.push(file);
      hasMaxSizeError = true;
    }
  }
  if (acceptedFiles.length > maxAttachments) {
    return {
      acceptedFiles: acceptedFiles.slice(0, maxAttachments),
      rejectedFiles: [...acceptedFiles.slice(maxAttachments), ...rejectedFiles],
      hasMaxAttachmentsError: true,
      hasMaxAttachmentSizeError: hasMaxSizeError,
    };
  }
  return {
    acceptedFiles,
    rejectedFiles,
    hasMaxAttachmentsError: false,
    hasMaxAttachmentSizeError: hasMaxSizeError,
  };
}
