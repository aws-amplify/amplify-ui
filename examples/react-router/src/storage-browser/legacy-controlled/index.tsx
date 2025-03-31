import { useSearchParams } from 'react-router-dom';

import {
  LocationData,
  StorageBrowserProviderProps,
} from '@aws-amplify/ui-react-storage/browser';

import { StorageBrowser } from '../storage-browser';

const getControlledProps = (
  searchParams: URLSearchParams
): StorageBrowserProviderProps | undefined => {
  const _location = searchParams.get('location');

  if (!_location) return;

  const location: LocationData = JSON.parse(_location);
  const actionType = searchParams.get('actionType') ?? undefined;
  const path = searchParams.get('path') ?? undefined;

  return { actionType, location, path };
};

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = ({
    location: _location,
    actionType,
    path,
  }: StorageBrowserProviderProps) => {
    const location = JSON.stringify(_location);

    setSearchParams({
      ...(actionType ? { actionType } : undefined),
      ...(path ? { path } : undefined),
      location,
    });
  };

  const props = getControlledProps(searchParams);
  const showLocationsView = !props;
  const showLocationDetailView = !showLocationsView && !props.actionType;
  const showLocationActionView = !showLocationsView && props.actionType;

  return (
    <StorageBrowser.Provider
      actionType={props?.actionType}
      // ensures controlled behavior by forcing remount on id change
      key={props?.location?.id}
      location={props?.location}
      path={props?.path}
    >
      {showLocationsView ? (
        <StorageBrowser.LocationsView
          onNavigate={(location) => updateSearchParams({ location })}
        />
      ) : showLocationDetailView ? (
        <StorageBrowser.LocationDetailView
          onActionSelect={(actionType) =>
            updateSearchParams({ ...props, actionType })
          }
          onExit={() => setSearchParams(undefined)}
          onNavigate={(location, path) =>
            updateSearchParams({ location, path })
          }
        />
      ) : showLocationActionView ? (
        <StorageBrowser.LocationActionView
          onExit={() => updateSearchParams({ ...props, actionType: undefined })}
        />
      ) : null}
    </StorageBrowser.Provider>
  );
}
