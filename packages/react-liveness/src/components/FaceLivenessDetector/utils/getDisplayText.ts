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
    cameraMinSpecificationsHeadingText,
    cameraMinSpecificationsMessageText,
    cameraNotFoundHeadingText,
    cameraNotFoundMessageText,
    cancelLivenessCheckText,
    clientHeaderText,
    clientMessageText,
    faceDistanceHeaderText,
    faceDistanceMessageText,
    goodFitCaptionText,
    goodFitAltText,
    hintMoveFaceFrontOfCameraText,
    hintTooManyFacesText,
    hintFaceDetectedText,
    hintCanNotIdentifyText,
    hintCenterFaceText,
    hintConnectingText,
    hintTooCloseText,
    hintTooFarText,
    hintVerifyingText,
    hintIlluminationTooBrightText,
    hintIlluminationTooDarkText,
    hintIlluminationNormalText,
    hintHoldFaceForFreshnessText,
    instructionsHeaderHeadingText,
    instructionsHeaderBodyText,
    instructionsBeginCheckText,
    landscapeHeaderText,
    landscapeMessageText,
    multipleFacesHeaderText,
    multipleFacesMessageText,
    photosensitivityWarningLabelText,
    photosensitivityWarningHeadingText,
    photosensitivityWarningBodyText,
    photosensitivityWarningInfoText,
    portraitMessageText,
    recordingIndicatorText,
    retryCameraPermissionsText,
    serverHeaderText,
    serverMessageText,
    startScreenBeginCheckText,
    tooFarCaptionText,
    tooFarAltText,
    tryAgainText,
    timeoutHeaderText,
    timeoutMessageText,
    waitingCameraPermissionText,
  } = displayText;

  const hintDisplayText: Required<HintDisplayText> = {
    hintMoveFaceFrontOfCameraText,
    hintTooManyFacesText,
    hintFaceDetectedText,
    hintCanNotIdentifyText,
    hintTooCloseText,
    hintTooFarText,
    hintConnectingText,
    hintVerifyingText,
    hintIlluminationTooBrightText,
    hintIlluminationTooDarkText,
    hintIlluminationNormalText,
    hintHoldFaceForFreshnessText,
    hintCenterFaceText,
  };

  const cameraDisplayText: Required<CameraDisplayText> = {
    cameraMinSpecificationsHeadingText,
    cameraMinSpecificationsMessageText,
    cameraNotFoundHeadingText,
    cameraNotFoundMessageText,
    retryCameraPermissionsText,
    waitingCameraPermissionText,
  };

  const instructionDisplayText: Required<InstructionDisplayText> = {
    goodFitCaptionText,
    goodFitAltText,
    instructionsHeaderHeadingText,
    instructionsHeaderBodyText,
    instructionsBeginCheckText,
    photosensitivityWarningLabelText,
    photosensitivityWarningHeadingText,
    photosensitivityWarningBodyText,
    photosensitivityWarningInfoText,
    tooFarCaptionText,
    tooFarAltText,
    startScreenBeginCheckText,
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
    multipleFacesHeaderText,
    multipleFacesMessageText,
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
