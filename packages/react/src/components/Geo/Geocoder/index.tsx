import maplibregl from 'maplibre-gl';
import { createAmplifyGeocoder } from 'maplibre-gl-js-amplify';
import { useEffect, useRef } from 'react';

const GEOCODER_OPTIONS = {
  maplibregl,
  popup: true,
  showResultsWhileTyping: true,
};

const GEOCODER_CONTAINER = 'geocoder-container';

export const Geocoder = ({ position = 'top-right', style = {}, ...props }) => {
  const geocoder: any = useRef();

  useEffect(() => {
    const initializeGeocoder = () => {
      if (props.mapRef?.current) {
        const map = props.mapRef.current.getMap();
        geocoder.current = createAmplifyGeocoder({
          ...GEOCODER_OPTIONS,
          ...props,
        });

        map
          ? map?.addControl(geocoder.current, position)
          : geocoder.current.addTo(`#${GEOCODER_CONTAINER}`);

        if (typeof window !== 'undefined') {
          document
            .querySelectorAll('.maplibregl-ctrl-geocoder')
            .forEach((geocoderEl: HTMLElement) => {
              geocoderEl.setAttribute('data-amplify-geocoder', '');
              Object.assign(geocoderEl.style, style);
            });
        }
      }
    };

    const removeGeocoder = () => {
      if (props.mapRef?.current) {
        const map = props.mapRef.current.getMap();
        map?.removeControl(geocoder.current);
      }
    };

    initializeGeocoder();

    return () => {
      removeGeocoder();
    };
  }, [props.mapRef?.current]);

  return !props.mapRef ? <div id={GEOCODER_CONTAINER} /> : null;
};
