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

export const getDestinationPickerTableData = ({
  folders,
  isLoading,
  onSelect,
}: {
  folders?: { key: string; id: string }[];
  isLoading: boolean;
  onSelect?: (name: string) => void;
}): DataTableProps => {
  const rows: DataTableProps['rows'] = !folders
    ? []
    : folders.map((item) => {
        const name = getFolderNameFromKey(item.key);
        const row: WithKey<DataTableRow> = {
          key: item.id,
          content: [
            {
              key: item.id,
              type: 'button',
              content: {
                label: name,
                icon: 'folder',
                onClick: () => {
                  onSelect?.(name);
                },
              },
            },
          ],
        };
        return row;
      });

  const tableData: DataTableProps = {
    headers: DESTINATION_PICKER_COLUMNS,
    isLoading,
    rows,
  };
  return tableData;
};
