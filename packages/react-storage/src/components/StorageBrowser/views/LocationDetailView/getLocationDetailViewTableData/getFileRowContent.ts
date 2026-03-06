import { humanFileSize } from '@aws-amplify/ui';

import type { LocationPermissions } from '../../../actions';
import type { DataTableProps } from '../../../components';

import { LOCATION_DETAIL_VIEW_HEADERS } from './constants';
import { getFileThumbnail } from './fileIcon';

export const getFileRowContent = ({
  filePreviewEnabled,
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
  filePreviewEnabled: boolean;
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
  onClick: (() => void) | undefined;
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
        return {
          key,
          type: filePreviewEnabled ? 'button' : 'text',
          content: {
            icon: getFileThumbnail(rowKey),
            ariaLabel: `${rowKey.slice(itemLocationKey.length)} file`,
            ...(filePreviewEnabled
              ? { label: rowKey.slice(itemLocationKey.length), onClick }
              : { text: rowKey.slice(itemLocationKey.length) }),
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
