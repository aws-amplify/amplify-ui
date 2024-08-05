import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import type { OmitElements } from '../types';
import { StorageBrowserElements } from '../../context/elements';

import { CLASS_BASE } from '../constants';
import { useControl } from '../../context/controls';
import { LocationAccess, Permission } from '../../context/actions/types';
import { useLocationsData } from '../../context/actions';

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

const LOCATION_VIEW_COLUMNS: Column<LocationAccess<Permission>>[] = [
  {
    header: 'Scope',
    key: 'scope',
  },
  {
    header: 'Type',
    key: 'type',
  },
  {
    header: 'Permission',
    key: 'permission',
  },
];

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

type RenderRowItem<T> = (row: T, index: number) => JSX.Element;

interface TableControlProps<T> {
  data: T[];
  columns: Column<T>[];
  renderRowItem: RenderRowItem<T>;
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
  <U>(props: TableControlProps<U>): React.JSX.Element;
}

export const TableControl: TableControl = <U,>({
  data,
  columns,
  renderRowItem,
}: TableControlProps<U>) => {
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
        {data?.map((row: U, rowIndex: number) => renderRowItem(row, rowIndex))}
      </TableBody>
    </Table>
  );
};

export const LocationsViewTable = (): JSX.Element => {
  const [{ data, isLoading }] = useLocationsData();
  const [, handleUpdateState] = useControl({ type: 'NAVIGATE' });

  const hasLocations = !!data.result?.length;
  const shouldRenderLocations = !hasLocations || isLoading;

  const renderRowItem: RenderRowItem<LocationAccess<Permission>> = (
    row: LocationAccess<Permission>,
    index: number
  ) => {
    return (
      <TableRow key={index}>
        {LOCATION_VIEW_COLUMNS.map((column) => (
          <TableData key={`${index}-${column.header}`}>
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
    );
  };

  return shouldRenderLocations ? (
    <div>...loading</div>
  ) : (
    <TableControl
      columns={LOCATION_VIEW_COLUMNS}
      data={data.result}
      renderRowItem={renderRowItem}
    />
  );
};
