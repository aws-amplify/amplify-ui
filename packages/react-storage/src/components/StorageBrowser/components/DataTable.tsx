import React from 'react';

import {
  TableBodyElement,
  TableDataCellElement,
  TableElement,
  TableHeadElement,
  TableHeaderElement,
  TableRowElement,
  ViewElement,
} from '../context/elements';

import { CLASS_BASE } from '../views/constants';

export const TABLE_CLASS_NAME = `${CLASS_BASE}__table`;
export const TABLE_HEADER_CLASS_NAME = `${TABLE_CLASS_NAME}__header`;
export const TABLE_HEADER_BUTTON_CLASS_NAME = `${TABLE_CLASS_NAME}__header__button`;
export const TABLE_ROW_CLASS_NAME = `${TABLE_CLASS_NAME}__row`;
export const TABLE_DATA_CLASS_NAME = `${TABLE_CLASS_NAME}__data`;
export const TABLE_DATA_BUTTON_CLASS = `${TABLE_CLASS_NAME}__data__button`;

export interface ColumnHeaderItemProps
  extends React.ComponentProps<typeof TableHeaderElement> {}

export interface RowDataItemProps
  extends React.ComponentProps<typeof TableDataCellElement> {}

export interface Data<T, K = {}> {
  columns?: K[];
  rows: T[][];
}

export interface DataTableProps<T, K> {
  data?: Data<T, K>;
  renderColumnHeaderItem?: (props: K, index: number) => React.JSX.Element;
  renderRowDataItem?: (props: T, index: number) => React.JSX.Element;
}

export function ColumnHeaderItem({
  className = TABLE_HEADER_CLASS_NAME,
  ...props
}: ColumnHeaderItemProps): React.JSX.Element {
  return <TableHeaderElement {...props} className={className} />;
}

export function RowDataItem({
  className = TABLE_DATA_CLASS_NAME,
  ...props
}: RowDataItemProps): React.JSX.Element {
  return <TableDataCellElement {...props} className={className} />;
}

export function DataTable<
  T extends RowDataItemProps,
  K extends ColumnHeaderItemProps = {},
>({
  data,
  renderColumnHeaderItem = ColumnHeaderItem,
  renderRowDataItem = RowDataItem,
}: DataTableProps<T, K>): JSX.Element {
  const { columns, rows } = data ?? {};

  return (
    <ViewElement className={'storage-browser__table-wrapper'}>
      <TableElement aria-label="Table" className={TABLE_CLASS_NAME}>
        <TableHeadElement className={`${TABLE_CLASS_NAME}__head`}>
          <TableRowElement className={TABLE_ROW_CLASS_NAME}>
            {columns?.map(renderColumnHeaderItem)}
          </TableRowElement>
        </TableHeadElement>
        <TableBodyElement className={`${TABLE_CLASS_NAME}__body`}>
          {rows?.map((row, index) => (
            <TableRowElement
              key={`row-${index}`}
              className={TABLE_ROW_CLASS_NAME}
            >
              {row.map(renderRowDataItem)}
            </TableRowElement>
          ))}
        </TableBodyElement>
      </TableElement>
    </ViewElement>
  );
}
