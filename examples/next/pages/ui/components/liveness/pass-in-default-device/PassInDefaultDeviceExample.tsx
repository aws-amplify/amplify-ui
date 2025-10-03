import React from 'react';
import {
  View,
  Flex,
  Loader,
  Text,
  SelectField,
  TextField,
  Button,
  Alert,
  Card,
  Heading,
  Badge,
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

// Simulated available devices for testing
const AVAILABLE_DEVICES = [
  { deviceId: 'device-1', label: 'Default Camera' },
  { deviceId: 'device-2', label: 'External USB Camera' },
  { deviceId: 'device-3', label: 'Virtual Camera' },
];

export default function PassInDefaultDeviceExample() {
  const [challengeType, setChallengeType] = React.useState(
    FACE_MOVEMENT_AND_LIGHT_CHALLENGE
  );

  // Device configuration state
  const [selectedDeviceId, setSelectedDeviceId] = React.useState('');
  const [selectedDeviceLabel, setSelectedDeviceLabel] = React.useState('');
  const [customDeviceId, setCustomDeviceId] = React.useState('');
  const [customDeviceLabel, setCustomDeviceLabel] = React.useState('');
  const [useCustomDevice, setUseCustomDevice] = React.useState(false);

  // Callback state for demo purposes
  const [deviceChangeLog, setDeviceChangeLog] = React.useState([]);
  const [cameraNotFoundLog, setCameraNotFoundLog] = React.useState([]);
  const [currentDevice, setCurrentDevice] = React.useState(null);

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

  

  const clearLogs = () => {
    setDeviceChangeLog([]);
    setCameraNotFoundLog([]);
    setCurrentDevice(null);
  };

  // Determine which device configuration to use
  const deviceId = useCustomDevice ? customDeviceId : selectedDeviceId;
  const deviceLabel = useCustomDevice ? customDeviceLabel : selectedDeviceLabel;

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
              Device Configuration
            </Heading>
            <Text marginBottom="large" color="gray">
              Configure default device settings for the liveness detector. You
              can specify either a device ID or device label.
            </Text>

            <Flex direction="column" gap="medium">
              <Flex alignItems="center" gap="small">
                <input
                  type="radio"
                  id="preset-device"
                  name="device-type"
                  checked={!useCustomDevice}
                  onChange={() => setUseCustomDevice(false)}
                />
                <label htmlFor="preset-device">
                  <Text fontWeight="bold">Use preset device</Text>
                </label>
              </Flex>

              {!useCustomDevice && (
                <Flex direction="column" gap="small" paddingLeft="large">
                  <SelectField
                    label="Device ID"
                    placeholder="Select a device ID"
                    value={selectedDeviceId}
                    onChange={(e) => {
                      const deviceId = e.target.value;
                      setSelectedDeviceId(deviceId);
                      if (deviceId) {
                        const device = AVAILABLE_DEVICES.find(
                          (d) => d.deviceId === deviceId
                        );
                        
                      }
                    }}
                  >
                    <option value="">None</option>
                    {AVAILABLE_DEVICES.map((device) => (
                      <option key={device.deviceId} value={device.deviceId}>
                        {device.deviceId}
                      </option>
                    ))}
                  </SelectField>

                  <SelectField
                    label="Device Label"
                    placeholder="Select a device label"
                    value={selectedDeviceLabel}
                    onChange={(e) => {
                      const deviceLabel = e.target.value;
                      setSelectedDeviceLabel(deviceLabel);
                      if (deviceLabel) {
                        const device = AVAILABLE_DEVICES.find(
                          (d) => d.label === deviceLabel
                        );
                        
                      }
                    }}
                  >
                    <option value="">None</option>
                    {AVAILABLE_DEVICES.map((device) => (
                      <option key={device.label} value={device.label}>
                        {device.label}
                      </option>
                    ))}
                  </SelectField>
                </Flex>
              )}

              <Flex alignItems="center" gap="small">
                <input
                  type="radio"
                  id="custom-device"
                  name="device-type"
                  checked={useCustomDevice}
                  onChange={() => setUseCustomDevice(true)}
                />
                <label htmlFor="custom-device">
                  <Text fontWeight="bold">
                    Use custom device (for testing not found scenarios)
                  </Text>
                </label>
              </Flex>

              {useCustomDevice && (
                <Flex direction="column" gap="small" paddingLeft="large">
                  <TextField
                    label="Custom Device ID"
                    placeholder="Enter custom device ID"
                    value={customDeviceId}
                    onChange={(e) => {
                      const deviceId = e.target.value;
                      setCustomDeviceId(deviceId);
                      if (deviceId) {
                        // Simulate camera not found scenario for demo purposes
                        onCameraNotFound(
                          { deviceId },
                          {
                            deviceId: 'default-camera',
                            label: 'Default Camera',
                          }
                        );
                      }
                    }}
                  />

                  <TextField
                    label="Custom Device Label"
                    placeholder="Enter custom device label"
                    value={customDeviceLabel}
                    onChange={(e) => {
                      const deviceLabel = e.target.value;
                      setCustomDeviceLabel(deviceLabel);
                      if (deviceLabel) {
                        // Simulate camera not found scenario for demo purposes
                        onCameraNotFound(
                          { deviceLabel },
                          {
                            deviceId: 'default-camera',
                            label: 'Default Camera',
                          }
                        );
                      }
                    }}
                  />
                </Flex>
              )}

              <Card variation="outlined" padding="medium" marginTop="medium">
                <Text fontWeight="bold" marginBottom="small">
                  Current Configuration:
                </Text>
                <Text>Device ID: {deviceId || 'Not specified'}</Text>
                <Text>Device Label: {deviceLabel || 'Not specified'}</Text>
                {deviceLabel && (
                  <Badge variation="info" marginTop="small">
                    Device label takes precedence over device ID
                  </Badge>
                )}
              </Card>
            </Flex>
          </Card>

          <ChallengeSelection
            selectedChallenge={challengeType}
            onChange={setChallengeType}
            challengeList={SUPPORTED_CHALLENGES_TYPES}
          />

          <SessionIdAlert
            sessionId={createLivenessSessionApiData['sessionId']}
          />

          {/* Device Callback Logs */}
          {(deviceChangeLog.length > 0 ||
            cameraNotFoundLog.length > 0 ||
            currentDevice) && (
            <Card variation="outlined" padding="medium">
              <Flex
                justifyContent="space-between"
                alignItems="center"
                marginBottom="medium"
              >
                <Heading level={4}>Device Activity Log</Heading>
                <Button size="small" onClick={clearLogs}>
                  Clear Log
                </Button>
              </Flex>

              {currentDevice && (
                <Alert variation="success" marginBottom="medium">
                  <Text fontWeight="bold">Current Active Device:</Text>
                  <Text>ID: {currentDevice.deviceId}</Text>
                  <Text>Label: {currentDevice.label}</Text>
                </Alert>
              )}

              {cameraNotFoundLog.length > 0 && (
                <div>
                  <Text fontWeight="bold" marginBottom="small">
                    Camera Not Found Events:
                  </Text>
                  {cameraNotFoundLog.map((log, index) => (
                    <Alert key={index} variation="warning" marginBottom="small">
                      {log}
                    </Alert>
                  ))}
                </div>
              )}

              {deviceChangeLog.length > 0 && (
                <div>
                  <Text fontWeight="bold" marginBottom="small">
                    Camera Change Events:
                  </Text>
                  {deviceChangeLog.map((log, index) => (
                    <Alert key={index} variation="info" marginBottom="small">
                      {log}
                    </Alert>
                  ))}
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
                deviceId={deviceId || undefined}
                deviceLabel={deviceLabel || undefined}
                onUserCancel={onUserCancel}
                onAnalysisComplete={async (deviceInfo) => {
                  console.log('Analysis complete with device:', deviceInfo);
                  await handleGetLivenessDetection(
                    createLivenessSessionApiData['sessionId']
                  );
                }}
                onError={(error) => {
                  console.error(error);
                }}
              />
            ) : null}
          </Flex>
        </Flex>
      )}
    </View>
  );
}
