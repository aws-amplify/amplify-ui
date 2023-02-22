import { FileState } from '../types';

export interface UploadMessageProps {
  fileState: FileState;
  errorMessage: string;
  percentage?: number;
}
