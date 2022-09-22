import dynamic from 'next/dynamic';
import React from 'react';
import {
  defaultDarkModeOverride,
  ThemeProvider,
  Card,
  Grid,
} from '@aws-amplify/ui-react';
import type { Theme, ColorMode } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import awsExports from '@environments/liveness/src/aws-exports';
import '@aws-amplify/ui-react/styles.css';
import './style.css';

import LivenessCard from './components/LivenessCard';
import LivenessDefault from './components/LivenessDefault';
import NavBar from './components/NavBar';

Amplify.configure({
  ...awsExports,
  API: {
    endpoints: [
      {
        name: 'SampleBackend',
        endpoint: 'https://sysfn8fu4l.execute-api.us-east-1.amazonaws.com/prod',
        region: 'us-east-1',
        // endpoint: '/liveness-next-example/api',
      },
    ],
  },
  Analytics: {
    autoSessionRecord: false,
  },
});

const App = () => {
  const [colorMode, setColorMode] = React.useState<ColorMode>('system');
  const theme: Theme = {
    name: 'liveness-theme',
    overrides: [defaultDarkModeOverride],
  };

  return (
    <ThemeProvider theme={theme} colorMode={colorMode}>
      <Grid height="100%" templateRows="auto 1fr">
        <NavBar colorMode={colorMode} setColorMode={setColorMode}></NavBar>
        <Card>
          <LivenessDefault />
        </Card>
      </Grid>
    </ThemeProvider>
  );
};

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
