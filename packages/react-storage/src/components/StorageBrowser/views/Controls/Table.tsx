import React from 'react';
import { humanFileSize } from '@aws-amplify/ui';

import { TABLE_HEADER_BUTTON_CLASS_NAME } from '../../components/DataTable';
import { useAction } from '../../context/actions';
import {
  SpanElementProps,
  StorageBrowserElements,
  TableDataElementProps,
  TableHeaderElementProps,
} from '../../context/elements';
import { useControl } from '../../context/control';
import { FileItem, FolderItem, LocationItem } from '../../context/types';

import { CLASS_BASE } from '../constants';
import { compareDates, compareNumbers, compareStrings } from '../utils';

import { DownloadControl } from './Download';
import { CheckboxControl } from '../../components/Checkbox';

export type SortDirection = 'ascending' | 'descending' | 'none';

export type SortState<T> = {
  selection: keyof T;
  direction: SortDirection;
};

const {
  Table,
  TableBody,
  TableData: BaseTableData,
  TableHead,
  TableHeader: BaseTableHeader,
  TableRow,
  Button,
  Icon,
  Span,
} = StorageBrowserElements;

const BLOCK_NAME = `${CLASS_BASE}__table`;
const ICON_CLASS = `${BLOCK_NAME}__data__icon`;
const TABLE_DATA_CLASS = `${BLOCK_NAME}__data`;
const TABLE_HEADER_CLASS = `${BLOCK_NAME}__header`;

const SELECT_FILE_TEXT = 'Select file';
const SELECT_ALL_FILES_TEXT = 'Select all files';

function TableData({ className, variant, ...props }: TableDataElementProps) {
  return (
    <BaseTableData
      {...props}
      className={
        className ??
        `${TABLE_DATA_CLASS}${
          variant ? ` ${TABLE_DATA_CLASS}--${variant}` : ''
        }`
      }
      variant={variant}
    />
  );
}

function TableHeader({
  className,
  variant,
  ...props
}: TableHeaderElementProps) {
  return (
    <BaseTableHeader
      {...props}
      className={
        className ??
        `${TABLE_HEADER_CLASS} ${
          variant ? ` ${TABLE_HEADER_CLASS}--${variant}` : ''
        }`
      }
      variant={variant}
    />
  );
}

export function TableDataText({
  className = `${BLOCK_NAME}__data__text`,
  ...props
}: SpanElementProps): React.JSX.Element {
  return <Span {...props} className={className} />;
}

const LOCATION_DETAIL_VIEW_COLUMNS: Column<LocationItem>[] = [
  {
    // @TODO: Fix me after refactor
    // @ts-ignore
    key: 'select',
    header: '',
  },
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

export type RenderHeaderItem<T> = (column: Column<T>) => JSX.Element;

export type RenderRowItem<T> = (row: T, index: number) => JSX.Element;

interface TableControlProps<T> {
  data: T[];
  columns: Column<T>[];
  renderHeaderItem: RenderHeaderItem<T>;
  renderRowItem: RenderRowItem<T>;
}

export function TableControl<U>({
  data,
  columns,
  renderHeaderItem,
  renderRowItem,
}: TableControlProps<U>): React.JSX.Element {
  const ariaLabel = 'Table';

  return (
    <Table aria-label={ariaLabel} className={BLOCK_NAME}>
      <TableHead className={`${BLOCK_NAME}__head`}>
        <TableRow className={`${BLOCK_NAME}__row`}>
          {columns.map((column) => renderHeaderItem(column))}
        </TableRow>
      </TableHead>

      <TableBody className={`${BLOCK_NAME}__body`}>
        {data?.map((row: U, rowIndex: number) => renderRowItem(row, rowIndex))}
      </TableBody>
    </Table>
  );
}

TableControl.TableRow = TableRow;
TableControl.TableData = TableData;
TableControl.TableHeader = TableHeader;

const LocationDetailViewColumnSortMap = {
  key: compareStrings,
  type: compareStrings,
  lastModified: compareDates,
  size: compareNumbers,
};

const LocationDetailViewColumnEmptyHeaderMap = ['download'];

export const LocationDetailSelectAllControl = ({
  onSelect,
  checked,
}: {
  onSelect: () => void;
  checked: boolean;
}): JSX.Element => {
  return (
    <CheckboxControl
      checked={checked}
      id="select-all"
      labelHidden
      labelText={SELECT_ALL_FILES_TEXT}
      onSelect={onSelect}
    />
  );
};

export const LocationDetailViewTable = ({
  range,
}: {
  range: [start: number, end: number];
}): JSX.Element | null => {
  const [start, end] = range;

  const [{ history, path }, handleUpdateState] = useControl('NAVIGATE');
  const [{ selected }, handleLocationActionsState] =
    useControl('LOCATION_ACTIONS');

  const [{ data }] = useAction('LIST_LOCATION_ITEMS');

  const currentPosition = history.length;
  const hasItems = !!data.result?.length;

  const [compareFn, setCompareFn] = React.useState(() => compareStrings);
  const [sortState, setSortState] = React.useState<SortState<LocationItem>>({
    selection: 'key',
    direction: 'ascending',
  });

  const { direction, selection } = sortState;

  // Use range prop values to get the current page of data
  const pagedData = data.result.slice(start, end);

  const tableData =
    direction === 'ascending'
      ? pagedData.sort((a, b) => compareFn(a[selection], b[selection]))
      : pagedData.sort((a, b) => compareFn(b[selection], a[selection]));

  // Selection state:
  const files = pagedData.filter((item) => item.type === 'FILE');
  const selectedMap: Record<string, boolean> = {};
  selected.items?.forEach((item) => (selectedMap[item.key] = true));
  const hasFilesToSelect = files.length > 0;
  const allFilesSelected = hasFilesToSelect
    ? files.every((item) => selectedMap[item.key])
    : false;

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
            <Button
              variant="sort"
              className={TABLE_HEADER_BUTTON_CLASS_NAME}
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
            </Button>
          ) : // @TODO: Fix me after refactor
          // @ts-ignore
          column.key === 'select' ? (
            hasFilesToSelect && (
              <LocationDetailSelectAllControl
                checked={allFilesSelected}
                onSelect={() => {
                  handleLocationActionsState({
                    type: 'TOGGLE_SELECTED_ITEMS',
                    items: allFilesSelected ? [] : files,
                  });
                }}
              />
            )
          ) : LocationDetailViewColumnEmptyHeaderMap.includes(
              column.key
            ) ? null : (
            column.header
          )}
        </TableHeader>
      );
    },
    [
      direction,
      files,
      handleLocationActionsState,
      hasFilesToSelect,
      allFilesSelected,
      selection,
    ]
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
              case 'select' as keyof LocationItem: {
                const isSelected =
                  selected.items?.some((item) => {
                    return item.key === row.key;
                  }) ?? false;
                return (
                  <CheckboxControl
                    checked={isSelected}
                    id={`${index}-${row.key}`}
                    labelHidden
                    labelText={`${SELECT_FILE_TEXT} ${row.key}`}
                    onSelect={() => {
                      handleLocationActionsState({
                        type: 'TOGGLE_SELECTED_ITEM',
                        item: row,
                      });
                    }}
                  />
                );
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
                  <Button
                    className={`${BLOCK_NAME}__data__button`}
                    variant="table-data"
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
                  </Button>
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
    [
      handleUpdateState,
      currentPosition,
      path,
      selected,
      handleLocationActionsState,
    ]
  );

  return hasItems ? (
    <TableControl
      columns={LOCATION_DETAIL_VIEW_COLUMNS}
      data={tableData}
      renderHeaderItem={renderHeaderItem}
      renderRowItem={renderRowItem}
    />
  ) : null;
};
