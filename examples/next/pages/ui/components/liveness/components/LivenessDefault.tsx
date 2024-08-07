import React from 'react';
import { View, Flex, Loader, Text } from '@aws-amplify/ui-react';
import {
  mobileCameraType,
  FaceLivenessDetectorCore,
  SUPPORTED_CHALLENGES as _SUPPORTED_CHALLENGES,
} from '@aws-amplify/ui-react-liveness';
import { useLiveness } from './useLiveness';
import { ConfigSelect } from './ConfigSelect';
import { SessionIdAlert } from './SessionIdAlert';
import LivenessInlineResults from './LivenessInlineResults';

const SUPPORTED_CHALLENGES = _SUPPORTED_CHALLENGES.map(
  (challenge) => challenge.type
);

export default function LivenessDefault({
  components = undefined,
  credentialProvider = undefined,
  disableStartScreen = false,
}) {
  const [challengeType, setChallengeType] = React.useState<
    (typeof SUPPORTED_CHALLENGES)[number]
  >('FaceMovementAndLightChallenge');
  const [camera, setCamera] =
    React.useState<mobileCameraType>('USER');

  const {
    getLivenessResponse,
    createLivenessSessionApiError,
    createLivenessSessionApiData,
    createLivenessSessionApiLoading,
    handleGetLivenessDetection,
    stopLiveness,
  } = useLiveness(challengeType, camera);

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
          <ConfigSelect<(typeof SUPPORTED_CHALLENGES)[number]>
            name="Challenge"
            currentSelection={challengeType}
            onChange={setChallengeType}
            options={SUPPORTED_CHALLENGES}
          />
          <ConfigSelect<mobileCameraType>
            name="Camera"
            currentSelection={camera}
            onChange={setCamera}
            options={['USER', 'ENVIRONMENT']}
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
                  mobileCamera: camera,
                }}
              />
            ) : null}
          </Flex>
        </Flex>
      )}
    </View>
  );
}
