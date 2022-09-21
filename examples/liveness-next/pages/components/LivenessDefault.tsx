import { LivenessFlow } from '@aws-amplify/ui-react';
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
    <div style={{ marginTop: '1rem' }}>
      {createLivenessSessionApiLoading ? (
        'Loading...'
      ) : (
        <div>
          <SessionIdAlert sessionId={createLivenessSessionApiData.sessionId} />

          <LivenessFlow
            sessionId={createLivenessSessionApiData.sessionId}
            sessionInformation={createLivenessSessionApiData.sessionInformation}
            onGetLivenessDetection={handleGetLivenessDetection}
            enableAnalytics={true}
          />

          <GetLivenessResultCard getLivenessResponse={getLivenessResponse} />
        </div>
      )}
    </div>
  );
}
