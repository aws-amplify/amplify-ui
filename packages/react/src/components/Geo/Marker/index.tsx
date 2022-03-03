import { useEffect } from 'react';
import { Marker as MarkerRMG } from 'react-map-gl';
import type { MarkerProps } from 'react-map-gl';

export const Marker = ({
  children,
  ...props
}: Omit<MarkerProps, 'onClick'> & Partial<Pick<MarkerProps, 'onClick'>>) => {
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
