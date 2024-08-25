import React from 'react';

import { StorageBrowserElements } from '../../context/elements';
import { CLASS_BASE } from '../constants';

export const BLOCK_NAME = `${CLASS_BASE}__table`;
export const TABLE_DATA_CLASS = `${BLOCK_NAME}__data`;
export const TABLE_HEADER_CLASS = `${BLOCK_NAME}__header`;
export const TABLE_HEADER_BUTTON_CLASS = `${BLOCK_NAME}__header__button`;
export const TABLE_DATA_TEXT_CLASS = `${BLOCK_NAME}__data__text`;
export const TABLE_DATA_BUTTON_CLASS = `${BLOCK_NAME}__data__button`;

const { Span, Table, TableBody, TableHead, TableRow } = StorageBrowserElements;

export interface TableProps<T, K> {
  data?: TableData<T, K>;
  renderColumnItem?: (props: K, index: number) => React.JSX.Element;
  renderRowItem?: (props: T, index: number) => React.JSX.Element;
}

export interface TableData<T, K = {}> {
  columns?: K[];
  rows: T[][];
}

export const TableDataText = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => <Span className={TABLE_DATA_TEXT_CLASS}>{children}</Span>;

export function TableV2<T, K>({
  data,
  renderColumnItem,
  renderRowItem,
}: TableProps<T, K>): JSX.Element | null {
  const { columns, rows } = data ?? {};

  return (
    <Table aria-label="Table" className={BLOCK_NAME}>
      {!!renderColumnItem && !!columns ? (
        <TableHead className={`${BLOCK_NAME}__head`}>
          <TableRow className={`${BLOCK_NAME}__row`}>
            {columns.map(renderColumnItem)}
          </TableRow>
        </TableHead>
      ) : null}
      {!!renderRowItem && !!rows ? (
        <TableBody className={`${BLOCK_NAME}__body`}>
          {rows.map((row, index) => (
            <TableRow key={`row-${index}`} className={`${BLOCK_NAME}__row`}>
              {row.map(renderRowItem)}
            </TableRow>
          ))}
        </TableBody>
      ) : null}
    </Table>
  );
}
