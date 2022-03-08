import { AmplifyGeofenceControl } from 'maplibre-gl-js-amplify';
import { useControl } from 'react-map-gl';

export const Geofence = () => {
  useControl(() => new AmplifyGeofenceControl() as any);

  return null;
};
