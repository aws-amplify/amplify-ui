import React from 'react';
import { useDataState } from '@aws-amplify/ui-react-core';
import { listLocationsAction } from '../context/actions';
import {
  DividerControl,
  HistoryControl,
  PaginateControl,
  RefreshControl,
  TitleControl,
} from './Controls';
import { CLASS_BASE } from './constants';

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

  // TEMP
  const historyItems = [
    { label: 'Home' },
    { label: 'SomeLocation' },
    { label: 'Some folder' },
  ];

  return (
    <div className={CLASS_BASE}>
      <div className={`${CLASS_BASE}__header`}>
        <HistoryControl items={historyItems} />
        <div className={`${CLASS_BASE}__header__primary`}>
          <TitleControl />
          <div className={`${CLASS_BASE}__header__primary__actions`}>
            <RefreshControl />
            <DividerControl />
            <div>Actions</div>
          </div>
        </div>
        <div className={`${CLASS_BASE}-header__secondary`}>
          <PaginateControl />
        </div>
      </div>
      {!hasLocations && isLoading ? 'loading...' : listLocations}
    </div>
  );
}
