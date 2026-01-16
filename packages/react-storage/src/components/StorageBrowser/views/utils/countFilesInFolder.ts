import type { ActionInputConfig } from '../../actions';
import { constructBucket } from '../../actions/handlers/utils';
import { list } from '../../storage-internal';

/**
 * Maximum number of files to count before showing "+" notation
 * This prevents expensive operations on very large folders
 */
const MAX_FILE_COUNT_LIMIT = 5000;
const LIST_PAGE_SIZE = 1000;

/**
 * Count the total number of files in a folder with pagination and limits
 * @param folderKey - The folder path to count files in
 * @param config - Storage configuration
 * @returns Promise<number | string> - File count or "5000+" if exceeds limit
 */
export const countFilesInFolder = async (
  folderKey: string,
  config: ActionInputConfig
): Promise<number | string> => {
  try {
    const { accountId, credentials, customEndpoint } = config;
    const bucket = constructBucket(config);

    let fileCount = 0;
    let nextToken: string | undefined;
    let hasMoreItems = true;

    while (hasMoreItems && fileCount < MAX_FILE_COUNT_LIMIT) {
      const { items, nextToken: listNextToken } = await list({
        path: folderKey,
        options: {
          bucket,
          locationCredentialsProvider: credentials,
          expectedBucketOwner: accountId,
          customEndpoint,
          pageSize: LIST_PAGE_SIZE,
          nextToken,
        },
      });

      const batchFileCount = items.filter(
        (item) => !item.path.endsWith('/')
      ).length;

      fileCount += batchFileCount;
      nextToken = listNextToken;
      hasMoreItems = !!nextToken;

      if (fileCount >= MAX_FILE_COUNT_LIMIT) {
        return `${MAX_FILE_COUNT_LIMIT}+`;
      }
    }

    if (hasMoreItems) {
      return `${fileCount}+`;
    }

    return fileCount;
  } catch (error) {
    return 0;
  }
};
