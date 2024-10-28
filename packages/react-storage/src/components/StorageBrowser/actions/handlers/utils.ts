import { isCancelError } from 'aws-amplify/storage';
import { isFunction } from '@aws-amplify/ui';

import { LocationAccess, LocationData } from './types';

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

export const parseLocationAccess = (location: LocationAccess): LocationData => {
  const { permission, scope, type } = location;
  if (!scope.startsWith('s3://')) {
    throw new Error(`Invalid scope: ${scope}`);
  }

  const id = crypto.randomUUID();

  // remove default path
  const slicedScope = scope.slice(5);
  let bucket, prefix;

  switch (type) {
    case 'BUCKET': {
      // { scope: 's3://bucket/*', type: 'BUCKET', },
      bucket = slicedScope.slice(0, -2);
      prefix = '';
      break;
    }
    case 'PREFIX': {
      // { scope: 's3://bucket/path/*', type: 'PREFIX', },
      bucket = slicedScope.slice(0, slicedScope.indexOf('/'));
      prefix = `${slicedScope.slice(bucket.length + 1, -1)}`;

      break;
    }
    case 'OBJECT': {
      // { scope: 's3://bucket/path/to/object', type: 'OBJECT', },
      bucket = slicedScope.slice(0, slicedScope.indexOf('/'));
      prefix = slicedScope.slice(bucket.length + 1);
      break;
    }
    default: {
      throw new Error(`Invalid location type: ${type}`);
    }
  }

  return { bucket, id, permission, prefix, type };
};
