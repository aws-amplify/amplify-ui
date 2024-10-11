import {
  CancelableTaskActionOutput,
  TaskAction,
  TaskActionInput,
} from '../types';

export interface UploadActionOptions {
  onProgress?: (key: string, progress: number) => void;
  preventOverwrite?: boolean;
}
export interface UploadActionInput
  extends TaskActionInput<File, UploadActionOptions> {}
export interface UploadActionOutput extends CancelableTaskActionOutput {}

export interface UploadAction
  extends TaskAction<UploadActionInput, UploadActionOutput> {}

export const uploadAction: UploadAction = null as unknown as UploadAction;
