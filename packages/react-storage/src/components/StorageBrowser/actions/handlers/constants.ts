export const DEFAULT_CHECKSUM_ALGORITHM = 'crc-32';

// 5MiB for multipart upload
// https://github.com/aws-amplify/amplify-js/blob/1a5366d113c9af4ce994168653df3aadb142c581/packages/storage/src/providers/s3/utils/constants.ts#L16
export const MULTIPART_UPLOAD_THRESHOLD_BYTES = 5 * 1024 * 1024;
