import type {
  AllFileTypes,
  FilePreviewUrlOptions,
} from '../../../createStorageBrowser/types';

export interface FileTypeMapping {
  [key: string]: AllFileTypes<any>;
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
export const DEFAULT_FILE_SIZE_LIMIT = 200 * 1024 * 1024; // 200MB

export const DEFAULT_FILE_SIZE_LIMITS: Record<string, number> = {
  image: 200 * 1024 * 1024, // 200MB
  video: 2 * 1024 * 1024 * 1024, // 2GB
  text: 100 * 1024 * 1024, // 100MB
};
