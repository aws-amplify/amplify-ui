import { DataTableProps } from '../../composables/DataTable';

export const STATUS_DISPLAY_VALUES = {
  CANCELED: 'Canceled',
  COMPLETE: 'Completed',
  FAILED: 'Failed',
  INITIAL: 'Not Started',
  OVERWRITE_PREVENTED: 'Overwrite Prevented',
  PENDING: 'In Progress',
  QUEUED: 'Queued',
};

export const DEFAULT_ACTION_VIEW_HEADERS: DataTableProps['headers'] = [
  { key: 'key', type: 'sort', content: { label: 'Name' } },
  { key: 'folder', type: 'text', content: { text: 'Folder' } },
  { key: 'type', type: 'text', content: { text: 'Type' } },
  { key: 'size', type: 'text', content: { text: 'Size' } },
  { key: 'status', type: 'sort', content: { label: 'Status' } },
  { key: 'action', type: 'text', content: { text: '' } },
];
