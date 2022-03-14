import { useEffect } from 'react';
import { Marker as MarkerRMG } from 'react-map-gl';
import type { MarkerProps as MarkerRMGProps } from 'react-map-gl';

export const Marker = (props: MarkerProps) => {
  useEffect(() => {
    [...document.getElementsByClassName('maplibregl-marker')].forEach(
      (marker) => marker.setAttribute('data-amplify-marker', '')
    );
  }, []);

  return <MarkerRMG color="#4668F2" {...props} />;
};

export type MarkerProps = MarkerRMGProps;
