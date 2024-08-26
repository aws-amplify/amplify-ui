import React from 'react';

import {
  DataTable,
  TABLE_DATA_BUTTON_CLASS,
  TABLE_HEADER_BUTTON_CLASS_NAME,
  TABLE_HEADER_CLASS_NAME,
} from '../../../components/DataTable';
import { useControl } from '../../../context/controls';
import { useLocationsData } from '../../../context/actions';
import { LocationAccess, Permission } from '../../../context/types';
import { compareStrings } from '../../../context/controls/Table';
import { ButtonElement, IconElement } from '../../../context/elements';

export type SortDirection = 'ascending' | 'descending' | 'none';

export type SortState<T> = {
  selection: keyof T;
  direction: SortDirection;
};

const LocationsViewColumnSortMap = {
  scope: compareStrings,
  type: compareStrings,
  permission: compareStrings,
};

const getLocationsData = ({
  data,
  onLocationClick,
  onTableHeaderClick,
  sortState,
}: {
  data: LocationAccess<Permission>[];
  onLocationClick: (location: LocationAccess<Permission>) => void;
  onTableHeaderClick: (payload: keyof LocationAccess<Permission>) => void;
  sortState: SortState<LocationAccess<Permission>>;
}) => {
  const { selection, direction } = sortState;

  const columns = [
    {
      children: (
        <ButtonElement
          variant="sort"
          className={TABLE_HEADER_BUTTON_CLASS_NAME}
        >
          Name
          {selection === 'scope' ? (
            <IconElement
              variant={
                direction === 'none'
                  ? 'sort-indeterminate'
                  : `sort-${direction}`
              }
            />
          ) : (
            <IconElement variant="sort-indeterminate" />
          )}
        </ButtonElement>
      ),
      key: 'th-scope',
      className: `${TABLE_HEADER_CLASS_NAME} ${TABLE_HEADER_CLASS_NAME}--scope`,
      onClick: () => onTableHeaderClick('scope'),
      'aria-sort': selection === 'scope' ? direction : 'none',
    },
    {
      children: (
        <ButtonElement
          variant="sort"
          className={TABLE_HEADER_BUTTON_CLASS_NAME}
        >
          Type
          {selection === 'type' ? (
            <IconElement
              variant={
                direction === 'none'
                  ? 'sort-indeterminate'
                  : `sort-${direction}`
              }
            />
          ) : (
            <IconElement variant="sort-indeterminate" />
          )}
        </ButtonElement>
      ),
      key: 'th-type',
      className: `${TABLE_HEADER_CLASS_NAME} ${TABLE_HEADER_CLASS_NAME}--type`,
      onClick: () => onTableHeaderClick('type'),
      'aria-sort': selection === 'type' ? direction : 'none',
    },
    {
      children: (
        <ButtonElement
          variant="sort"
          className={TABLE_HEADER_BUTTON_CLASS_NAME}
        >
          Permission
          {selection === 'permission' ? (
            <IconElement
              variant={
                direction === 'none'
                  ? 'sort-indeterminate'
                  : `sort-${direction}`
              }
            />
          ) : (
            <IconElement variant="sort-indeterminate" />
          )}
        </ButtonElement>
      ),
      key: 'th-permission',
      className: `${TABLE_HEADER_CLASS_NAME} ${TABLE_HEADER_CLASS_NAME}--type`,
      onClick: () => onTableHeaderClick('permission'),
      'aria-sort': selection === 'permission' ? direction : 'none',
    },
  ];

  const compareFn = LocationsViewColumnSortMap[selection];

  if (direction === 'ascending') {
    data.sort((a, b) => compareFn(a[selection], b[selection]));
  } else {
    data.sort((a, b) => compareFn(b[selection], a[selection]));
  }

  const rows = data.map((location, index) => [
    {
      key: `td-scope-${index}`,
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

export function LocationsViewTableControl(): React.JSX.Element | null {
  const [{ data, isLoading }] = useLocationsData();

  const [, handleUpdateState] = useControl({ type: 'NAVIGATE' });

  const [sortState, setSortState] = React.useState<
    SortState<LocationAccess<Permission>>
  >({
    selection: 'scope',
    direction: 'ascending',
  });

  const locationsData = React.useMemo(
    () =>
      getLocationsData({
        data: data.result,
        sortState,
        onLocationClick: (payload) => {
          handleUpdateState({
            type: 'ACCESS_LOCATION',
            location: payload,
          });
        },
        onTableHeaderClick: (payload: keyof LocationAccess<Permission>) => {
          setSortState((prevState) => ({
            selection: payload,
            direction:
              prevState.direction === 'ascending' ? 'descending' : 'ascending',
          }));
        },
      }),
    [data.result, handleUpdateState, sortState]
  );

  const hasLocations = !!data.result?.length;
  const shouldRenderLocations = hasLocations && !isLoading;

  return shouldRenderLocations ? <DataTable data={locationsData} /> : null;
}
