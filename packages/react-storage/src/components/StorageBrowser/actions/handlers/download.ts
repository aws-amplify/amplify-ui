import { TaskHandler, TaskHandlerInput, TaskHandlerOutput } from '../types';

interface DownloadHandlerData {
  key: string;
}
interface DownloadHandlerOptions {
  onProgress?: (progress: number) => void;
}
export interface DownloadHandlerInput
  extends TaskHandlerInput<DownloadHandlerData, DownloadHandlerOptions> {}
export interface DownloadHandlerOutput extends TaskHandlerOutput {}

export interface DownloadHandler extends TaskHandler<DownloadHandlerInput> {}

export const downloadHandler: DownloadHandler =
  null as unknown as DownloadHandler;
