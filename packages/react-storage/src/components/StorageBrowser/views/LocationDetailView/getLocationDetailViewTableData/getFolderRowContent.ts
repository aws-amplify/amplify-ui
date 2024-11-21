import { DataTableProps } from '../../../composables/DataTable';
import { LOCATION_DETAIL_VIEW_HEADERS } from './constants';
import { LocationDetailViewHeaders } from './types';

export const getFolderRowContent = ({
  itemSubPath,
  rowId,
  headers,
  onNavigate,
}: {
  itemSubPath: string;
  rowId: string;
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
            ariaLabel: itemSubPath,
            label: itemSubPath,
            onClick: onNavigate,
          },
        };
      }
      case 'path': {
        return {
          key,
          type: 'text',
          content: {
            text: itemSubPath,
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
