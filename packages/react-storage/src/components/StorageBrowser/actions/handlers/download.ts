import { getUrl } from '../../storage-internal';
import type {
  OptionalFileData,
  TaskData,
  TaskHandler,
  TaskHandlerInput,
  TaskHandlerOptions,
  TaskHandlerOutput,
} from './types';

import { constructBucket } from './utils';

export interface DownloadHandlerData extends OptionalFileData, TaskData {
  fileKey: string;
  /**
   * Zip entry path relative to the current browse-location prefix, used to
   * preserve folder structure inside a multi-file zip download. Present on
   * items produced by folder expansion (and, uniformly, on loose files where
   * it equals the basename). Absent on legacy/single-file inputs — the zip
   * handler falls back to the key basename when this is undefined.
   */
  relativePath?: string;
  /**
   * Batch-level zip base name computed by the view = the last path segment of
   * the longest common ancestor directory of all files in the download. Stamped
   * uniformly onto every item in a multi-file batch so the zip handler can name
   * the archive from `all[0].archiveName`. Ignored for single-file downloads.
   */
  archiveName?: string;
}

export interface DownloadHandlerOptions extends TaskHandlerOptions {}

export interface DownloadHandlerInput
  extends TaskHandlerInput<DownloadHandlerData, DownloadHandlerOptions> {}

export interface DownloadHandlerOutput
  extends TaskHandlerOutput<{ url: URL }> {}

export interface DownloadHandler
  extends TaskHandler<DownloadHandlerInput, DownloadHandlerOutput> {}

function downloadFromUrl(fileName: string, url: string) {
  const a = document.createElement('a');

  a.href = url;
  a.download = fileName;
  a.target = '_blank';
  document.body.appendChild(a);

  a.click();

  document.body.removeChild(a);
}

export const downloadHandler: DownloadHandler = ({
  config,
  data,
}): DownloadHandlerOutput => {
  const { accountId, credentials, customEndpoint } = config;
  const { key } = data;

  const result = getUrl({
    path: key,
    options: {
      bucket: constructBucket(config),
      customEndpoint,
      locationCredentialsProvider: credentials,
      validateObjectExistence: true,
      contentDisposition: 'attachment',
      expectedBucketOwner: accountId,
    },
  })
    .then(({ url }) => {
      downloadFromUrl(key, url.toString());
      return { status: 'COMPLETE' as const, value: { url } };
    })
    .catch((error: Error) => {
      const { message } = error;
      return { error, message, status: 'FAILED' as const };
    });

  return { result };
};
