import { LivenessFlow, View, Flex } from '@aws-amplify/ui-react';
import { useLiveness } from './useLiveness';
import { SessionIdAlert } from './SessionIdAlert';
import { GetLivenessResultCard } from './GetLivenessResultCard';

export default function LivenessDefault() {
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

  return (
    <View maxWidth="640px" margin="0 auto">
      {createLivenessSessionApiLoading ? (
        'Loading...'
      ) : (
        <Flex direction="column">
          <SessionIdAlert sessionId={createLivenessSessionApiData.sessionId} />

          <LivenessFlow
            sessionId={createLivenessSessionApiData.sessionId}
            sessionInformation={createLivenessSessionApiData.sessionInformation}
            onGetLivenessDetection={handleGetLivenessDetection}
            onExit={stopLiveness}
            enableAnalytics={true}
          />

          <GetLivenessResultCard getLivenessResponse={getLivenessResponse} />
        </Flex>
      )}
    </View>
  );
}
