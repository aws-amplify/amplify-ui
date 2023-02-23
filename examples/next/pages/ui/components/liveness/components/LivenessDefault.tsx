import { useState } from 'react';
import {
  FaceLivenessDetector,
  View,
  Flex,
  Loader,
  Text,
  FaceLivenessErrorModal,
  FaceLivenessFailureModal,
} from '@aws-amplify/ui-react';
import { useLiveness } from './useLiveness';
import { SessionIdAlert } from './SessionIdAlert';
import { GetLivenessResultCard } from './GetLivenessResultCard';
import LivenessInlineResults from './LivenessInlineResults';

export default function LivenessDefault({
  disableStartScreen = false,
  components = undefined,
}) {
  const {
    getLivenessResponse,
    createLivenessSessionApiError,
    createLivenessSessionApiData,
    createLivenessSessionApiLoading,
    handleGetLivenessDetection,
    stopLiveness,
  } = useLiveness();

  const [error, setError] = useState(undefined);
  const [checkFailed, setCheckFailed] = useState(false);

  if (createLivenessSessionApiError) {
    return <div>Some error occured...</div>;
  }

  function onUserCancel() {
    stopLiveness();
    setError(undefined);
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
              <FaceLivenessDetector
                sessionId={createLivenessSessionApiData.sessionId}
                onUserCancel={onUserCancel}
                handleGetLivenessDetection={async (sessionId) => {
                  const response = await handleGetLivenessDetection(sessionId);
                  if (!response.isLive) {
                    setCheckFailed(true);
                  }
                }}
                onError={(error) => {
                  setError(error);
                }}
                disableStartScreen={disableStartScreen}
                components={components}
              />
            ) : null}
            {error ? (
              <View style={{ zIndex: '1' }}>
                <FaceLivenessErrorModal
                  error={error}
                  onRetry={() => {
                    setError(undefined);
                    stopLiveness();
                  }}
                />
              </View>
            ) : null}
          </Flex>
        </Flex>
      )}
    </View>
  );
}
