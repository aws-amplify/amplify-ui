import type { FilePreviewUrlOptions } from '../../../createStorageBrowser/types';

export type FileType = 'image' | 'video' | 'text' | 'unknown';

export interface FileTypeMapping {
  [key: string]: FileType;
}

export const GENERIC_CONTENT_TYPES: ReadonlySet<string> = new Set([
  'application/octet-stream',
  'binary/octet-stream',
  'application/unknown',
  'unknown/unknown',
  'application/force-download',
  'application/download',
  'application/x-download',
  'application/binary',
]);

export const EXTENSION_MAPPINGS: FileTypeMapping = {
  // Images
  jpg: 'image',
  jpeg: 'image',
  png: 'image',
  gif: 'image',
  webp: 'image',
  svg: 'image',
  bmp: 'image',
  tiff: 'image',
  tif: 'image',
  ico: 'image',
  heic: 'image',
  heif: 'image',
  avif: 'image',

  // Videos
  mp4: 'video',
  avi: 'video',
  mov: 'video',
  wmv: 'video',
  flv: 'video',
  webm: 'video',
  mkv: 'video',
  m4v: 'video',
  mpg: 'video',
  mpeg: 'video',
  '3gp': 'video',
  ogv: 'video',

  // Plain text files only
  txt: 'text',
  csv: 'text',
  log: 'text',
  json: 'text',
  xml: 'text',
  yaml: 'text',
  yml: 'text',
  ini: 'text',
  conf: 'text',
  cfg: 'text',
} as const;

export const DEFAULT_URL_OPTIONS: FilePreviewUrlOptions = {
  expiresIn: 7200,
  validateObjectExistence: true,
};
