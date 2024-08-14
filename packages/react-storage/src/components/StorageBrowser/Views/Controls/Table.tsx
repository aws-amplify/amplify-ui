import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import { StorageBrowserElements } from '../../context/elements';
import { CLASS_BASE } from '../constants';

export type SortDirection = 'ASCENDING' | 'DESCENDING' | 'NONE';

const {
  Table: BaseTable,
  TableBody: BaseTableBody,
  TableData: BaseTableData,
  TableHead: BaseTableHead,
  TableHeader: BaseTableHeader,
  TableRow: BaseTableRow,
  Button,
  Icon,
} = StorageBrowserElements;

const BLOCK_NAME = 'table';

const Table = withBaseElementProps(BaseTable, {
  className: `${CLASS_BASE}__${BLOCK_NAME}`,
});

const TableBody = withBaseElementProps(BaseTableBody, {
  className: `${CLASS_BASE}__${BLOCK_NAME}__body`,
});

const TableHead = withBaseElementProps(BaseTableHead, {
  className: `${CLASS_BASE}__${BLOCK_NAME}__head`,
});

const TableHeader = withBaseElementProps(BaseTableHeader, {
  className: `${CLASS_BASE}__${BLOCK_NAME}__header`,
});

const TableHeaderButton = withBaseElementProps(Button, {
  className: `${CLASS_BASE}__${BLOCK_NAME}__header-button`,
  variant: 'sort',
});

const TableData = withBaseElementProps(BaseTableData, {
  className: `${CLASS_BASE}__${BLOCK_NAME}__data`,
});

export const TableDataButton = withBaseElementProps(Button, {
  className: `${CLASS_BASE}__${BLOCK_NAME}__data-button`,
  variant: 'table-data',
});

const TableRow = withBaseElementProps(BaseTableRow, {
  className: `${CLASS_BASE}__${BLOCK_NAME}__row`,
});

const SortIndeterminateIcon = withBaseElementProps(Icon, {
  className: `${CLASS_BASE}__${BLOCK_NAME}__sort-icon--indeterminate`,
  variant: 'sort-indeterminate',
});

const SortAscendingIcon = withBaseElementProps(Icon, {
  className: `${CLASS_BASE}__${BLOCK_NAME}__sort-icon--ascending`,
  variant: 'sort-ascending',
});

const SortDescendingIcon = withBaseElementProps(Icon, {
  className: `${CLASS_BASE}__${BLOCK_NAME}__sort-icon--descending`,
  variant: 'sort-descending',
});

export interface Column<T> {
  header: string;
  key: keyof T;
}

export interface TableControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends Pick<T, 'TableData' | 'TableRow'> {
  <U>(props: TableControlProps<U>): React.JSX.Element;
}

export type RenderRowItem<T> = (row: T, index: number) => JSX.Element;

interface TableSortState<T> {
  direction: SortDirection;
  selection: keyof T;
}

type TableSortAction<T> = { selection: keyof T };

export function tableSortReducer<T>(
  state: TableSortState<T>,
  action: TableSortAction<T>
): TableSortState<T> {
  const { direction, selection: prevSelection } = state;
  const { selection } = action;

  if (selection === prevSelection) {
    const newDirection: SortDirection =
      direction === 'ASCENDING' ? 'DESCENDING' : 'ASCENDING';

    return { direction: newDirection, selection };
  } else {
    return { direction: 'ASCENDING', selection };
  }
}

export function defaultTableSort<T>(
  data: T[],
  direction: SortDirection,
  selection: keyof T
): T[] {
  return data.sort((a, b) => {
    const isDateString = (s: T[keyof T]) =>
      typeof s === 'string' && !isNaN(Date.parse(s));

    const aValue = a[selection];
    const bValue = b[selection];

    // Handle missing values
    if (aValue == null && bValue != null) {
      return direction === 'ASCENDING' ? 1 : -1;
    }
    if (aValue != null && bValue == null) {
      return direction === 'ASCENDING' ? -1 : 1;
    }
    if (aValue == null && bValue == null) {
      return 0;
    }

    // If isDate is true, parse the values as Date objects
    const aParsed =
      typeof aValue === 'string' && isDateString(aValue)
        ? new Date(aValue)
        : aValue;
    const bParsed =
      typeof bValue === 'string' && isDateString(bValue)
        ? new Date(bValue)
        : bValue;

    if (aParsed < bParsed) {
      return direction === 'ASCENDING' ? -1 : 1;
    } else if (aValue > bValue) {
      return direction === 'ASCENDING' ? 1 : -1;
    } else {
      return 0;
    }
  });
}

interface TableControlProps<T> {
  data: T[];
  columns: Column<T>[];
  renderRowItem: RenderRowItem<T>;
  sortState: TableSortState<T>;
  updateTableSortState: (action: TableSortAction<T>) => void;
}

export const TableControl: TableControl = <U,>({
  data,
  columns,
  renderRowItem,
  sortState,
  updateTableSortState,
}: TableControlProps<U>) => {
  const ariaLabel = 'Table';

  const { direction, selection } = sortState;

  return (
    <Table aria-label={ariaLabel}>
      <TableHead>
        <TableRow>
          {columns?.map((column) => (
            <TableHeader
              key={column.header}
              aria-sort={
                selection === column.key
                  ? direction === 'ASCENDING'
                    ? 'ascending'
                    : direction === 'DESCENDING'
                    ? 'descending'
                    : 'none'
                  : 'none'
              }
            >
              {/* Should all columns be sortable? */}
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
            </TableHeader>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {data?.map((row: U, rowIndex: number) => renderRowItem(row, rowIndex))}
      </TableBody>
    </Table>
  );
};

TableControl.TableRow = TableRow;
TableControl.TableData = TableData;
