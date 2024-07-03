import * as React from 'react';
import { Table } from '../subcomponents/Table';

interface Column<T> {
  header: string;
  key: keyof T;
  sortable: boolean;
}

interface TableData<T> {
  columns: Column<T>[];
  rows: T[];
}

interface TableProps<T> {
  data: TableData<T>;
  ariaLabel?: string;
  // className?: string;
}

// should it only be one column at a time?
// interface SortState<T> {
//   columnKey: keyof T | null;
//   direction: 'ascending' | 'descending' | 'none';
// }

export const ComposedTable = <T,>({
  data,
  ariaLabel,
}: TableProps<T>): JSX.Element => {
  const { columns, rows } = data;

  return (
    <Table ariaLabel={ariaLabel}>
      <Table.Head>
        <Table.Row>
          {columns.map((column) => (
            <Table.Header key={column.key as string} aria-sort={}>
              {/* figure out sort state*/}
              <button>{column.header} </button>
            </Table.Header>
          ))}
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {rows.map((row, rowIndex) => (
          <Table.Row key={rowIndex}>
            {columns.map((column) => (
              <Table.Cell key={`${rowIndex}-${column.key as string}`}>
                {row[column.key] as React.ReactNode}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
