import dynamic from 'next/dynamic';
import React from 'react';

import { Amplify } from 'aws-amplify';
import awsExports from '@environments/liveness/liveness-environment/src/aws-exports';

import Layout from '../components/Layout';
import PassInDefaultDeviceExample from './PassInDefaultDeviceExample';

Amplify.configure({
  ...awsExports,
  // Analytics: { autoSessionRecord: false },
});

const App = () => {
  return (
    <Layout>
      <PassInDefaultDeviceExample />
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
