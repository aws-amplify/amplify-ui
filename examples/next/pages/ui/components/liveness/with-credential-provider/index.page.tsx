import dynamic from 'next/dynamic';
import React from 'react';

import { Amplify } from 'aws-amplify';
import { AwsCredentialIdentityProvider } from '@aws-sdk/types';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';
import awsExports from '@environments/liveness/liveness-environment/src/aws-exports';

import LivenessDefault from '../components/LivenessDefault';
import Layout from '../components/Layout';

Amplify.configure({
  ...awsExports,
  API: {
    endpoints: [
      {
        name: 'SampleBackend',
        endpoint: 'https://s0ctzw9239.execute-api.us-east-1.amazonaws.com/prod',
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
  const credentialProvider: AwsCredentialIdentityProvider =
    fromCognitoIdentityPool({
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
