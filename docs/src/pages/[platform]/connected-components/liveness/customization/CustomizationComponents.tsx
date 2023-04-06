import React from 'react';
import { FaceLivenessDetector } from '@aws-amplify/ui-react-liveness';
import { View, Heading, Alert, Card, Text } from '@aws-amplify/ui-react';

export function CustomizationComponents() {
  return (
    <FaceLivenessDetector
      sessionId={'sessionId'}
      region={'us-east-1'}
      onAnalysisComplete={async () => {}}
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
                  Make sure your face is not covered with sunglasses or a mask.
                </li>
                <li>
                  Move to a well-lit place that is not dark or in direct
                  sunlight.
                </li>
                <li>
                  Fill onscreen oval with your face and hold for colored lights.
                </li>
              </ol>
            </Card>
          );
        },
        ErrorView: ({ children }) => {
          return (
            <View flex="1" backgroundColor="white">
              <Heading color="black">My Custom Error View</Heading>
              {children}
            </View>
          );
        },
      }}
    />
  );
}
