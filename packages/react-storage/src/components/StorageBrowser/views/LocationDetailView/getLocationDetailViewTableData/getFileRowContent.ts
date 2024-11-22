import { humanFileSize } from '@aws-amplify/ui';

import { DataTableProps } from '../../../composables/DataTable';

import { LOCATION_DETAIL_VIEW_HEADERS } from './constants';
import { LocationPermissions } from '../../../actions';
import { LocationDetailViewHeaders } from './types';
import { getFileKey, getFilePath } from '../../../actions/handlers';

export const getFileRowContent = ({
  permissions,
  isSelected,
  getDateDisplayValue,
  lastModified,
  rowId,
  rowKey,
  selectFileLabel,
  size,
  onDownload,
  onSelect,
  headers,
}: {
  permissions: LocationPermissions;
  isSelected: boolean;
  lastModified: Date;
  headers: LocationDetailViewHeaders;
  getDateDisplayValue: (date: Date) => string;
  rowId: string;
  rowKey: string;
  selectFileLabel: string;
  size: number;
  onDownload: () => void;
  onSelect: () => void;
}): DataTableProps['rows'][number]['content'] =>
  headers.map(({ key: columnKey }) => {
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
          type: 'text',
          content: {
            icon: 'file',
            ariaLabel: 'file',
            text: getFileKey(rowKey),
          },
        };
      }
      case 'path': {
        return {
          key,
          type: 'text',
          content: {
            text: getFilePath(rowKey),
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
