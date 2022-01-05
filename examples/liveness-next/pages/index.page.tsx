import dynamic from 'next/dynamic';
import { AmplifyProvider, Tabs, TabItem } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import awsExports from '@environments/liveness/src/aws-exports';
import '@aws-amplify/ui-react/styles.css';

import LivenessCard from './components/LivenessCard';
import LivenessDefault from './components/LivenessDefault';

Amplify.configure({
  ...awsExports,
  API: {
    endpoints: [
      {
        name: 'SampleBackend',
        endpoint: 'https://zoi5y67js7.execute-api.us-west-2.amazonaws.com/prod',
        region: 'us-west-2',
        // endpoint: '/liveness-next-example/api',
      },
    ],
  },
});

const App = () => {
  return (
    <AmplifyProvider>
      <Tabs spacing="equal">
        <TabItem title="Card View">
          <LivenessCard />
        </TabItem>

        <TabItem title="Default View">
          <LivenessDefault />
        </TabItem>
      </Tabs>
    </AmplifyProvider>
  );
};

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
