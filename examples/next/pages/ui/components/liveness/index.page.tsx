import dynamic from 'next/dynamic';
import React from 'react';

import { Amplify } from 'aws-amplify';
import awsExports from '@environments/liveness/src/aws-exports';

import LivenessDefault from './components/LivenessDefault';
import Layout from './components/Layout';

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
  return (
    <Layout>
      <LivenessDefault />
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
