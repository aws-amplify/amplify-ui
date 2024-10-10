import {
  isCancelError,
  uploadData,
  UploadDataWithPathInput,
} from 'aws-amplify/storage';
import { isFunction } from '@aws-amplify/ui';

import {
  CancelableTaskHandlerOutput,
  TaskHandler,
  TaskHandlerInput,
} from '../types';

export interface UploadHandlerOptions {
  onProgress?: (key: string, progress: number) => void;
  preventOverwrite?: boolean;
}

export interface UploadHandlerInput
  extends TaskHandlerInput<File, UploadHandlerOptions> {}
export interface UploadHandlerOutput extends CancelableTaskHandlerOutput {}

export interface UploadHandler
  extends TaskHandler<UploadHandlerInput, UploadHandlerOutput> {}

// 5MB for multipart upload
// https://github.com/aws-amplify/amplify-js/blob/1a5366d113c9af4ce994168653df3aadb142c581/packages/storage/src/providers/s3/utils/constants.ts#L16
export const MULTIPART_UPLOAD_THRESHOLD_BYTES = 5 * 1024 * 1024;

const UNDEFINED_CALLBACKS = {
  cancel: undefined,
  pause: undefined,
  resume: undefined,
};

export const uploadHandler: UploadHandler = ({
  config,
  key,
  data,
  options,
  prefix,
}) => {
  const { bucket: bucketName, credentials, region } = config;
  const { onProgress } = options ?? {};

  const isMultipart = data.size > MULTIPART_UPLOAD_THRESHOLD_BYTES;

  const input: UploadDataWithPathInput = {
    path: `${prefix}${key}`,
    data,
    options: {
      ...options,
      bucket: { bucketName, region },
      locationCredentialsProvider: credentials,
      onProgress: ({ totalBytes, transferredBytes }) => {
        if (isFunction(onProgress))
          onProgress(key, totalBytes ? transferredBytes / totalBytes : 0);
      },
    },
  };

  const { cancel, pause, resume, result: _result } = uploadData(input);

  const result = _result
    .then(() => 'COMPLETE' as const)
    .catch((error: Error) => {
      if (isCancelError(error)) {
        return 'CANCELED' as const;
      }
      return 'FAILED' as const;
    });

  const callbacks = !isMultipart
    ? UNDEFINED_CALLBACKS
    : { cancel, pause, resume };

  return { ...callbacks, key, result };
};
