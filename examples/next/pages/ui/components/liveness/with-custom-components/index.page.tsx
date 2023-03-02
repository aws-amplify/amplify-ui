import dynamic from 'next/dynamic';
import React from 'react';

import { Amplify } from 'aws-amplify';
import awsExports from '@environments/liveness/src/aws-exports';

import LivenessDefault from '../components/LivenessDefault';
import Layout from '../components/Layout';
import { Alert, Card, Heading, View, Text } from '@aws-amplify/ui-react';
import { translate } from '@aws-amplify/ui';

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
      <LivenessDefault
        disableInstructionScreen={false}
        components={{
          LivenessHeader: () => {
            return (
              <View flex="1">
                <Heading>Face liveness check</Heading>
                <Text>
                  You will go through a face verification process to prove you
                  are a real person.
                </Text>
              </View>
            );
          },
          PhotosensitiveWarning: (): JSX.Element => {
            return (
              <Alert
                variation="warning"
                isDismissible={false}
                hasIcon={true}
                heading="Caution"
              >
                This check displays colored lights. Use caution if you are
                photosensitive.
              </Alert>
            );
          },
          LivenessInstructions: (): JSX.Element => {
            return (
              <Card variation="elevated">
                Instructions to follow to use liveness face detector
                <ol>
                  <li>
                    Make sure your face is not covered with sunglasses or a
                    mask.
                  </li>
                  <li>
                    Move to a well-lit place that is not dark or in direct
                    sunlight.
                  </li>
                  <li>
                    When check starts, fit face in oval, and hold for colored
                    lights.
                  </li>
                </ol>
              </Card>
            );
          },
        }}
      />
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
