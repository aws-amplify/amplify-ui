export const STATUS_LABELS = {
  PENDING: 'statusDisplayInProgressLabel',
  CANCELED: 'statusDisplayCanceledLabel',
  COMPLETE: 'statusDisplayCompletedLabel',
  FAILED: 'statusDisplayFailedLabel',
  QUEUED: 'statusDisplayQueuedLabel',
  OVERWRITE_PREVENTED: 'statusDisplayOverwritePreventedLabel',
} as const;

export const STATUS_ICONS = {
  PENDING: 'action-progress',
  COMPLETE: 'action-success',
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
