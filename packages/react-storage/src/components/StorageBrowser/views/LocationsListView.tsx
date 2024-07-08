import React from 'react';
import { useDataState } from '@aws-amplify/ui-react-core';
import { listLocationsAction } from '../context/actions';
import { Table } from '../subcomponents/Table';
import { Column } from '../subcomponents/Table/Table';

interface Location {
  name: string;
}

export default function LocationsListView(): JSX.Element {
  const [{ data, isLoading }, handleListLocations] = useDataState(
    listLocationsAction,
    { locations: [], nextToken: undefined }
  );

  React.useEffect(() => {
    handleListLocations({ options: { pageSize: 100 } });
  }, [handleListLocations]);

  const hasLocations = !!data.locations.length;

  const columns: Column<Location>[] = [
    {
      header: 'Name',
      key: 'name',
      sortable: true,
    },
  ];

  const listLocations: Location[] | null = !hasLocations
    ? null
    : data.locations.map(({ name }) => {
        return {
          name,
        };
      });

  return (
    <>
      {!hasLocations && isLoading ? (
        'loading...'
      ) : (
        <Table ariaLabel="test table" data={{ columns, rows: listLocations }} />
      )}
    </>
  );
}
