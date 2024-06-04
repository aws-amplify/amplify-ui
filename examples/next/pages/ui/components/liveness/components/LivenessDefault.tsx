import React from 'react';
import { View, Flex, Loader, Text } from '@aws-amplify/ui-react';
import {
  FaceLivenessDetectorCore,
  FACE_MOVEMENT_AND_LIGHT_CHALLENGE,
  SUPPORTED_CHALLENGES,
} from '@aws-amplify/ui-react-liveness';
import { useLiveness } from './useLiveness';
import { ChallengeSelection } from './ChallengeSelection';
import { SessionIdAlert } from './SessionIdAlert';
import LivenessInlineResults from './LivenessInlineResults';

const DEFAULT_CHALLENGE = FACE_MOVEMENT_AND_LIGHT_CHALLENGE.type;

export default function LivenessDefault({
  components = undefined,
  credentialProvider = undefined,
  disableStartScreen = false,
}) {
  const [challengeType, setChallengeType] = React.useState(DEFAULT_CHALLENGE);

  const {
    getLivenessResponse,
    createLivenessSessionApiError,
    createLivenessSessionApiData,
    createLivenessSessionApiLoading,
    handleGetLivenessDetection,
    stopLiveness,
  } = useLiveness(challengeType);

  if (createLivenessSessionApiError) {
    return <div>Some error occurred...</div>;
  }

  function onUserCancel() {
    stopLiveness();
  }

  return (
    <View maxWidth="640px" margin="0 auto">
      {createLivenessSessionApiLoading ? (
        <Flex justifyContent="center" alignItems="center">
          <Loader /> <Text as="span">Loading...</Text>
        </Flex>
      ) : (
        <Flex direction="column" gap="xl">
          <ChallengeSelection
            selectedChallenge={challengeType}
            onChange={setChallengeType}
            challengeList={SUPPORTED_CHALLENGES.map(
              (challenge) => challenge.type
            )}
          />
          <SessionIdAlert
            sessionId={createLivenessSessionApiData['sessionId']}
          />

          {!!getLivenessResponse ? (
            <LivenessInlineResults
              getLivenessResponse={getLivenessResponse}
              onUserCancel={onUserCancel}
            />
          ) : null}

          <Flex gap="0" direction="column" position="relative">
            {!getLivenessResponse ? (
              <FaceLivenessDetectorCore
                sessionId={createLivenessSessionApiData['sessionId']}
                region={'us-east-1'}
                onUserCancel={onUserCancel}
                onAnalysisComplete={async () => {
                  await handleGetLivenessDetection(
                    createLivenessSessionApiData['sessionId']
                  );
                }}
                onError={(error) => {
                  console.error(error);
                }}
                disableStartScreen={disableStartScreen}
                components={components}
                config={{
                  ...(credentialProvider ? { credentialProvider } : {}),
                  endpointOverride:
                    'wss://streaming-rekognition-gamma.us-east-1.amazonaws.com',
                }}
              />
            ) : null}
          </Flex>
        </Flex>
      )}
    </View>
  );
}
