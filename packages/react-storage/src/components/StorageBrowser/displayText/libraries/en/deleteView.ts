import { DEFAULT_ACTION_VIEW_DISPLAY_TEXT } from './shared';
import type { DefaultDeleteViewDisplayText } from '../../types';

export const DEFAULT_DELETE_VIEW_DISPLAY_TEXT: DefaultDeleteViewDisplayText = {
  ...DEFAULT_ACTION_VIEW_DISPLAY_TEXT,
  title: 'Delete',
  actionStartLabel: 'Delete',
  getActionCompleteMessage: (data) => {
    const { counts, tasks } = data ?? {};
    const { COMPLETE, FAILED, TOTAL } = counts ?? {};

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
            content: `All ${completeFolders} folders and ${completeFiles} files deleted successfully.`,
            type: 'success',
          };
        } else if (hasFolders) {
          return {
            content: `All ${completeFolders} folders deleted successfully.`,
            type: 'success',
          };
        } else {
          return {
            content: `All ${completeFiles} files deleted successfully.`,
            type: 'success',
          };
        }
      }

      // Complete failure
      if (FAILED === TOTAL) {
        if (isMixed) {
          return {
            content: `Failed to delete ${failedFolders} folders and ${failedFiles} files. Some contents may have been deleted.`,
            type: 'error',
          };
        } else if (hasFolders) {
          return {
            content: `Failed to delete ${failedFolders} folders. Some items may have been deleted.`,
            type: 'error',
          };
        } else {
          return {
            content: `Failed to delete ${failedFiles} files.`,
            type: 'error',
          };
        }
      }

      // Partial failure
      if (isMixed) {
        const messages = [];
        if (completeFiles > 0) {
          messages.push(
            `${completeFiles} file${completeFiles !== 1 ? 's' : ''} deleted`
          );
        }
        if (completeFolders > 0) {
          messages.push(
            `${completeFolders} folder${
              completeFolders !== 1 ? 's' : ''
            } deleted`
          );
        }
        if (failedFiles > 0) {
          messages.push(
            `${failedFiles} file${failedFiles !== 1 ? 's' : ''} failed`
          );
        }
        if (failedFolders > 0) {
          messages.push(
            `${failedFolders} folder${failedFolders !== 1 ? 's' : ''} failed`
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
            content: `${completeFolders} folder${
              completeFolders !== 1 ? 's' : ''
            } deleted, ${failedFolders} folder${
              failedFolders !== 1 ? 's' : ''
            } failed. Some items may have been deleted.`,
            type: 'error',
          };
        } else {
          return {
            content: `Failed to delete ${failedFolders} folders. Some items may have been deleted.`,
            type: 'error',
          };
        }
      } else {
        // Files only partial failure
        return {
          content: `${completeFiles} file${
            completeFiles !== 1 ? 's' : ''
          } deleted, ${failedFiles} file${
            failedFiles !== 1 ? 's' : ''
          } failed.`,
          type: 'error',
        };
      }
    }

    // Fallback to generic messaging if tasks not available
    if (COMPLETE === TOTAL) {
      return {
        content: `All ${TOTAL} item${
          TOTAL !== 1 ? 's' : ''
        } deleted successfully.`,
        type: 'success',
      };
    }
    if (FAILED === TOTAL) {
      return {
        content: `Failed to delete all ${TOTAL} item${TOTAL !== 1 ? 's' : ''}.`,
        type: 'error',
      };
    }
    return {
      content: `${COMPLETE} item${
        COMPLETE !== 1 ? 's' : ''
      } deleted, ${FAILED} item${FAILED !== 1 ? 's' : ''} failed to delete.`,
      type: 'error',
    };
  },
};
