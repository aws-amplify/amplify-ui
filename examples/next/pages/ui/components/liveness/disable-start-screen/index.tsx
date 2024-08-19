import dynamic from 'next/dynamic';
import React from 'react';

import { Amplify } from 'aws-amplify';
import awsExports from '@environments/liveness/liveness-environment/src/aws-exports';

import LivenessDefault from '../components/LivenessDefault';
import Layout from '../components/Layout';

Amplify.configure({
  ...awsExports,
  // Analytics: { autoSessionRecord: false },
});

const App = () => {
  return (
    <Layout>
      <LivenessDefault disableStartScreen={true} />
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
