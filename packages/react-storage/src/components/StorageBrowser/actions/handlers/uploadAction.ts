import {
  DataTaskAction,
  DataTaskActionInput,
  DataTaskActionOutput,
} from '../types';

export interface UploadActionOptions {
  onProgress?: (key: string, progress: number) => void;
  preventOverwrite?: boolean;
}
export interface UploadActionInput
  extends DataTaskActionInput<File, UploadActionOptions> {}
export interface UploadActionOutput extends DataTaskActionOutput {}

export interface UploadAction extends DataTaskAction<UploadActionInput> {}

export const uploadAction: UploadAction = null as unknown as UploadAction;
