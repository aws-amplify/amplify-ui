export const UPLOAD_FILE_SIZE_LIMIT = 160 * 1000 * 1000 * 1000;

export const isValidFileSize = (file: File): boolean =>
  file.size <= UPLOAD_FILE_SIZE_LIMIT;
