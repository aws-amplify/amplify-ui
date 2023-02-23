import { DisplayText } from '../displayText';
import { FileState } from '../types';

export interface UploadMessageProps {
  fileState: FileState;
  errorMessage: string;
  percentage?: number;
  displayText: Pick<DisplayText, 'uploading' | 'paused' | 'uploadSuccessful'>;
}
