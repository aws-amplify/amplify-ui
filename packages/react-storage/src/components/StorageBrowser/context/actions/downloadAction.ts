import { downloadData, DownloadDataWithPathInput } from 'aws-amplify/storage';

export interface DownloadActionInput extends DownloadDataWithPathInput {}

export function downloadAction(
  prevState: undefined,
  input: DownloadActionInput
): void {
  downloadData(input);
}
