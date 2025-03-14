export const UPLOAD_FILE_SIZE_LIMIT = 160 * 1000 * 1000 * 1000;

export const isFileTooBig = (file: File): boolean =>
  file.size > UPLOAD_FILE_SIZE_LIMIT;
