import { useSearchParams } from 'react-router-dom';

import { Amplify } from 'aws-amplify';
import {
  createAmplifyAuthAdapter,
  createStorageBrowser,
  LocationData,
} from '@aws-amplify/ui-react-storage/browser';
import '@aws-amplify/ui-react-storage/styles.css';

import outputs from '@aws-amplify/ui-environments/storage/gen2/amplify_outputs.json';

Amplify.configure(outputs);

const { StorageBrowser } = createStorageBrowser({
  config: createAmplifyAuthAdapter(),
});

interface UrlLocationParams {
  actionType?: string;
  location?: LocationData;
  path?: string;
}

const getUrlParams = (
  searchParams: URLSearchParams
): UrlLocationParams | undefined => {
  const _location = searchParams.get('location');

  if (!_location) return;

  const location: LocationData = JSON.parse(_location);
  const actionType = searchParams.get('actionType') ?? undefined;
  const path = searchParams.get('path') ?? undefined;

  return { actionType, location, path };
};

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlParams = getUrlParams(searchParams);

  const updateSearchParams = ({
    location: _location,
    actionType,
    path,
  }: UrlLocationParams) => {
    const location = JSON.stringify(_location);

    setSearchParams({
      ...(actionType ? { actionType } : undefined),
      ...(path ? { path } : undefined),
      location,
    });
  };

  const showLocationsView = !urlParams;
  const showLocationDetailView = !showLocationsView && !urlParams.actionType;
  const showLocationActionView = !showLocationsView && urlParams.actionType;

  return (
    <StorageBrowser.Provider
      actionType={urlParams?.actionType}
      // ensures controlled behavior by force remount entire component, non-performant
      key={urlParams?.location?.id}
      location={urlParams?.location}
      path={urlParams?.path}
    >
      {showLocationsView ? (
        <StorageBrowser.LocationsView
          onNavigate={(location) => updateSearchParams({ location })}
        />
      ) : showLocationDetailView ? (
        <StorageBrowser.LocationDetailView
          onActionSelect={(actionType) =>
            updateSearchParams({ ...urlParams, actionType })
          }
          onExit={() => setSearchParams(undefined)}
          onNavigate={(location, path) =>
            updateSearchParams({ location, path })
          }
        />
      ) : showLocationActionView ? (
        <StorageBrowser.LocationActionView
          onExit={() =>
            setSearchParams((prev) => ({ ...prev, actionType: undefined }))
          }
        />
      ) : null}
    </StorageBrowser.Provider>
  );
}
