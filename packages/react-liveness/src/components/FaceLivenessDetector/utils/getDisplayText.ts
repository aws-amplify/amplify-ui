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
    a11yVideoLabelText,
    cameraMinSpecificationsHeadingText,
    cameraMinSpecificationsMessageText,
    cameraNotFoundHeadingText,
    cameraNotFoundMessageText,
    cancelLivenessCheckText,
    clientHeaderText,
    clientMessageText,
    hintCanNotIdentifyText,
    hintCenterFaceText,
    hintConnectingText,
    hintFaceDetectedText,
    hintHoldFaceForFreshnessText,
    hintIlluminationNormalText,
    hintIlluminationTooBrightText,
    hintIlluminationTooDarkText,
    hintMoveFaceFrontOfCameraText,
    hintTooManyFacesText,
    hintTooCloseText,
    hintTooFarText,
    hintVerifyingText,
    faceDistanceHeaderText,
    faceDistanceMessageText,
    goodFitCaptionText,
    goodFitAltText,
    landscapeHeaderText,
    landscapeMessageText,
    multipleFacesHeaderText,
    multipleFacesMessageText,
    photosensitivityWarningBodyText,
    photosensitivityWarningHeadingText,
    photosensitivityWarningInfoText,
    photosensitivityWarningLabelText,
    photosensitivyWarningBodyText,
    photosensitivyWarningHeadingText,
    photosensitivyWarningInfoText,
    photosensitivyWarningLabelText,
    portraitMessageText,
    retryCameraPermissionsText,
    recordingIndicatorText,
    serverHeaderText,
    serverMessageText,
    startScreenBeginCheckText,
    timeoutHeaderText,
    timeoutMessageText,
    tooFarCaptionText,
    tooFarAltText,
    tryAgainText,
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
    a11yVideoLabelText,
  };

  const instructionDisplayText: Required<InstructionDisplayText> = {
    photosensitivityWarningBodyText,
    photosensitivityWarningHeadingText,
    photosensitivityWarningInfoText,
    photosensitivityWarningLabelText,
    photosensitivyWarningBodyText,
    photosensitivyWarningHeadingText,
    photosensitivyWarningInfoText,
    photosensitivyWarningLabelText,
    goodFitCaptionText,
    goodFitAltText,
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
