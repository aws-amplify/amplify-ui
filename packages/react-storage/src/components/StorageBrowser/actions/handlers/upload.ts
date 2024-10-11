import {
  CancelableTaskHandlerOutput,
  TaskHandler,
  TaskHandlerInput,
  TaskHandlerOptions,
} from '../types';

export interface UploadHandlerOptions extends TaskHandlerOptions {
  onCancel?: (key: string) => void;
  onProgress?: (key: string, progress: number | undefined) => void;
  preventOverwrite?: boolean;
}

export interface UploadHandlerInput
  extends TaskHandlerInput<File, UploadHandlerOptions> {}
export interface UploadHandlerOutput extends CancelableTaskHandlerOutput {}

export interface UploadHandler
  extends TaskHandler<UploadHandlerInput, UploadHandlerOutput> {}

export const uploadHandler = null as unknown as UploadHandler;
