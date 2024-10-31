import { WithKey } from '../../../components/types';
import { DataTableProps } from '../../../composables/DataTable';
import { DataTableRow } from '../../../composables/DataTable/DataTable';

const DESTINATION_PICKER_COLUMNS: DataTableProps['headers'] = [
  { key: 'key', type: 'sort', content: { label: 'Folder name' } },
];

export const getDestinationListFullPrefix = (
  destinationList: string[]
): string => {
  const destination = destinationList.join('/');
  return destination.endsWith('/') ? destination : `${destination}/`;
};

export const getDestinationPickerTableData = ({
  items,
  handleNavigateFolder,
}: {
  items: { key: string; id: string }[];
  handleNavigateFolder: (key: string) => void;
}): DataTableProps => {
  console.log('items table', items);
  const rows: DataTableProps['rows'] = items.map((item) => {
    const row: WithKey<DataTableRow> = {
      key: item.id,
      content: [
        {
          key: item.id,
          type: 'button',
          content: {
            label: item.key,
            icon: 'folder',
            onClick: () => {
              handleNavigateFolder(item.key);
            },
          },
        },
      ],
    };
    return row;
  });

  const tableData: DataTableProps = {
    headers: DESTINATION_PICKER_COLUMNS,
    rows,
  };
  return tableData;
};
