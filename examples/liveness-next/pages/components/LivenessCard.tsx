import { LivenessFlow, Button, Card, Flex } from '@aws-amplify/ui-react';
import { useLiveness } from './useLiveness';
import { SessionIdAlert } from './SessionIdAlert';
import { GetLivenessResultCard } from './GetLivenessResultCard';

export default function LivenessCard() {
  const {
    isLivenessActive,
    getLivenessResponse,
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
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          gap={0}
        >
          <SessionIdAlert sessionId={startLivenessApiData.sessionId} />

          <Card variation="elevated" maxWidth={600}>
            <LivenessFlow
              sessionId={startLivenessApiData.sessionId}
              clientActionDocument={startLivenessApiData.clientActionDocument}
              onGetLivenessDetection={handleGetLivenessDetection}
              active={isLivenessActive}
              onExit={handleExit}
              onUserCancel={handleUserExit}
            />
          </Card>

          <GetLivenessResultCard getLivenessResponse={getLivenessResponse} />
        </Flex>
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
