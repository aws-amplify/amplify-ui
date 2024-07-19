import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import { StorageBrowserElements } from '../../context/elements';

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
  className: `${BLOCK_NAME}`,
});

const TableBody = withBaseElementProps(BaseTableBody, {
  className: `${BLOCK_NAME}__body`,
});

const TableHead = withBaseElementProps(BaseTableHead, {
  className: `${BLOCK_NAME}__head`,
});

const TableHeader = withBaseElementProps(BaseTableHeader, {
  className: `${BLOCK_NAME}__header`,
});

const TableHeaderButton = withBaseElementProps(Button, {
  className: `${BLOCK_NAME}__header-button`,
});

const TableData = withBaseElementProps(BaseTableData, {
  className: `${BLOCK_NAME}__data`,
});

const TableDataButton = withBaseElementProps(Button, {
  className: `${BLOCK_NAME}__data-button`,
});

const TableRow = withBaseElementProps(BaseTableRow, {
  className: `${BLOCK_NAME}__row`,
});

const iconAttributes = {
  'aria-hidden': true,
  width: '24',
  height: '24',
  viewBox: '0 0 24 24',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
};

const SortIndeterminateIcon = withBaseElementProps(Icon, {
  children: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.0001 4C3.20044 4 2.72425 4.89205 3.16923 5.55646L7.16674 11.5253C7.56328 12.1174 8.43424 12.1165 8.8296 11.5236L12.8098 5.55479C13.2529 4.89025 12.7765 4 11.9778 4H4.0001ZM10.1057 6H5.87278L7.99999 9.17845L10.1057 6Z"
      fill="#16191F"
    />
  ),
  className: `${BLOCK_NAME}__sort-icon--indeterminate`,
  ...iconAttributes,
});

const SortAscendingIcon = withBaseElementProps(Icon, {
  children: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.16512 10.4442C2.72085 11.1086 3.19712 12 3.99642 12H12.0037C12.8021 12 13.2785 11.1104 12.8361 10.4458L8.84116 4.44491C8.44589 3.85117 7.5739 3.85029 7.17744 4.44324L3.16512 10.4442Z"
      fill="#16191F"
    />
  ),
  className: `${BLOCK_NAME}__sort-icon--ascending`,
  ...iconAttributes,
});

const SortDescendingIcon = withBaseElementProps(Icon, {
  children: (
    <path
      transform="rotate(180 12 12)"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.16512 10.4442C2.72085 11.1086 3.19712 12 3.99642 12H12.0037C12.8021 12 13.2785 11.1104 12.8361 10.4458L8.84116 4.44491C8.44589 3.85117 7.5739 3.85029 7.17744 4.44324L3.16512 10.4442Z"
      fill="#16191F"
    />
  ),
  className: `${BLOCK_NAME}__sort-icon--descending`,
  ...iconAttributes,
});

export interface Data {
  name: string;
}

const LOCATION_BUTTON_KEY = 'name';

export interface Column<T extends Data> {
  header: string;
  key: keyof T;
  sortable: boolean;
  sortType?: 'string' | 'number' | 'date';
}

export interface TableData<T extends Data> {
  columns: Column<T>[];
  rows: T[] | null;
}

export type SortDirection = 'ascending' | 'descending' | 'none';

interface SortableTableControlProps<T extends Data> {
  data: TableData<T>;
  ariaLabel?: string;
  onSort: (columnKey: Column<T>) => void;
  sortState: { key: keyof T; direction: SortDirection };
}

interface NonSortableTableControlProps<T extends Data> {
  data: TableData<T>;
  ariaLabel?: string;
}

type TableControlProps<T extends Data> =
  | SortableTableControlProps<T>
  | NonSortableTableControlProps<T>;

export interface TableControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends Pick<
    T,
    | 'Table'
    | 'TableBody'
    | 'TableData'
    | 'TableHead'
    | 'TableHeader'
    | 'TableRow'
  > {
  <U extends Data>(props: TableControlProps<U>): React.JSX.Element;
  SortIndeterminateIcon: T['Icon'];
  SortAscendingIcon: T['Icon'];
  SortDescendingIcon: T['Icon'];
}

const isSortableTableControlProps = <T extends Data>(
  props: TableControlProps<T>
): props is SortableTableControlProps<T> => {
  return 'onSort' in props && 'sortState' in props;
};

const sortAriaLabel = {
  none: 'not sorted',
  ascending: 'sorted ascending',
  descending: 'sorted descending',
};

export const TableControl: TableControl = <U extends Data>(
  props: TableControlProps<U>
) => {
  const { data, ariaLabel } = props;
  const { rows, columns } = data;

  let onSort: (columnKey: Column<U>) => void;
  let sortState: { key: keyof U; direction: SortDirection };

  if (isSortableTableControlProps(props)) {
    ({ onSort, sortState } = props);
  }

  return (
    <Table aria-label={ariaLabel}>
      <TableHead>
        <TableRow>
          {columns?.map((column) => (
            <TableHeader
              key={String(column.key)}
              aria-sort={
                column.key === sortState?.key ? sortState.direction : 'none'
              }
            >
              {column.sortable && onSort ? (
                <TableHeaderButton
                  aria-label={`${column.header}, ${
                    sortState.key === column.key
                      ? sortAriaLabel[sortState.direction]
                      : sortAriaLabel['none']
                  }`}
                  onClick={() => onSort(column)}
                >
                  {column.header}
                  {sortState?.key !== column.key ||
                  sortState.direction == 'none' ? (
                    <SortIndeterminateIcon />
                  ) : sortState.direction === 'ascending' ? (
                    <SortAscendingIcon />
                  ) : (
                    <SortDescendingIcon />
                  )}
                </TableHeaderButton>
              ) : (
                column.header
              )}
            </TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows?.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((column) => (
              <TableData key={`${rowIndex}-${String(column.key)}`}>
                {column.key === LOCATION_BUTTON_KEY ? (
                  <TableDataButton>
                    <>{row[column.key]}</>
                  </TableDataButton>
                ) : (
                  <>{row[column.key]}</>
                )}
              </TableData>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

TableControl.Table = Table;
TableControl.TableHead = TableHead;
TableControl.TableHeader = TableHeader;
TableControl.TableBody = TableBody;
TableControl.TableRow = TableRow;
TableControl.TableData = TableData;
TableControl.SortIndeterminateIcon = SortIndeterminateIcon;
TableControl.SortAscendingIcon = SortAscendingIcon;
TableControl.SortDescendingIcon = SortDescendingIcon;
