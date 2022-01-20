import { createAmplifyGeocoder } from 'maplibre-gl-js-amplify';
import { useEffect, useRef } from 'react';

import '@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css';
import 'maplibre-gl-js-amplify/dist/public/amplify-geocoder.css';

export const Geocoder = (props) => {
  const geocoder: any = useRef();

  useEffect(() => {
    geocoder.current = createAmplifyGeocoder();
    props.mapRef?.current?.getMap()?.addControl(geocoder.current);

    return () => {
      props.mapRef?.current?.getMap()?.removeControl(geocoder.current);
    };
  });

  return null;
};
