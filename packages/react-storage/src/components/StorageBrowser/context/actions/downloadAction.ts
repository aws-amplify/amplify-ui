import { downloadData, DownloadDataWithPathInput } from 'aws-amplify/storage';

export interface DownloadActionInput extends DownloadDataWithPathInput {}

export function downloadAction(input: DownloadActionInput): void {
  downloadData(input);
}
