import { LocationData } from '../../../actions';
import { DataTableProps } from '../../../components';
import { DefaultLocationsViewDisplayText } from '../../../displayText/types';

import { getHeaders } from './getHeaders';

export const getLocationsViewTableData = ({
  displayText,
  pageItems,
  onNavigate,
  onDownload,
}: {
  displayText: DefaultLocationsViewDisplayText;
  pageItems: LocationData[];
  onNavigate: (location: LocationData) => void;
  onDownload: (location: LocationData) => void;
}): DataTableProps => {
  const {
    tableColumnActionsHeader,
    tableColumnBucketHeader,
    tableColumnFolderHeader,
    tableColumnPermissionsHeader,
    getDownloadLabel,
    getPermissionName,
  } = displayText;
  const headers = getHeaders({
    hasObjectLocations: pageItems.some(({ type }) => type === 'OBJECT'),
    tableColumnActionsHeader,
    tableColumnBucketHeader,
    tableColumnFolderHeader,
    tableColumnPermissionsHeader,
  });

  const rows: DataTableProps['rows'] = pageItems.map((location) => {
    const { bucket, id, permissions, prefix } = location;
    return {
      key: id,
      content: headers.map(({ key: columnKey }) => {
        const key = `${columnKey}-${id}`;
        switch (columnKey) {
          case 'bucket': {
            return { key, type: 'text', content: { text: bucket } };
          }
          case 'folder': {
            return location.type === 'OBJECT'
              ? {
                  key,
                  type: 'text',
                  content: {
                    text: prefix,
                  },
                }
              : {
                  key,
                  type: 'button',
                  content: {
                    label: prefix || bucket,
                    onClick: () => {
                      onNavigate(location);
                    },
                  },
                };
          }
          case 'permission': {
            return {
              key,
              type: 'text',
              content: { text: getPermissionName(permissions) },
            };
          }
          case 'action': {
            return location.type === 'OBJECT' &&
              location.permissions.includes('get')
              ? {
                  key,
                  type: 'button',
                  content: {
                    icon: 'download',
                    ariaLabel: getDownloadLabel(location.prefix),
                    onClick: () => {
                      onDownload(location);
                    },
                  },
                }
              : {
                  key,
                  type: 'text',
                  content: { text: '' },
                };
          }
        }
      }),
    };
  });

  return { headers, rows };
};
