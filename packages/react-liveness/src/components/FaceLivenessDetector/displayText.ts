export type HintDisplayText = {
  hintMoveFaceFrontOfCameraText?: string;
  hintTooManyFacesText?: string;
  hintFaceDetectedText?: string;
  hintCanNotIdentifyText?: string;
  hintTooCloseText?: string;
  hintTooFarText?: string;
  hintHoldFacePositionCountdownText?: string;
  hintConnectingText?: string;
  hintVerifyingText?: string;
  hintIlluminationTooBrightText?: string;
  hintIlluminationTooDarkText?: string;
  hintIlluminationNormalText?: string;
  hintHoldFaceForFreshnessText?: string;
};

export type CameraDisplayText = {
  cameraMinSpecificationsHeadingText?: string;
  cameraMinSpecificationsMessageText?: string;
  cameraNotFoundHeadingText?: string;
  cameraNotFoundMessageText?: string;
  retryCameraPermissionsText?: string;
};

export type InstructionDisplayText = {
  instructionsHeaderHeadingText?: string;
  instructionsHeaderBodyText?: string;
  instructionsBeginCheckText?: string;
  photosensitivyWarningHeadingText?: string;
  photosensitivyWarningBodyText?: string;
  photosensitivyWarningInfoText?: string;
  instructionListHeadingText?: string;
  goodFitCaptionText?: string;
  goodFitAltText?: string;
  tooFarCaptionText?: string;
  tooFarAltText?: string;
  instructionListStepOneText?: string;
  instructionListStepTwoText?: string;
  instructionListStepThreeText?: string;
  instructionListStepFourText?: string;
};

export type StreamDisplayText = {
  recordingIndicatorText?: string;
  cancelLivenessCheckText?: string;
};

export const defaultErrorDisplayText = {
  timeoutHeaderText: 'Time out',
  timeoutMessageText:
    "Face didn't fill oval within time limit. Try again and completely fill oval with face within 7 seconds.",
  faceDistanceHeaderText: 'Check failed during countdown',
  faceDistanceMessageText:
    'Avoid moving closer during countdown and ensure only one face is in front of camera.',
  clientHeaderText: 'Client error',
  clientMessageText: 'Check failed due to client issue',
  serverHeaderText: 'Server issue',
  serverMessageText: 'Cannot complete check due to server issue',
  landscapeHeaderText: 'Landscape orientation not supported',
  landscapeMessageText:
    'Rotate your device to portrait (vertical) orientation.',
  portraitMessageText:
    'Ensure your device remains in portrait (vertical) orientation for the check’s duration.',
  tryAgainText: 'Try again',
};

export const defaultLivenessDisplayText: Required<LivenessDisplayText> = {
  instructionsHeaderHeadingText: 'Liveness check',
  instructionsHeaderBodyText:
    'You will go through a face verification process to prove that you are a real person.',
  instructionsBeginCheckText: 'Begin check',
  photosensitivyWarningHeadingText: 'Photosensitivity warning',
  photosensitivyWarningBodyText:
    'This check displays colored lights. Use caution if you are photosensitive.',
  photosensitivyWarningInfoText:
    'A small percentage of individuals may experience epileptic seizures when exposed to colored lights. Use caution if you, or anyone in your family, have an epileptic condition.',
  instructionListHeadingText: 'Follow the instructions to complete the check:',
  goodFitCaptionText: 'Good fit',
  goodFitAltText:
    "Ilustration of a person's face, perfectly fitting inside of an oval.",
  tooFarCaptionText: 'Too far',
  tooFarAltText:
    "Illustration of a person's face inside of an oval; there is a gap between the perimeter of the face and the boundaries of the oval.",
  instructionListStepOneText:
    'When an oval appears, fill the oval with your face within 7 seconds.',
  instructionListStepTwoText: "Maximize your screen's brightness.",
  instructionListStepThreeText:
    'Make sure your face is not covered with sunglasses or a mask.',
  instructionListStepFourText:
    'Move to a well-lit place that is not in direct sunlight.',
  cameraMinSpecificationsHeadingText:
    'Camera does not meet minimum specifications',
  cameraMinSpecificationsMessageText:
    'Camera must support at least 320*240 resolution and 15 frames per second.',
  cameraNotFoundHeadingText: 'Camera not accessible.',
  cameraNotFoundMessageText:
    'Check that camera is connected and camera permissions are enabled in settings before retrying.',
  retryCameraPermissionsText: 'Retry',
  cancelLivenessCheckText: 'Cancel Liveness check',
  recordingIndicatorText: 'Rec',
  hintMoveFaceFrontOfCameraText: 'Move face in front of camera',
  hintTooManyFacesText: 'Ensure only one face is in front of camera',
  hintFaceDetectedText: 'Face detected',
  hintCanNotIdentifyText: 'Move face in front of camera',
  hintTooCloseText: 'Move back',
  hintTooFarText: 'Move closer',
  hintHoldFacePositionCountdownText: 'Hold face position during countdown',
  hintConnectingText: 'Connecting...',
  hintVerifyingText: 'Verifying...',
  hintIlluminationTooBrightText: 'Move to dimmer area',
  hintIlluminationTooDarkText: 'Move to brighter area',
  hintIlluminationNormalText: 'Lighting conditions normal',
  hintHoldFaceForFreshnessText: 'Hold still',
};

export type ErrorDisplayText = typeof defaultErrorDisplayText;

export interface LivenessDisplayText
  extends HintDisplayText,
    CameraDisplayText,
    InstructionDisplayText,
    StreamDisplayText {}
