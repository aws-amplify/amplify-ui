import { isCancelError } from 'aws-amplify/storage';
import { isFunction } from '@aws-amplify/ui';

import { uploadData, UploadDataInput } from '../../storage-internal';

import {
  TaskData,
  TaskHandler,
  TaskHandlerInput,
  TaskHandlerOutput,
  TaskHandlerOptions,
} from './types';

import { constructBucket, getProgress } from './utils';
import { DEFAULT_CHECKSUM_ALGORITHM } from './constants';

export interface UploadHandlerOptions
  extends TaskHandlerOptions<{ key: string }> {}

export interface UploadHandlerData extends TaskData {
  file: File;
  preventOverwrite?: boolean;
}

export interface UploadHandlerInput
  extends TaskHandlerInput<UploadHandlerData, UploadHandlerOptions> {}

export interface UploadHandlerOutput
  extends TaskHandlerOutput<{ key: string }> {}

export interface UploadHandler
  extends TaskHandler<UploadHandlerInput, UploadHandlerOutput> {}

// 5MB for multipart upload
// https://github.com/aws-amplify/amplify-js/blob/1a5366d113c9af4ce994168653df3aadb142c581/packages/storage/src/providers/s3/utils/constants.ts#L16
export const MULTIPART_UPLOAD_THRESHOLD_BYTES = 5 * 1024 * 1024;

export const UNDEFINED_CALLBACKS = {
  cancel: undefined,
  pause: undefined,
  resume: undefined,
};

export const uploadHandler: UploadHandler = ({ config, data, options }) => {
  const { accountId, credentials, customEndpoint } = config;
  const { id, key, file, preventOverwrite } = data;
  const { onProgress, onError } = options ?? {};

  const input: UploadDataInput = {
    path: key,
    data: file,
    options: {
      bucket: constructBucket(config),
      expectedBucketOwner: accountId,
      locationCredentialsProvider: credentials,
      onProgress: (event) => {
        if (isFunction(onProgress)) onProgress(data, getProgress(event));
      },
      preventOverwrite,
      customEndpoint,
      checksumAlgorithm: DEFAULT_CHECKSUM_ALGORITHM,
    },
  };

  const { cancel, pause, resume, result } = uploadData(input);

  return {
    ...(file.size > MULTIPART_UPLOAD_THRESHOLD_BYTES
      ? { cancel, pause, resume }
      : UNDEFINED_CALLBACKS),
    result: result
      .then((output) => ({
        status: 'COMPLETE' as const,
        value: { key: output.path },
      }))
      .catch((error: Error) => {
        if (onError) {
          // eslint-disable-next-line no-console
          console.log('in upload handler', error);
          onError({ key, id }, error.message, error);
        }
        const { message } = error;
        if (error.name === 'PreconditionFailed') {
          return { message, status: 'OVERWRITE_PREVENTED' };
        }
        return {
          message,
          status: isCancelError(error) ? 'CANCELED' : 'FAILED',
        };
      }),
  };
};
