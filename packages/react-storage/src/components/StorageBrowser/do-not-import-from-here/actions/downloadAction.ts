import { getUrl } from '../../storage-internal';

import { DownloadActionInput, DownloadActionOutput } from '../types';

export async function downloadAction(
  _: DownloadActionOutput,
  input: DownloadActionInput
): Promise<DownloadActionOutput> {
  const { config, key: path } = input ?? {};
  const {
    accountId,
    bucket: bucketName,
    credentialsProvider,
    region,
    customEndpoint,
  } = (typeof config === 'function' ? config() : config) ?? {};

  const bucket = bucketName && region ? { bucketName, region } : undefined;

  try {
    const signedUrl = await getUrl({
      path,
      options: {
        bucket,
        expectedBucketOwner: accountId,
        locationCredentialsProvider: credentialsProvider,
        validateObjectExistence: true,
        contentDisposition: 'attachment',
        customEndpoint,
      },
    });

    return { signedUrl: signedUrl.url.toString() };
  } catch (e) {
    // @TODO: update UI to let user know that the file no longer exists?
    return Promise.reject(e);
  }
}
