import React from 'react';

import { capitalize } from '@aws-amplify/ui';

import {
  DataTable,
  TABLE_DATA_BUTTON_CLASS,
  TABLE_HEADER_BUTTON_CLASS_NAME,
  TABLE_HEADER_CLASS_NAME,
} from '../../../components/DataTable';
import { useLocationsData } from '../../../do-not-import-from-here/actions';

import { ButtonElement, IconElement } from '../../../context/elements';
import { useStore } from '../../../providers/store';

import { compareStrings } from '../../utils';
import { LocationData } from '../../../actions';

export type SortDirection = 'ascending' | 'descending' | 'none';

export type SortState = {
  selection: string;
  direction: SortDirection;
};

const getCompareFn = (selection: string) => {
  switch (selection) {
    case 'bucket':
    case 'folder':
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
  { permission: 'permission' },
];

const getLocationsData = ({
  data,
  onLocationClick,
  onTableHeaderClick,
  sortState,
}: {
  data: LocationData[];
  onLocationClick: (location: LocationData) => void;
  onTableHeaderClick: (location: string) => void;
  sortState: SortState;
}) => {
  const { selection, direction } = sortState;

  const columns = displayColumns.flatMap((column) =>
    Object.entries(column).map((entry) =>
      getColumnItem({ entry, selection, direction, onTableHeaderClick })
    )
  );

  const compareFn = getCompareFn(selection);

  if (compareFn) {
    const castSelection = selection as keyof LocationData;

    if (direction === 'ascending') {
      data.sort((a, b) => compareFn(a[castSelection], b[castSelection]));
    } else {
      data.sort((a, b) => compareFn(b[castSelection], a[castSelection]));
    }
  }

  const rows = data.map((location, index) => [
    {
      key: `td-name-${index}`,
      children: (
        <ButtonElement
          className={TABLE_DATA_BUTTON_CLASS}
          onClick={() => onLocationClick(location)}
          variant="table-data"
        >
          {location.prefix.length ? location.prefix : location.bucket}
        </ButtonElement>
      ),
    },
    { key: `td-bucket-${index}`, children: location.bucket },
    { key: `td-permission-${index}`, children: location.permission },
  ]);

  return { columns, rows };
};

export function DataTableControl({
  onNavigate,
  range,
}: {
  onNavigate?: (destination: LocationData) => void;
  range: [start: number, end: number];
}): React.JSX.Element | null {
  const [{ data, hasError }] = useLocationsData();
  const dispatchStoreAction = useStore()[1];

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
        onLocationClick: (destination) => {
          onNavigate?.(destination);
          dispatchStoreAction({ type: 'NAVIGATE', destination });
        },
        onTableHeaderClick: (selection: string) => {
          setSortState((prevState) => ({
            selection,
            direction:
              prevState.direction === 'ascending' ? 'descending' : 'ascending',
          }));
        },
      }),
    [data.result, dispatchStoreAction, onNavigate, sortState, start, end]
  );

  return hasError ? null : <DataTable data={locationsData} />;
}
