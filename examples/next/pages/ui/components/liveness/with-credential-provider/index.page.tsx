import dynamic from 'next/dynamic';
import React from 'react';
import { Amplify } from 'aws-amplify';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';
import { AwsCredentialProvider } from '@aws-amplify/ui-react-liveness';

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
  const credentialProvider: AwsCredentialProvider = fromCognitoIdentityPool({
    clientConfig: { region: 'us-east-2' },
    identityPoolId: 'us-east-2:89d27d83-5313-46b2-a7cb-328604399400',
  });

  return (
    <Layout>
      <LivenessDefault credentialProvider={credentialProvider} />
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
