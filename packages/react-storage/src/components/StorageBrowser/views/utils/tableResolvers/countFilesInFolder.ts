import { list } from '@aws-amplify/storage';

/**
 * Count the total number of files in a folder
 */
export const countFilesInFolder = async (
  folderPath: string
): Promise<number> => {
  try {
    const listResult = await list({
      path: folderPath,
      options: {
        listAll: true,
      },
    });

    // Count only files, not folders
    const fileCount = listResult.items.filter(
      (item) => !item.path.endsWith('/')
    ).length;
    return fileCount;
  } catch (error) {
    return 0;
  }
};
