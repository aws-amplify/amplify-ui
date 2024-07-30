import { downloadData, TransferProgressEvent } from 'aws-amplify/storage';

interface AWSCredentials {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken?: string;
  expiration?: Date;
}

type LocationCredentialsProvider = (options?: {
  forceRefresh?: boolean;
}) => Promise<{
  credentials: AWSCredentials;
}>;
interface BucketInfo {
  bucketName: string;
  region: string;
}
type StorageBucket = string | BucketInfo;

interface BytesRangeOptions {
  bytesRange?: {
    start: number;
    end: number;
  };
}

interface TransferOptions {
  onProgress?(event: TransferProgressEvent): void;
}

interface CommonOptions {
  locationCredentialsProvider?: LocationCredentialsProvider;
  bucket?: StorageBucket;
}

type DownloadDataOptionsWithPath = CommonOptions &
  TransferOptions &
  BytesRangeOptions;

type ResponseBodyMixin = Pick<Body, 'blob' | 'json' | 'text'>;

export type TransferTaskState =
  | 'IN_PROGRESS'
  | 'PAUSED'
  | 'CANCELED'
  | 'SUCCESS'
  | 'ERROR';

interface StorageDownloadDataOutputWithPath {
  body: ResponseBodyMixin;
  path: string;
  versionId?: string;
  contentType?: string;
}

export interface DownloadActionInput {
  path: string | (({ identityId }: { identityId?: string }) => string);
  options?: DownloadDataOptionsWithPath;
}

export interface DownloadDataWithPathOutput {
  result: Promise<StorageDownloadDataOutputWithPath>;
  state: TransferTaskState;
  cancel(message?: string): void;
}

export function downloadAction(
  prevInput: DownloadDataWithPathOutput,
  input: DownloadActionInput
): DownloadDataWithPathOutput {
  return downloadData(input);
}
