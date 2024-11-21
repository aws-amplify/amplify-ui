import { DataTableProps } from '../../../composables/DataTable';
import { LOCATION_DETAIL_VIEW_HEADERS } from './constants';
import { LocationDetailViewHeaders } from './types';

export const getFolderRowContent = ({
  itemSubPath,
  rowId,
  path,
  name,
  headers,
  onNavigate,
}: {
  itemSubPath: string;
  rowId: string;
  path: string;
  name?: string;
  headers: LocationDetailViewHeaders;
  onNavigate: () => void;
}): DataTableProps['rows'][number]['content'] =>
  headers.map(({ key: columnKey }) => {
    const key = `${columnKey}-${rowId}`;
    switch (columnKey) {
      case 'checkbox': {
        return { key, type: 'text', content: { text: '' } };
      }
      case 'name': {
        return {
          key,
          type: 'button',
          content: {
            icon: 'folder',
            ariaLabel: name ?? itemSubPath,
            label: name ?? itemSubPath,
            onClick: onNavigate,
          },
        };
      }
      case 'path': {
        return {
          key,
          type: 'text',
          content: {
            text: path,
          },
        };
      }
      case 'type': {
        return { key, type: 'text', content: { text: 'Folder' } };
      }
      case 'last-modified':
      case 'size':
      case 'download': {
        return { key, type: 'text', content: { text: '' } };
      }
    }
  });
