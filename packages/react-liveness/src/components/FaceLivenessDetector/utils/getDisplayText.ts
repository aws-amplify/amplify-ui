import type {
  LivenessDisplayText,
  HintDisplayText,
  CameraDisplayText,
  InstructionDisplayText,
  StreamDisplayText,
  ErrorDisplayText,
} from '../displayText';
import { defaultLivenessDisplayText } from '../displayText';

interface LivenessDisplayTextInterface {
  hintDisplayText: Required<HintDisplayText>;
  cameraDisplayText: Required<CameraDisplayText>;
  instructionDisplayText: Required<InstructionDisplayText>;
  streamDisplayText: Required<StreamDisplayText>;
  errorDisplayText: Required<ErrorDisplayText>;
}

function getMergedDisplayText(
  overrideDisplayText: Partial<LivenessDisplayText>
): Partial<LivenessDisplayText> {
  const mergeField = (
    correctKey: keyof InstructionDisplayText,
    deprecatedKey: keyof InstructionDisplayText
  ) => {
    if (
      overrideDisplayText[correctKey] &&
      overrideDisplayText[correctKey] !== defaultLivenessDisplayText[correctKey]
    ) {
      return overrideDisplayText[correctKey];
    } else if (
      overrideDisplayText[deprecatedKey] &&
      overrideDisplayText[deprecatedKey] !==
        defaultLivenessDisplayText[correctKey]
    ) {
      return overrideDisplayText[deprecatedKey];
    } else {
      return defaultLivenessDisplayText[correctKey];
    }
  };

  return {
    photosensitivityWarningBodyText: mergeField(
      'photosensitivityWarningBodyText',
      'photosensitivyWarningBodyText'
    ),
    photosensitivityWarningHeadingText: mergeField(
      'photosensitivityWarningHeadingText',
      'photosensitivyWarningHeadingText'
    ),
    photosensitivityWarningInfoText: mergeField(
      'photosensitivityWarningInfoText',
      'photosensitivyWarningInfoText'
    ),
    photosensitivityWarningLabelText: mergeField(
      'photosensitivityWarningLabelText',
      'photosensitivyWarningLabelText'
    ),
  };
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
  const mergedDisplayText = getMergedDisplayText(overrideDisplayText ?? {});

  const displayText = {
    ...defaultLivenessDisplayText,
    ...overrideDisplayText,
    ...mergedDisplayText,
  };

  const {
    a11yVideoLabelText,
    cameraMinSpecificationsHeadingText,
    cameraMinSpecificationsMessageText,
    cameraNotFoundHeadingText,
    cameraNotFoundMessageText,
    cancelLivenessCheckText,
    connectionTimeoutHeaderText,
    connectionTimeoutMessageText,
    clientHeaderText,
    clientMessageText,
    errorLabelText,
    hintCanNotIdentifyText,
    hintCenterFaceText,
    hintCenterFaceInstructionText,
    hintFaceOffCenterText,
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
    hintCheckCompleteText,
    hintMatchIndicatorText,
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
    hintCheckCompleteText,
    hintIlluminationTooBrightText,
    hintIlluminationTooDarkText,
    hintIlluminationNormalText,
    hintHoldFaceForFreshnessText,
    hintCenterFaceText,
    hintCenterFaceInstructionText,
    hintFaceOffCenterText,
    hintMatchIndicatorText,
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
    connectionTimeoutHeaderText,
    connectionTimeoutMessageText,
    errorLabelText,
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
