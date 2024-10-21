import React from 'react';

import { capitalize } from '@aws-amplify/ui';

import {
  DataTable,
  TABLE_DATA_BUTTON_CLASS,
  TABLE_HEADER_BUTTON_CLASS_NAME,
  TABLE_HEADER_CLASS_NAME,
} from '../../../components/DataTable';
import { useLocationsData } from '../../../context/actions';
import { useControl } from '../../../context/control';
import { LocationAccess } from '../../../context/types';
import { ButtonElement, IconElement } from '../../../context/elements';
import { parseLocationAccess } from '../../../context/navigate/utils';

import { compareStrings } from '../../utils';

export type SortDirection = 'ascending' | 'descending' | 'none';

export type SortState = {
  selection: string;
  direction: SortDirection;
};

const getCompareFn = (selection: string) => {
  switch (selection) {
    case 'bucket':
    case 'folder':
    case 'type':
    case 'permission':
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
}) => {
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
  { prefix: 'folder' },
  { bucket: 'bucket' },
  { type: 'type' },
  { permission: 'permission' },
];

const getLocationsData = ({
  data,
  onLocationClick,
  onTableHeaderClick,
  hideType,
  sortState,
}: {
  data: LocationAccess[];
  onLocationClick: (location: LocationAccess) => void;
  onTableHeaderClick: (location: string) => void;
  hideType: boolean;
  sortState: SortState;
}) => {
  const { selection, direction } = sortState;

  const filteredDisplayColumns: Record<string, string>[] = hideType
    ? displayColumns.filter((column) => !column.type)
    : displayColumns;

  const columns = filteredDisplayColumns.flatMap((column) =>
    Object.entries(column).map((entry) =>
      getColumnItem({ entry, selection, direction, onTableHeaderClick })
    )
  );

  const compareFn = getCompareFn(selection);

  if (compareFn) {
    const castSelection = selection as keyof LocationAccess;

    if (direction === 'ascending') {
      data.sort((a, b) => compareFn(a[castSelection], b[castSelection]));
    } else {
      data.sort((a, b) => compareFn(b[castSelection], a[castSelection]));
    }
  }

  const rows = data.map((location, index) => {
    const parsedLocation = parseLocationAccess(location);
    const row = [
      {
        key: `td-name-${index}`,
        children: (
          <ButtonElement
            className={TABLE_DATA_BUTTON_CLASS}
            onClick={() => onLocationClick(location)}
            variant="table-data"
          >
            {parsedLocation.prefix
              ? parsedLocation.prefix
              : `${parsedLocation.bucket}/`}
          </ButtonElement>
        ),
      },
      { key: `td-bucket-${index}`, children: parsedLocation.bucket },
      { key: `td-type-${index}`, children: location.type },
      { key: `td-permission-${index}`, children: location.permission },
    ];
    if (hideType) {
      row.splice(2, 1);
    }
    return row;
  });

  return { columns, rows };
};

export function DataTableControl({
  range,
  hideType = false,
}: {
  range: [start: number, end: number];
  hideType?: boolean;
}): React.JSX.Element | null {
  const [{ data, hasError }] = useLocationsData();

  const [, handleUpdateState] = useControl('NAVIGATE');

  const [sortState, setSortState] = React.useState<SortState>({
    selection: 'prefix',
    direction: 'ascending',
  });

  const [start, end] = range;

  const locationsData = React.useMemo(
    () =>
      getLocationsData({
        data: data.result.slice(start, end),
        sortState,
        hideType,
        onLocationClick: (location) => {
          handleUpdateState({
            type: 'ACCESS_LOCATION',
            location,
          });
        },
        onTableHeaderClick: (location: string) => {
          setSortState((prevState) => ({
            selection: location,
            direction:
              prevState.direction === 'ascending' ? 'descending' : 'ascending',
          }));
        },
      }),
    [data.result, start, end, sortState, hideType, handleUpdateState]
  );

  return hasError ? null : <DataTable data={locationsData} />;
}
