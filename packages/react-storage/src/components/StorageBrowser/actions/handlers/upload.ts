import { uploadData, UploadDataInput } from '../../storage-internal';
import { isFunction } from '@aws-amplify/ui';

import {
  CancelableTaskHandlerOutput,
  TaskHandler,
  TaskHandlerInput,
  TaskHandlerOptions,
} from '../types';

import { constructBucket, resolveHandlerResult } from './utils';

export interface UploadHandlerOptions extends TaskHandlerOptions {
  onCancel?: (key: string) => void;
  onProgress?: (key: string, progress: number | undefined) => void;
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

export const UNDEFINED_CALLBACKS = {
  cancel: undefined,
  pause: undefined,
  resume: undefined,
};

export const uploadHandler: UploadHandler = ({
  config: _config,
  data: _data,
  options: _options,
  prefix,
}) => {
  const { credentials, ...config } = _config;
  const { key, payload: data } = _data;
  const { onProgress, preventOverwrite, ...options } = _options ?? {};

  const bucket = constructBucket(config);

  const input: UploadDataInput = {
    path: `${prefix}${key}`,
    data,
    options: {
      bucket,
      locationCredentialsProvider: credentials,
      onProgress: ({ totalBytes, transferredBytes }) => {
        if (isFunction(onProgress))
          onProgress(
            key,
            totalBytes ? transferredBytes / totalBytes : undefined
          );
      },
      preventOverwrite,
    },
  };

  const { cancel, pause, resume, result } = uploadData(input);

  return {
    ...(data.size > MULTIPART_UPLOAD_THRESHOLD_BYTES
      ? { cancel, pause, resume }
      : UNDEFINED_CALLBACKS),
    key,
    result: resolveHandlerResult({ result, key, isCancelable: true, options }),
  };
};
