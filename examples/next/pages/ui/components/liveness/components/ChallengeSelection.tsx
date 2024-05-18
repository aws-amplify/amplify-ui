import * as React from 'react';
import { Alert, Heading, Text } from '@aws-amplify/ui-react';

export const ChallengeSelection = ({ selectedChallenge }) => {
  return (
    <Alert variation="info" hasIcon={false}>
      <Heading>Challenge Selection</Heading>
      <Text>{selectedChallenge}</Text>
    </Alert>
  );
};
