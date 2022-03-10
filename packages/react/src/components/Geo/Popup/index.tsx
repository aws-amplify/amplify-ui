import { Popup as PopupRMG } from 'react-map-gl';
import type { PopupProps } from 'react-map-gl';

export const Popup = (props: PopupProps) => {
  return <PopupRMG {...props} />;
};
