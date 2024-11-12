import { ActionViewHeaders } from './types';

export const STATUS_DISPLAY_VALUES = {
  CANCELED: 'Canceled',
  COMPLETE: 'Completed',
  FAILED: 'Failed',
  OVERWRITE_PREVENTED: 'Overwrite Prevented',
  INITIAL: 'Not Started',
  PENDING: 'In Progress',
  QUEUED: 'Queued',
};

export const PROGRESS_HEADER = {
  key: 'progress',
  type: 'sort',
  content: { label: 'Progress' },
} as const;

export const DEFAULT_ACTION_VIEW_HEADERS: ActionViewHeaders = [
  { key: 'name', type: 'sort', content: { label: 'Name' } },
  { key: 'folder', type: 'sort', content: { label: 'Folder' } },
  { key: 'type', type: 'sort', content: { label: 'Type' } },
  { key: 'size', type: 'sort', content: { label: 'Size' } },
  { key: 'status', type: 'sort', content: { label: 'Status' } },
  { key: 'cancel', type: 'text', content: {} },
];

export const DEFAULT_ACTION_CONCURRENCY = 4;
