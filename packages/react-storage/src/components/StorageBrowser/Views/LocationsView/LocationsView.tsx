import React from 'react';

import { StorageBrowserElements } from '../../context/elements';

import { CLASS_BASE } from '../constants';
import { Controls } from '../Controls';
import { CommonControl, ViewComponent } from '../types';
import { Permission, useLocationsData } from '../../context/actions';
import {
  Column,
  defaultTableSort,
  TableDataButton,
  tableSortReducer,
} from '../Controls/Table';
import { useControl } from '../../context/controls';
import { LocationAccess } from '../../context/types';

const { Message, Paginate, Refresh, Search, Table, Title } = Controls;

const LOCATION_VIEW_COLUMNS: Column<LocationAccess<Permission>>[] = [
  {
    header: 'Scope',
    key: 'scope',
  },
  {
    header: 'Type',
    key: 'type',
  },
  {
    header: 'Permission',
    key: 'permission',
  },
];

interface LocationsViewControls<
  T extends StorageBrowserElements = StorageBrowserElements,
  // exclude `Toggle` from `Search` for Locations List
> extends Exclude<
    Pick<Controls<T>, CommonControl | 'Paginate' | 'Refresh' | 'Search'>,
    Controls<T>['Search']['Toggle']
  > {
  (): React.JSX.Element;
}

function RenderRowItem(row: LocationAccess<Permission>, index: number) {
  const [, handleUpdateState] = useControl({ type: 'NAVIGATE' });

  const { scope, type } = row;

  return (
    <Table.TableRow key={index}>
      {LOCATION_VIEW_COLUMNS.map((column) => {
        const { key } = column;

        return (
          <Table.TableData key={`${index}-${column.header}`}>
            {column.key === 'scope' &&
            (type === 'BUCKET' || type === 'PREFIX') ? (
              <TableDataButton
                key={scope}
                onClick={() => {
                  handleUpdateState({
                    type: 'ACCESS_LOCATION',
                    location: row,
                  });
                }}
                type="button"
              >
                {scope}
              </TableDataButton>
            ) : (
              // eslint-disable-next-line react/destructuring-assignment
              <>{row[key]}</>
            )}
          </Table.TableData>
        );
      })}
    </Table.TableRow>
  );
}

export interface LocationsView<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends ViewComponent<LocationsViewControls<T>> {}

const LocationsViewRefresh = () => {
  const [{ data, isLoading }, handleListLocations] = useLocationsData();

  return (
    <Refresh
      disabled={isLoading || data.result.length <= 0}
      onClick={() =>
        handleListLocations({
          options: { refresh: true, pageSize: 1000 },
        })
      }
    />
  );
};

const LocationsViewTable = ({
  sortFunction,
}: {
  sortFunction?: () => LocationAccess<Permission>[];
}): JSX.Element => {
  const sortFn = sortFunction ?? defaultTableSort;

  const [sortState, updateTableSortState] = React.useReducer(
    tableSortReducer<LocationAccess<Permission>>,
    {
      direction: 'ASCENDING',
      selection: 'scope',
    }
  );

  const { direction, selection } = sortState;

  const [{ data, isLoading }] = useLocationsData();

  const [tableData, setTableData] = React.useState<
    LocationAccess<Permission>[]
  >(sortFn<LocationAccess<Permission>>(data.result, direction, selection));

  const hasLocations = !!data.result?.length;
  const shouldRenderLocations = !hasLocations || isLoading;

  React.useEffect(() => {
    setTableData(
      sortFn<LocationAccess<Permission>>(data.result, direction, selection)
    );
  }, [data.result, direction, selection, sortFn]);

  return shouldRenderLocations ? (
    <div>...loading</div>
  ) : (
    <Table
      columns={LOCATION_VIEW_COLUMNS}
      data={tableData}
      renderRowItem={RenderRowItem}
      sortState={sortState}
      updateTableSortState={updateTableSortState}
    />
  );
};

const LocationsViewControls: LocationsViewControls = () => {
  return (
    <>
      <Title>Home</Title>
      <LocationsViewRefresh />
      <LocationsViewTable />
    </>
  );
};

LocationsViewControls.Message = Message;
LocationsViewControls.Paginate = Paginate;
LocationsViewControls.Refresh = Refresh;
LocationsViewControls.Search = Search;
LocationsViewControls.Table = Table;
LocationsViewControls.Title = Title;

export const LocationsView: LocationsView = () => {
  return (
    <div className={CLASS_BASE} data-testid="LOCATIONS_VIEW">
      <LocationsViewControls />
    </div>
  );
};

LocationsView.Controls = LocationsViewControls;
