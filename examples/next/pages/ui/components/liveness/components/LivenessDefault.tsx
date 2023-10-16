import { useState } from 'react';
import { Button, View, Flex, Loader, Text } from '@aws-amplify/ui-react';
import { FaceLivenessDetectorCore } from 'ayush987goyal-amplify-ui-react-liveness';
import { useLiveness } from './useLiveness';
import { SessionIdAlert } from './SessionIdAlert';
import LivenessInlineResults from './LivenessInlineResults';

export default function LivenessDefault({
  disableInstructionScreen = false,
  components = undefined,
  credentialProvider = undefined,
}) {
  const {
    cameraPermissionsLoading,
    cameraPermissionsData,
    getLivenessResponse,
    createLivenessSessionApiError,
    createLivenessSessionApiData,
    createLivenessSessionApiLoading,
    handleGetLivenessDetection,
    stopLiveness,
  } = useLiveness();
  const [enableCamera, setEnableCamera] = useState(true);
  const [refImageBlob, setRefImageBlob] = useState<Blob | null>(null);

  if (createLivenessSessionApiError) {
    return <div>Some error occured...</div>;
  }

  function onUserCancel() {
    stopLiveness();
  }

  return (
    <View maxWidth="640px" margin="0 auto">
      {createLivenessSessionApiLoading || cameraPermissionsLoading ? (
        <Flex justifyContent="center" alignItems="center">
          <Loader /> <Text as="span">Loading...</Text>
        </Flex>
      ) : !cameraPermissionsData && enableCamera ? (
        <Flex direction="column">
          <Flex justifyContent="center">
            <Text>This check requires video, please enable your camera</Text>
          </Flex>
          <Flex justifyContent="center">
            <Button variation="primary" onClick={() => setEnableCamera(false)}>
              Enable camera
            </Button>
          </Flex>
        </Flex>
      ) : (
        <Flex direction="column" gap="xl">
          <SessionIdAlert sessionId={createLivenessSessionApiData.sessionId} />

          {!!getLivenessResponse ? (
            <LivenessInlineResults
              getLivenessResponse={getLivenessResponse}
              refImageblob={refImageBlob}
              onUserCancel={onUserCancel}
            />
          ) : null}

          <Flex gap="0" direction="column" position="relative">
            {!getLivenessResponse ? (
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
                onReferenceImage={setRefImageBlob}
                disableInstructionScreen={disableInstructionScreen}
                components={components}
                {...(credentialProvider
                  ? { config: { credentialProvider } }
                  : {})}
              />
            ) : null}
          </Flex>
        </Flex>
      )}
    </View>
  );
}
