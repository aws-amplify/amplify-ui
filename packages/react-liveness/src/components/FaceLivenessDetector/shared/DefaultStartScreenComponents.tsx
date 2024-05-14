import React from 'react';
import { ComponentClassName } from '@aws-amplify/ui';
import { Flex, View } from '@aws-amplify/ui-react';
import { RecordingIcon } from './';
import { LivenessIconWithPopover } from './LivenessIconWithPopover';
import { CancelButton as CancelButtonComponent } from './CancelButton';
import { LivenessClassNames } from '../types/classNames';
import { CheckScreenComponents } from './FaceLivenessErrorModal';

export type FaceLivenessDetectorComponents = StartScreenComponents &
  CheckScreenComponents;

export interface StartScreenComponents {
  PhotosensitiveWarning?: React.ComponentType;
}

interface DefaultPhotosensitiveWarningProps {
  bodyText: string;
  headingText: string;
  infoText: string;
  labelText: string;
}

export const DefaultPhotosensitiveWarning = ({
  bodyText,
  headingText,
  infoText,
  labelText,
}: DefaultPhotosensitiveWarningProps): JSX.Element => {
  return (
    <Flex
      className={`${ComponentClassName.Alert} ${LivenessClassNames.StartScreenWarning}`}
      style={{ zIndex: '3' }}
    >
      <View flex="1">
        <View className={ComponentClassName.AlertHeading}>{headingText}</View>
        <View className={ComponentClassName.AlertBody}>{bodyText}</View>
      </View>
      <LivenessIconWithPopover labelText={labelText} headingText={headingText}>
        {infoText}
      </LivenessIconWithPopover>
    </Flex>
  );
};

interface DefaultRecordingIconProps {
  recordingIndicatorText: string;
}

export const DefaultRecordingIcon = ({
  recordingIndicatorText,
}: DefaultRecordingIconProps): JSX.Element => {
  return (
    <View className={LivenessClassNames.RecordingIconContainer}>
      <RecordingIcon>{recordingIndicatorText}</RecordingIcon>
    </View>
  );
};

interface CancelButtonProps {
  cancelLivenessCheckText: string;
}

export const DefaultCancelButton = ({
  cancelLivenessCheckText,
}: CancelButtonProps): JSX.Element => {
  return (
    <View className={LivenessClassNames.CancelContainer}>
      <CancelButtonComponent
        ariaLabel={cancelLivenessCheckText}
      ></CancelButtonComponent>
    </View>
  );
};
