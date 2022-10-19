import * as React from 'react';
import {
  translate,
  IlluminationState,
  IlluminationStateStringMap,
  FaceMatchStateStringMap,
  LivenessErrorStateStringMap,
} from '@aws-amplify/ui';

import {
  useLivenessActor,
  useLivenessSelector,
  createLivenessSelector,
} from '../hooks';
import { useTheme } from '../../../hooks';
import { Flex, Loader, View } from '../../../primitives';
import { LivenessAlertIcon } from './LivenessAlertIcon';

export const selectErrorState = createLivenessSelector(
  (state) => state.context.errorState
);
export const selectFaceMatchState = createLivenessSelector(
  (state) => state.context.faceMatchAssociatedParams.faceMatchState
);
export const selectIlluminationState = createLivenessSelector(
  (state) => state.context.faceMatchAssociatedParams.illuminationState
);

export interface InstructionProps {}

export const Instruction: React.FC<InstructionProps> = () => {
  const { tokens } = useTheme();
  const [state] = useLivenessActor();

  // NOTE: Do not change order of these selectors as the unit tests depend on this order
  const errorState = useLivenessSelector(selectErrorState);
  const faceMatchState = useLivenessSelector(selectFaceMatchState);
  const illuminationState = useLivenessSelector(selectIlluminationState);

  const isCheckFaceDetectedBeforeStart = state.matches(
    'checkFaceDetectedBeforeStart'
  );
  const isNotRecording = state.matches('notRecording');
  const isWaitingForSessionInfo = state.matches('waitForSessionInfo');
  const isUploading = state.matches('uploading');
  const isCheckSuccessful = state.matches('checkSucceeded');
  const isCheckFailed = state.matches('checkFailed');
  const isFlashingFreshness = state.matches({
    recording: 'flashFreshnessColors',
  });

  const getInstructionContent = () => {
    if (errorState || isCheckFailed) {
      return (
        <Flex
          gap={`${tokens.space.xs}`}
          color={`${tokens.colors.red[80]}`}
          alignItems="center"
        >
          <LivenessAlertIcon variation="error" />
          <View as="span">
            {errorState && LivenessErrorStateStringMap[errorState]}
            {isCheckFailed && translate('Check unsuccessful. Try again')}
          </View>
        </Flex>
      );
    }

    if (isCheckFaceDetectedBeforeStart) {
      return translate('Move face in front of camera');
    }

    if (isNotRecording) {
      return translate('After countdown, move face to fit in oval');
    }

    if (isWaitingForSessionInfo) {
      return (
        <Flex gap={`${tokens.space.xxs}`} alignItems="center">
          <Loader />
          <View as="span">{translate('Connecting...')}</View>
        </Flex>
      );
    }

    if (isUploading) {
      return (
        <Flex gap={`${tokens.space.xxs}`} alignItems="center">
          <Loader />
          <View as="span">{translate('Verifying...')}</View>
        </Flex>
      );
    }

    if (isCheckSuccessful) {
      return (
        <Flex
          gap={`${tokens.space.xs}`}
          color={`${tokens.colors.green[80]}`}
          alignItems="center"
        >
          <LivenessAlertIcon variation="success" />
          <View as="span" style={{ whiteSpace: 'nowrap' }}>
            {translate('Check successful')}
          </View>
        </Flex>
      );
    }

    if (illuminationState && illuminationState !== IlluminationState.NORMAL) {
      return IlluminationStateStringMap[illuminationState];
    }

    if (isFlashingFreshness) {
      return translate('Hold face in oval');
    }

    return FaceMatchStateStringMap[faceMatchState];
  };

  const instructionContent = getInstructionContent();
  return instructionContent ? (
    <Flex
      borderRadius={`${tokens.radii.medium}`}
      backgroundColor={`${tokens.colors.background.primary}`}
      padding={`${tokens.space.small}`}
      margin={`0 ${tokens.space.medium}`}
    >
      <View color={`${tokens.colors.font.primary}`}>{instructionContent}</View>
    </Flex>
  ) : null;
};
