import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import { createAmplifyGeocoder } from 'maplibre-gl-js-amplify';
import { useControl, useMap } from 'react-map-gl';
import type { IControl } from 'react-map-gl';
import { LocationSearchProps } from '../types/maplibre-gl-geocoder';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

const LOCATION_SEARCH_OPTIONS = {
  maplibregl,
  marker: { color: '#3FB1CE' },
  popup: true,
  showResultMarkers: { color: '#3FB1CE' },
  showResultsWhileTyping: true,
};

const LOCATION_SEARCH_CONTAINER = 'geocoder-container';

type AmplifyLocationSearch = IControl & {
  addTo: (container: string) => void;
};

const LocationSearchControl = ({
  position = 'top-right',
  ...props
}: LocationSearchProps) => {
  useControl(
    () => createAmplifyGeocoder(props) as unknown as AmplifyLocationSearch,
    {
      position,
    }
  );

  return null;
};

const LocationSearchStandalone = (props: LocationSearchProps) => {
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      (createAmplifyGeocoder(props) as unknown as AmplifyLocationSearch).addTo(
        `#${LOCATION_SEARCH_CONTAINER}`
      );

      hasMounted.current = true;
    }
  }, [props]);

  return <div id={LOCATION_SEARCH_CONTAINER} />;
};

/**
 * The `<LocationSearch>` component provides location search.
 *
 * [📖 Docs](https://ui.docs.amplify.aws/react/connected-components/geo#location-search)
 *
 * @example
 * // Used as a map control:
 * function App() {
 *   return (
 *     <MapView>
 *       <LocationSearch />
 *     </MapView>
 *   );
 * }
 *
 * @example
 * // Used as a standalone component:
 * function App() {
 *   return <LocationSearch />;
 * }
 */
export const LocationSearch = (props: LocationSearchProps): JSX.Element => {
  useDeprecationWarning({
    shouldWarn: true,
    message:
      'The `LocationSearch` component has been migrated to `@aws-amplify/ui-react-geo` and will be removed from this package in a future major release. Please install `@aws-amplify/ui-react-geo` and update the import path.',
  });

  const { current: map } = useMap();

  /**
   * This logic determines whether the LocationSearch exists as part of a Map component or if it is a standalone component.
   * The `useControl` hook inside `LocationSearchControl` from `react-map-gl` makes it easy to add a control to a map,
   * but throws an error if that map doesn't exist. If the map doesn't exist, the LocationSearch is mounted to a container
   * upon rendering inside the `LocationSearchStandalone`.
   */
  if (map) {
    return <LocationSearchControl {...LOCATION_SEARCH_OPTIONS} {...props} />;
  }

  return <LocationSearchStandalone {...LOCATION_SEARCH_OPTIONS} {...props} />;
};

export const Geocoder = (props: LocationSearchProps): JSX.Element => {
  useDeprecationWarning({
    shouldWarn: true,
    message:
      'The `Geocoder` component has been replaced by `LocationSearch` and is available from `@aws-amplify/ui-react-geo`. `Geocoder` will be removed from this package in a future major release. Please install `@aws-amplify/ui-react-geo` and replace `Geocoder` usage with `LocationSearch`.',
  });

  return <LocationSearch {...props} />;
};
