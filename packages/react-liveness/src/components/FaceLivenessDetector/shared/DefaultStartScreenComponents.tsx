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
  RecordingIcon?: React.ComponentType<DefaultRecordingIconProps>;
  CancelButton?: React.ComponentType<CancelButtonProps>;
}

interface DefaultPhotosensitiveWarningProps {
  headingText?: string;
  bodyText: string;
  infoText: string;
}

export const DefaultPhotosensitiveWarning = ({
  headingText,
  bodyText,
  infoText,
}: DefaultPhotosensitiveWarningProps): JSX.Element => {
  return (
    <Flex
      className={`${ComponentClassName.Alert} ${LivenessClassNames.StartScreenWarning}`}
      style={{ zIndex: '3' }}
    >
      <View flex="1">
        {headingText ? (
          <View className={ComponentClassName.AlertHeading}>{headingText}</View>
        ) : undefined}
        <View className={ComponentClassName.AlertBody}>{bodyText}</View>
      </View>
      <LivenessIconWithPopover>{infoText}</LivenessIconWithPopover>
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
