import { humanFileSize } from '@aws-amplify/ui';

export const checkMaxFileSize = ({
  file,
  getFileSizeErrorText,
  maxFileSize,
}: {
  file: File;
  getFileSizeErrorText: (sizeText: string) => string;
  maxFileSize?: number;
}): string => {
  if (maxFileSize === undefined) return '';
  if (file.size > maxFileSize) {
    return getFileSizeErrorText(humanFileSize(maxFileSize, true));
  }
  return '';
};
