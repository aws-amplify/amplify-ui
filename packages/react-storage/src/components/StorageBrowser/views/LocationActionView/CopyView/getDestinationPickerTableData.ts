import type {
  DataTableProps,
  DataTableRow,
  WithKey,
} from '../../../components';

const DESTINATION_PICKER_COLUMNS: DataTableProps['headers'] = [
  { key: 'name', type: 'sort', content: { label: 'Folder name' } },
];

export const getDestinationPickerTableData = ({
  prefix,
  path,
  folders,
  onSelectFolder,
}: {
  prefix: string;
  path: string;
  folders?: { key: string; id: string }[];
  onSelectFolder?: (id: string, folderLocationPath: string) => void;
}): DataTableProps => {
  const rows: DataTableProps['rows'] = !folders
    ? []
    : folders.map(({ id, key }) => {
        const folderSubPath = key.slice(`${prefix ?? ''}${path}`.length);
        const folderLocationPath = key.slice(prefix.length);
        const row: WithKey<DataTableRow> = {
          key: id,
          content: [
            {
              key: `${DESTINATION_PICKER_COLUMNS[0].key}-${id}`,
              type: 'button',
              content: {
                icon: 'folder',
                ariaLabel: folderSubPath,
                label: folderSubPath,
                onClick: () => {
                  onSelectFolder?.(id, folderLocationPath);
                },
              },
            },
          ],
        };
        return row;
      });

  return {
    headers: DESTINATION_PICKER_COLUMNS,
    rows,
  };
};
