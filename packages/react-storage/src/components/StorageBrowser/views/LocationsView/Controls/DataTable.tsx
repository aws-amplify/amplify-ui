import React, { useMemo } from 'react';

import { capitalize } from '@aws-amplify/ui';

import {
  DataTable,
  TABLE_DATA_BUTTON_CLASS,
  TABLE_HEADER_BUTTON_CLASS_NAME,
  TABLE_HEADER_CLASS_NAME,
} from '../../../components/DataTable';
import { LocationAccess } from '../../../context/types';
import { ButtonElement, IconElement } from '../../../context/elements';

import { compareStrings } from '../../utils';
import {
  SortDirection,
  SortState,
  useTableData,
} from '../../hooks/useTableData';

const getCompareFn = (selection: string) => {
  switch (selection) {
    case 'scope':
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
  entry: [keyof LocationAccess, string];
  selection: string;
  direction: SortDirection;
  onTableHeaderClick: (location: keyof LocationAccess) => void;
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

const displayColumns: Partial<Record<keyof LocationAccess, string>>[] = [
  { scope: 'name' },
  { type: 'type' },
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
  onTableHeaderClick: (location: keyof LocationAccess) => void;
  sortState: SortState<LocationAccess>;
}) => {
  const { selection, direction } = sortState;

  const columns = displayColumns.flatMap((column) =>
    Object.entries(column).map((entry) =>
      getColumnItem({
        entry: entry as [keyof LocationAccess, string],
        selection,
        direction,
        onTableHeaderClick,
      })
    )
  );

  const rows = data.map((location, index) => [
    {
      key: `td-name-${index}`,
      children: (
        <ButtonElement
          className={TABLE_DATA_BUTTON_CLASS}
          onClick={() => onLocationClick(location)}
          variant="table-data"
        >
          {location.scope}
        </ButtonElement>
      ),
    },
    { key: `td-type-${index}`, children: location.type },
    { key: `td-permission-${index}`, children: location.permission },
  ]);

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
  const {
    sortState,
    actions,
    items: processedItems,
  } = useTableData<LocationAccess>(items, {
    sorting: {
      initialSortSelection: 'scope',
      compareFunction: (a, b, selection) => {
        const compareFn = getCompareFn(selection) ?? compareStrings;
        return compareFn(a[selection], b[selection]);
      },
    },
  });

  const { setSortState } = actions;

  const locationsData = useMemo(
    () =>
      getLocationsData({
        data: processedItems,
        sortState,
        onLocationClick: handleLocationClick,
        onTableHeaderClick: (location) => {
          setSortState((prevState) => ({
            selection: location,
            direction:
              prevState.direction === 'ascending' ? 'descending' : 'ascending',
          }));
        },
      }),
    [processedItems, handleLocationClick, sortState, setSortState]
  );

  return <DataTable data={locationsData} />;
}
