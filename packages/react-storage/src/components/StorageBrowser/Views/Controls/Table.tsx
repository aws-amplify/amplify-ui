import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import { StorageBrowserElements } from '../../context/elements';
import { DownloadControl } from './Download';
import { CLASS_BASE } from '../constants';
import { useControl } from '../../context/controls';
import { LocationAccess, LocationItem, Permission } from '../../context/types';
import { useAction, useLocationsData } from '../../context/actions';

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
  Span,
} = StorageBrowserElements;

const BLOCK_NAME = `${CLASS_BASE}__table`;
const ICON_CLASS = `${BLOCK_NAME}__data__icon`;
const TABLE_DATA_CLASS = `${BLOCK_NAME}__data`;
const TABLE_HEADER_CLASS = `${BLOCK_NAME}__header`;

const Table = withBaseElementProps(BaseTable, {
  className: `${BLOCK_NAME}`,
});

const TableBody = withBaseElementProps(BaseTableBody, {
  className: `${BLOCK_NAME}__body`,
});

const TableHead = withBaseElementProps(BaseTableHead, {
  className: `${BLOCK_NAME}__head`,
});

export const TableHeaderButton = withBaseElementProps(Button, {
  className: `${BLOCK_NAME}__header__button`,
  variant: 'sort',
});

const TableData: typeof BaseTableData = React.forwardRef(
  function TableData(props, ref) {
    const { variant } = props;
    return (
      <BaseTableData
        {...props}
        className={
          props.className ??
          `${TABLE_DATA_CLASS}${
            variant ? ` ${TABLE_DATA_CLASS}--${variant}` : ''
          }`
        }
        variant={variant}
        ref={ref}
      />
    );
  }
);

const TableHeader: typeof BaseTableHeader = React.forwardRef(
  function TableHeader(props, ref) {
    const { variant } = props;
    return (
      <BaseTableHeader
        {...props}
        className={
          props.className ??
          `${TABLE_HEADER_CLASS} ${
            variant ? ` ${TABLE_HEADER_CLASS}--${variant}` : ''
          }`
        }
        variant={variant}
        ref={ref}
      />
    );
  }
);

export const TableDataButton = withBaseElementProps(Button, {
  className: `${BLOCK_NAME}__data__button`,
  variant: 'table-data',
});

export const TableDataText = withBaseElementProps(Span, {
  className: `${BLOCK_NAME}__data__text`,
});

const TableRow = withBaseElementProps(BaseTableRow, {
  className: `${BLOCK_NAME}__row`,
});

export const SortIndeterminateIcon = withBaseElementProps(Icon, {
  className: `${BLOCK_NAME}__sort-icon--indeterminate`,
  variant: 'sort-indeterminate',
});

export const SortAscendingIcon = withBaseElementProps(Icon, {
  className: `${BLOCK_NAME}__sort-icon--ascending`,
  variant: 'sort-ascending',
});

export const SortDescendingIcon = withBaseElementProps(Icon, {
  className: `${BLOCK_NAME}__sort-icon--descending`,
  variant: 'sort-descending',
});

const LOCATION_VIEW_COLUMNS: Column<LocationAccess<Permission>>[] = [
  {
    header: 'Name',
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
    header: 'Name',
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
  {
    key: 'download' as keyof LocationItem,
    header: 'Download',
  },
];

export interface Column<T> {
  header: string;
  key: keyof T;
}

export interface TableControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends Pick<T, 'TableData' | 'TableRow' | 'TableHeader'> {
  <U>(props: TableControlProps<U>): React.JSX.Element;
}

export type RenderHeaderItem<T> = (column: Column<T>) => JSX.Element;

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
  renderHeaderItem: RenderHeaderItem<T>;
  renderRowItem: RenderRowItem<T>;
}

export const TableControl: TableControl = <U,>({
  data,
  columns,
  renderHeaderItem,
  renderRowItem,
}: TableControlProps<U>) => {
  const ariaLabel = 'Table';

  return (
    <Table aria-label={ariaLabel}>
      <TableHead>{columns.map((column) => renderHeaderItem(column))}</TableHead>

      <TableBody>
        {data?.map((row: U, rowIndex: number) => renderRowItem(row, rowIndex))}
      </TableBody>
    </Table>
  );
};

TableControl.TableRow = TableRow;
TableControl.TableData = TableData;
TableControl.TableHeader = TableHeader;

export const LocationsViewTable = ({
  sortFunction,
}: {
  sortFunction?: () => LocationAccess<Permission>[];
}): JSX.Element => {
  const sortFn = sortFunction ?? defaultTableSort;

  const [sortState, updateTableSortState] = React.useReducer(
    tableSortReducer<LocationAccess<Permission>>,
    {
      direction: 'ASCENDING',
      selection: 'scope',
    }
  );

  const { direction, selection } = sortState;

  const [{ data, isLoading }] = useLocationsData();
  const [, handleUpdateState] = useControl({ type: 'NAVIGATE' });

  const tableData = sortFn<LocationAccess<Permission>>(
    data.result,
    direction,
    selection
  );

  const hasLocations = !!data.result?.length;
  const shouldRenderLocations = !hasLocations || isLoading;

  const renderHeaderItem = React.useCallback(
    (column: Column<LocationAccess<Permission>>) => {
      // Defining this function inside the `LocationsViewTable` to get access
      // to the current sort state

      const { header, key } = column;

      return (
        <TableHeader
          key={header}
          aria-sort={
            selection === key
              ? direction === 'ASCENDING'
                ? 'ascending'
                : direction === 'DESCENDING'
                ? 'descending'
                : 'none'
              : 'none'
          }
        >
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
      );
    },
    [direction, selection]
  );

  // @TODO: This should be it's own component instead of using `useCallback`
  const renderRowItem: RenderRowItem<LocationAccess<Permission>> =
    React.useCallback(
      (row: LocationAccess<Permission>, index: number) => {
        return (
          <TableRow key={index}>
            {LOCATION_VIEW_COLUMNS.map((column) => (
              <TableData key={`${index}-${column.header}`} variant={column.key}>
                {column.key === 'scope' &&
                (row.type === 'BUCKET' || row.type === 'PREFIX') ? (
                  <TableDataButton
                    key={row['scope']}
                    onClick={() => {
                      handleUpdateState({
                        type: 'ACCESS_LOCATION',
                        location: row,
                      });
                    }}
                    type="button"
                  >
                    <Icon className={ICON_CLASS} variant="folder" /> {row.scope}
                  </TableDataButton>
                ) : (
                  <TableDataText>{row[column.key]}</TableDataText>
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
      data={tableData}
      renderRowItem={renderRowItem}
      renderHeaderItem={renderHeaderItem}
    />
  );
};

export const LocationDetailViewTable = ({
  sortFunction,
}: {
  sortFunction?: () => LocationItem[];
}): JSX.Element => {
  const sortFn = sortFunction ?? defaultTableSort;

  const [sortState, updateTableSortState] = React.useReducer(
    tableSortReducer<LocationItem>,
    {
      direction: 'ASCENDING',
      selection: 'key',
    }
  );

  const { direction, selection } = sortState;

  const [{ history, location }, handleUpdateState] = useControl({
    type: 'NAVIGATE',
  });

  const [{ data, isLoading }, handleList] = useAction({
    type: 'LIST_LOCATION_ITEMS',
  });

  const prefix = history.join('');

  const hasItems = !!data.result?.length;
  const shouldReset = !history.length && hasItems && !location;

  const tableData = sortFn(data.result, direction, selection);

  React.useEffect(() => {
    if (shouldReset) {
      handleList({ prefix: '', options: { reset: true } });
    }

    if (!history.length) {
      return;
    }

    handleList({ prefix, options: { pageSize: 1000, refresh: true } });
  }, [handleList, history, prefix, shouldReset]);

  const renderHeaderItem = React.useCallback(
    (column: Column<LocationItem>) => {
      // Defining this function inside the `LocationDetailViewTable` to get access
      // to the current sort state

      const { header, key } = column;

      return (
        <TableHeader
          key={header}
          aria-sort={
            selection === key
              ? direction === 'ASCENDING'
                ? 'ascending'
                : direction === 'DESCENDING'
                ? 'descending'
                : 'none'
              : 'none'
          }
        >
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
      );
    },
    [direction, selection]
  );

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
          return (
            <TableDataText>
              {new Date(row[column.key]).toLocaleString()}
            </TableDataText>
          );
        } else if (column.key === ('download' as keyof LocationItem)) {
          return row.type === 'FILE' ? (
            <DownloadControl fileKey={row.key} />
          ) : null;
        } else {
          return (
            <TableDataText>
              {column.key === 'key' && row.type === 'FILE' ? (
                <Icon className={ICON_CLASS} variant="file" />
              ) : null}
              {row[column.key]}
            </TableDataText>
          );
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
              <TableData key={`${index}-${column.header}`} variant={column.key}>
                {column.key === 'key' && row.type === 'FOLDER' ? (
                  <TableDataButton
                    onClick={() => {
                      handleUpdateState({
                        type: 'NAVIGATE',
                        prefix: row.key.slice(prefix.length),
                      });
                    }}
                    key={`${index}-${row.key}`}
                  >
                    <Icon className={ICON_CLASS} variant="folder" /> {row.key}
                  </TableDataButton>
                ) : (
                  parseTableData(row, column)
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
      data={tableData}
      renderRowItem={renderRowItem}
      renderHeaderItem={renderHeaderItem}
    />
  );
};
