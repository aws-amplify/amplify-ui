import { LivenessFlow } from '@aws-amplify/ui-react';
import { useLiveness } from './useLiveness';
import { SessionIdAlert } from './SessionIdAlert';
import { GetLivenessResultCard } from './GetLivenessResultCard';

export default function LivenessDefault() {
  const {
    getLivenessResponse,
    startLivenessApiError,
    startLivenessApiData,
    startLivenessApiLoading,
    handleGetLivenessDetection,
    stopLiveness,
  } = useLiveness();

  if (startLivenessApiError) {
    return <div>Some error occured...</div>;
  }

  return (
    <div style={{ marginTop: '1rem' }}>
      {startLivenessApiLoading ? (
        'Loading...'
      ) : (
        <div>
          <SessionIdAlert sessionId={startLivenessApiData.sessionId} />

          <LivenessFlow
            sessionId={startLivenessApiData.sessionId}
            clientActionDocument={startLivenessApiData.clientActionDocument}
            onGetLivenessDetection={handleGetLivenessDetection}
            onExit={stopLiveness}
          />

          <GetLivenessResultCard getLivenessResponse={getLivenessResponse} />
        </div>
      )}
    </div>
  );
}
