import { FileUploaderDisplayText } from '../displayText';
import { FileState } from '../types';

export interface UploadMessageProps
  extends Pick<
    FileUploaderDisplayText,
    'uploadingText' | 'pausedText' | 'uploadSuccessfulText'
  > {
  fileState: FileState;
  errorMessage: string;
  percentage?: number;
}
