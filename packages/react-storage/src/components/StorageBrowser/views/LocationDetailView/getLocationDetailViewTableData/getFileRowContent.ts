import { humanFileSize } from '@aws-amplify/ui';

import { DataTableProps } from '../../../composables/DataTable';
import { LocationData } from '../../../actions';
import { displayText } from '../../../displayText/en';

import { LOCATION_DETAIL_VIEW_HEADERS } from './constants';

export const getFileRowContent = ({
  currentLocation,
  currentPath,

  isSelected,
  lastModified,
  rowId,
  rowKey,
  size,
  onDownload,
  onSelect,
}: {
  currentLocation?: LocationData;
  currentPath: string;

  isSelected: boolean;
  lastModified: Date;
  rowId: string;
  rowKey: string;
  size: number;
  onDownload: () => void;
  onSelect: () => void;
}): DataTableProps['rows'][number]['content'] =>
  LOCATION_DETAIL_VIEW_HEADERS.map(({ key: columnKey }) => {
    const key = `${columnKey}-${rowId}`;
    switch (columnKey) {
      case 'checkbox': {
        return {
          key,
          type: 'checkbox',
          content: {
            checked: isSelected,
            label: `${displayText.locationDetailSelectFile} ${rowKey}`,
            onSelect,
          },
        };
      }
      case 'name': {
        const itemLocationKey = `${
          currentLocation?.prefix ?? ''
        }${currentPath}`;
        return {
          key,
          type: 'text',
          content: { icon: 'file', text: rowKey.slice(itemLocationKey.length) },
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
        return { key, type: 'date', content: { date: lastModified } };
      }
      case 'size': {
        return {
          key,
          type: 'number',
          content: {
            value: size,
            displayValue: humanFileSize(size ?? 0, true),
          },
        };
      }
      case 'download': {
        return {
          key,
          type: 'button',
          content: { icon: 'download', onClick: onDownload },
        };
      }
    }
  });
