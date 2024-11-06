import { WithKey } from '../../components/types';
import { DataTableProps } from '../../composables/DataTable';
import { LocationData } from '../../actions';

type HeaderKeys = 'folder' | 'bucket' | 'permission';

const LOCATIONS_VIEW_HEADERS: WithKey<
  DataTableProps['headers'][number],
  HeaderKeys
>[] = [
  { key: 'folder', type: 'sort', content: { label: 'Folder' } },
  { key: 'bucket', type: 'sort', content: { label: 'Bucket' } },
  { key: 'permission', type: 'sort', content: { label: 'Permission' } },
];

export const getLocationsViewTableData = ({
  pageItems,
  onNavigate,
}: {
  pageItems: LocationData[];
  onNavigate: (location: LocationData) => void;
}): DataTableProps => {
  const rows: DataTableProps['rows'] = pageItems.map((location) => {
    const { bucket, id, permission, prefix } = location;
    return {
      key: id,
      content: LOCATIONS_VIEW_HEADERS.map(({ key: columnKey }) => {
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

  return { headers: LOCATIONS_VIEW_HEADERS, rows };
};
