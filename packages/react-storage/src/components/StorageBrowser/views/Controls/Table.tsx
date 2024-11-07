import React from 'react';

import {
  SpanElementProps,
  StorageBrowserElements,
  TableDataCellElementProps,
  TableHeaderElementProps,
  ViewElement,
} from '../../context/elements';

import { CLASS_BASE } from '../constants';
import { useDropZone } from '@aws-amplify/ui-react-core';

export type SortDirection = 'ascending' | 'descending' | 'none';

export type SortState<T> = {
  selection: keyof T;
  direction: SortDirection;
};

const {
  Table,
  TableBody,
  TableData: BaseTableData,
  TableHead,
  TableHeader: BaseTableHeader,
  TableRow,
  Span,
} = StorageBrowserElements;

const BLOCK_NAME = `${CLASS_BASE}__table`;
const TABLE_DATA_CLASS = `${BLOCK_NAME}__data`;
const TABLE_HEADER_CLASS = `${BLOCK_NAME}__header`;

function TableData({
  className,
  variant,
  ...props
}: TableDataCellElementProps) {
  return (
    <BaseTableData
      {...props}
      className={
        className ??
        `${TABLE_DATA_CLASS}${
          variant ? ` ${TABLE_DATA_CLASS}--${variant}` : ''
        }`
      }
      variant={variant}
    />
  );
}

function TableHeader({
  className,
  variant,
  ...props
}: TableHeaderElementProps) {
  return (
    <BaseTableHeader
      {...props}
      className={
        className ??
        `${TABLE_HEADER_CLASS} ${
          variant ? ` ${TABLE_HEADER_CLASS}--${variant}` : ''
        }`
      }
      variant={variant}
    />
  );
}

export function TableDataText({
  className = `${BLOCK_NAME}__data__text`,
  ...props
}: SpanElementProps): React.JSX.Element {
  return <Span {...props} className={className} />;
}

export interface Column<T> {
  header: string;
  key: keyof T;
}

export type RenderHeaderItem<T> = (column: Column<T>) => JSX.Element;

export type RenderRowItem<T> = (row: T, index: number) => JSX.Element;

interface TableControlProps<T> {
  data: T[];
  columns: Column<T>[];
  handleDroppedFiles?: (files: File[]) => void;
  renderHeaderItem: RenderHeaderItem<T>;
  renderRowItem: RenderRowItem<T>;
}

export function TableControl<U>({
  data,
  columns,
  handleDroppedFiles,
  renderHeaderItem,
  renderRowItem,
}: TableControlProps<U>): React.JSX.Element {
  const ariaLabel = 'Table';

  const { dragState, ...dropHandlers } = useDropZone({
    onDropComplete: ({ acceptedFiles }) =>
      handleDroppedFiles && handleDroppedFiles(acceptedFiles),
  });

  return (
    <ViewElement className={'storage-browser__table-wrapper'}>
      <Table
        {...dropHandlers}
        aria-label={ariaLabel}
        data-testid="storage-browser-table"
        className={`${BLOCK_NAME} ${
          dragState !== 'inactive' ? `${BLOCK_NAME}__dropzone` : ''
        }`}
      >
        <TableHead className={`${BLOCK_NAME}__head`}>
          <TableRow className={`${BLOCK_NAME}__row`}>
            {columns.map((column) => renderHeaderItem(column))}
          </TableRow>
        </TableHead>

        <TableBody className={`${BLOCK_NAME}__body`}>
          {data?.map((row: U, rowIndex: number) =>
            renderRowItem(row, rowIndex)
          )}
        </TableBody>
      </Table>
    </ViewElement>
  );
}

TableControl.TableRow = TableRow;
TableControl.TableData = TableData;
TableControl.TableHeader = TableHeader;
