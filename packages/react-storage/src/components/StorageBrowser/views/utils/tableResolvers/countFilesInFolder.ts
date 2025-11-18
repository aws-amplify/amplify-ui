/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { constructBucket } from '../../../actions/handlers/utils';
import { list } from '../../../storage-internal';

/**
 * Count the total number of files in a folder
 */
export const countFilesInFolder = async (
  folderKey: string,
  config: any
): Promise<number> => {
  try {
    const { accountId, credentials, customEndpoint } = config;
    const bucket = constructBucket(config);
    const listResult = await list({
      path: folderKey,
      options: {
        bucket,
        locationCredentialsProvider: credentials,
        expectedBucketOwner: accountId,
        customEndpoint,
        listAll: true,
      },
    });

    // Count only files, not folders
    const fileCount = listResult.items.filter(
      (item) => !item.path.endsWith('/')
    ).length;
    return fileCount;
  } catch (error) {
    console.log(
      '[counter] Initializing folder counts error in countFilesInFolder',
      error
    );
    return 0;
  }
};
