import {
  DataTaskAction,
  DataTaskActionInput,
  DataTaskActionOutput,
} from '../types';

interface DownloadActionData {
  key: string;
}
interface DownloadActionOptions {
  onProgress?: (progress: number) => void;
}
export interface DownloadActionInput
  extends DataTaskActionInput<DownloadActionData, DownloadActionOptions> {}
export interface DownloadActionOutput extends DataTaskActionOutput {}

export interface DownloadAction extends DataTaskAction<DataTaskActionInput> {}

export const downloadAction: DownloadAction = null as unknown as DownloadAction;
