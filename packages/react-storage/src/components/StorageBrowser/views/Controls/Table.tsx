import React from 'react';
import { humanFileSize } from '@aws-amplify/ui';

import { TABLE_HEADER_BUTTON_CLASS_NAME } from '../../components/DataTable';
import { useAction } from '../../do-not-import-from-here/actions';
import {
  SpanElementProps,
  StorageBrowserElements,
  TableDataCellElementProps,
  TableHeaderElementProps,
  ViewElement,
} from '../../context/elements';

import { FolderData, LocationItemData } from '../../actions/handlers';
import { CLASS_BASE } from '../constants';
import { compareDates, compareNumbers, compareStrings } from '../utils';

import { DownloadControl } from './Download';
import { useDropZone } from '@aws-amplify/ui-react-core';
import { Checkbox } from '../../components/Checkbox';

import { useStore } from '../../providers/store';
import { FileData, LocationData } from '../../actions/handlers';

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

function TableData({
  className,
  variant,
  ...props
}: TableDataCellElementProps) {
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

const LOCATION_DETAIL_VIEW_COLUMNS: Column<LocationItemData>[] = [
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
    key: 'lastModified' as keyof LocationItemData,
    header: 'Last Modified',
  },
  {
    key: 'size' as keyof LocationItemData,
    header: 'Size',
  },
  {
    key: 'download' as keyof LocationItemData,
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
  handleDroppedFiles?: (files: File[]) => void;
  renderHeaderItem: RenderHeaderItem<T>;
  renderRowItem: RenderRowItem<T>;
}

export function TableControl<U>({
  data,
  columns,
  handleDroppedFiles,
  renderHeaderItem,
  renderRowItem,
}: TableControlProps<U>): React.JSX.Element {
  const ariaLabel = 'Table';

  const { dragState, ...dropHandlers } = useDropZone({
    onDropComplete: ({ acceptedFiles }) =>
      handleDroppedFiles && handleDroppedFiles(acceptedFiles),
  });

  return (
    <ViewElement className={'storage-browser__table-wrapper'}>
      <Table
        {...dropHandlers}
        aria-label={ariaLabel}
        data-testid="storage-browser-table"
        className={`${BLOCK_NAME} ${
          dragState !== 'inactive' ? `${BLOCK_NAME}__dropzone` : ''
        }`}
      >
        <TableHead className={`${BLOCK_NAME}__head`}>
          <TableRow className={`${BLOCK_NAME}__row`}>
            {columns.map((column) => renderHeaderItem(column))}
          </TableRow>
        </TableHead>

        <TableBody className={`${BLOCK_NAME}__body`}>
          {data?.map((row: U, rowIndex: number) =>
            renderRowItem(row, rowIndex)
          )}
        </TableBody>
      </Table>
    </ViewElement>
  );
}

TableControl.TableRow = TableRow;
TableControl.TableData = TableData;
TableControl.TableHeader = TableHeader;

const sortFns = {
  key: compareStrings,
  type: compareStrings,
  lastModified: compareDates,
  size: compareNumbers,
};

const LocationDetailViewColumnEmptyHeaderMap = ['download'];

export const LocationDetailViewTable = ({
  items,
  handleDroppedFiles,
  handleLocationItemClick,
}: {
  items: LocationItemData[];
  handleDroppedFiles: (files: File[]) => void;
  handleLocationItemClick: (location: LocationData, path?: string) => void;
}): JSX.Element | null => {
  const [{ location, locationItems }, dispatchStoreAction] = useStore();
  const { current, key: locationKey } = location;
  const { prefix } = current ?? {};
  const { fileDataItems } = locationItems;

  const [{ hasError }] = useAction('LIST_LOCATION_ITEMS');

  const hasItems = !!items.length;
  const showTable = hasItems && !hasError;

  const [compareFn, setCompareFn] = React.useState(() => compareStrings);
  const [sortState, setSortState] = React.useState<SortState<LocationItemData>>(
    {
      selection: 'key',
      direction: 'ascending',
    }
  );

  const { direction, selection } = sortState;

  const tableData =
    direction === 'ascending'
      ? items.sort((a, b) => compareFn(a[selection], b[selection]))
      : items.sort((a, b) => compareFn(b[selection], a[selection]));

  // Logic for Select All Files functionality
  const allFiles = items.filter(
    (item): item is FileData => item.type === 'FILE'
  );
  const areAllFilesSelected = fileDataItems?.length === allFiles.length;
  const hasSelectableFiles = !!allFiles.length;

  const renderHeaderItem = React.useCallback(
    (column: Column<LocationItemData>) => {
      // Defining this function inside the `LocationDetailViewTable` to get access
      // to the current sort state

      const { header, key } = column;

      return (
        <TableHeader
          key={header}
          variant={key}
          aria-label={
            key == ('download' as keyof LocationItemData)
              ? column.header
              : undefined
          }
          aria-sort={selection === key ? direction : 'none'}
        >
          {/* @ts-expect-error */}
          {sortFns[column.key] ? (
            <Button
              variant="sort"
              className={TABLE_HEADER_BUTTON_CLASS_NAME}
              onClick={() => {
                // @ts-expect-error
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                setCompareFn(() => sortFns[column.key]);
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
            hasSelectableFiles && (
              <Checkbox
                checked={areAllFilesSelected}
                id="select-all"
                labelHidden
                labelText={SELECT_ALL_FILES_TEXT}
                onSelect={() => {
                  dispatchStoreAction(
                    areAllFilesSelected
                      ? { type: 'RESET_LOCATION_ITEMS' }
                      : { type: 'SET_LOCATION_ITEMS', items: allFiles }
                  );
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
      dispatchStoreAction,
      hasSelectableFiles,
      areAllFilesSelected,
      allFiles,
      selection,
    ]
  );

  // @TODO: This should be it's own component instead of using `useCallback`
  const renderRowItem: RenderRowItem<LocationItemData> = React.useCallback(
    (row, index) => {
      const renderTableData = (
        row: LocationItemData,
        column: Column<LocationItemData>
      ) => {
        const { type } = row;

        switch (type) {
          case 'FILE': {
            // Casting column as Column<FileItem> to assert that we're only working with FileItems
            // since the type is 'FILE'
            const { key } = column as Column<FileData>;

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
              case 'download' as keyof LocationItemData: {
                return <DownloadControl fileKey={row.key} />;
              }
              case 'select' as keyof LocationItemData: {
                const isSelected =
                  fileDataItems?.some(({ id }) => id === row.id) ?? false;
                return (
                  <Checkbox
                    checked={isSelected}
                    id={row.id}
                    labelHidden
                    labelText={`${SELECT_FILE_TEXT} ${row.key}`}
                    onSelect={() => {
                      dispatchStoreAction(
                        isSelected
                          ? { type: 'REMOVE_LOCATION_ITEM', id: row.id }
                          : { type: 'SET_LOCATION_ITEMS', items: [row] }
                      );
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
                    {row.key.slice(locationKey.length)}
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
            const { key } = column as Column<FolderData>;

            switch (key) {
              case 'key': {
                return (
                  <Button
                    className={`${BLOCK_NAME}__data__button`}
                    variant="table-data"
                    onClick={() => {
                      if (!current) {
                        return;
                      }
                      const { id, key } = row;
                      const itemPath = key.slice(prefix?.length);
                      handleLocationItemClick({ ...current, id }, itemPath);
                    }}
                    key={row.id}
                  >
                    <Icon className={ICON_CLASS} variant="folder" />
                    {row.key.slice(locationKey.length)}
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
      current,
      fileDataItems,
      locationKey,
      prefix,
      dispatchStoreAction,
      handleLocationItemClick,
    ]
  );

  return showTable ? (
    <TableControl
      columns={LOCATION_DETAIL_VIEW_COLUMNS}
      data={tableData}
      handleDroppedFiles={handleDroppedFiles}
      renderHeaderItem={renderHeaderItem}
      renderRowItem={renderRowItem}
    />
  ) : null;
};
