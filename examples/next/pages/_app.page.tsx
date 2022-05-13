// This file only exists to expose `Amplify` & its categories on `window` for e2e testing

// https://nextjs.org/docs/advanced-features/custom-app
import App from 'next/app';
import { Amplify, Hub } from 'aws-amplify';
import { Authenticator, AmplifyProvider } from '@aws-amplify/ui-react';
import { MapProvider, useMap } from 'react-map-gl/dist/es5';

if (typeof window !== 'undefined') {
  window['Amplify'] = Amplify;
  window['Hub'] = Hub;
}

const SignalIdleMap = () => {
  const { default: map } = useMap();

  map?.once('load', () => {
    if (window['Cypress']) {
      window['map'] = map;
    }
  });

  map?.on('idle', () => {
    if (window['Cypress']) {
      window['idleMap'] = true;
    }
  });

  map?.on('render', () => {
    if (window['Cypress']) {
      window['idleMap'] = false;
    }
  });

  return null;
};

export default function MyApp(props) {
  if (/\/geo\//g.test(props.router.route)) {
    return (
      <MapProvider>
        <App {...props} />
        <SignalIdleMap />
      </MapProvider>
    );
  }

  return (
    <AmplifyProvider>
      <Authenticator.Provider>
        <App {...props} />
      </Authenticator.Provider>
    </AmplifyProvider>
  );
}
