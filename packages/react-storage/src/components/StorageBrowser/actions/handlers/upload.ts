import { isCancelError } from 'aws-amplify/storage';
import { isFunction } from '@aws-amplify/ui';

import type { UploadDataInput } from '../../storage-internal';
import { uploadData } from '../../storage-internal';

import type {
  TaskData,
  TaskHandler,
  TaskHandlerInput,
  TaskHandlerOutput,
  TaskHandlerOptions,
} from './types';

import { constructBucket, getProgress, isMultipartUpload } from './utils';
import { DEFAULT_CHECKSUM_ALGORITHM } from './constants';

export interface UploadHandlerOptions extends TaskHandlerOptions {}

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

export const UNDEFINED_CALLBACKS = {
  cancel: undefined,
  pause: undefined,
  resume: undefined,
};

export const uploadHandler: UploadHandler = ({ config, data, options }) => {
  const { accountId, credentials, customEndpoint } = config;
  const { key, file, preventOverwrite } = data;
  const { onProgress } = options ?? {};

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
    ...(isMultipartUpload(file)
      ? { cancel, pause, resume }
      : UNDEFINED_CALLBACKS),
    result: result
      .then((output) => ({
        status: 'COMPLETE' as const,
        value: { key: output.path },
      }))
      .catch((error: Error) => {
        const { message } = error;
        if (error.name === 'PreconditionFailed') {
          return { error, message, status: 'OVERWRITE_PREVENTED' };
        }

        const status = isCancelError(error) ? 'CANCELED' : 'FAILED';
        return { error, message, status };
      }),
  };
};
