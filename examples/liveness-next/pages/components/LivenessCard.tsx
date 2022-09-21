import { LivenessFlow, Button, Card, Flex } from '@aws-amplify/ui-react';
import { useLiveness } from './useLiveness';
import { SessionIdAlert } from './SessionIdAlert';
import { GetLivenessResultCard } from './GetLivenessResultCard';

export default function LivenessCard() {
  const {
    isLivenessActive,
    getLivenessResponse,
    createLivenessSessionApiError,
    createLivenessSessionApiData,
    createLivenessSessionApiLoading,
    handleGetLivenessDetection,
    handleCreateLivenessSession,
    handleUserExit,
    handleExit,
  } = useLiveness();

  if (createLivenessSessionApiError) {
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
          <SessionIdAlert sessionId={createLivenessSessionApiData.sessionId} />

          <Card
            variation="elevated"
            width={600}
            maxWidth="100%"
            padding="unset"
          >
            <LivenessFlow
              sessionId={createLivenessSessionApiData.sessionId}
              sessionInformation={
                createLivenessSessionApiData.sessionInformation
              }
              onGetLivenessDetection={handleGetLivenessDetection}
              onUserCancel={handleUserExit}
              enableAnalytics={true}
            />
          </Card>

          <GetLivenessResultCard getLivenessResponse={getLivenessResponse} />
        </Flex>
      ) : (
        <Button
          variation="primary"
          onClick={handleCreateLivenessSession}
          disabled={createLivenessSessionApiLoading}
        >
          {createLivenessSessionApiLoading ? 'Loading...' : 'Start Liveness'}
        </Button>
      )}
    </div>
  );
}
