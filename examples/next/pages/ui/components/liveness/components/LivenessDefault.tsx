import React from 'react';
import { View, Flex, Loader, Text } from '@aws-amplify/ui-react';
import { FaceLivenessDetectorCore } from '@aws-amplify/ui-react-liveness';
import { useLiveness } from './useLiveness';
import { ChallengeSelection } from './ChallengeSelection';
import { SessionIdAlert } from './SessionIdAlert';
import LivenessInlineResults from './LivenessInlineResults';

const FACE_MOVEMENT_AND_LIGHT_CHALLENGE = 'FaceMovementAndLightChallenge';
const FACE_MOVEMENT_CHALLENGE = 'FaceMovementChallenge';

const SUPPORTED_CHALLENGES_TYPES = [
  FACE_MOVEMENT_AND_LIGHT_CHALLENGE,
  FACE_MOVEMENT_CHALLENGE,
];

export default function LivenessDefault({
  components = undefined,
  credentialProvider = undefined,
  disableStartScreen = false,
}) {
  const [challengeType, setChallengeType] = React.useState(
    FACE_MOVEMENT_AND_LIGHT_CHALLENGE
  );

  const {
    getLivenessResponse,
    createLivenessSessionApiError,
    createLivenessSessionApiData,
    createLivenessSessionApiLoading,
    handleGetLivenessDetection,
    stopLiveness,
  } = useLiveness(challengeType);

  if (createLivenessSessionApiError) {
    console.error(createLivenessSessionApiError);
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
            challengeList={SUPPORTED_CHALLENGES_TYPES}
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
                  credentialProvider: credentialProvider,
                  systemClockOffset:
                    createLivenessSessionApiData['systemClockOffset'],
                }}
              />
            ) : null}
          </Flex>
        </Flex>
      )}
    </View>
  );
}
