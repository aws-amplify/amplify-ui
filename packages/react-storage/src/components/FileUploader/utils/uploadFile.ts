import type {
  UploadDataInput,
  UploadDataWithPathOutput,
  UploadDataWithPathInput,
  UploadDataOutput,
} from 'aws-amplify/storage';
import { uploadData } from 'aws-amplify/storage';
import { isFunction } from '@aws-amplify/ui';

/**
 * Callback provided an input containing the current `identityId`
 *
 * @param {{identityId: string | undefined}} input - Input parameters
 * @returns target S3 bucket key
 */
export type PathCallback = (input: {
  identityId: string | undefined;
}) => string;

export type UploadTask = UploadDataOutput | UploadDataWithPathOutput;
export interface TaskEvent {
  id: string;
  uploadTask: UploadTask;
}

// omit `path` callback, `path` must always be a string to support resolving
// `path` callback with `fileKey` and `identityId`
export type PathInput = Omit<UploadDataWithPathInput, 'path'> & {
  path: string;
};

export type TaskHandler = (event: TaskEvent) => void;
export interface UploadFileProps {
  input: () => Promise<PathInput | UploadDataInput>;
  onComplete?: (
    result: Awaited<(UploadDataWithPathOutput | UploadDataOutput)['result']>
  ) => void;
  onError?: (event: { key: string; error: Error }) => void;
  onStart?: (event: { key: string; uploadTask: UploadTask }) => void;
}

type UploadData = (
  input: PathInput | UploadDataInput
) => UploadDataWithPathOutput | UploadDataOutput;

export async function uploadFile({
  input,
  onError,
  onStart,
  onComplete,
}: UploadFileProps): Promise<UploadDataWithPathOutput | UploadDataOutput> {
  const resolvedInput = await input();
  const uploadTask = (uploadData as UploadData)(resolvedInput);

  const key =
    (resolvedInput as { key: string })?.key ??
    (resolvedInput as { path: string })?.path;

  if (isFunction(onStart)) {
    onStart({ key, uploadTask });
  }

  uploadTask.result
    .then((result) => {
      if (isFunction(onComplete) && uploadTask.state === 'SUCCESS') {
        onComplete(result);
      }
    })
    .catch((error: Error) => {
      if (isFunction(onError)) {
        onError({ key, error });
      }
    });
  return uploadTask;
}
