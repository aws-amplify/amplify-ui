import React from 'react';

import { capitalize, humanFileSize } from '@aws-amplify/ui';

import {
  DataTable,
  TABLE_DATA_BUTTON_CLASS,
  TABLE_DATA_ICON_CLASS,
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
import { ButtonElement, IconElement } from '../../../context/elements';
import { DownloadControl } from '../../Controls';

export type SortDirection = 'ascending' | 'descending' | 'none';

export type SortState = {
  selection: string;
  direction: SortDirection;
};

const getCompareFn = (selection: string) => {
  switch (selection) {
    case 'lastModified':
      return compareDates;
    case 'size':
      return compareNumbers;
    case 'key':
    case 'fileExt':
    default:
      return compareStrings;
  }
};

const getColumnItem = ({
  entry,
  selection,
  direction,
  onTableHeaderClick,
}: {
  entry: [string, string];
  selection: string;
  direction: SortDirection;
  onTableHeaderClick: (location: string) => void;
}): Record<string, any> => {
  const [key, value] = entry;

  return {
    children: (
      <ButtonElement variant="sort" className={TABLE_HEADER_BUTTON_CLASS_NAME}>
        {capitalize(value)}
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

const displayColumns: Record<string, string>[] = [
  { key: 'name' },
  // Created a custom `fileExt` property but displaying it as the type column
  { fileExt: 'type' },
  { lastModified: 'Last Modified' },
  { size: 'size' },
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
  const { selection, direction } = sortState;

  const columns = displayColumns.flatMap((column) =>
    Object.entries(column).map((entry) =>
      getColumnItem({ entry, selection, direction, onTableHeaderClick })
    )
  );

  const downloadTableHeader = {
    'aria-label': 'Download',
    key: 'th_download',
    className: `${TABLE_HEADER_CLASS_NAME} ${TABLE_HEADER_CLASS_NAME}--download`,
    'aria-sort': 'none',
  };

  columns.push(downloadTableHeader);

  // Handle sort before we render rows
  const compareFn = getCompareFn(selection);

  const data = locationItems.map((item) => {
    const indexOfDot = item.key.lastIndexOf('.');
    const fileExt = indexOfDot > -1 ? item.key.slice(indexOfDot + 1) : '-';

    return {
      ...item,
      fileExt,
    };
  });

  if (compareFn) {
    if (direction === 'ascending') {
      data.sort((a, b) => {
        if (selection in a && selection in b) {
          return compareFn(a[selection], b[selection]);
        }
      });
    } else {
      data.sort((a, b) => compareFn(b[selection], a[selection]));
    }
  }

  const rows = data.map((item, index) => {
    const { type } = item;

    switch (type) {
      case 'FILE': {
        // file size
        const size = humanFileSize(item.size ?? 0, true);

        return [
          {
            key: `td-name-${index}`,
            children: (
              <>
                <IconElement className={TABLE_DATA_ICON_CLASS} variant="file" />
                {item.key}
              </>
            ),
          },
          {
            key: `td-type-${index}`,
            children: item.fileExt,
          },
          {
            key: `td-lastModified-${index}`,
            children: new Date(item.lastModified).toLocaleString(),
          },
          {
            key: `td-size-${index}`,
            children: size,
          },
          {
            key: `td-download-${index}`,
            children: <DownloadControl fileKey={`${path}${item.key}`} />,
          },
        ];
      }
      case 'FOLDER': {
        return [
          {
            key: `td-name-${index}`,
            children: (
              <ButtonElement
                className={TABLE_DATA_BUTTON_CLASS}
                onClick={() => onLocationItemFolderClick(item.key)}
                variant="table-data"
              >
                <IconElement
                  className={TABLE_DATA_ICON_CLASS}
                  variant="folder"
                />
                {item.key}
              </ButtonElement>
            ),
          },
          {
            key: `td-type-${index}`,
            children: 'Folder',
          },
          {
            key: `td-lastModified-${index}`,
            children: '-',
          },
          {
            key: `td-size-${index}`,
            children: '-',
          },
          {
            key: `td-download-${index}`,
          },
        ];
      }
    }
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
