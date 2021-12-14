import { LivenessFlow, Button, Card } from '@aws-amplify/ui-react';
import { useLiveness } from './useLiveness';
import { SessionIdAlert } from './SessionIdAlert';
import { AuditImage } from './AuditImage';

export default function LivenessCard() {
  const {
    isLivenessActive,
    auditImageBytes,
    startLivenessApiError,
    startLivenessApiData,
    startLivenessApiLoading,
    handleGetLivenessDetection,
    handleStartLiveness,
    handleUserExit,
    handleExit,
  } = useLiveness();

  if (startLivenessApiError) {
    return <div>Some error occured...</div>;
  }

  return (
    <div style={{ marginTop: '1rem' }}>
      {isLivenessActive ? (
        <div style={{ maxWidth: 600, margin: 'auto' }}>
          <SessionIdAlert sessionId={startLivenessApiData.sessionId} />

          <Card variation="elevated">
            <LivenessFlow
              sessionId={startLivenessApiData.sessionId}
              clientActionDocument={startLivenessApiData.clientActionDocument}
              onGetLivenessDetection={handleGetLivenessDetection}
              active={isLivenessActive}
              onExit={handleExit}
              onUserCancel={handleUserExit}
            />
          </Card>

          <AuditImage auditImageBytes={auditImageBytes} />
        </div>
      ) : (
        <Button
          variation="primary"
          onClick={handleStartLiveness}
          disabled={startLivenessApiLoading}
        >
          {startLivenessApiLoading ? 'Loading...' : 'Start Liveness'}
        </Button>
      )}
    </div>
  );
}
