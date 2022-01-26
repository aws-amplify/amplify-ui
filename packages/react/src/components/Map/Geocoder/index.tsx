import { createAmplifyGeocoder } from 'maplibre-gl-js-amplify';
import { useEffect, useRef } from 'react';

import '@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css';
import 'maplibre-gl-js-amplify/dist/public/amplify-geocoder.css';

const GEOCODER_OPTIONS = {
  popup: true,
  showResultsWhileTyping: true,
};

const GEOCODER_CONTAINER = 'geocoder-container';

export const Geocoder = (props) => {
  const geocoder: any = useRef();
  const map = props.mapRef?.current?.getMap();

  const initializeGeocoder = () => {
    geocoder.current = createAmplifyGeocoder({
      ...GEOCODER_OPTIONS,
      ...props,
    });

    map
      ? map?.addControl(geocoder.current)
      : geocoder.current.addTo(`#${GEOCODER_CONTAINER}`);
    geocoder.current._showButton();
  };

  const removeGeocoder = () => {
    map?.removeControl(geocoder.current);
  };

  useEffect(() => {
    initializeGeocoder();

    return () => {
      removeGeocoder();
    };
  }, [props.mapRef?.current]);

  return !props.mapRef ? <div id={GEOCODER_CONTAINER} /> : null;
};
