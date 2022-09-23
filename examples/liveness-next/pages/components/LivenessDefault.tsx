import {
  LivenessFlow,
  View,
  Flex,
  Loader,
  Icon,
  Text,
} from '@aws-amplify/ui-react';
import { useLiveness } from './useLiveness';
import { SessionIdAlert } from './SessionIdAlert';
import { GetLivenessResultCard } from './GetLivenessResultCard';

import LivenessLogo from './LivenessLogo';

export default function LivenessDefault({ disableStartScreen = false }) {
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

          <Icon
            ariaLabel="Amplify UI Liveness"
            margin="0 auto"
            width="160"
            height="52"
            viewBox={{ width: 160, height: 52 }}
          >
            <LivenessLogo />
          </Icon>

          <LivenessFlow
            sessionId={createLivenessSessionApiData.sessionId}
            sessionInformation={createLivenessSessionApiData.sessionInformation}
            onGetLivenessDetection={handleGetLivenessDetection}
            enableAnalytics={true}
            disableStartScreen={disableStartScreen}
          />

          <GetLivenessResultCard getLivenessResponse={getLivenessResponse} />
        </Flex>
      )}
    </View>
  );
}
