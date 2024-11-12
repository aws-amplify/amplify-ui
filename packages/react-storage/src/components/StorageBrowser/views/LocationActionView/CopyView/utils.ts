import { WithKey } from '../../../components/types';
import { DataTableProps } from '../../../composables/DataTable';
import { DataTableRow } from '../../../composables/DataTable/DataTable';

const DESTINATION_PICKER_COLUMNS: DataTableProps['headers'] = [
  { key: 'key', type: 'sort', content: { label: 'Folder name' } },
];

const getFolderNameFromKey = (key: string): string => {
  if (key === '') return 'root';
  const lastFolder = key.split('/').at(-2);
  return lastFolder ? lastFolder : '';
};

export const getDestinationPickerTableData = ({
  items,
  handleNavigateFolder,
}: {
  items: { key: string; id: string }[];
  handleNavigateFolder: (key: string) => void;
}): DataTableProps => {
  const rows: DataTableProps['rows'] = items.map((item) => {
    const row: WithKey<DataTableRow> = {
      key: item.id,
      content: [
        {
          key: item.id,
          type: 'button',
          content: {
            label: getFolderNameFromKey(item.key),
            icon: 'folder',
            onClick: () => {
              handleNavigateFolder(getFolderNameFromKey(item.key));
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

export const getDestinationListFullPrefix = (
  destinationList: string[]
): string => {
  if (
    destinationList.length < 1 ||
    (destinationList.length === 1 && destinationList[0] === '')
  ) {
    return '';
  }
  // filter out root bucket ""
  const destination = destinationList.filter((item) => item !== '').join('/');
  return destination.endsWith('/') ? destination : `${destination}/`;
};
