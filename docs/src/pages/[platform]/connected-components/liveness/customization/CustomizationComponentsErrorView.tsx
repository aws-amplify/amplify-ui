import React, { useCallback, useState } from 'react';
import { FaceLivenessDetector } from '@aws-amplify/ui-react-liveness';
import { Button, Flex, Heading, Text } from '@aws-amplify/ui-react';

export function CustomizationComponentsErrorView() {
  const [error, setError] = useState(undefined);

  const CustomError = useCallback(() => {
    return (
      <Flex
        justifyContent="center"
        alignItems="center"
        width="100%"
        height="100%"
      >
        <Flex
          backgroundColor="white"
          direction="column"
          justifyContent="center"
          padding="32px"
        >
          <Heading color="black">{error?.state}</Heading>
          <Text>{error?.error.message}</Text>
          <Button>Try again?</Button>
        </Flex>
      </Flex>
    );
  }, [error]);

  return (
    <FaceLivenessDetector
      sessionId="sessionId"
      region="us-east-1"
      onAnalysisComplete={async () => {}}
      onError={setError}
      components={{
        ErrorView: CustomError,
      }}
    />
  );
}
