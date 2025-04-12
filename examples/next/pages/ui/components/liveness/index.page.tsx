import dynamic from 'next/dynamic';
import React from 'react';

import { Amplify } from 'aws-amplify';
import awsExports from '@environments/liveness/liveness-environment/src/aws-exports';

import LivenessDefault from './components/LivenessDefault';
import Layout from './components/Layout';
import { View } from '@aws-amplify/ui-react';

Amplify.configure({
  ...awsExports,
  // Analytics: { autoSessionRecord: false },
});

const App = () => {
  const [enabled, setEnabled] = React.useState(false);
  return (
    <Layout>
      <View display={'flex'} style={{ justifyContent: 'center' }}>
        <button
          onClick={() => setEnabled(!enabled)}
          style={{ width: 'auto', margin: '20px' }}
        >
          {enabled ? 'Disable' : 'Enable'} Liveness Detector
        </button>
      </View>

      {enabled && <LivenessDefault />}
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
