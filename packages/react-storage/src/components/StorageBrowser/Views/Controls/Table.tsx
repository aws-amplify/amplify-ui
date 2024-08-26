import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';
import { humanFileSize } from '@aws-amplify/ui';

import { StorageBrowserElements } from '../../context/elements';
import { DownloadControl } from './Download';
import { CLASS_BASE } from '../constants';
import { useControl } from '../../context/controls';
import {
  FileItem,
  FolderItem,
  LocationAccess,
  LocationItem,
  Permission,
} from '../../context/types';
import { useAction, useLocationsData } from '../../context/actions';
import {
  compareDates,
  compareNumbers,
  compareStrings,
} from '../../context/controls/Table';

export type SortDirection = 'ascending' | 'descending' | 'none';

export type SortState<T> = {
  selection: keyof T;
  direction: SortDirection;
};

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

const TableDataButton = withBaseElementProps(Button, {
  className: `${BLOCK_NAME}__data__button`,
  variant: 'table-data',
});

export const TableDataText = withBaseElementProps(Span, {
  className: `${BLOCK_NAME}__data__text`,
});

const TableRow = withBaseElementProps(BaseTableRow, {
  className: `${BLOCK_NAME}__row`,
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
      <TableHead>
        <TableRow>{columns.map((column) => renderHeaderItem(column))}</TableRow>
      </TableHead>

      <TableBody>
        {data?.map((row: U, rowIndex: number) => renderRowItem(row, rowIndex))}
      </TableBody>
    </Table>
  );
};

TableControl.TableRow = TableRow;
TableControl.TableData = TableData;
TableControl.TableHeader = TableHeader;

const LocationsViewColumnSortMap = {
  scope: compareStrings,
  type: compareStrings,
  permission: compareStrings,
};

export const LocationsViewTable = (): JSX.Element | null => {
  const [{ data, isLoading }] = useLocationsData();
  const [, handleUpdateState] = useControl({ type: 'NAVIGATE' });

  const hasLocations = !!data.result?.length;
  const shouldRenderLocations = hasLocations && !isLoading;

  const [compareFn, setCompareFn] = React.useState(() => compareStrings);
  const [sortState, setSortState] = React.useState<
    SortState<LocationAccess<Permission>>
  >({
    selection: 'scope',
    direction: 'ascending',
  });

  const { direction: sortDirection, selection } = sortState;

  const tableData =
    sortDirection === 'ascending'
      ? data.result.sort((a, b) => compareFn(a[selection], b[selection]))
      : data.result.sort((a, b) => compareFn(b[selection], a[selection]));

  const renderHeaderItem = React.useCallback(
    (column: Column<LocationAccess<Permission>>) => {
      // Defining this function inside the `LocationsViewTable` to get access
      // to the current sort state
      const { header, key } = column;

      return (
        <TableHeader
          key={header}
          variant={key}
          aria-sort={selection === key ? sortDirection : 'none'}
        >
          <TableHeaderButton
            onClick={() => {
              setCompareFn(() => LocationsViewColumnSortMap[column.key]);

              setSortState((prevState) => ({
                selection: column.key,
                direction:
                  prevState.direction === 'ascending'
                    ? 'descending'
                    : 'ascending',
              }));
            }}
          >
            {column.header}
            {selection === column.key ? (
              <Icon
                variant={
                  sortDirection === 'none'
                    ? 'sort-indeterminate'
                    : `sort-${sortDirection}`
                }
              />
            ) : (
              <Icon variant="sort-indeterminate" />
            )}
          </TableHeaderButton>
        </TableHeader>
      );
    },
    [sortDirection, selection]
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
    <TableControl
      columns={LOCATION_VIEW_COLUMNS}
      data={tableData}
      renderHeaderItem={renderHeaderItem}
      renderRowItem={renderRowItem}
    />
  ) : null;
};

const LocationDetailViewColumnSortMap = {
  key: compareStrings,
  type: compareStrings,
  lastModified: compareDates,
  size: compareNumbers,
};

export const LocationDetailViewTable = (): JSX.Element | null => {
  const [{ history, path }, handleUpdateState] = useControl({
    type: 'NAVIGATE',
  });

  const [{ data, isLoading }, handleList] = useAction({
    type: 'LIST_LOCATION_ITEMS',
  });

  const currentPosition = history.length;
  const hasHistory = !!currentPosition;
  const hasItems = !!data.result?.length;

  const [compareFn, setCompareFn] = React.useState(() => compareStrings);
  const [sortState, setSortState] = React.useState<SortState<LocationItem>>({
    selection: 'key',
    direction: 'ascending',
  });

  const { direction, selection } = sortState;

  const tableData =
    direction === 'ascending'
      ? data.result.sort((a, b) => compareFn(a[selection], b[selection]))
      : data.result.sort((a, b) => compareFn(b[selection], a[selection]));

  React.useEffect(() => {
    if (!hasHistory) return;

    handleList({
      prefix: path,
      options: { pageSize: 1000, refresh: true, delimiter: '/' },
    });
  }, [handleList, hasHistory, history, path]);

  const renderHeaderItem = React.useCallback(
    (column: Column<LocationItem>) => {
      // Defining this function inside the `LocationDetailViewTable` to get access
      // to the current sort state

      const { header, key } = column;

      return (
        <TableHeader
          key={header}
          variant={key}
          aria-label={
            key == ('download' as keyof LocationItem)
              ? column.header
              : undefined
          }
          aria-sort={selection === key ? direction : 'none'}
        >
          {LocationDetailViewColumnSortMap[column.key] ? (
            <TableHeaderButton
              onClick={() => {
                setCompareFn(() => LocationDetailViewColumnSortMap[column.key]);

                setSortState((prevState) => ({
                  selection: column.key,
                  direction:
                    prevState.direction === 'ascending'
                      ? 'descending'
                      : 'ascending',
                }));
              }}
            >
              {column.header}
              {selection === column.key ? (
                <Icon
                  variant={
                    direction === 'none'
                      ? 'sort-indeterminate'
                      : `sort-${direction}`
                  }
                />
              ) : (
                <Icon variant="sort-indeterminate" />
              )}
            </TableHeaderButton>
          ) : column.key !== ('download' as keyof LocationItem) ? (
            column.header
          ) : null}
        </TableHeader>
      );
    },
    [direction, selection]
  );

  // @TODO: This should be it's own component instead of using `useCallback`
  const renderRowItem: RenderRowItem<LocationItem> = React.useCallback(
    (row, index) => {
      const renderTableData = (
        row: LocationItem,
        column: Column<LocationItem>
      ) => {
        const { type } = row;

        switch (type) {
          case 'FILE': {
            // Casting column as Column<FileItem> to assert that we're only working with FileItems
            // since the type is 'FILE'
            const { key } = column as Column<FileItem>;

            switch (key) {
              case 'size': {
                return (
                  <TableDataText>
                    {humanFileSize(row.size ?? 0, true)}
                  </TableDataText>
                );
              }
              case 'lastModified': {
                return (
                  <TableDataText>
                    {new Date(row.lastModified).toLocaleString()}
                  </TableDataText>
                );
              }
              case 'download' as keyof LocationItem: {
                return <DownloadControl fileKey={`${path}${row.key}`} />;
              }
              case 'type': {
                const indexOfDot = row.key.lastIndexOf('.');

                return indexOfDot > -1 ? (
                  <TableDataText>{row.key.slice(indexOfDot + 1)}</TableDataText>
                ) : (
                  '-'
                );
              }
              case 'key': {
                return (
                  <TableDataText>
                    <Icon className={ICON_CLASS} variant="file" />
                    {row.key}
                  </TableDataText>
                );
              }
              default:
                return <TableDataText>{row[column.key]}</TableDataText>;
            }
          }
          case 'FOLDER': {
            // Casting column as Column<FolderItem> to assert that we're only working with FileItems
            // since the type is 'FOLDER'
            const { key } = column as Column<FolderItem>;

            switch (key) {
              case 'key': {
                return (
                  <TableDataButton
                    onClick={() => {
                      handleUpdateState({
                        type: 'NAVIGATE',
                        entry: {
                          position: currentPosition + 1,
                          prefix: row.key,
                        },
                      });
                    }}
                    key={`${index}-${row.key}`}
                  >
                    <Icon className={ICON_CLASS} variant="folder" /> {row.key}
                  </TableDataButton>
                );
              }
              case 'type': {
                return <TableDataText>Folder</TableDataText>;
              }
              default:
                return <TableDataText>{row[column.key]}</TableDataText>;
            }
          }
        }
      };

      return (
        <TableRow key={index}>
          {LOCATION_DETAIL_VIEW_COLUMNS.map((column) => {
            return (
              <TableData key={`${index}-${column.header}`} variant={column.key}>
                {renderTableData(row, column)}
              </TableData>
            );
          })}
        </TableRow>
      );
    },
    [handleUpdateState, currentPosition, path]
  );

  return hasItems && !isLoading ? (
    <TableControl
      columns={LOCATION_DETAIL_VIEW_COLUMNS}
      data={tableData}
      renderHeaderItem={renderHeaderItem}
      renderRowItem={renderRowItem}
    />
  ) : null;
};
