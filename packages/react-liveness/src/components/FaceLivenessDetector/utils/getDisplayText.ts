import {
  defaultLivenessDisplayText,
  LivenessDisplayText,
  HintDisplayText,
  CameraDisplayText,
  InstructionDisplayText,
  StreamDisplayText,
  ErrorDisplayText,
} from '../displayText';

interface LivenessDisplayTextInterface {
  hintDisplayText: Required<HintDisplayText>;
  cameraDisplayText: Required<CameraDisplayText>;
  instructionDisplayText: Required<InstructionDisplayText>;
  streamDisplayText: Required<StreamDisplayText>;
  errorDisplayText: Required<ErrorDisplayText>;
}

/**
 * Merges optional displayText prop with
 * defaultLivenessDisplayText and returns more bite size portions to pass
 * down to child components of FaceLivenessDetector.
 * @param overrideDisplayText
 * @returns hintDisplayText, cameraDisplayText, instructionDisplayText, cancelLivenessCheckText
 */
export function getDisplayText(
  overrideDisplayText: LivenessDisplayText | undefined
): LivenessDisplayTextInterface {
  const displayText = {
    ...defaultLivenessDisplayText,
    ...overrideDisplayText,
  };

  const {
    instructionsHeaderHeadingText,
    instructionsHeaderBodyText,
    instructionsBeginCheckText,
    photosensitivyWarningHeadingText,
    photosensitivyWarningBodyText,
    photosensitivyWarningInfoText,
    instructionListHeadingText,
    goodFitCaptionText,
    goodFitAltText,
    tooFarCaptionText,
    tooFarAltText,
    instructionListStepOneText,
    instructionListStepTwoText,
    instructionListStepThreeText,
    instructionListStepFourText,
    cameraMinSpecificationsHeadingText,
    cameraMinSpecificationsMessageText,
    cameraNotFoundHeadingText,
    cameraNotFoundMessageText,
    retryCameraPermissionsText,
    cancelLivenessCheckText,
    recordingIndicatorText,
    hintMoveFaceFrontOfCameraText,
    hintTooManyFacesText,
    hintFaceDetectedText,
    hintCanNotIdentifyText,
    hintTooCloseText,
    hintTooFarText,
    hintHoldFacePositionCountdownText,
    hintConnectingText,
    hintVerifyingText,
    hintIlluminationTooBrightText,
    hintIlluminationTooDarkText,
    hintIlluminationNormalText,
    hintHoldFaceForFreshnessText,
    timeoutHeaderText,
    timeoutMessageText,
    faceDistanceHeaderText,
    faceDistanceMessageText,
    clientHeaderText,
    clientMessageText,
    serverHeaderText,
    serverMessageText,
    landscapeHeaderText,
    landscapeMessageText,
    portraitMessageText,
    tryAgainText,
  } = displayText;

  const hintDisplayText: Required<HintDisplayText> = {
    hintMoveFaceFrontOfCameraText,
    hintTooManyFacesText,
    hintFaceDetectedText,
    hintCanNotIdentifyText,
    hintTooCloseText,
    hintTooFarText,
    hintHoldFacePositionCountdownText,
    hintConnectingText,
    hintVerifyingText,
    hintIlluminationTooBrightText,
    hintIlluminationTooDarkText,
    hintIlluminationNormalText,
    hintHoldFaceForFreshnessText,
  };

  const cameraDisplayText: Required<CameraDisplayText> = {
    cameraMinSpecificationsHeadingText,
    cameraMinSpecificationsMessageText,
    cameraNotFoundHeadingText,
    cameraNotFoundMessageText,
    retryCameraPermissionsText,
  };

  const instructionDisplayText: Required<InstructionDisplayText> = {
    instructionsHeaderHeadingText,
    instructionsHeaderBodyText,
    instructionsBeginCheckText,
    photosensitivyWarningHeadingText,
    photosensitivyWarningBodyText,
    photosensitivyWarningInfoText,
    instructionListHeadingText,
    goodFitCaptionText,
    goodFitAltText,
    tooFarCaptionText,
    tooFarAltText,
    instructionListStepOneText,
    instructionListStepTwoText,
    instructionListStepThreeText,
    instructionListStepFourText,
  };

  const streamDisplayText: Required<StreamDisplayText> = {
    cancelLivenessCheckText,
    recordingIndicatorText,
  };

  const errorDisplayText: Required<ErrorDisplayText> = {
    timeoutHeaderText,
    timeoutMessageText,
    faceDistanceHeaderText,
    faceDistanceMessageText,
    clientHeaderText,
    clientMessageText,
    serverHeaderText,
    serverMessageText,
    landscapeHeaderText,
    landscapeMessageText,
    portraitMessageText,
    tryAgainText,
  };

  return {
    hintDisplayText,
    cameraDisplayText,
    instructionDisplayText,
    streamDisplayText,
    errorDisplayText,
  };
}
