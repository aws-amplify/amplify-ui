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

export const USE_ACTION_ERROR_MESSAGE =
  '`useAction` must be called from inside `StorageBrowser.Provider`';
