import * as React from 'react';
// import { TableElementProps } from '@aws-amplify/ui-react/internal';
import { TableContainer } from './TableContainer';
import { TableCaption } from './TableCaption';
import { TableColumn } from './TableColumn';
import { TableBody } from './TableBody';
import { TableCell } from './TableCell';
import { TableHead } from './TableHead';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { TableFoot } from './TableFoot';

export interface Column<T> {
  header: string;
  key: keyof T;
  sortable: boolean;
}

export interface TableData<T> {
  columns: Column<T>[];
  rows: T[] | null;
}

export interface TableProps<T> {
  data: TableData<T>;
  ariaLabel?: string;
  // className?: string;
  // how would pagination work?
}

// should it only be one column at a time?
// interface SortState<T> {
//   columnKey: keyof T | null;
//   direction: 'ascending' | 'descending' | 'none';
// }

const TablePrimitive = <T,>({
  data,
  ariaLabel,
}: TableProps<T>): JSX.Element => {
  const { columns, rows } = data;

  return (
    <TableContainer ariaLabel={ariaLabel}>
      <TableHead>
        <TableRow>
          {columns?.map((column) => (
            <TableHeader key={column.key as string}>
              {/* figure out sort state*/}
              <button>{column.header} </button>
            </TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows?.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((column) => (
              <TableCell key={`${rowIndex}-${column.key as string}`}>
                {row[column.key] as React.ReactNode}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </TableContainer>
  );
};

const Table = Object.assign(TablePrimitive, {
  Container: TableContainer,
  Caption: TableCaption,
  Body: TableBody,
  Cell: TableCell,
  Head: TableHead,
  Header: TableHeader,
  Row: TableRow,
  Column: TableColumn,
  Foot: TableFoot,
});

export { Table };
