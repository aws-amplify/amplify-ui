import React from 'react';

import { StorageBrowserElements } from '../../context/elements';
import { useLocationsData } from '../../context/actions/locationsData';

import { CLASS_BASE } from '../constants';
import { Controls } from '../Controls';
import { CommonControl, ViewComponent } from '../types';
import { LocationAccess, Permission } from '../../context/actions/types';
import { Column } from '../Controls/Table';

const { Message, Paginate, Refresh, Search, Table, Title } = Controls;

interface LocationsViewControls<
  T extends StorageBrowserElements = StorageBrowserElements,
  // exclude `Toggle` from `Search` for Locations List
> extends Exclude<
    Pick<Controls<T>, CommonControl | 'Paginate' | 'Refresh' | 'Search'>,
    Controls<T>['Search']['Toggle']
  > {
  (): React.JSX.Element;
}

export interface LocationsView<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends ViewComponent<LocationsViewControls<T>> {}

const setLocationsViewTableData = (data: LocationAccess<Permission>[]) => {
  const colunns: Column<LocationAccess<Permission>>[] = [
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

  return {
    columns: colunns,
    rows: data,
  };
};

const LocationsViewControls: LocationsViewControls = () => {
  const [{ data, isLoading }] = useLocationsData();

  const hasLocations = !!data.result?.length;
  const shouldRenderLocations = !hasLocations || isLoading;

  const { columns, rows } = setLocationsViewTableData(data.result);

  return (
    <>
      <Title />
      <Refresh />
      <Paginate />
      {shouldRenderLocations ? (
        <div style={{ gridRowStart: 5 }}>{'...loading'}</div>
      ) : (
        <Table columns={columns} rows={rows} />
      )}
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
    <div className={CLASS_BASE}>
      <div className={`${CLASS_BASE}__controls`}>
        <LocationsViewControls />
      </div>
    </div>
  );
};

LocationsView.Controls = LocationsViewControls;
