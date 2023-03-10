import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import {
  MaplibreGeocoderOptions,
  MaplibreGeocoderResults,
  MaplibreGeocoderResult,
} from '../types/maplibre-gl-geocoder';
import { createAmplifyGeocoder } from 'maplibre-gl-js-amplify';
import { useControl, useMap } from 'react-map-gl';
import type { IControl } from 'react-map-gl';

const LOCATION_SEARCH_OPTIONS = {
  maplibregl,
  marker: { color: '#3FB1CE' },
  popup: true,
  showResultMarkers: { color: '#3FB1CE' },
  showResultsWhileTyping: true,
};

const LOCATION_SEARCH_CONTAINER = 'geocoder-container';

type OnClear = () => void;
type OnLoading = (query: string) => void;
type OnResult = (result: MaplibreGeocoderResult) => void;
type OnResults = (results: MaplibreGeocoderResults) => void;

interface LocationSearchProps extends MaplibreGeocoderOptions {
  /**
   * Emitted when the input is cleared
   */
  onClear?: OnClear;
  /**
   * Emitted when the geocoder is looking up a query
   */
  onLoading?: OnLoading;
  /**
   * Fired when the geocoder returns a response
   */
  onResults?: OnResults;
  /**
   * Fired when input is set
   */
  onResult?: OnResult;
}

interface EventCallback {
  (event: 'clear', callback: OnClear): void;
  (event: 'loading', callback: OnLoading): void;
  (event: 'result', callback: OnResult): void;
  (event: 'results', callback: OnResults): void;
}

type AmplifyLocationSearch = IControl & {
  addTo: (container: string) => void;
  on: EventCallback;
  off: EventCallback;
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

const LocationSearchStandalone = ({
  onLoading,
  onResult,
  onResults,
  onClear,
  ...props
}: LocationSearchProps) => {
  const geocoderRef = useRef(null);

  useEffect(() => {
    const map = createAmplifyGeocoder(
      props
    ) as unknown as AmplifyLocationSearch;
    geocoderRef.current = map;

    map.addTo(`#${LOCATION_SEARCH_CONTAINER}`);

    map.on('result', onResult);
    map.on('loading', onLoading);
    map.on('results', onResults);
    map.on('clear', onClear);

    return () => {
      map.off('result', onResult);
      map.off('loading', onLoading);
      map.off('results', onResults);
      map.off('clear', onClear);
    };
  }, [onResult, onLoading, onResults, onClear, props]);

  return <div id={LOCATION_SEARCH_CONTAINER} ref={geocoderRef} />;
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

export const Geocoder = LocationSearch;
