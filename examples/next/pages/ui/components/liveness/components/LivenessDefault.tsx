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
    <View maxWidth="704px" margin="0 auto">
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

          <Flex gap="0" direction="column" position="relative">
            <FaceLivenessDetector
              sessionId={createLivenessSessionApiData.sessionId}
              onUserCancel={onUserCancel}
              onGetLivenessDetection={handleGetLivenessDetection}
              onError={(error) => {
                setError(error);
              }}
              onFailure={() => {
                setCheckFailed(true);
              }}
              enableAnalytics={true}
              disableStartScreen={disableStartScreen}
              components={components}
            />
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
            {checkFailed ? (
              <View style={{ zIndex: '1' }}>
                <FaceLivenessFailureModal
                  onRetry={() => {
                    setCheckFailed(false);
                    stopLiveness();
                  }}
                />
              </View>
            ) : null}
          </Flex>

          <GetLivenessResultCard getLivenessResponse={getLivenessResponse} />
        </Flex>
      )}
    </View>
  );
}
