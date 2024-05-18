import dynamic from 'next/dynamic';
import React from 'react';

import { Amplify } from 'aws-amplify';
import {
  Button,
  Flex,
  Heading,
  SelectField,
  View,
} from '@aws-amplify/ui-react';
import awsExports from '@environments/liveness/liveness-environment/src/aws-exports';

import LivenessDefault from './components/LivenessDefault';
import Layout from './components/Layout';

Amplify.configure({
  ...awsExports,
  // Analytics: { autoSessionRecord: false },
});

const DEFAULT_CHALLENGE = 'FaceMovementAndLightChallenge';
const SUPPORTED_CHALLENGES = [
  'FaceMovementAndLightChallenge',
  'FaceMovementChallenge',
];

const App = () => {
  const [challengeType, setChallengeType] = React.useState(DEFAULT_CHALLENGE);
  const [showLiveness, setShowLiveness] = React.useState(false);
  return (
    <Layout>
      {showLiveness ? (
        <LivenessDefault challengeType={challengeType} />
      ) : (
        <View maxWidth="640px" margin="0 auto">
          <Flex direction="column" gap="xl">
            <Heading level={5}>Select Challenge Type</Heading>
            <SelectField
              label=""
              value={challengeType}
              onChange={(e) => setChallengeType(e.target.value)}
            >
              {SUPPORTED_CHALLENGES.map((challenge) => (
                <option value={challenge}>{challenge}</option>
              ))}
            </SelectField>
            <Button variation="primary" onClick={() => setShowLiveness(true)}>
              Proceed to Liveness Check
            </Button>
          </Flex>
        </View>
      )}
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
