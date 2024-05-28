import dynamic from 'next/dynamic';
import React from 'react';

import { Amplify } from 'aws-amplify';

import LivenessDefault from './components/LivenessDefault';
import Layout from './components/Layout';

const amplifyOutputs = (
  await import(
    `@environments/liveness/liveness-environment/${process.env.PATH}`
  )
).default;

Amplify.configure({
  ...amplifyOutputs,
  // Analytics: { autoSessionRecord: false },
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
