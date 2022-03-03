import maplibregl from 'maplibre-gl';
import { createAmplifyGeocoder } from 'maplibre-gl-js-amplify';
import { useEffect } from 'react';
import { useControl, useMap } from 'react-map-gl';

const GEOCODER_OPTIONS = {
  maplibregl,
  marker: { color: '#4668F2' },
  popup: true,
  showResultMarkers: { color: '#4668F2' },
  showResultsWhileTyping: true,
};

const GEOCODER_CONTAINER = 'geocoder-container';

export const Geocoder = ({ position = 'top-right', style = {}, ...props }) => {
  const { current: map } = useMap();

  if (map) {
    useControl(
      () =>
        createAmplifyGeocoder({
          ...GEOCODER_OPTIONS,
          ...props,
        }) as any
    );
  } else {
    useEffect(() => {
      (
        createAmplifyGeocoder({
          ...GEOCODER_OPTIONS,
          ...props,
        }) as any
      ).addTo(`#${GEOCODER_CONTAINER}`);
    }, []);
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document
        .querySelectorAll('.maplibregl-ctrl-geocoder')
        .forEach((geocoderEl: HTMLElement) => {
          geocoderEl.setAttribute('data-amplify-geocoder', '');
          Object.assign(geocoderEl.style, style);
        });
    }
  }, [map]);

  return !map ? <div id={GEOCODER_CONTAINER} /> : null;
};
