import { LocationDetailViewHeaders } from './types';

export const LOCATION_DETAIL_VIEW_HEADERS: LocationDetailViewHeaders = [
  { key: 'checkbox', type: 'text', content: { text: '' } },
  { key: 'name', type: 'sort', content: { label: 'Name' } },
  { key: 'type', type: 'sort', content: { label: 'Type' } },
  { key: 'last-modified', type: 'sort', content: { label: 'Last Modified' } },
  { key: 'size', type: 'sort', content: { label: 'Size' } },
  { key: 'download', type: 'text', content: { text: '' } },
];
