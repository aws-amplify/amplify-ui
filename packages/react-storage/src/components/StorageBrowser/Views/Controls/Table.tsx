import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import type { OmitElements } from '../types';
import { StorageBrowserElements } from '../../context/elements';

import { CLASS_BASE } from '../constants';
import { useControl } from '../../context/controls';
import { LocationAccess, Permission } from '../../context/actions/types';

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
});

const TableData = withBaseElementProps(BaseTableData, {
  className: `${CLASS_BASE}__${BLOCK_NAME}__data`,
});

// const TableDataButton = withBaseElementProps(Button, {
//   className: `${CLASS_BASE}__${BLOCK_NAME}__data-button`,
// });

const TableRow = withBaseElementProps(BaseTableRow, {
  className: `${CLASS_BASE}__${BLOCK_NAME}__row`,
});

const SortIndeterminateIcon = withBaseElementProps(Icon, {
  className: `${CLASS_BASE}__${BLOCK_NAME}__sort-icon--indeterminate`,
  variant: 'sort-indeterminate',
});

// const SortAscendingIcon = withBaseElementProps(Icon, {
//   className: `${CLASS_BASE}__${BLOCK_NAME}__sort-icon--ascending`,
//   variant: 'sort-ascending',
// });

// const SortDescendingIcon = withBaseElementProps(Icon, {
//   className: `${CLASS_BASE}__${BLOCK_NAME}__sort-icon--descending`,
//   variant: 'sort-descending',
// });

const LOCATION_BUTTON_KEY = 'name';

export interface Column<T> {
  header: string;
  key: keyof T;
}

export interface _TableControl<
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
}

interface TableControlProps<T> {
  rows: T[];
  columns: Column<T>[];
}

export interface TableControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends OmitElements<
    _TableControl<T>,
    | 'Table'
    | 'TableBody'
    | 'TableData'
    | 'TableHead'
    | 'TableHeader'
    | 'TableRow'
    | 'SortIndeterminateIcon'
    | 'SortAscendingIcon'
    | 'SortDescendingIcon'
  > {
  <U extends LocationAccess<Permission>>(
    props: TableControlProps<U>
  ): React.JSX.Element;
}

export const TableControl: TableControl = <
  U extends LocationAccess<Permission>,
>({
  rows,
  columns,
}: TableControlProps<U>) => {
  // @TODO data should come from context

  const [, handleUpdateState] = useControl({ type: 'NAVIGATE' });

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
                {column.key === 'scope' &&
                (row.type === 'BUCKET' || row.type === 'PREFIX') ? (
                  <button
                    key={row['scope']}
                    onClick={() => {
                      handleUpdateState({
                        type: 'ACCESS_LOCATION',
                        location: {
                          ...row,
                          scope: row.scope,
                          type: row.type,
                        },
                      });
                    }}
                    type="button"
                  >
                    {row.scope}
                  </button>
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
