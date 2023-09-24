import dynamic from 'next/dynamic';
import React from 'react';

import { Amplify } from 'aws-amplify';
import awsExports from '@environments/liveness/liveness-environment/src/aws-exports';

import LivenessDefault from './components/LivenessDefault';
import Layout from './components/Layout';

Amplify.configure({
  ...awsExports,
  // @todo-migration re-enable
  // API: {
  //   endpoints: [
  //     {
  //       name: 'SampleBackend',
  //       endpoint: 'https://lfurp52ij6.execute-api.us-east-2.amazonaws.com/dev',
  //       region: 'us-east-2',
  //       // endpoint: '/liveness-next-example/api',
  //     },
  //   ],
  // },
  // Analytics: {
  //   autoSessionRecord: false,
  // },
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
