import { DEFAULT_ACTION_VIEW_DISPLAY_TEXT } from './shared';
import type { DefaultDeleteViewDisplayText } from '../../types';

const pluralize = (count: number, word: string) =>
  count === 1 ? word : `${word}s`;

const formatCount = (count: number, word: string) =>
  `${count === 1 ? '' : 'All '}${count} ${pluralize(count, word)}`;

export const DEFAULT_DELETE_VIEW_DISPLAY_TEXT: DefaultDeleteViewDisplayText = {
  ...DEFAULT_ACTION_VIEW_DISPLAY_TEXT,
  title: 'Delete',
  actionStartLabel: 'Delete',
  getActionCompleteMessage: (data) => {
    const { counts, tasks } = data ?? {};
    const { COMPLETE = 0, FAILED = 0, TOTAL = 0 } = counts ?? {};

    if (!TOTAL || TOTAL === 0) {
      return { content: 'No items to delete.', type: 'info' };
    }

    if (tasks && tasks.length > 0) {
      const folderTasks = tasks.filter((task) => task.data.type === 'FOLDER');
      const fileTasks = tasks.filter((task) => task.data.type === 'FILE');

      const completeFolders = folderTasks.filter(
        (task) => task.status === 'COMPLETE'
      ).length;
      const failedFolders = folderTasks.filter(
        (task) => task.status === 'FAILED'
      ).length;
      const completeFiles = fileTasks.filter(
        (task) => task.status === 'COMPLETE'
      ).length;
      const failedFiles = fileTasks.filter(
        (task) => task.status === 'FAILED'
      ).length;

      const hasFolders = folderTasks.length > 0;
      const hasFiles = fileTasks.length > 0;
      const isMixed = hasFolders && hasFiles;

      // All successful
      if (COMPLETE === TOTAL) {
        if (isMixed) {
          return {
            content: `${formatCount(
              completeFolders,
              'folder'
            )} and ${completeFiles} ${pluralize(
              completeFiles,
              'file'
            )} deleted successfully.`,
            type: 'success',
          };
        } else if (hasFolders) {
          return {
            content: `${formatCount(
              completeFolders,
              'folder'
            )} deleted successfully.`,
            type: 'success',
          };
        } else {
          return {
            content: `${formatCount(
              completeFiles,
              'file'
            )} deleted successfully.`,
            type: 'success',
          };
        }
      }

      // Complete failure
      if (FAILED === TOTAL) {
        if (isMixed) {
          return {
            content: `Failed to delete ${failedFolders} ${pluralize(
              failedFolders,
              'folder'
            )} and ${failedFiles} ${pluralize(
              failedFiles,
              'file'
            )}. Some contents may have been deleted.`,
            type: 'error',
          };
        } else if (hasFolders) {
          return {
            content: `Failed to delete ${failedFolders} ${pluralize(
              failedFolders,
              'folder'
            )}. Some items may have been deleted.`,
            type: 'error',
          };
        } else {
          return {
            content: `Failed to delete ${failedFiles} ${pluralize(
              failedFiles,
              'file'
            )}.`,
            type: 'error',
          };
        }
      }

      // Partial failure
      if (isMixed) {
        const messages = [];
        if (completeFiles > 0) {
          messages.push(
            `${completeFiles} ${pluralize(completeFiles, 'file')} deleted`
          );
        }
        if (completeFolders > 0) {
          messages.push(
            `${completeFolders} ${pluralize(completeFolders, 'folder')} deleted`
          );
        }
        if (failedFiles > 0) {
          messages.push(
            `${failedFiles} ${pluralize(failedFiles, 'file')} failed`
          );
        }
        if (failedFolders > 0) {
          messages.push(
            `${failedFolders} ${pluralize(failedFolders, 'folder')} failed`
          );
        }

        return {
          content: messages.join(', ') + '. Some items may have been deleted.',
          type: 'error',
        };
      } else if (hasFolders) {
        // Folders only partial failure
        if (completeFolders > 0) {
          return {
            content: `${completeFolders} ${pluralize(
              completeFolders,
              'folder'
            )} deleted, ${failedFolders} ${pluralize(
              failedFolders,
              'folder'
            )} failed. Some items may have been deleted.`,
            type: 'error',
          };
        } else {
          return {
            content: `Failed to delete ${failedFolders} ${pluralize(
              failedFolders,
              'folder'
            )}. Some items may have been deleted.`,
            type: 'error',
          };
        }
      } else {
        // Files only partial failure
        return {
          content: `${completeFiles} ${pluralize(
            completeFiles,
            'file'
          )} deleted, ${failedFiles} ${pluralize(failedFiles, 'file')} failed.`,
          type: 'error',
        };
      }
    }

    // Fallback to generic messaging if tasks not available
    if (COMPLETE === TOTAL) {
      return {
        content: `${formatCount(TOTAL, 'item')} deleted successfully.`,
        type: 'success',
      };
    }
    if (FAILED === TOTAL) {
      return {
        content: `Failed to delete ${formatCount(TOTAL, 'item')}.`,
        type: 'error',
      };
    }
    return {
      content: `${COMPLETE} ${pluralize(
        COMPLETE,
        'item'
      )} deleted, ${FAILED} ${pluralize(FAILED, 'item')} failed to delete.`,
      type: 'error',
    };
  },
};
