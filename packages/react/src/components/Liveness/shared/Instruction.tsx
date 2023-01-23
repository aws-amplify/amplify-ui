import * as React from 'react';
import {
  translate,
  IlluminationState,
  IlluminationStateStringMap,
  FaceMatchStateStringMap,
  FaceMatchState,
} from '@aws-amplify/ui';

import {
  useLivenessActor,
  useLivenessSelector,
  createLivenessSelector,
} from '../hooks';
import { Toast } from './Toast';
import { Overlay } from './Overlay';
import { Flex, Loader, View } from '../../../primitives';

export const selectErrorState = createLivenessSelector(
  (state) => state.context.errorState
);
export const selectFaceMatchState = createLivenessSelector(
  (state) => state.context.faceMatchAssociatedParams.faceMatchState
);
export const selectIlluminationState = createLivenessSelector(
  (state) => state.context.faceMatchAssociatedParams.illuminationState
);
export const selectIsFaceFarEnoughBeforeRecording = createLivenessSelector(
  (state) => state.context.isFaceFarEnoughBeforeRecording
);
export const selectOnuserCancel = createLivenessSelector(
  (state) => state.context.componentProps.onUserCancel
);
export const selectFaceMatchStateBeforeStart = createLivenessSelector(
  (state) => state.context.faceMatchStateBeforeStart
);

export interface InstructionProps {}

export const Instruction: React.FC<InstructionProps> = () => {
  const [state] = useLivenessActor();

  // NOTE: Do not change order of these selectors as the unit tests depend on this order
  const errorState = useLivenessSelector(selectErrorState);
  const faceMatchState = useLivenessSelector(selectFaceMatchState);
  const illuminationState = useLivenessSelector(selectIlluminationState);
  const faceMatchStateBeforeStart = useLivenessSelector(
    selectFaceMatchStateBeforeStart
  );
  const isFaceFarEnoughBeforeRecordingState = useLivenessSelector(
    selectIsFaceFarEnoughBeforeRecording
  );
  const isCheckFaceDetectedBeforeStart = state.matches(
    'checkFaceDetectedBeforeStart'
  );
  const isCheckFaceDistanceBeforeRecording = state.matches(
    'checkFaceDistanceBeforeRecording'
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
    if (errorState || isCheckFailed || isCheckSuccessful) {
      return;
    }

    if (isCheckFaceDetectedBeforeStart) {
      if (faceMatchStateBeforeStart === FaceMatchState.TOO_MANY) {
        return (
          <Toast>
            {translate(FaceMatchStateStringMap[faceMatchStateBeforeStart])}
          </Toast>
        );
      }
      return <Toast>{translate('Move face in front of camera')}</Toast>;
    }

    // Specifically checking for false here because initially the value is undefined and we do not want to show the instruction
    if (
      isCheckFaceDistanceBeforeRecording &&
      isFaceFarEnoughBeforeRecordingState === false
    ) {
      return <Toast>{translate('Move face further away')}</Toast>;
    }

    if (isNotRecording) {
      return <Toast>{translate('Hold face position during countdown')}</Toast>;
    }

    if (isWaitingForSessionInfo) {
      return (
        <Toast>
          <Flex alignItems="center" gap="xs">
            <Loader />
            <View>{translate('Connecting...')}</View>
          </Flex>
        </Toast>
      );
    }

    if (isUploading) {
      return (
        <Overlay
          backgroundColor="overlay.40"
          anchorOrigin={{ horizontal: 'center', vertical: 'end' }}
        >
          <Toast>
            <Flex alignItems="center" gap="xs">
              <Loader />
              <View>{translate('Verifying...')}</View>
            </Flex>
          </Toast>
        </Overlay>
      );
    }

    if (illuminationState && illuminationState !== IlluminationState.NORMAL) {
      return <Toast>{IlluminationStateStringMap[illuminationState]}</Toast>;
    }

    if (isFlashingFreshness) {
      return <Toast>{translate('Hold face in oval')}</Toast>;
    }

    return FaceMatchStateStringMap[faceMatchState] ? (
      <Toast>{FaceMatchStateStringMap[faceMatchState]}</Toast>
    ) : null;
  };

  const instructionContent = getInstructionContent();
  return instructionContent ? instructionContent : null;
};
