import { LivenessFlow } from '@aws-amplify/ui-react';
import { useLiveness } from './useLiveness';

export default function LivenessDefault() {
  const {
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
        <LivenessFlow
          sessionId={startLivenessApiData.sessionId}
          clientActionDocument={startLivenessApiData.clientActionDocument}
          onGetLivenessDetection={handleGetLivenessDetection}
          onExit={stopLiveness}
        />
      )}
    </div>
  );
}
