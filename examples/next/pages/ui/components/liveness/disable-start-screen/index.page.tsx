import dynamic from 'next/dynamic';
import React from 'react';

import { Amplify } from 'aws-amplify';

import LivenessDefault from '../components/LivenessDefault';
import Layout from '../components/Layout';

const amplifyOutputs = (
  await import(
    `@environments/liveness/liveness-environment/${process.env.PATH}`
  )
).default;

Amplify.configure(amplifyOutputs);

const existingConfig = Amplify.getConfig();
Amplify.configure({
  ...existingConfig,
  API: {
    ...existingConfig.API,
    REST: { ...existingConfig.API?.REST, ...amplifyOutputs?.custom?.API },
  },
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
