import type { ActionInputConfig, LocationItemData } from '../../../actions';
import type { ActionConfirmationModalProps } from '../../../components/composables/ActionConfirmationModal';
import { getSelectedFolders } from '../../../locationItems/utils';
import { countFilesInFolder } from '../../utils/countFilesInFolder';

export const createDeleteConfirmationModalProps = (
  items: LocationItemData[],
  showConfirmation: boolean
): ActionConfirmationModalProps => {
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
    content: null,
  };
};

export const enhanceItemsWithFolderCounts = async (
  dataItems: LocationItemData[],
  config: ActionInputConfig
): Promise<LocationItemData[]> => {
  return Promise.all(
    dataItems.map(async (item) => {
      if (item?.type === 'FOLDER') {
        try {
          const totalCount = await countFilesInFolder(item.key, config);
          return {
            ...item,
            totalCount,
          };
        } catch (error) {
          return {
            ...item,
            totalCount: 0,
          };
        }
      }
      return item;
    })
  );
};
