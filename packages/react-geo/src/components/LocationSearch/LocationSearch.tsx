import React, { useEffect, useRef, useState } from 'react';
import type * as maplibregl from 'maplibre-gl';
import type { createAmplifyGeocoder } from 'maplibre-gl-js-amplify';
import { useControl, useMap } from 'react-map-gl/maplibre';
import type { IControl } from 'react-map-gl/maplibre';

import { useSetUserAgent } from '@aws-amplify/ui-react-core';

import type { LocationSearchProps } from '../types/maplibre-gl-geocoder';
import { loadMaplibre, loadMaplibreGlJsAmplify } from '../utils';
import { VERSION } from '../../version';

const LOCATION_SEARCH_OPTIONS = {
  marker: { color: '#3FB1CE' },
  popup: true,
  showResultMarkers: { color: '#3FB1CE' },
  showResultsWhileTyping: true,
};

const LOCATION_SEARCH_CONTAINER = 'geocoder-container';

type AmplifyLocationSearch = IControl & {
  addTo: (container: string) => void;
};

interface GeocoderModules {
  createGeocoder: typeof createAmplifyGeocoder;
  maplibregl: typeof maplibregl;
}

interface LocationSearchInternalProps extends LocationSearchProps {
  modules: GeocoderModules;
}

const useGeocoderModules = (): GeocoderModules | undefined => {
  const [modules, setModules] = useState<GeocoderModules>();

  useEffect(() => {
    let isMounted = true;

    Promise.all([loadMaplibre(), loadMaplibreGlJsAmplify()]).then(
      ([maplibre, { createAmplifyGeocoder: createGeocoder }]) => {
        if (isMounted) {
          setModules({ createGeocoder, maplibregl: maplibre });
        }
      }
    );

    return () => {
      isMounted = false;
    };
  }, []);

  return modules;
};

const LocationSearchControl = ({
  modules: { createGeocoder, maplibregl: maplibre },
  position = 'top-right',
  ...props
}: LocationSearchInternalProps) => {
  useControl(
    () =>
      createGeocoder({
        maplibregl: maplibre,
        ...props,
      }) as unknown as AmplifyLocationSearch,
    {
      position,
    }
  );

  return null;
};

const LocationSearchStandalone = ({
  modules: { createGeocoder, maplibregl: maplibre },
  ...props
}: LocationSearchInternalProps) => {
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      (
        createGeocoder({
          maplibregl: maplibre,
          ...props,
        }) as unknown as AmplifyLocationSearch
      ).addTo(`#${LOCATION_SEARCH_CONTAINER}`);

      hasMounted.current = true;
    }
  }, [createGeocoder, maplibre, props]);

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
export const LocationSearch = (
  props: LocationSearchProps
): React.JSX.Element | null => {
  const { current: map } = useMap();
  const modules = useGeocoderModules();

  useSetUserAgent({
    componentName: 'LocationSearch',
    packageName: 'react-geo',
    version: VERSION,
  });

  /**
   * This logic determines whether the LocationSearch exists as part of a Map component or if it is a standalone component.
   * The `useControl` hook inside `LocationSearchControl` from `react-map-gl` makes it easy to add a control to a map,
   * but throws an error if that map doesn't exist. If the map doesn't exist, the LocationSearch is mounted to a container
   * upon rendering inside the `LocationSearchStandalone`.
   */
  if (!modules) {
    return map ? null : <div id={LOCATION_SEARCH_CONTAINER} />;
  }

  if (map) {
    return (
      <LocationSearchControl
        {...LOCATION_SEARCH_OPTIONS}
        {...props}
        modules={modules}
      />
    );
  }

  return (
    <LocationSearchStandalone
      {...LOCATION_SEARCH_OPTIONS}
      {...props}
      modules={modules}
    />
  );
};
