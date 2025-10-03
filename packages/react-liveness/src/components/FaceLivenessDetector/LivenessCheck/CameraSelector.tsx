import { Flex, Label, SelectField, View } from '@aws-amplify/ui-react';
import React from 'react';
import { LivenessClassNames } from '../types/classNames';

interface CameraSelectorProps {
  deviceId?: string;
  onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  devices: MediaDeviceInfo[];
}

export const CameraSelector = (props: CameraSelectorProps): JSX.Element => {
  const {
    onSelect: onCameraChange,
    devices: selectableDevices,
    deviceId: selectedDeviceId,
  } = props;
  return (
    <Flex className={LivenessClassNames.StartScreenCameraSelect}>
      <View className={LivenessClassNames.StartScreenCameraSelectContainer}>
        <Label
          htmlFor="amplify-liveness-camera-select"
          className={`${LivenessClassNames.StartScreenCameraSelect}__label`}
        >
          Camera:
        </Label>
        <SelectField
          id="amplify-liveness-camera-select"
          testId="amplify-liveness-camera-select"
          label="Camera"
          labelHidden
          value={selectedDeviceId}
          onChange={onCameraChange}
        >
          {selectableDevices.map((device) => (
            <option value={device.deviceId} key={device.deviceId}>
              {device.label}
            </option>
          ))}
        </SelectField>
      </View>
    </Flex>
  );
};
