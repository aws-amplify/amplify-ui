/**
 * Temporarily just export strings until displayText strategy is finalized
 */
export const defaultActionKeys = {
  CreateFolder: 'createFolder',
  ListLocationItems: 'listLocationItems',
  ListLocations: 'listLocations',
  Upload: 'upload',
} as const;

export const displayText = {
  defaultActionTriggerLabel: 'Start',
  defaultActionCancelLabel: 'Cancel',
  createFolderActionTriggerLabel: 'Create Folder',
  actionDestination: 'Destination',
  statusDisplayCompleted: 'Completed',
  statusDisplayFailed: 'Failed',
  statusDisplayCanceled: 'Canceled',
  statusDisplayQueued: 'Not started',
  uploadActionTriggerLabel: 'Start',
  uploadActionCancelLabel: 'Cancel',
};
