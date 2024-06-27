import React from 'react';
import { useDataState } from '@aws-amplify/ui-react-core';
import { listLocationsAction } from '../context/actions';

export default function LocationsListView(): JSX.Element {
  const [{ data, isLoading }, handleListLocations] = useDataState(
    listLocationsAction,
    { locations: [], nextToken: undefined }
  );

  React.useEffect(() => {
    handleListLocations({ options: { pageSize: 100 } });
  }, [handleListLocations]);

  const hasLocations = !!data.locations.length;
  const listLocations = !hasLocations
    ? null
    : data.locations.map(({ name }) => <p key={name}>{name}</p>);

  return <>{!hasLocations && isLoading ? 'loading...' : listLocations}</>;
}
