import { LOCATION_DETAIL_VIEW_HEADERS } from './constants';
import type { LocationDetailViewHeaders } from './types';

export const getHeaders = ({
  tableColumnLastModifiedHeader,
  tableColumnNameHeader,
  tableColumnSizeHeader,
  tableColumnTypeHeader,
  areAllFilesSelected,
  selectAllFilesLabel,
  onSelectAll,
  hasFiles,
}: {
  tableColumnLastModifiedHeader: string;
  tableColumnNameHeader: string;
  tableColumnSizeHeader: string;
  tableColumnTypeHeader: string;
  areAllFilesSelected: boolean;
  selectAllFilesLabel: string;
  onSelectAll: () => void;
  hasFiles: boolean;
}): LocationDetailViewHeaders =>
  LOCATION_DETAIL_VIEW_HEADERS.map((key) => {
    switch (key) {
      case 'checkbox': {
        if (hasFiles) {
          return {
            key,
            type: 'checkbox',
            content: {
              checked: areAllFilesSelected,
              label: selectAllFilesLabel,
              id: 'header-checkbox',
              onSelect: onSelectAll,
            },
          };
        } else {
          return {
            key,
            type: 'text',
            content: { text: '' },
          };
        }
      }
      case 'name': {
        return {
          key,
          type: 'sort',
          content: {
            label: tableColumnNameHeader,
          },
        };
      }
      case 'type': {
        return {
          key,
          type: 'sort',
          content: {
            label: tableColumnTypeHeader,
          },
        };
      }
      case 'last-modified': {
        return {
          key,
          type: 'sort',
          content: {
            label: tableColumnLastModifiedHeader,
          },
        };
      }
      case 'size': {
        return {
          key,
          type: 'sort',
          content: {
            label: tableColumnSizeHeader,
          },
        };
      }
      case 'download': {
        return { key, type: 'text', content: { text: '' } };
      }
    }
  });
