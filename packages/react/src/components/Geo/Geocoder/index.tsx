import maplibregl from 'maplibre-gl';
import { createAmplifyGeocoder } from 'maplibre-gl-js-amplify';
import { useEffect, useRef } from 'react';
import { useControl, useMap } from 'react-map-gl';
import type { IControl } from 'react-map-gl';

const GEOCODER_OPTIONS = {
  maplibregl,
  marker: { color: '#3FB1CE' },
  popup: true,
  showResultMarkers: { color: '#3FB1CE' },
  showResultsWhileTyping: true,
};

const GEOCODER_CONTAINER = 'geocoder-container';

type GeocoderControl = IControl & {
  addTo: (container: string) => void;
};

/**
 * The `<Geocoder>` component provides location search. See https://ui.docs.amplify.aws/components/geo#geocoder.
 *
 * @example
 * // Used as a map control:
 * function App() {
 *   return (
 *     <MapView>
 *       <Geocoder />
 *     </MapView>
 *   );
 * }
 *
 * @example
 * // Used as a standalone component:
 * function App() {
 *   return <Geocoder />;
 * }
 */
export const Geocoder = ({
  position = 'top-right',
  ...props
}: GeocoderProps) => {
  const { current: map } = useMap();

  /**
   * This logic determines whether the Geocoder exists as part of a Map component or if it is a standalone component.
   * The `useControl` hook inside `ControlledGeocoder` from `react-map-gl` makes it easy to add a control to a map,
   * but throws an error if that map doesn't exist. If the map doesn't exist, the Geocoder is mounted to a container
   * upon rendering inside the `StandaloneGeocoder`.
   */
  if (map) {
    return <ControlledGeocoder {...GEOCODER_OPTIONS} {...props} />;
  }

  return <StandaloneGeocoder {...GEOCODER_OPTIONS} {...props} />;
};

const ControlledGeocoder = (props: GeocoderProps) => {
  useControl(() => createAmplifyGeocoder(props) as unknown as GeocoderControl);

  return null;
};

const StandaloneGeocoder = (props: GeocoderProps) => {
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      (createAmplifyGeocoder(props) as unknown as GeocoderControl).addTo(
        `#${GEOCODER_CONTAINER}`
      );

      hasMounted.current = true;
    }
  }, [props]);

  return <div id={GEOCODER_CONTAINER} />;
};

// `GeocoderProps` is based upon the typing specified by maplibre-gl-geocoder:
// https://github.com/maplibre/maplibre-gl-geocoder/blob/main/lib/index.js#L11-L66
// TODO: formalize this type in the `maplibre-gl-geocoder` library
export type GeocoderProps = {
  /**
   * A bounding box given as an array in the format `[minX, minY, maxX, maxY]`.
   * Search results will be limited to the bounding box.
   */
  bbox?: number[];
  /**
   * Default: false
   * If `true`, the geocoder control will clear it's contents and blur when user presses the escape key.
   */
  clearAndBlurOnEsc?: boolean;
  /**
   * Default: false
   * If `true`, the geocoder control will clear its value when the input blurs.
   */
  clearOnBlur?: boolean;
  /**
   * Default: false
   * If `true`, the geocoder control will collapse until hovered or in focus.
   */
  collapsed?: boolean;
  /**
   * a comma separated list of country codes to limit results to specified country or countries.
   */
  countries?: string;
  /**
   * Default: 200
   * Sets the amount of time, in milliseconds, to wait before querying the server when a user types into the Geocoder
   * input box. This parameter may be useful for reducing the total number of API calls made for a single query.
   */
  debounceSearch?: number;
  /**
   * Default: true
   * Allow Maplibre to collect anonymous usage statistics from the plugin.
   */
  enableEventLogging?: boolean;
  /**
   *  A function accepting the query string, current features list, and geocoder options which performs geocoding to
   * supplement results from the Maplibre Geocoding API. Expected to return a Promise which resolves to an Array of
   * GeoJSON Features in the [Carmen GeoJSON](https://github.com/mapbox/carmen/blob/master/carmen-geojson.md) format.
   */
  externalGeocoder?: Function;
  /**
   * Default: true
   * If `false`, animating the map to a selected result is disabled. If `true`, animating the map will use the default
   * animation parameters. If an object, it will be passed as `options` to the map [`flyTo`](https://maplibre.org/maplibre-gl-js-docs/api/map/#map#flyto)
   * or [`fitBounds`](https://maplibre.org/maplibre-gl-js-docs/api/map/#map#fitbounds) method providing control over the animation of the transition.
   */
  flyTo?: boolean | object;
  /**
   * A function which accepts a Feature in the [Carmen GeoJSON](https://github.com/mapbox/carmen/blob/master/carmen-geojson.md) format to filter out
   * results from the Geocoding API response before they are included in the suggestions list. Return `true` to keep the item, `false` otherwise.
   */
  filter?: Function;
  /**
   * A function that specifies how the selected result should be rendered in the search bar. This function should accept a single [Carmen GeoJSON](https://github.com/mapbox/carmen/blob/master/carmen-geojson.md) object as input and return a string.
   * HTML tags in the output string will not be rendered. Defaults to `(item) => item.place_name`.
   */
  getItemValue?: Function;
  /**
   * Specify the language to use for response text and query result weighting. Options are IETF language tags comprised
   * of a mandatory ISO 639-1 language code and optionally one or more IETF subtags for country or script. More than
   * one value can also be specified, separated by commas. Defaults to the browser's language settings.
   */
  language?: string;
  /**
   * Default: 5
   * Maximum number of results to show.
   */
  limit?: number;
  /**
   * A function accepting the query string which performs local geocoding to supplement results from the Maplibre
   * Geocoding API. Expected to return an Array of GeoJSON Features in the [Carmen GeoJSON](https://github.com/mapbox/carmen/blob/master/carmen-geojson.md) format.
   */
  localGeocoder?: Function;
  /**
   * Default: false
   * If `true`, indicates that the `localGeocoder` results should be the only ones returned to the user. If `false`,
   * indicates that the `localGeocoder` results should be combined with those from the Maplibre API with the `localGeocoder` results ranked higher.
   */
  localGeocoderOnly?: boolean;
  /**
   * Default: { color: '#4668F2' }
   * If `true`, a [Marker](https://maplibre.org/maplibre-gl-js-docs/api/markers/#marker) will be added to the map at the location of the user-selected
   * result using a default set of Marker options.  If the value is an object, the marker will be constructed using these
   * options. If `false`, no marker will be added to the map. Requires that `options.maplibregl` also be set (which it is by default).
   */
  marker?: boolean | object;
  /**
   * Default: 2
   * Minimum number of characters to enter before results are shown.
   */
  minLength?: number;
  /**
   * Default: 'Search'
   * Override the default placeholder attribute value.
   */
  placeholder?: string;
  /**
   * Default: true
   * If `true`, a [Popup](https://maplibre.org/maplibre-gl-js-docs/api/markers/#popup) will be added to the map when clicking on a marker using a default set of popup options.
   * If the value is an object, the popup will be constructed using these options. If `false`, no popup will be added to the map.
   * Requires that `options.maplibregl` also be set (which it is by default).
   */
  popup?: boolean | object;
  /**
   * A function that specifies how the results should be rendered in the popup menu. This function should accept a single [Carmen GeoJSON](https://github.com/mapbox/carmen/blob/master/carmen-geojson.md) object as input and return a string.
   * Any HTML in the returned string will be rendered.
   */
  popupRender?: Function;
  /**
   * Default: 'top-right'
   * Position the geocoder will be rendered on the map. Only relevant when `<Geocoder>` is used with a map.
   */
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  /**
   * A geographical point given as an object with `latitude` and `longitude`
   * properties. Search results closer to this point will be given
   * higher priority. Defaults to map viewport if rendered as a map control.
   */
  proximity?: { latitude: number; longitude: number };
  /**
   * A function that specifies how the results should be rendered in the dropdown menu. This function should accepts a single [Carmen GeoJSON](https://github.com/mapbox/carmen/blob/master/carmen-geojson.md)
   * object as input and return a string. Any HTML in the returned string will be rendered.
   */
  render?: Function;
  /**
   * Default: false
   * If `true`, enable reverse geocoding mode. In reverse geocoding, search input is expected to be coordinates in the
   * form `lat, lon`, with suggestions being the reverse geocodes.
   */
  reverseGeocoder?: boolean;
  /**
   * Default: 'distance'
   * Set the factors that are used to sort nearby results.
   */
  reverseMode?: 'distance' | 'score';
  /**
   * Default: { color: '#4668F2' }
   * If `true`, [Markers](https://maplibre.org/maplibre-gl-js-docs/api/markers/#marker) will be added to the map at the location the top results for the query.
   * If the value is an object, the marker will be constructed using these options. If `false`, no marker will be added to the map.
   * Requires that `options.maplibregl` also be set (which it is by default).
   */
  showResultMarkers?: boolean | object;
  /**
   * Default: true
   * If `false`, indicates that search will only occur on enter key press. If `true`, indicates that the Geocoder will
   * search on the input box being updated above the minLength option.
   */
  showResultsWhileTyping?: boolean;
  /**
   * Default: true
   * If `true`, the geocoder proximity will automatically update based on the map view.
   */
  trackProximity?: boolean;
  /**
   * A comma separated list of types that filter results to match those specified. See https://docs.mapbox.com/api/search/#data-types
   * for available types. If reverseGeocode is enabled, you should specify one type. If you configure more than one type, the first
   * type will be used.
   */
  types?: string;
  /**
   * Default: 16
   * On geocoded result, what zoom level should the map animate to when a `bbox` isn't found in the response.
   * If a `bbox` is found the map will fit to the `bbox`.
   */
  zoom?: number;
};
