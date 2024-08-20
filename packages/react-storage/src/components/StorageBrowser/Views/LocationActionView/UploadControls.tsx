import React from 'react';

import { useControl } from '../../context/controls';
import { FileItem } from '../../context/types';

import { Controls } from '../Controls';
import { Title } from './Controls';
import {
  TableDataText,
  Column,
  RenderRowItem,
  TableHeaderButton,
  SortState,
} from '../Controls/Table';

import { CancelableTask, useHandleUpload } from './useHandleUpload';
import { StorageBrowserElements } from '../../context/elements';

const { Cancel, Exit, Primary, Summary, Table } = Controls;

const { Icon } = StorageBrowserElements;

const LOCATION_ACTION_VIEW_COLUMNS: Column<CancelableTask>[] = [
  {
    key: 'key',
    header: 'Name',
  },
  {
    key: 'status',
    header: 'Status',
  },
  {
    key: 'progress',
    header: 'Progress',
  },
  {
    key: 'cancel',
    header: 'Cancel',
  },
];

const renderRowItem: RenderRowItem<CancelableTask> = (row, index) => {
  return (
    <Table.TableRow key={index}>
      {LOCATION_ACTION_VIEW_COLUMNS.map((column) => {
        return (
          <Table.TableData
            key={`${index}-${column.header}`}
            variant={column.key}
          >
            {column.key === 'key' ? (
              <TableDataText>{row.key}</TableDataText>
            ) : column.key === 'status' ? (
              <TableDataText>{row.status}</TableDataText>
            ) : column.key === 'progress' ? (
              <TableDataText>{row.progress}</TableDataText>
            ) : column.key === 'cancel' ? (
              <Cancel
                onClick={row.cancel}
                ariaLabel={`Cancel upload for ${row.key}`}
              />
            ) : null}
          </Table.TableData>
        );
      })}
    </Table.TableRow>
  );
};

export const UploadControls = (): JSX.Element => {
  const [state, handleUpdateState] = useControl({
    type: 'ACTION_SELECT',
  });
  const [{ history }] = useControl({ type: 'NAVIGATE' });
  const { items } = state.selected;

  const [tasks, handleUpload] = useHandleUpload({
    prefix: history.join(''),
    items: items! as FileItem[],
  });

  // const [compareFn, setCompareFn] = React.useState(() => compareStrings);
  const [sortState] = React.useState<SortState<CancelableTask>>({
    selection: 'key',
    sortDirection: 'ascending',
  });

  const { sortDirection, selection } = sortState;

  const renderHeaderItem = React.useCallback(
    (column: Column<CancelableTask>) => {
      // Defining this function inside the `UploadControls` to get access
      // to the current sort state

      const { header, key } = column;

      return (
        <Table.TableHeader
          key={header}
          aria-sort={selection === key ? sortDirection : 'none'}
        >
          <TableHeaderButton
            onClick={() => {
              // updateTableSortState({
              //   selection: column.key,
              // });
            }}
          >
            {column.header}
            {selection === column.key && (
              <Icon
                variant={
                  sortDirection === 'none'
                    ? 'sort-indeterminate'
                    : `sort-${sortDirection}`
                }
              />
            )}
          </TableHeaderButton>
        </Table.TableHeader>
      );
    },
    [sortDirection, selection]
  );

  return items ? (
    <>
      <Title />
      <Exit onClick={() => handleUpdateState({ type: 'EXIT' })} />
      <Primary
        onClick={() => {
          if (!items) return;
          handleUpload();
        }}
      >
        Start upload
      </Primary>
      <Summary />
      <Table
        data={tasks}
        columns={LOCATION_ACTION_VIEW_COLUMNS}
        renderRowItem={renderRowItem}
        renderHeaderItem={renderHeaderItem}
      />
    </>
  ) : (
    <span>No items selected.</span>
  );
};
