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

export interface UploadHandlerOptions extends TaskHandlerOptions {
  preventOverwrite?: boolean;
}

export interface UploadHandlerData extends TaskData {
  file: File;
}

export interface UploadHandlerInput
  extends TaskHandlerInput<UploadHandlerData, UploadHandlerOptions> {
  destinationPrefix: string;
}

export interface UploadHandlerOutput extends TaskHandlerOutput {}

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

export const uploadHandler: UploadHandler = ({
  config,
  data,
  destinationPrefix,
  options,
}) => {
  const { accountId, credentials, customEndpoint } = config;
  const { key, file } = data;
  const { onProgress, preventOverwrite } = options ?? {};

  const input: UploadDataInput = {
    path: `${destinationPrefix}${key}`,
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
      checksumAlgorithm: 'crc-32',
    },
  };

  const { cancel, pause, resume, result } = uploadData(input);

  return {
    ...(file.size > MULTIPART_UPLOAD_THRESHOLD_BYTES
      ? { cancel, pause, resume }
      : UNDEFINED_CALLBACKS),
    result: result
      .then(() => ({ status: 'COMPLETE' as const }))
      .catch((error: Error) => {
        const { message } = error;
        if (error.name === 'PreconditionFailed') {
          return { message, status: 'OVERWRITE_PREVENTED' as const };
        }
        return {
          message,
          status: isCancelError(error) ? 'CANCELED' : 'FAILED',
        };
      }),
  };
};
