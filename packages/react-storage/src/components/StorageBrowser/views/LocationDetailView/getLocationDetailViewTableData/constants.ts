import type { StorageBrowserIconType } from '../../../components';
import type { HeaderKeys } from './types';

export const LOCATION_DETAIL_VIEW_HEADERS: HeaderKeys[] = [
  'checkbox',
  'name',
  'type',
  'last-modified',
  'size',
  'download',
];

export interface ThumbnailExtensionsMapping {
  [key: string]: StorageBrowserIconType;
}

export const GENERIC_FILE_ICON = 'file';

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
