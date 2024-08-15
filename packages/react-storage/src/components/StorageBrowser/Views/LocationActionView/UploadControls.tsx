import React from 'react';

import { useControl } from '../../context/controls';
import { FileItem } from '../../context/types';

import { Controls } from '../Controls';
import { Title } from './Controls';
import {
  Column,
  RenderRowItem,
  SortAscendingIcon,
  SortDescendingIcon,
  SortIndeterminateIcon,
  TableHeaderButton,
} from '../Controls/Table';
import { tableSortReducer } from '../Controls/Table';

import { CancelableTask, useHandleUpload } from './useHandleUpload';

const { Cancel, Exit, Primary, Summary, Table } = Controls;

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
          <Table.TableData key={`${index}-${column.header}`}>
            {column.key === 'key' ? (
              <>{row.key}</>
            ) : column.key === 'status' ? (
              <>{row.status}</>
            ) : column.key === 'progress' ? (
              <>{row.progress}</>
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
  const [sortState, updateTableSortState] = React.useReducer(
    tableSortReducer<CancelableTask>,
    {
      direction: 'ASCENDING',
      selection: 'key',
    }
  );
  const { direction, selection } = sortState;

  const [state, handleUpdateState] = useControl({
    type: 'ACTION_SELECT',
  });
  const [{ history }] = useControl({ type: 'NAVIGATE' });
  const { items } = state.selected;

  const [tasks, handleUpload] = useHandleUpload({
    prefix: history.join(''),
    items: items! as FileItem[],
  });

  const renderHeaderItem = React.useCallback(
    (column: Column<CancelableTask>) => {
      // Defining this function inside the `UploadControls` to get access
      // to the current sort state

      const { header, key } = column;

      return (
        <Table.TableHeader
          key={header}
          aria-sort={
            selection === key
              ? direction === 'ASCENDING'
                ? 'ascending'
                : direction === 'DESCENDING'
                ? 'descending'
                : 'none'
              : 'none'
          }
        >
          <TableHeaderButton
            onClick={() => {
              updateTableSortState({
                selection: column.key,
              });
            }}
          >
            {column.header}
            {selection === column.key ? (
              direction === 'ASCENDING' ? (
                <SortAscendingIcon />
              ) : direction === 'DESCENDING' ? (
                <SortDescendingIcon />
              ) : (
                <SortIndeterminateIcon />
              )
            ) : (
              <SortIndeterminateIcon />
            )}
          </TableHeaderButton>
        </Table.TableHeader>
      );
    },
    [direction, selection]
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
