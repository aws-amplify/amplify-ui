import { TaskAction, TaskActionInput, TaskActionOutput } from '../types';

interface DownloadActionData {
  key: string;
}
interface DownloadActionOptions {
  onProgress?: (progress: number) => void;
}
export interface DownloadActionInput
  extends TaskActionInput<DownloadActionData, DownloadActionOptions> {}
export interface DownloadActionOutput extends TaskActionOutput {}

export interface DownloadAction extends TaskAction<DownloadActionInput> {}

export const downloadAction: DownloadAction = null as unknown as DownloadAction;
