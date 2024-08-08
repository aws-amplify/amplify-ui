import { getUrl } from 'aws-amplify/storage';

import { DownloadActionInput, DownloadActionOutput } from '../types';

export async function downloadAction(
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

  try {
    const signedUrl = await getUrl({
      path,
      options: {
        bucket,
        locationCredentialsProvider: credentialsProvider,
        validateObjectExistence: true,
      },
    });

    return { signedUrl: signedUrl.url.toString() };
  } catch (e) {
    // @TODO: update UI to let user know that the file no longer exists?
    return Promise.reject(e);
  }
}
