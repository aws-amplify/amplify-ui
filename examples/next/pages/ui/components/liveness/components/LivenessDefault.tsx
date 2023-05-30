import { View, Flex, Loader, Text } from '@aws-amplify/ui-react';
import {
  FaceLivenessDetector,
  FaceLivenessDetectorCore,
} from '@aws-amplify/ui-react-liveness';
import { useLiveness } from './useLiveness';
import { SessionIdAlert } from './SessionIdAlert';
import LivenessInlineResults from './LivenessInlineResults';

export default function LivenessDefault({
  disableInstructionScreen = false,
  components = undefined,
  credentialProvider = undefined,
}) {
  const {
    getLivenessResponse,
    createLivenessSessionApiError,
    createLivenessSessionApiData,
    createLivenessSessionApiLoading,
    handleGetLivenessDetection,
    stopLiveness,
  } = useLiveness();

  if (createLivenessSessionApiError) {
    return <div>Some error occured...</div>;
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
        <Flex
          direction="column"
          gap="xl"
          position="relative"
          style={{ zIndex: '2' }}
        >
          <SessionIdAlert sessionId={createLivenessSessionApiData.sessionId} />

          {!!getLivenessResponse ? (
            <LivenessInlineResults
              getLivenessResponse={getLivenessResponse}
              onUserCancel={onUserCancel}
            />
          ) : null}

          <Flex gap="0" direction="column" position="relative">
            {!getLivenessResponse ? (
              credentialProvider ? (
                <FaceLivenessDetectorCore
                  sessionId={createLivenessSessionApiData.sessionId}
                  region={'us-east-1'}
                  onUserCancel={onUserCancel}
                  onAnalysisComplete={async () => {
                    await handleGetLivenessDetection(
                      createLivenessSessionApiData.sessionId
                    );
                  }}
                  onError={(error) => {
                    console.error(error);
                  }}
                  disableInstructionScreen={disableInstructionScreen}
                  components={components}
                  config={{ credentialProvider }}
                />
              ) : (
                <FaceLivenessDetector
                  sessionId={createLivenessSessionApiData.sessionId}
                  region={'us-east-1'}
                  onUserCancel={onUserCancel}
                  onAnalysisComplete={async () => {
                    await handleGetLivenessDetection(
                      createLivenessSessionApiData.sessionId
                    );
                  }}
                  onError={(error) => {
                    console.error(error);
                  }}
                  disableInstructionScreen={disableInstructionScreen}
                  components={components}
                />
              )
            ) : null}
          </Flex>
        </Flex>
      )}
    </View>
  );
}
