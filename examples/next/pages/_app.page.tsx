// This file only exists to expose `Amplify` & its categories on `window` for e2e testing

// https://nextjs.org/docs/advanced-features/custom-app
import App from 'next/app';
import { Amplify } from 'aws-amplify';
import * as Auth from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';

import { ThemeProvider } from '@aws-amplify/ui-react';
import { useEffect } from 'react';
import { MapProvider, useMap } from 'react-map-gl';

if (typeof window !== 'undefined') {
  window['Amplify'] = Amplify;
  window['Hub'] = Hub;
}

const SetGeoWindowProperties = () => {
  const { default: map } = useMap();

  useEffect(() => {
    if (typeof window !== 'undefined' && window['Cypress']) {
      map?.once('load', () => {
        window['map'] = map;
      });

      map?.on('idle', () => {
        window['idleMap'] = true;
      });

      map?.on('render', () => {
        window['idleMap'] = false;
      });

      return () => {
        map?.off('idle', () => {
          delete window['idleMap'];
        });

        map?.off('render', () => {
          delete window['idleMap'];
        });
      };
    }
  }, [map]);

  return null;
};

export default function MyApp(props) {
  if (/\/geo\//g.test(props.router.route)) {
    return (
      <MapProvider>
        <App {...props} />
        <SetGeoWindowProperties />
      </MapProvider>
    );
  }

  return (
    <ThemeProvider>
      <App {...props} />
    </ThemeProvider>
  );
}
