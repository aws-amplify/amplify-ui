import dynamic from 'next/dynamic';
import React from 'react';

import { Amplify } from 'aws-amplify';
import awsExports from '@environments/liveness/liveness-environment/src/aws-exports';

import LivenessDefault from '../components/LivenessDefault';
import Layout from '../components/Layout';
import { Alert, Card, Heading, View, Text } from '@aws-amplify/ui-react';

Amplify.configure({
  ...awsExports,
  // Analytics: { autoSessionRecord: false },
});

const App = () => {
  return (
    <Layout>
      <LivenessDefault
        disableStartScreen={false}
        components={{
          Header: () => {
            return (
              <View flex="1">
                <Heading>Face liveness check</Heading>
                <Text>
                  You will go through a face verification process to prove that
                  you are a real person.
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
          Instructions: (): JSX.Element => {
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
                    Fill onscreen oval with your face and hold for colored
                    lights.
                  </li>
                </ol>
              </Card>
            );
          },
          ErrorView: ({ error, children }) => {
            return (
              <View flex="1" backgroundColor="white">
                <Heading color="black">My Custom Error Modal</Heading>
                <Text color="black">Hey there was an error: {error}</Text>
                {children}
              </View>
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
