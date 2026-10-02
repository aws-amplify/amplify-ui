import React from 'react';
import { ComponentClassName } from '@aws-amplify/ui';
import { Flex, View } from '@aws-amplify/ui-react';
import { RecordingIcon } from './';
import { LivenessIconWithPopover } from './LivenessIconWithPopover';
import { CancelButton as CancelButtonComponent } from './CancelButton';
import type { FaceLivenessCancelButtonProps } from './CancelButton';
import { LivenessClassNames } from '../types/classNames';
import type { CheckScreenComponents } from './FaceLivenessErrorModal';

export type FaceLivenessDetectorComponents = StartScreenComponents &
  CheckScreenComponents &
  CancelButtonComponents;

export interface CancelButtonComponents {
  /**
   * Replaces the cancel ("X") button. Pass `null` to hide it, for example
   * when the host (such as a modal) already provides its own close button.
   */
  CancelButton?: React.ComponentType<FaceLivenessCancelButtonProps> | null;
}

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
}: DefaultPhotosensitiveWarningProps): React.JSX.Element => {
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
}: DefaultRecordingIconProps): React.JSX.Element => {
  return (
    <View className={LivenessClassNames.RecordingIconContainer}>
      <RecordingIcon>{recordingIndicatorText}</RecordingIcon>
    </View>
  );
};

interface CancelButtonProps {
  cancelLivenessCheckText: string;
  CancelButton?: React.ComponentType<FaceLivenessCancelButtonProps>;
}

export const DefaultCancelButton = ({
  cancelLivenessCheckText,
  CancelButton,
}: CancelButtonProps): React.JSX.Element => {
  return (
    <View className={LivenessClassNames.CancelContainer}>
      <CancelButtonComponent
        ariaLabel={cancelLivenessCheckText}
        Component={CancelButton}
      ></CancelButtonComponent>
    </View>
  );
};
