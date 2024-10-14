import { isCancelError } from 'aws-amplify/storage';
import { isFunction } from '@aws-amplify/ui';

import {
  TaskHandlerOutput,
  CancelableTaskHandlerOutput,
  TaskHandlerOptions,
  ActionInputConfig,
} from '../types';

interface TaskHandlerCallbacks
  extends Pick<TaskHandlerOptions, 'onComplete' | 'onError'> {
  onCancel?: (key: string) => void;
}

export const resolveHandlerResult = <T extends boolean>({
  result,
  key,
  isCancelable,
  options,
}: {
  result: Promise<any>;
  key: string;
  isCancelable: T;
  options?: TaskHandlerCallbacks;
}): (T extends false
  ? TaskHandlerOutput
  : CancelableTaskHandlerOutput)['result'] => {
  const { onCancel, onComplete, onError } = options ?? {};
  return result
    .then(() => {
      if (isFunction(onComplete)) onComplete(key);
      return 'COMPLETE' as const;
    })
    .catch((error: Error) => {
      if (isCancelable && isCancelError(error)) {
        if (isFunction(onCancel)) onCancel(key);
        return 'CANCELED' as const;
      }

      if (isFunction(onError)) onError(key, error.message);
      return 'FAILED' as const;
    });
};

export const constructBucket = ({
  bucket: bucketName,
  region,
}: Pick<ActionInputConfig, 'bucket' | 'region'>): {
  bucketName: string;
  region: string;
} => ({ bucketName, region });
