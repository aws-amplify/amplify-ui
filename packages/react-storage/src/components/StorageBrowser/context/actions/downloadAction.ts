import {
  downloadData,
  DownloadDataWithPathInput,
  DownloadDataWithPathOutput,
} from 'aws-amplify/storage';

export interface DownloadActionInput extends DownloadDataWithPathInput {}
export interface DownloadActionOutput extends DownloadDataWithPathOutput {}

export function downloadAction(
  prevState: undefined,
  input: DownloadActionInput
): DownloadActionOutput {
  return downloadData(input);
}
