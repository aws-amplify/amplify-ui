import type { LocationItemData } from '../actions';

/**
 * Selection utility functions for LocationItems
 */

/**
 * Get selected files from dataItems
 */
export const getSelectedFiles = (
  dataItems?: LocationItemData[]
): LocationItemData[] => {
  return dataItems?.filter((item) => item.type === 'FILE') ?? [];
};

/**
 * Get selected folders from dataItems
 */
export const getSelectedFolders = (
  dataItems?: LocationItemData[]
): LocationItemData[] => {
  return dataItems?.filter((item) => item.type === 'FOLDER') ?? [];
};

/**
 * Check if selection contains folders
 */
export const hasSelectedFolders = (dataItems?: LocationItemData[]): boolean => {
  return dataItems?.some((item) => item.type === 'FOLDER') ?? false;
};

/**
 * Check if selection contains files
 */
export const hasSelectedFiles = (dataItems?: LocationItemData[]): boolean => {
  return dataItems?.some((item) => item.type === 'FILE') ?? false;
};

/**
 * Get selection summary
 */
export const getSelectionSummary = (
  dataItems?: LocationItemData[]
): {
  total: number;
  files: number;
  folders: number;
  hasFiles: boolean;
  hasFolders: boolean;
  isMixed: boolean;
} => {
  const files = getSelectedFiles(dataItems);
  const folders = getSelectedFolders(dataItems);

  return {
    total: dataItems?.length ?? 0,
    files: files.length,
    folders: folders.length,
    hasFiles: files.length > 0,
    hasFolders: folders.length > 0,
    isMixed: files.length > 0 && folders.length > 0,
  };
};

/**
 * Validate selection to prevent parent/child folder conflicts
 */
export const validateSelection = (
  dataItems?: LocationItemData[]
): { isValid: boolean; conflicts: string[] } => {
  if (!dataItems?.length) return { isValid: true, conflicts: [] };

  const folders = getSelectedFolders(dataItems);
  const conflicts: string[] = [];

  // Check for parent/child relationships
  folders.forEach((folder) => {
    folders.forEach((otherFolder) => {
      if (folder.id !== otherFolder.id) {
        // Check if one folder is a parent of another
        if (otherFolder.key.startsWith(folder.key)) {
          conflicts.push(`${folder.key} contains ${otherFolder.key}`);
        }
      }
    });
  });

  return {
    isValid: conflicts.length === 0,
    conflicts: [...new Set(conflicts)], // Remove duplicates
  };
};
