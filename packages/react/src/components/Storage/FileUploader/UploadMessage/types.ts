import { FileUploaderDisplayText } from '../displayText';
import { FileState } from '../types';

export interface UploadMessageProps {
  fileState: FileState;
  errorMessage: string;
  percentage?: number;
  displayText: Pick<
    FileUploaderDisplayText,
    'uploading' | 'paused' | 'uploadSuccessful'
  >;
}
