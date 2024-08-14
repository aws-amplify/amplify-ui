import React from 'react';

import { StorageBrowserElements } from '../../context/elements';
import { useControl } from '../../context/controls';
import { Controls, DownloadControl } from '../Controls';
import { CommonControl } from '../types';
import { LocationItem, useAction } from '../../context/actions';
import {
  Column,
  defaultTableSort,
  RenderRowItem,
  TableDataButton,
  tableSortReducer,
} from '../Controls/Table';

const { ActionSelect, Navigate, Title: TitleElement, Table } = Controls;

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

export interface LocationDetailViewControls<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends Pick<
    Controls<T>,
    CommonControl | 'Title' | 'ActionSelect' | 'Paginate' | 'Refresh' | 'Search'
  > {
  (): React.JSX.Element;
}

export const Title = (): React.JSX.Element => {
  const [{ history }] = useControl({
    type: 'NAVIGATE',
  });
  const title = history.slice(-1)[0];
  return <TitleElement>{title}</TitleElement>;
};

const LocationDetailViewTable = ({
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

  const [tableData, setTableData] = React.useState<LocationItem[]>(
    sortFn(data.result, direction, selection)
  );

  React.useEffect(() => {
    setTableData(sortFn(data.result, direction, selection));
  }, [data.result, direction, selection, sortFn]);

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
          return row[column.key];
        }
      };

      return (
        <Table.TableRow key={index}>
          {LOCATION_DETAIL_VIEW_COLUMNS.map((column) => {
            if (row.key === prefix) {
              // Don't render the current prefix as a row
              return null;
            }

            return (
              <Table.TableData key={`${index}-${column.header}`}>
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
                    {row.key}
                  </TableDataButton>
                ) : (
                  <>{parseTableData(row, column)}</>
                )}
              </Table.TableData>
            );
          })}
        </Table.TableRow>
      );
    },
    [handleUpdateState, prefix]
  );

  return isLoading && !hasItems ? (
    <span>loading...</span>
  ) : (
    <Table
      columns={LOCATION_DETAIL_VIEW_COLUMNS}
      data={tableData}
      renderRowItem={renderRowItem}
      sortState={sortState}
      updateTableSortState={updateTableSortState}
    />
  );
};

// @ts-expect-error TODO: add Controls assignment
export const LocationDetailViewControls: LocationDetailViewControls = () => {
  return (
    <>
      <Navigate />
      <Title />
      <ActionSelect />
      <LocationDetailViewTable />
    </>
  );
};
