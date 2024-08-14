import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import { StorageBrowserElements } from '../../context/elements';
import { DownloadControl } from './Download';
import { CLASS_BASE } from '../constants';
import { useControl } from '../../context/controls';
import { LocationAccess, LocationItem, Permission } from '../../context/types';
import { useAction, useLocationsData } from '../../context/actions';

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
  className: `${BLOCK_NAME}__header__button`,
  variant: 'sort',
});

const TableData = withBaseElementProps(BaseTableData, {
  className: `${BLOCK_NAME}__data`,
});

const TableDataButton = withBaseElementProps(Button, {
  className: `${BLOCK_NAME}__data__button`,
  variant: 'table-data',
});

const TableDataText = withBaseElementProps(Span, {
  className: `${BLOCK_NAME}__data__text`,
});

const TableRow = withBaseElementProps(BaseTableRow, {
  className: `${BLOCK_NAME}__row`,
});

const SortIndeterminateIcon = withBaseElementProps(Icon, {
  className: `${BLOCK_NAME}__sort-icon--indeterminate`,
  variant: 'sort-indeterminate',
});

// const SortAscendingIcon = withBaseElementProps(Icon, {
//   className: `${BLOCK_NAME}__sort-icon--ascending`,
//   variant: 'sort-ascending',
// });

// const SortDescendingIcon = withBaseElementProps(Icon, {
//   className: `${BLOCK_NAME}__sort-icon--descending`,
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
> extends Pick<T, 'TableData' | 'TableRow'> {
  <U>(props: TableControlProps<U>): React.JSX.Element;
}

export type RenderRowItem<T> = (row: T, index: number) => JSX.Element;

interface TableControlProps<T> {
  data: T[];
  columns: Column<T>[];
  renderRowItem: RenderRowItem<T>;
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

TableControl.TableRow = TableRow;
TableControl.TableData = TableData;

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

  const prefix = history.join('');

  const hasItems = !!data.result?.length;
  const shouldReset = !history.length && hasItems && !location;

  React.useEffect(() => {
    if (shouldReset) {
      handleList({ prefix: '', options: { reset: true } });
    }

    if (!history.length) {
      return;
    }

    handleList({ prefix, options: { pageSize: 1000, refresh: true } });
  }, [handleList, history, prefix, shouldReset]);

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
        } else if (column.key === ('download' as keyof LocationItem)) {
          return <DownloadControl fileKey={row.key} />;
        } else {
          return (
            <>
              {column.key === 'key' && row.type === 'FILE' ? (
                <Icon className={ICON_CLASS} variant="file" />
              ) : null}
              {row[column.key]}
            </>
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
              <TableData key={`${index}-${column.header}`}>
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
                  <TableDataText>{parseTableData(row, column)}</TableDataText>
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
