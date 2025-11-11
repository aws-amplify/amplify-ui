/* eslint-disable no-console */
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
        console.log(
          '[folder-action] UI_RENDER_PHASE-2: getFolderRowContent.checkbox - Creating folder checkbox',
          {
            key,
            isSelected,
            itemSubPath,
          }
        );

        return {
          key,
          type: 'checkbox',
          content: {
            checked: isSelected,
            id: key,
            label: `${selectFolderLabel} ${itemSubPath}`,
            onSelect: () => {
              console.log(
                '[folder-action] SELECTION_PHASE-1: getFolderRowContent.onSelect - Folder checkbox clicked',
                {
                  itemSubPath,
                  rowId,
                  currentlySelected: isSelected,
                }
              );
              onSelect?.();
            },
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
