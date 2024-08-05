import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import type { OmitElements } from '../types';
import { StorageBrowserElements } from '../../context/elements';

import { CLASS_BASE } from '../constants';
import { useControl } from '../../context/controls';
import {
  LocationAccess,
  LocationData,
  LocationItem,
  Permission,
} from '../../context/types';
import { useAction, useLocationsData } from '../../context/actions';
import { parseLocationAccess } from '../../context/controls/Navigate/utils';

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

const LOCATION_DETAIL_VIEW_COLUMNS: Column<LocationItem>[] = [
  {
    key: 'key',
    header: 'Key',
  },
  {
    key: 'type',
    header: 'Type',
  },
  {
    key: 'lastModified' as keyof LocationItem,
    header: 'Last Modified',
  },
  {
    key: 'size' as keyof LocationItem,
    header: 'Size',
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

  // @TODO: This should be it's own component instead of using `useCallback`
  const renderRowItem: RenderRowItem<LocationAccess<Permission>> =
    React.useCallback(
      (row: LocationAccess<Permission>, index: number) => {
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
      },
      [handleUpdateState]
    );

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

export const LocationDetailViewTable = (): JSX.Element => {
  const [{ history, location }, handleUpdateState] = useControl({
    type: 'NAVIGATE',
  });

  const [{ data, isLoading }, handleList] = useAction({
    type: 'LIST_LOCATION_ITEMS',
  });

  const { prefix: initialPrefix } = location
    ? parseLocationAccess(location)
    : ({} as LocationData);

  const prefix =
    history.length === 1 ? initialPrefix : history[history.length - 1];

  const hasItems = !!data.result?.length;
  const shouldReset = hasItems && !location && !history.length;

  React.useEffect(() => {
    if (shouldReset) {
      handleList({ prefix: '', options: { reset: true } });
    }

    if (typeof prefix !== 'string') return;

    handleList({ prefix, options: { pageSize: 1000, refresh: true } });
  }, [handleList, prefix, shouldReset]);

  // @TODO: This should be it's own component instead of using `useCallback`
  const renderRowItem: RenderRowItem<LocationItem> = React.useCallback(
    (row, index) => {
      const parseTableData = (
        row: LocationItem,
        column: Column<LocationItem>
      ) => {
        if (
          row.type === 'FILE' &&
          // @ts-ignore @TODO fix this ts error: This comparison appears to be unintentional because the types '"key" | "type"' and '"lastModified"' have no overlap.
          column.key === 'lastModified' &&
          row[column.key]
        ) {
          return new Date(row[column.key]).toLocaleString();
        } else {
          return row[column.key];
        }
      };

      return (
        <TableRow key={index}>
          {LOCATION_DETAIL_VIEW_COLUMNS.map((column) => {
            if (row.key === prefix) {
              // Don't render the current prefix as a row
              return null;
            }

            return (
              <TableData key={`${index}-${column.header}`}>
                {column.key === 'key' && row.type === 'FOLDER' ? (
                  <button
                    onClick={() => {
                      handleUpdateState({
                        type: 'NAVIGATE',
                        prefix: row.key,
                      });
                    }}
                    key={`${index}-${row.key}`}
                  >
                    {row.key}
                  </button>
                ) : (
                  <>{parseTableData(row, column)}</>
                )}
              </TableData>
            );
          })}
        </TableRow>
      );
    },
    [handleUpdateState, prefix]
  );

  return isLoading && !hasItems ? (
    <span>loading...</span>
  ) : (
    <TableControl
      columns={LOCATION_DETAIL_VIEW_COLUMNS}
      data={data.result}
      renderRowItem={renderRowItem}
    />
  );
};
