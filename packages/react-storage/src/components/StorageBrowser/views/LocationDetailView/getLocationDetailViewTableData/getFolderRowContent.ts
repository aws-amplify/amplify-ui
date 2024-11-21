import { DataTableProps } from '../../../composables/DataTable';
import { LocationDetailViewHeaders } from './types';
import { getFolderName, getFolderPath } from '../../../actions/handlers';

export const getFolderRowContent = ({
  rowId,
  rowKey,
  headers,
  onNavigate,
}: {
  rowId: string;
  rowKey: string;
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
            ariaLabel: getFolderName(rowKey),
            label: getFolderName(rowKey),
            onClick: onNavigate,
          },
        };
      }
      case 'path': {
        return {
          key,
          type: 'text',
          content: {
            text: getFolderPath(rowKey),
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
