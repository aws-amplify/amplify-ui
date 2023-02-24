import { FileUploaderDisplayText } from '../displayText';
import { FileState } from '../types';

export interface UploadMessageProps
  extends Pick<
    FileUploaderDisplayText,
    'getUploadingText' | 'getPausedText' | 'uploadSuccessfulText'
  > {
  fileState: FileState;
  errorMessage: string;
  percentage?: number;
}
