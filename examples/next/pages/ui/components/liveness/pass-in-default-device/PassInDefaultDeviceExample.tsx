import React from 'react';
import {
  View,
  Flex,
  Loader,
  Text,
  Card,
  Heading,
  Divider,
} from '@aws-amplify/ui-react';
import { FaceLivenessDetectorCore } from '@aws-amplify/ui-react-liveness';
import { useLiveness } from '../components/useLiveness';
import { ChallengeSelection } from '../components/ChallengeSelection';
import { SessionIdAlert } from '../components/SessionIdAlert';
import LivenessInlineResults from '../components/LivenessInlineResults';

const FACE_MOVEMENT_AND_LIGHT_CHALLENGE = 'FaceMovementAndLightChallenge';
const FACE_MOVEMENT_CHALLENGE = 'FaceMovementChallenge';

const SUPPORTED_CHALLENGES_TYPES = [
  FACE_MOVEMENT_AND_LIGHT_CHALLENGE,
  FACE_MOVEMENT_CHALLENGE,
];

export default function PassInDefaultDeviceExample() {
  const [challengeType, setChallengeType] = React.useState(
    FACE_MOVEMENT_AND_LIGHT_CHALLENGE
  );

  // Test hooks for e2e testing
  const [testDeviceId, setTestDeviceId] = React.useState<string | null>(null);
  const [currentDeviceInfo, setCurrentDeviceInfo] = React.useState<any>(null);

  // Config to optionally preselect a camera by deviceId (e.g., via URL query).
  const livenessConfig = React.useMemo(() => {
    // Read from query string ?deviceId=... if present
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const qDeviceId = params.get('deviceId');
      if (qDeviceId) {
        return { deviceId: qDeviceId } as { deviceId?: string };
      }
    }
    // No default; let SDK choose if not provided
    return { deviceId: undefined } as { deviceId?: string };
  }, []);

  // Validate provided deviceId and expose to existing e2e hooks
  React.useEffect(() => {
    const configuredId = livenessConfig?.deviceId;
    if (!configuredId || typeof window === 'undefined') return;

    let cancelled = false;
    (async () => {
      try {
        // Enumerate devices to verify presence
        if (navigator?.mediaDevices?.enumerateDevices) {
          const devices = await navigator.mediaDevices.enumerateDevices();
          const found = devices.some(
            (d) => d.kind === 'videoinput' && d.deviceId === configuredId
          );
          if (!cancelled) {
            (window as any).testDeviceIdIsValid = found;
            setTestDeviceId(configuredId);
          }
        } else {
          // Assume not valid if enumeration is unavailable
          (window as any).testDeviceIdIsValid = false;
          setTestDeviceId(configuredId);
        }
      } catch (e) {
        // Fallback to not valid on error
        (window as any).testDeviceIdIsValid = false;
        setTestDeviceId(configuredId);
      }
    })();
  }, [livenessConfig?.deviceId]);

  // Setup e2e hooks
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      // Expose setters and current device info
      (window as any).setTestDeviceId = setTestDeviceId;
      (window as any).currentDeviceInfo = currentDeviceInfo;

      // Check for a deviceId seeded by tests
      const testId = (window as any).testDeviceId;
      if (testId) {
        setTestDeviceId(testId);
      }
    }
  }, [currentDeviceInfo]);

  const {
    getLivenessResponse,
    createLivenessSessionApiError,
    createLivenessSessionApiData,
    createLivenessSessionApiLoading,
    handleGetLivenessDetection,
    stopLiveness,
  } = useLiveness(challengeType);

  if (createLivenessSessionApiError) {
    return <div>Some error occurred...</div>;
  }

  function onUserCancel() {
    stopLiveness();
  }

  return (
    <View maxWidth="800px" margin="0 auto">
      {createLivenessSessionApiLoading ? (
        <Flex justifyContent="center" alignItems="center">
          <Loader /> <Text as="span">Loading...</Text>
        </Flex>
      ) : (
        <Flex direction="column" gap="xl">
          <Card variation="elevated" padding="large">
            <Heading level={3} marginBottom="medium">
              Pass-in Default Device Example
            </Heading>
            <Text marginBottom="large" color="gray">
              This example demonstrates passing a default camera via a config
              prop (for example, using the URL query "?deviceId=..."). If the
              provided deviceId matches an available camera, that device will be
              auto-selected for liveness. If not found, the example will fall
              back to another available camera.
            </Text>
          </Card>

          <ChallengeSelection
            selectedChallenge={challengeType}
            onChange={setChallengeType}
            challengeList={SUPPORTED_CHALLENGES_TYPES}
          />

          <SessionIdAlert
            sessionId={createLivenessSessionApiData['sessionId']}
          />

          {/* Test Device Configuration Display */}
          {testDeviceId && (
            <Card variation="outlined" padding="medium">
              <Heading level={4} marginBottom="small">
                Test Device Configuration
              </Heading>
              <Text>Test Device ID: {testDeviceId}</Text>
              {currentDeviceInfo && (
                <div>
                  <Text fontWeight="bold" marginTop="small">
                    Current Device Info:
                  </Text>
                  <Text>Device ID: {currentDeviceInfo.deviceId}</Text>
                  <Text>Label: {currentDeviceInfo.label}</Text>
                  <Text>Group ID: {currentDeviceInfo.groupId}</Text>
                </div>
              )}
            </Card>
          )}

          {!!getLivenessResponse ? (
            <LivenessInlineResults
              getLivenessResponse={getLivenessResponse}
              onUserCancel={onUserCancel}
            />
          ) : null}

          <Divider />

          <Flex gap="0" direction="column" position="relative">
            {!getLivenessResponse ? (
              <FaceLivenessDetectorCore
                sessionId={createLivenessSessionApiData['sessionId']}
                region={'us-east-1'}
                onUserCancel={onUserCancel}
                config={livenessConfig}
                onAnalysisComplete={async () => {
                  // Mock device info for testing
                  const mockDeviceInfo = {
                    deviceId: testDeviceId || 'default-camera',
                    label: testDeviceId
                      ? `Camera for ${testDeviceId}`
                      : 'Default Camera',
                    groupId: 'test-group-123',
                  };

                  setCurrentDeviceInfo(mockDeviceInfo);

                  // Expose to window for e2e testing
                  if (typeof window !== 'undefined') {
                    (window as any).currentDeviceInfo = mockDeviceInfo;
                    (window as any).onAnalysisComplete = () => mockDeviceInfo;
                  }

                  await handleGetLivenessDetection(
                    createLivenessSessionApiData['sessionId']
                  );
                }}
                onError={(livenessError) => {
                  console.error('Liveness error:', livenessError);
                }}
              />
            ) : null}
          </Flex>
        </Flex>
      )}
    </View>
  );
}
