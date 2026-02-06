import React from 'react';
import type { ActionInputConfig, LocationItemData } from '../../../actions';
import type { ActionConfirmationModalProps } from '../../../components/composables/ActionConfirmationModal';
import { getSelectedFolders } from '../../../locationItems/utils';
import { STORAGE_BROWSER_BLOCK } from '../../../components/base';
import {
  TextElement,
  UnorderedListElement,
  ListItemElement,
} from '../../../components/elements';
import { constructBucket } from '../../../actions/handlers';
import { list } from '../../../storage-internal';

export const getFolderName = (folderKey: string): string => {
  return folderKey.replace(/\/$/, '').split('/').pop() ?? folderKey;
};

/**
 * Creates JSX content showing a list of folders to be deleted
 */
export const createFolderListContent = (
  folders: LocationItemData[]
): React.JSX.Element => {
  return (
    <>
      <TextElement
        className={`${STORAGE_BROWSER_BLOCK}__modal-folder-list-title`}
      >
        <strong>Folder list:</strong>
      </TextElement>
      <UnorderedListElement
        className={`${STORAGE_BROWSER_BLOCK}__modal-folder-list`}
      >
        {folders.map((folder) => (
          <ListItemElement
            key={folder.id}
            className={`${STORAGE_BROWSER_BLOCK}__modal-folder-list-item`}
          >
            {getFolderName(folder.key)}
          </ListItemElement>
        ))}
      </UnorderedListElement>
    </>
  );
};

export const createDeleteConfirmationModalProps = (
  items: LocationItemData[],
  showConfirmation: boolean
): Omit<ActionConfirmationModalProps, 'onConfirm' | 'onCancel'> => {
  const folders = getSelectedFolders(items);
  const folderCount = folders.length;

  return {
    isOpen: showConfirmation,
    title: 'Confirm Deletion',
    message: `The items that will be deleted contain ${folderCount} folder${
      folderCount !== 1 ? 's' : ''
    }`,
    confirmLabel: 'Delete',
    cancelLabel: 'Cancel',
    content: createFolderListContent(folders),
  };
};

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
