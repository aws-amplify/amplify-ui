import { downloadData } from 'aws-amplify/storage';

import { DownloadActionInput, DownloadActionOutput } from '../types';

export function downloadAction(
  _: DownloadActionOutput,
  input: DownloadActionInput
): Promise<DownloadActionOutput> {
  const { config, key: path } = input ?? {};
  const {
    bucket: bucketName,
    credentialsProvider,
    region,
  } = (typeof config === 'function' ? config() : config) ?? {};

  const bucket = bucketName && region ? { bucketName, region } : undefined;

  downloadData({
    path,
    options: {
      bucket,
      locationCredentialsProvider: credentialsProvider,
    },
  });
  return Promise.resolve({ key: path });
}
