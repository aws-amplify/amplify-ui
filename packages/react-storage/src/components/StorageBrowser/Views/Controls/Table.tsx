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
  viewBox: '0 -960 960 960',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
};

const SortIndeterminateIcon = withBaseElementProps(Icon, {
  children: <path d="M240-440v-80h480v80H240Z" fill="currentColor" />,
  className: `${BLOCK_NAME}__sort-icon--indeterminate`,
  ...iconAttributes,
});

const SortAscendingIcon = withBaseElementProps(Icon, {
  children: <path d="m280-400 200-200 200 200H280Z" fill="currentColor" />,
  className: `${BLOCK_NAME}__sort-icon--ascending`,
  ...iconAttributes,
});

const SortDescendingIcon = withBaseElementProps(Icon, {
  children: <path d="M480-360 280-560h400L480-360Z" fill="currentColor" />,
  className: `${BLOCK_NAME}__sort-icon--descending`,
  ...iconAttributes,
});

export interface Data {
  name: string;
}

const LOCATION_BUTTON_KEY = 'name';

export interface Column<T> {
  header: string;
  key: keyof T;
}

export interface TableData<T extends Data> {
  columns: Column<T>[];
  rows: T[] | null;
}

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
  (): React.JSX.Element;
  SortIndeterminateIcon: T['Icon'];
  SortAscendingIcon: T['Icon'];
  SortDescendingIcon: T['Icon'];
}

export const TableControl: TableControl = () => {
  // Data should be coming from context
  const columns: Column<Data>[] = [];
  const rows: Data[] = [];

  const ariaLabel = 'Table';

  return (
    <Table aria-label={ariaLabel}>
      <TableHead>
        <TableRow>
          {columns?.map((column) => (
            <TableHeader key={column.header} aria-sort="none">
              {/* Should all columns be sortable? */}
              <TableHeaderButton
                onClick={() => {
                  /* no op for now */
                }}
              >
                {column.header}
                <SortIndeterminateIcon />
              </TableHeaderButton>
            </TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows?.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((column) => (
              <TableData key={`${rowIndex}-${column.header}`}>
                {/* How do we know when a row is supposed to be a button/link? */}
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
TableControl.TableBody = TableBody;
TableControl.TableData = TableData;
TableControl.TableHead = TableHead;
TableControl.TableHeader = TableHeader;
TableControl.TableRow = TableRow;
TableControl.SortIndeterminateIcon = SortIndeterminateIcon;
TableControl.SortAscendingIcon = SortAscendingIcon;
TableControl.SortDescendingIcon = SortDescendingIcon;