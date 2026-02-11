import React from 'react';
import type { ActionInputConfig, LocationItemData } from '../../../actions';
import type { ActionConfirmationModalProps } from '../../../components/composables/ActionConfirmationModal';
import { getSelectedFolders } from '../../../locationItems/utils';

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
  folders: LocationItemData[],
  folderListTitle: string
): React.JSX.Element => {
  return (
    <>
      <TextElement className="amplify-modal__list-title">
        <strong>{folderListTitle}</strong>
      </TextElement>
      <UnorderedListElement className="amplify-modal__list">
        {folders.map((folder) => (
          <ListItemElement key={folder.id} className="amplify-modal__list-item">
            {getFolderName(folder.key)}
          </ListItemElement>
        ))}
      </UnorderedListElement>
    </>
  );
};

export const createDeleteConfirmationModalProps = ({
  items,
  showConfirmation,
  displayText,
}: {
  items: LocationItemData[];
  showConfirmation: boolean;
  displayText: {
    confirmationModalTitle: string;
    confirmationModalConfirmLabel: string;
    confirmationModalCancelLabel: string;
    confirmationModalMessage: string;
    confirmationModalFolderListTitle: string;
  };
}): Omit<ActionConfirmationModalProps, 'onConfirm' | 'onCancel'> => {
  const folders = getSelectedFolders(items);
  const folderCount = folders.length;

  return {
    isOpen: showConfirmation,
    title: displayText.confirmationModalTitle,
    message: displayText.confirmationModalMessage
      .replace('{count}', folderCount.toString())
      .replace('{plural}', folderCount !== 1 ? 's' : ''),
    confirmLabel: displayText.confirmationModalConfirmLabel,
    cancelLabel: displayText.confirmationModalCancelLabel,
    content: createFolderListContent(
      folders,
      displayText.confirmationModalFolderListTitle
    ),
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
