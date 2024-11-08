import { DataTableProps } from '../../../composables/DataTable';
import { LocationData } from '../../../actions';
import { LocationViewHeaders } from './types';

export const getLocationsViewTableData = ({
  pageItems,
  onNavigate,
  headers,
}: {
  pageItems: LocationData[];
  onNavigate: (location: LocationData) => void;
  headers: LocationViewHeaders;
}): DataTableProps => {
  const rows: DataTableProps['rows'] = pageItems.map((location) => {
    const { bucket, id, permission, prefix } = location;
    return {
      key: id,
      content: headers.map(({ key: columnKey }) => {
        const key = `${columnKey}-${id}`;
        switch (columnKey) {
          case 'bucket': {
            return { key, type: 'text', content: { text: bucket } };
          }
          case 'folder': {
            return {
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
            return { key, type: 'text', content: { text: permission } };
          }
        }
      }),
    };
  });

  return { headers, rows };
};
