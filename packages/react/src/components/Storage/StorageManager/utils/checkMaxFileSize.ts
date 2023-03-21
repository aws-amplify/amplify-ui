import { humanFileSize } from './humanFileSize';

export const checkMaxFileSize = ({
  file,
  maxFileSize,
  getFileSizeErrorText,
}: {
  file: File;
  maxFileSize?: number;
  getFileSizeErrorText: (sizeText: string) => string;
}): string => {
  if (maxFileSize === undefined) return '';
  if (file.size > maxFileSize) {
    return getFileSizeErrorText(humanFileSize(maxFileSize, true));
  }
  return '';
};
