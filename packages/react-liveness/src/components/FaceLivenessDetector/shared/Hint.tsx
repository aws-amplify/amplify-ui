import * as React from 'react';

import { View, VisuallyHidden } from '@aws-amplify/ui-react';

import { IlluminationState, FaceMatchState } from '../service';

import {
  useLivenessActor,
  useLivenessSelector,
  createLivenessSelector,
} from '../hooks';
import { Toast } from './Toast';
import { HintDisplayText } from '../displayText';
import { ToastWithLoader } from './ToastWithLoader';

export const selectErrorState = createLivenessSelector(
  (state) => state.context.errorState
);
export const selectFaceMatchState = createLivenessSelector(
  (state) => state.context.faceMatchAssociatedParams!.faceMatchState
);
export const selectIlluminationState = createLivenessSelector(
  (state) => state.context.faceMatchAssociatedParams!.illuminationState
);
export const selectIsFaceFarEnoughBeforeRecording = createLivenessSelector(
  (state) => state.context.isFaceFarEnoughBeforeRecording
);

export const selectFaceMatchStateBeforeStart = createLivenessSelector(
  (state) => state.context.faceMatchStateBeforeStart
);

const selectFaceMatchPercentage = createLivenessSelector(
  (state) => state.context.faceMatchAssociatedParams?.faceMatchPercentage
);

export interface HintProps {
  hintDisplayText: Required<HintDisplayText>;
}

const defaultToast = (text: string, isInitial = false) => {
  return (
    <Toast size="large" variation="primary" isInitial={isInitial}>
      <View aria-live="assertive" aria-label={text}>
        {text}
      </View>
    </Toast>
  );
};

export const Hint: React.FC<HintProps> = ({ hintDisplayText }) => {
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
  const faceMatchPercentage = useLivenessSelector(selectFaceMatchPercentage);
  const isCheckFaceDetectedBeforeStart = state.matches(
    'checkFaceDetectedBeforeStart'
  );
  const isCheckFaceDistanceBeforeRecording = state.matches(
    'checkFaceDistanceBeforeRecording'
  );
  const isStartView = state.matches('start') || state.matches('userCancel');
  const isRecording = state.matches('recording');
  const isNotRecording = state.matches('notRecording');
  const isUploading = state.matches('uploading');
  const isCheckSuccessful = state.matches('checkSucceeded');
  const isCheckFailed = state.matches('checkFailed');
  const isFlashingFreshness = state.matches({
    recording: 'flashFreshnessColors',
  });

  const FaceMatchStateStringMap: Record<FaceMatchState, string | undefined> = {
    [FaceMatchState.CANT_IDENTIFY]: hintDisplayText.hintCanNotIdentifyText,
    [FaceMatchState.FACE_IDENTIFIED]: hintDisplayText.hintTooFarText,
    [FaceMatchState.TOO_MANY]: hintDisplayText.hintTooManyFacesText,
    [FaceMatchState.TOO_CLOSE]: hintDisplayText.hintTooCloseText,
    [FaceMatchState.TOO_FAR]: hintDisplayText.hintTooFarText,
    [FaceMatchState.MATCHED]: hintDisplayText.hintHoldFaceForFreshnessText,
    [FaceMatchState.OFF_CENTER]: hintDisplayText.hintFaceOffCenterText,
  };

  const IlluminationStateStringMap: Record<IlluminationState, string> = {
    [IlluminationState.BRIGHT]: hintDisplayText.hintIlluminationTooBrightText,
    [IlluminationState.DARK]: hintDisplayText.hintIlluminationTooDarkText,
    [IlluminationState.NORMAL]: hintDisplayText.hintIlluminationNormalText,
  };

  const getInstructionContent = () => {
    if (isStartView) {
      return defaultToast(hintDisplayText.hintCenterFaceText, true);
    }

    if (errorState ?? (isCheckFailed || isCheckSuccessful)) {
      return;
    }

    if (!isRecording) {
      if (isCheckFaceDetectedBeforeStart) {
        if (faceMatchStateBeforeStart === FaceMatchState.TOO_MANY) {
          return defaultToast(hintDisplayText.hintTooManyFacesText);
        }
        return defaultToast(hintDisplayText.hintMoveFaceFrontOfCameraText);
      }

      // Specifically checking for false here because initially the value is undefined and we do not want to show the instruction
      if (
        isCheckFaceDistanceBeforeRecording &&
        isFaceFarEnoughBeforeRecordingState === false
      ) {
        return defaultToast(hintDisplayText.hintTooCloseText);
      }

      if (isNotRecording) {
        return (
          <ToastWithLoader displayText={hintDisplayText.hintConnectingText} />
        );
      }

      if (isUploading) {
        return (
          <ToastWithLoader displayText={hintDisplayText.hintVerifyingText} />
        );
      }

      if (illuminationState && illuminationState !== IlluminationState.NORMAL) {
        return defaultToast(IlluminationStateStringMap[illuminationState]);
      }
    }

    if (isFlashingFreshness) {
      return defaultToast(hintDisplayText.hintHoldFaceForFreshnessText);
    }

    if (isRecording && !isFlashingFreshness) {
      // During face matching, we want to only show the TOO_CLOSE or
      // TOO_FAR texts. If FaceMatchState matches TOO_CLOSE, we'll show
      // the TOO_CLOSE text, but for FACE_IDENTIFED, CANT_IDENTIFY, TOO_MANY
      // we are defaulting to the TOO_FAR text (for now).
      let resultHintString = FaceMatchStateStringMap[FaceMatchState.TOO_FAR];
      if (
        faceMatchState === FaceMatchState.TOO_CLOSE ||
        faceMatchState === FaceMatchState.MATCHED
      ) {
        resultHintString = FaceMatchStateStringMap[faceMatchState];
      }

      // If the face is outside the oval set the aria-label to a string about centering face in oval
      let a11yHintString = resultHintString;
      if (faceMatchState === FaceMatchState.OFF_CENTER) {
        a11yHintString = FaceMatchStateStringMap[faceMatchState];
      }

      // If the face match percentage reaches a 50% or 100% marks append it to the a11y label
      if (faceMatchState === FaceMatchState.MATCHED) {
        a11yHintString = `${a11yHintString}. ${hintDisplayText.hintMatchIndicatorText(
          100
        )}`;
      } else if (faceMatchPercentage! > 50) {
        a11yHintString = `${a11yHintString}. ${hintDisplayText.hintMatchIndicatorText(
          50
        )}`;
      }

      return (
        <Toast
          size="large"
          variation={
            faceMatchState === FaceMatchState.TOO_CLOSE ? 'error' : 'primary'
          }
        >
          <VisuallyHidden aria-live="assertive" aria-label={a11yHintString}>
            {a11yHintString}
          </VisuallyHidden>
          <View aria-label={a11yHintString}>{resultHintString}</View>
        </Toast>
      );
    }

    return null;
  };

  const instructionContent = getInstructionContent();
  return instructionContent ? instructionContent : null;
};
