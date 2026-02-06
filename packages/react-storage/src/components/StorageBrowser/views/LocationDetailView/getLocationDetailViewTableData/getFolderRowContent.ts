import type { DataTableProps } from '../../../components';

import { LOCATION_DETAIL_VIEW_HEADERS } from './constants';

export const getFolderRowContent = ({
  itemSubPath,
  rowId,
  isSelected,
  selectFolderLabel,
  onNavigate,
  onSelect,
}: {
  itemSubPath: string;
  rowId: string;
  isSelected: boolean;
  selectFolderLabel: string;
  onNavigate: () => void;
  onSelect: () => void;
}): DataTableProps['rows'][number]['content'] => {
  return LOCATION_DETAIL_VIEW_HEADERS.map((columnKey) => {
    const key = `${columnKey}-${rowId}`;
    switch (columnKey) {
      case 'checkbox': {
        return {
          key,
          type: 'checkbox',
          content: {
            checked: isSelected,
            id: key,
            label: `${selectFolderLabel} ${itemSubPath}`,
            onSelect,
          },
        };
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
};
