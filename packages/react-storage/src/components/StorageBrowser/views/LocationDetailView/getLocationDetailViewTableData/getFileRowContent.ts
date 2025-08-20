import { humanFileSize } from '@aws-amplify/ui';

import type { LocationPermissions } from '../../../actions';
import type { DataTableProps } from '../../../components';

import { LOCATION_DETAIL_VIEW_HEADERS } from './constants';
import { getFileThumbnail } from '../../utils/filePreview/fileIcon';

export const getFileRowContent = ({
  permissions,
  isSelected,
  itemLocationKey,
  getDateDisplayValue,
  lastModified,
  rowId,
  rowKey,
  selectFileLabel,
  size,
  onDownload,
  onSelect,
  onClick,
}: {
  permissions: LocationPermissions;
  isSelected: boolean;
  itemLocationKey: string;
  lastModified: Date;
  getDateDisplayValue: (date: Date) => string;
  rowId: string;
  rowKey: string;
  selectFileLabel: string;
  size: number;
  onDownload: () => void;
  onSelect: () => void;
  onClick: () => void;
}): DataTableProps['rows'][number]['content'] =>
  LOCATION_DETAIL_VIEW_HEADERS.map((columnKey) => {
    const key = `${columnKey}-${rowId}`;
    switch (columnKey) {
      case 'checkbox': {
        return {
          key,
          type: 'checkbox',
          content: {
            checked: isSelected,
            id: key,
            label: `${selectFileLabel} ${rowKey}`,
            onSelect,
          },
        };
      }
      case 'name': {
        const fileName = rowKey.slice(itemLocationKey.length);
        return {
          key,
          type: 'button',
          content: {
            icon: getFileThumbnail(rowKey),
            ariaLabel: `${fileName} file`,
            label: fileName,
            onClick,
          },
        };
      }
      case 'type': {
        const splitKey = rowKey.split('.');
        return {
          key,
          type: 'text',
          content: {
            text: `${
              splitKey.length > 1 && splitKey[0] ? splitKey.pop() : '-'
            }`,
          },
        };
      }
      case 'last-modified': {
        return {
          key,
          type: 'date',
          content: {
            value: lastModified,
            displayValue: getDateDisplayValue(lastModified),
          },
        };
      }
      case 'size': {
        return {
          key,
          type: 'number',
          content: {
            value: size,
            displayValue: humanFileSize(size, true),
          },
        };
      }
      case 'download': {
        return permissions.includes('get')
          ? {
              key,
              type: 'button',
              content: {
                icon: 'download',
                onClick: onDownload,
                ariaLabel: 'download',
              },
            }
          : { key, type: 'text', content: { text: '' } };
      }
    }
  });
