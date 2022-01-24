import { createAmplifyGeocoder } from 'maplibre-gl-js-amplify';
import { useEffect, useRef } from 'react';

import '@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css';
import 'maplibre-gl-js-amplify/dist/public/amplify-geocoder.css';

const GEOCODER_OPTIONS = {
  popup: true,
  showResultsWhileTyping: true,
};

export const Geocoder = (props) => {
  const geocoder: any = useRef();
  const map = props.mapRef?.current?.getMap();

  const initializeGeocoder = () => {
    geocoder.current = createAmplifyGeocoder({
      ...GEOCODER_OPTIONS,
    });

    map?.addControl(geocoder.current);
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
  }, [props.mapRef.current]);

  return null;
};
