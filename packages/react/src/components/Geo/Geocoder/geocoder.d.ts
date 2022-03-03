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
   * Default: true
   * Allow Maplibre to collect anonymous usage statistics from the plugin.
   */
  enableEventLogging?: boolean;
  /**
   *  A function accepting the query string, current features list, and geocoder options which performs geocoding to
   * supplement results from the Maplibre Geocoding API. Expected to return a Promise which resolves to an Array of
   * GeoJSON Features in the [Carmen GeoJSON](https://github.com/mapbox/carmen/blob/master/carmen-geojson.md) format.
   */
  externalGeocoder?: function;
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
  filter?: function;
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
  localGeocoder?: function;
  /**
   * Default: true
   * If `true`, a [Marker](https://maplibre.org/maplibre-gl-js-docs/api/markers/#marker) will be added to the map at the location of the user-selected
   * result using a default set of Marker options.  If the value is an object, the marker will be constructed using these
   * options. If `false`, no marker will be added to the map. Requires that `options.maplibregl` also be set.
   */
  marker?: boolean;
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
   * Default: 'top-right'
   * Position the geocoder will be rendered on the map
   */
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  /**
   * A geographical point given as an object with `latitude` and `longitude`
   * properties. Search results closer to this point will be given
   * higher priority. Defaults to map viewport if rendered as a map control.
   */
  proximity?: { latitude: number; longitude: number };
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
   * Custom CSS properties for the Geocoder
   */
  style?: React.CSSProperties;
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
