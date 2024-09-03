import React from 'react';

import { humanFileSize } from '@aws-amplify/ui';

import {
  DataTable,
  TABLE_DATA_BUTTON_CLASS,
  TABLE_DATA_CLASS_NAME,
  TABLE_DATA_ICON_CLASS,
  TABLE_DATA_TEXT_CLASS_NAME,
  TABLE_HEADER_BUTTON_CLASS_NAME,
  TABLE_HEADER_CLASS_NAME,
} from '../../../components/DataTable';
import { useControl } from '../../../context/controls';
import { useAction } from '../../../context/actions';
import { LocationItem } from '../../../context/types';
import {
  compareDates,
  compareNumbers,
  compareStrings,
} from '../../../context/controls/Table';
import {
  ButtonElement,
  IconElement,
  SpanElement,
} from '../../../context/elements';
import { DownloadControl } from '../../Controls';
import { getFileExtension } from '../../utils';

export type SortDirection = 'ascending' | 'descending' | 'none';

export type SortState = {
  selection: string;
  direction: SortDirection;
};

const getColumnItem = ({
  columnData,
  selection,
  direction,
  onTableHeaderClick,
}: {
  columnData: Column<DataTableLocationItems>;
  selection: string;
  direction: SortDirection;
  onTableHeaderClick: (location: string) => void;
}): Record<string, any> => {
  const { key, header } = columnData;

  return {
    children: (
      <ButtonElement variant="sort" className={TABLE_HEADER_BUTTON_CLASS_NAME}>
        {header}
        <IconElement
          variant={
            selection === key && direction !== 'none'
              ? `sort-${direction}`
              : 'sort-indeterminate'
          }
        />
      </ButtonElement>
    ),
    key: `th_${key}`,
    className: `${TABLE_HEADER_CLASS_NAME} ${TABLE_HEADER_CLASS_NAME}--${key}`,
    onClick: () => onTableHeaderClick(key),
    'aria-sort': selection === key ? direction : 'none',
  };
};

type Column<T> = {
  key: keyof T;
  header: string;
  compareFn?: (a: T, b: T) => number;
};

type DataTableLocationItems = {
  key: string;
  fileExt: string;
  lastModified: Date | undefined;
  size: number | undefined;
  type: string;
};

const columnData: Column<DataTableLocationItems>[] = [
  {
    key: 'key',
    header: 'Name',
    compareFn: (a, b) => compareStrings(a.key, b.key),
  },
  {
    key: 'fileExt',
    header: 'Type',
    compareFn: (a, b) => compareStrings(a.fileExt, b.fileExt),
  },
  {
    key: 'lastModified',
    header: 'Last Modified',
    compareFn: (a, b) => compareDates(a.lastModified!, b.lastModified!),
  },
  {
    key: 'size',
    header: 'Size',
    compareFn: (a, b) => compareNumbers(a.size!, b.size!),
  },
];

const getLocationsItemData = ({
  locationItems,
  onTableHeaderClick,
  onLocationItemFolderClick,
  sortState,
  path,
}: {
  locationItems: LocationItem[];
  onLocationItemFolderClick: (locationItemFolder: string) => void;
  onTableHeaderClick: (header: string) => void;
  sortState: SortState;
  path: string;
}) => {
  // Map the location items so that it has the data we want to use and sort with
  const data = locationItems.map((item) => {
    return {
      key: item.key,
      type: item.type,
      fileExt: item.type === 'FILE' ? getFileExtension(item.key) : '',
      download:
        item.type === 'FILE' ? (
          <DownloadControl fileKey={`${path}${item.key}`} />
        ) : null,
      size: item.type === 'FILE' ? item.size : undefined,
      data: item.type === 'FILE' ? item.data : undefined,
      lastModified:
        item.type === 'FILE' ? new Date(item.lastModified) : undefined,
    };
  });

  const { selection, direction } = sortState;
  const selectedColumn = columnData.find((column) => column.key === selection);

  const compareFn = selectedColumn?.compareFn;

  if (compareFn) {
    data.sort((a, b) => {
      if (
        Object.prototype.hasOwnProperty.call(a, selectedColumn.key) &&
        Object.prototype.hasOwnProperty.call(b, selectedColumn.key)
      ) {
        return direction === 'ascending' ? compareFn(a, b) : compareFn(b, a);
      }

      return direction === 'ascending' ? 1 : -1;
    });
  }

  const columns = columnData.map((column) =>
    getColumnItem({
      columnData: column,
      selection: selectedColumn!.key,
      direction,
      onTableHeaderClick,
    })
  );

  const downloadTableHeader = {
    'aria-label': 'Download',
    key: 'th_download',
    className: `${TABLE_HEADER_CLASS_NAME} ${TABLE_HEADER_CLASS_NAME}--download`,
    'aria-sort': 'none',
  };

  columns.push(downloadTableHeader);

  const rows = data.map((item, index) => {
    const { type } = item;

    return [
      {
        className: `${TABLE_DATA_CLASS_NAME} ${TABLE_DATA_CLASS_NAME}--key`,
        key: `td-name-${index}`,
        children:
          type === 'FILE' ? (
            <SpanElement className={TABLE_DATA_TEXT_CLASS_NAME}>
              <IconElement className={TABLE_DATA_ICON_CLASS} variant="file" />
              {item.key}
            </SpanElement>
          ) : (
            <ButtonElement
              className={TABLE_DATA_BUTTON_CLASS}
              onClick={() => onLocationItemFolderClick(item.key)}
              variant="table-data"
            >
              <IconElement className={TABLE_DATA_ICON_CLASS} variant="folder" />
              {item.key}
            </ButtonElement>
          ),
      },
      {
        className: `${TABLE_DATA_CLASS_NAME} ${TABLE_DATA_CLASS_NAME}--type`,
        key: `td-type-${index}`,
        children: (
          <SpanElement className={TABLE_DATA_TEXT_CLASS_NAME}>
            {type === 'FILE' ? item.fileExt : 'Folder'}
          </SpanElement>
        ),
      },
      {
        className: `${TABLE_DATA_CLASS_NAME} ${TABLE_DATA_CLASS_NAME}--lastModified`,
        key: `td-lastModified-${index}`,
        children: (
          <SpanElement className={TABLE_DATA_TEXT_CLASS_NAME}>
            {type === 'FILE'
              ? new Date(item.lastModified!).toLocaleString()
              : ''}
          </SpanElement>
        ),
      },
      {
        className: `${TABLE_DATA_CLASS_NAME}${TABLE_DATA_CLASS_NAME}--size`,
        key: `td-size-${index}`,
        children: (
          <SpanElement className={TABLE_DATA_TEXT_CLASS_NAME}>
            {type === 'FILE' ? humanFileSize(item.size ?? 0, true) : ''}
          </SpanElement>
        ),
      },
      {
        className: `${TABLE_DATA_CLASS_NAME} ${TABLE_DATA_CLASS_NAME}--download`,
        key: `td-download-${index}`,
        children: (
          <SpanElement className={TABLE_DATA_TEXT_CLASS_NAME}>
            {type === 'FILE' ? (
              <DownloadControl fileKey={`${path}${item.key}`} />
            ) : (
              ''
            )}
          </SpanElement>
        ),
      },
    ];
  });

  return { columns, rows };
};

export function DataTableControl(): React.JSX.Element {
  const [{ history, path }, handleUpdateState] = useControl({
    type: 'NAVIGATE',
  });

  const [{ data }] = useAction({
    type: 'LIST_LOCATION_ITEMS',
  });

  const [sortState, setSortState] = React.useState<SortState>({
    selection: 'key',
    direction: 'ascending',
  });

  const currentPosition = history.length;

  const locationItemsData = getLocationsItemData({
    locationItems: data.result,
    sortState,
    path,
    onTableHeaderClick: (header: string) => {
      setSortState((prevState) => ({
        selection: header,
        direction:
          prevState.direction === 'ascending' ? 'descending' : 'ascending',
      }));
    },
    onLocationItemFolderClick: (locationItemFolder: string) => {
      handleUpdateState({
        type: 'NAVIGATE',
        entry: {
          position: currentPosition + 1,
          prefix: locationItemFolder,
        },
      });
    },
  });

  return <DataTable data={locationItemsData} />;
}
