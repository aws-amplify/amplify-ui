import React from 'react';

import { capitalize } from '@aws-amplify/ui';

import {
  DataTable,
  TABLE_DATA_BUTTON_CLASS,
  TABLE_HEADER_BUTTON_CLASS_NAME,
  TABLE_HEADER_CLASS_NAME,
} from '../../../components/DataTable';
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
  data: LocationAccess[];
  onLocationClick: (location: LocationAccess) => void;
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
      { key: `td-permission-${index}`, children: location.permission },
    ];
    return row;
  });

  return { columns, rows };
};

interface DataTableControlProps {
  items: LocationAccess[];
  handleLocationClick: (location: LocationAccess) => void;
}

export function DataTableControl({
  items,
  handleLocationClick,
}: DataTableControlProps): React.JSX.Element | null {
  const [sortState, setSortState] = React.useState<SortState>({
    selection: 'prefix',
    direction: 'ascending',
  });

  const locationsData = React.useMemo(
    () =>
      getLocationsData({
        data: items,
        sortState,
        onLocationClick: handleLocationClick,
        onTableHeaderClick: (location: string) => {
          setSortState((prevState) => ({
            selection: location,
            direction:
              prevState.direction === 'ascending' ? 'descending' : 'ascending',
          }));
        },
      }),
    [items, handleLocationClick, sortState]
  );

  return <DataTable data={locationsData} />;
}
