import React from 'react';

import { StorageBrowserElements } from '../../context/elements';
import { CLASS_BASE } from '../constants';

export const BLOCK_NAME = `${CLASS_BASE}__table`;
export const TABLE_DATA_CLASS = `${BLOCK_NAME}__data`;
export const TABLE_HEADER_CLASS = `${BLOCK_NAME}__header`;
export const TABLE_HEADER_BUTTON_CLASS = `${BLOCK_NAME}__header__button`;
export const TABLE_DATA_TEXT_CLASS = `${BLOCK_NAME}__data__text`;
export const TABLE_DATA_BUTTON_CLASS = `${BLOCK_NAME}__data__button`;

const { Table, TableBody, TableData, TableHead, TableHeader, TableRow } =
  StorageBrowserElements;

export interface TableHeaderItemProps
  extends React.ComponentProps<typeof TableHeader> {}

export interface TableDataItemProps
  extends React.ComponentProps<typeof TableData> {}

export interface TableProps<
  T extends TableDataItemProps,
  K extends TableHeaderItemProps,
> {
  data?: DataTable<T, K>;
  renderTableHeaderItem?: (
    props: TableHeaderItemProps,
    index: number
  ) => React.JSX.Element;
  renderTableDataItem?: (
    props: TableDataItemProps,
    index: number
  ) => React.JSX.Element;
}

export interface DataTable<T, K = {}> {
  columns?: K[];
  rows: T[][];
}

export function TableHeaderItem({
  children,
  className = TABLE_HEADER_CLASS,
  ...props
}: TableHeaderItemProps): React.JSX.Element {
  return (
    <TableHeader {...props} className={className}>
      {children}
    </TableHeader>
  );
}

export function TableDataItem({
  children,
  className = TABLE_DATA_TEXT_CLASS,
  ...props
}: TableDataItemProps): React.JSX.Element {
  return (
    <TableData {...props} className={className}>
      {children}
    </TableData>
  );
}

export function TableV2<
  T extends TableDataItemProps,
  K extends TableHeaderItemProps,
>({
  data,
  renderTableHeaderItem = TableHeaderItem,
  renderTableDataItem = TableDataItem,
}: TableProps<T, K>): JSX.Element | null {
  const { columns, rows } = data ?? {};

  return (
    <Table aria-label="Table" className={BLOCK_NAME}>
      {!!renderTableHeaderItem && !!columns ? (
        <TableHead className={`${BLOCK_NAME}__head`}>
          <TableRow className={`${BLOCK_NAME}__row`}>
            {columns.map(renderTableHeaderItem)}
          </TableRow>
        </TableHead>
      ) : null}
      {!!renderTableDataItem && !!rows ? (
        <TableBody className={`${BLOCK_NAME}__body`}>
          {rows.map((row, index) => (
            <TableRow key={`row-${index}`} className={`${BLOCK_NAME}__row`}>
              {row.map(renderTableDataItem)}
            </TableRow>
          ))}
        </TableBody>
      ) : null}
    </Table>
  );
}
