import { DataTableProps } from '../../../composables/DataTable';
import { LocationData, LocationPermissions } from '../../../actions';
import { LocationViewHeaders } from './types';

export const getLocationsViewTableData = ({
  pageItems,
  onNavigate,
  onDownload,
  headers,
  getDownloadLabel,
  getPermissionName,
}: {
  pageItems: LocationData[];
  onNavigate: (location: LocationData) => void;
  headers: LocationViewHeaders;
  onDownload: (location: LocationData) => void;
  getDownloadLabel: (fileName: string) => string;
  getPermissionName: (permissions: LocationPermissions) => string;
}): DataTableProps => {
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
            // FIXME: conditional render download button if permissions include 'get'
            return location.type === 'OBJECT'
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
