import { useEffect } from 'react';
import { Marker as MarkerRMG, MarkerProps } from 'react-map-gl';

export const Marker = ({ children, ...props }: MarkerProps) => {
  useEffect(() => {
    [...document.getElementsByClassName('maplibregl-marker')].forEach(
      (marker) => marker.setAttribute('data-amplify-marker', '')
    );
  }, []);

  return (
    <MarkerRMG color="#4668F2" {...props}>
      {children}
    </MarkerRMG>
  );
};
