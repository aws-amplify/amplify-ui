import type {
  AllFileTypes,
  FilePreviewUrlOptions,
} from '../../../createStorageBrowser/types';
import type { StorageBrowserIconType } from '../../../components';

export interface FileTypeMapping {
  [key: string]: AllFileTypes;
}

export interface ThumbnailExtensionsMapping {
  [key: string]: StorageBrowserIconType;
}

export const DEFAULT_URL_OPTIONS: FilePreviewUrlOptions = {
  expiresIn: 7200,
  validateObjectExistence: true,
};
export const DEFAULT_FILE_SIZE_LIMIT = 200 * 1024 * 1024; // 200MB

export const DEFAULT_FILE_SIZE_LIMITS: Record<string, number> = {
  image: 200 * 1024 * 1024, // 200MB
  video: 2 * 1024 * 1024 * 1024, // 2GB
  text: 10 * 1024 * 1024, // 10MB
};

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

export const GENERIC_FILE_ICON = 'file';

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

export const EXTENSION_THUMBNAIL_MAPPINGS: ThumbnailExtensionsMapping = {
  // Images
  jpg: 'file-image',
  jpeg: 'file-image',
  png: 'file-image',
  gif: 'file-image',
  webp: 'file-image',
  svg: 'file-image',
  bmp: 'file-image',
  tiff: 'file-image',
  tif: 'file-image',
  ico: 'file-image',
  heic: 'file-image',
  heif: 'file-image',
  avif: 'file-image',

  // Videos
  mp4: 'file-video',
  avi: 'file-video',
  mov: 'file-video',
  wmv: 'file-video',
  flv: 'file-video',
  webm: 'file-video',
  mkv: 'file-video',
  m4v: 'file-video',
  mpg: 'file-video',
  mpeg: 'file-video',
  '3gp': 'file-video',
  ogv: 'file-video',

  // Plain text files only
  txt: 'file-text',
  log: 'file-text',
  json: 'file-text',
  xml: 'file-text',
  yaml: 'file-text',
  yml: 'file-text',
  ini: 'file-text',
  conf: 'file-text',
  cfg: 'file-text',

  // Audio
  mp3: 'file-audio',
  wav: 'file-audio',
  flac: 'file-audio',
  aac: 'file-audio',
  ogg: 'file-audio',
  wma: 'file-audio',
  m4a: 'file-audio',

  // Documents
  pdf: 'file-pdf',

  // Excel
  xls: 'file-excel',
  xlsx: 'file-excel',
  csv: 'file-excel',

  // Word
  doc: 'file-word',
  docx: 'file-word',
  rtf: 'file-word',

  // PowerPoint
  ppt: 'file-powerpoint',
  pptx: 'file-powerpoint',

  // Archives
  zip: 'file-archive',
  rar: 'file-archive',
  '7z': 'file-archive',
  tar: 'file-archive',
  gz: 'file-archive',
  bz2: 'file-archive',
};
