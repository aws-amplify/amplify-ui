import { View, Flex, Loader, Text } from '@aws-amplify/ui-react';
import { FaceLivenessDetector } from '@aws-amplify/ui-react-liveness';
import { useLiveness } from './useLiveness';
import { SessionIdAlert } from './SessionIdAlert';
import LivenessInlineResults from './LivenessInlineResults';

export default function LivenessDefault({
  disableStartScreen = false,
  components = undefined,
  credentialProvider = undefined,
}) {
  const {
    getLivenessResponse,
    // client application will handle error
    createLivenessSessionApiError,
    // session id
    createLivenessSessionApiData,
    createLivenessSessionApiLoading,
    handleGetLivenessDetection,
    stopLiveness,
  } = useLiveness();
  // console.log('createLivenessSessionApiData', createLivenessSessionApiData);
  // console.log('createLivenessSessionApiError', createLivenessSessionApiError);
  // console.log(
  //   'createLivenessSessionApiLoading',
  //   createLivenessSessionApiLoading
  // );

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
        <Flex direction="column" gap="xl">
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
            {/* 3. client app renders liveness component using session ID and appropriate callbacks */}
            {!getLivenessResponse ? (
              <FaceLivenessDetector
                sessionId={createLivenessSessionApiData['sessionId']}
                region={'us-west-2'}
                onUserCancel={onUserCancel}
                // 7. handles score
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
                  endpointOverride: 'wss://alankrp-moa.dev.streaming.reventlov.rekognition.aws.dev:443',
                }}
              />
            ) : null}
          </Flex>
        </Flex>
      )}
    </View>
  );
}
