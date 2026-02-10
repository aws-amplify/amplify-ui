export const STATUS_LABELS = {
  PENDING: 'statusDisplayInProgressLabel',
  FINISHING: 'statusDisplayFinishingLabel',
  CANCELED: 'statusDisplayCanceledLabel',
  COMPLETE: 'statusDisplayCompletedLabel',
  LOADED: 'statusDisplayLoadedLabel',
  FAILED: 'statusDisplayFailedLabel',
  QUEUED: 'statusDisplayQueuedLabel',
  OVERWRITE_PREVENTED: 'statusDisplayOverwritePreventedLabel',
} as const;

export const STATUS_ICONS = {
  PENDING: 'action-progress',
  FINISHING: 'action-progress',
  COMPLETE: 'action-success',
  LOADED: 'action-success',
  FAILED: 'action-error',
  OVERWRITE_PREVENTED: 'action-info',
  CANCELED: 'action-canceled',
  QUEUED: 'action-queued',
} as const;

export const FILE_DATA_ITEM_TABLE_KEYS = [
  'name',
  'folder',
  'type',
  'size',
  'status',
  'cancel',
] as const;
