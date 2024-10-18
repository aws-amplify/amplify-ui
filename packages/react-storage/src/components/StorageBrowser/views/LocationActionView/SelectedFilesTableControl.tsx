import React from 'react';

import { humanFileSize } from '@aws-amplify/ui';

import { TableDataText, Column, RenderRowItem } from '../Controls/Table';

import { Controls } from '../Controls';
import { HeadingControl } from '../Controls/Heading';
import { useControl } from '../../context/control';
import { displayText } from '../../displayText/en';
import { Task } from '../../tasks';
import { STATUS_DISPLAY_VALUES } from './constants';

const { actionSelectedText } = displayText;

const { Table } = Controls;

interface SelectedFilesColumns {
  key: string;
  // folder: string;
  type: string;
  // size: string;
  // action: string;
  status: string;
}

// folder: string;
// cancel: undefined | (() => void);
// item: {
//     destinationPrefix: string;
// };
// message: string | undefined;
// remove: () => void;
// status: TaskStatus;

const SELECTED_FILES_COLUMNS: Column<SelectedFilesColumns>[] = [
  { key: 'key', header: 'Name' },
  // { key: 'folder', header: 'Folder' },
  { key: 'type', header: 'Type' },
  { key: 'status', header: 'Status' },
];

export const SelectedFilesTableControl = ({
  tasks,
}: {
    tasks: Task<{
      destinationPrefix: string;
    }>[];
}): React.JSX.Element => {
  const [{ path }] = useControl('NAVIGATE');

  const selectedItemsData = tasks.map((item) => {
    return { ...item, folder: path ?? '' };
  });
  const renderHeaderItem = React.useCallback(
    (column: Column<SelectedFilesColumns>) => {
      // Defining this function inside the `UploadControls` to get access
      // to the current sort state
      const { header, key } = column;

      return (
        <Table.TableHeader
          key={header}
          variant={key}
        // aria-sort={selection === key ? direction : 'none'}
        >
          {column.header}
        </Table.TableHeader>
      );
    },
    []
  );

  const renderRowItem: RenderRowItem<Task<{
    destinationPrefix: string;
  }>> = (row, index) => {
    const renderTableData = (
      columnKey: keyof SelectedFilesColumns,
      row: Task<{
        destinationPrefix: string;
      }>
    ) => {
      switch (columnKey) {
        case 'key': {
          return (
            <TableDataText>
              {row.key}
            </TableDataText>
          );
        }
        // case 'folder': {
        //   return <TableDataText>{row.folder}</TableDataText>;
        // }
        case 'type': {
          const indexOfDot = row.key.lastIndexOf('.');

          return indexOfDot > -1 ? (
            <TableDataText>{row.key.slice(indexOfDot + 1)}</TableDataText>
          ) : (
            '-'
          );
        }
        // case 'size':
        //   return (
        //     <TableDataText>
        //       {humanFileSize(parseInt(row.size), true)}
        //     </TableDataText>
        //   );
        case 'status':
          return (
            <TableDataText>{STATUS_DISPLAY_VALUES[row.status as keyof {}]}</TableDataText>
          );
          // case 'progress':
          //   return (
          //     <TableDataText>{`${getPercentValue(row.progress)}%`}</TableDataText>
          //   );
          // case 'action':
          //   if (row.cancel) {
          //     return (
          //       <Cancel
          //         onClick={row.cancel}
          //         ariaLabel={`Cancel upload for ${row.key}`}
          //       />
          //     );
          //   }

          return null;
        default:
          return null;
      }
    };

    return (
      <Table.TableRow key={index}>
        {SELECTED_FILES_COLUMNS.map((column) => {
          return (
            <Table.TableData
              key={`${index}-${column.header}`}
              variant={column.key}
            >
              {renderTableData(column.key, row)}
            </Table.TableData>
          );
        })}
      </Table.TableRow>
    );
  };

  return (
    <div className="storage-browser__table">
      <HeadingControl>{actionSelectedText}</HeadingControl>
      <Table
        data={selectedItemsData}
        columns={SELECTED_FILES_COLUMNS}
        renderHeaderItem={renderHeaderItem}
        renderRowItem={renderRowItem}
      />
    </div>
  );
};
