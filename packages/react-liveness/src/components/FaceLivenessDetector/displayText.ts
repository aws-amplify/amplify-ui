export type HintDisplayText = {
  hintMoveFaceFrontOfCameraText?: string;
  hintTooManyFacesText?: string;
  hintFaceDetectedText?: string;
  hintCanNotIdentifyText?: string;
  hintTooCloseText?: string;
  hintTooFarText?: string;
  hintConnectingText?: string;
  hintVerifyingText?: string;
  hintIlluminationTooBrightText?: string;
  hintIlluminationTooDarkText?: string;
  hintIlluminationNormalText?: string;
  hintHoldFaceForFreshnessText?: string;
  hintCenterFaceText?: string;
};

export type CameraDisplayText = {
  cameraMinSpecificationsHeadingText?: string;
  cameraMinSpecificationsMessageText?: string;
  cameraNotFoundHeadingText?: string;
  cameraNotFoundMessageText?: string;
  retryCameraPermissionsText?: string;
  waitingCameraPermissionText?: string;
  a11yVideoLabelText?: string;
};

export type InstructionDisplayText = {
  goodFitCaptionText?: string;
  goodFitAltText?: string;
  photosensitivityWarningBodyText?: string;
  photosensitivityWarningHeadingText?: string;
  photosensitivityWarningInfoText?: string;
  photosensitivityWarningLabelText?: string;
  // TODO remove this typo in next MV bump
  photosensitivyWarningBodyText?: string;
  photosensitivyWarningHeadingText?: string;
  photosensitivyWarningInfoText?: string;
  photosensitivyWarningLabelText?: string;
  startScreenBeginCheckText?: string;
  tooFarCaptionText?: string;
  tooFarAltText?: string;
};

export type StreamDisplayText = {
  recordingIndicatorText?: string;
  cancelLivenessCheckText?: string;
};

export const defaultErrorDisplayText = {
  timeoutHeaderText: 'Time out',
  timeoutMessageText:
    "Face didn't fit inside oval in time limit. Try again and completely fill the oval with face in it.",
  faceDistanceHeaderText: 'Forward movement detected',
  faceDistanceMessageText: 'Avoid moving closer when connecting.',
  multipleFacesHeaderText: 'Multiple faces detected',
  multipleFacesMessageText:
    'Ensure only one face is present in front of the camera when connecting.',
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

export type ErrorDisplayTextFoo = typeof defaultErrorDisplayText;
export type ErrorDisplayText = Partial<ErrorDisplayTextFoo>;

export const defaultLivenessDisplayText: Required<LivenessDisplayText> = {
  cameraMinSpecificationsHeadingText:
    'Camera does not meet minimum specifications',
  cameraMinSpecificationsMessageText:
    'Camera must support at least 320*240 resolution and 15 frames per second.',
  cameraNotFoundHeadingText: 'Camera is not accessible.',
  cameraNotFoundMessageText:
    'Check that a camera is connected and there is not another application using the camera. You may have to go into settings to grant camera permissions and close out all instances of your browser and retry.',
  a11yVideoLabelText: 'Webcam for liveness check',
  cancelLivenessCheckText: 'Cancel Liveness check',
  goodFitCaptionText: 'Good fit',
  goodFitAltText:
    "Ilustration of a person's face, perfectly fitting inside of an oval.",
  hintCenterFaceText: 'Center your face',
  hintMoveFaceFrontOfCameraText: 'Move face in front of camera',
  hintTooManyFacesText: 'Ensure only one face is in front of camera',
  hintFaceDetectedText: 'Face detected',
  hintCanNotIdentifyText: 'Move face in front of camera',
  hintTooCloseText: 'Move back',
  hintTooFarText: 'Move closer',
  hintConnectingText: 'Connecting...',
  hintVerifyingText: 'Verifying...',
  hintIlluminationTooBrightText: 'Move to dimmer area',
  hintIlluminationTooDarkText: 'Move to brighter area',
  hintIlluminationNormalText: 'Lighting conditions normal',
  hintHoldFaceForFreshnessText: 'Hold still',
  photosensitivityWarningBodyText:
    'This check flashes different colors. Use caution if you are photosensitive.',
  photosensitivityWarningHeadingText: 'Photosensitivity warning',
  photosensitivityWarningInfoText:
    'Some people may experience epileptic seizures when exposed to colored lights. Use caution if you, or anyone in your family, have an epileptic condition.',
  photosensitivityWarningLabelText: 'More information about photosensitivity',
  photosensitivyWarningBodyText:
    'This check flashes different colors. Use caution if you are photosensitive.',
  photosensitivyWarningHeadingText: 'Photosensitivity warning',
  photosensitivyWarningInfoText:
    'Some people may experience epileptic seizures when exposed to colored lights. Use caution if you, or anyone in your family, have an epileptic condition.',
  photosensitivyWarningLabelText: 'More information about photosensitivity',
  retryCameraPermissionsText: 'Retry',
  recordingIndicatorText: 'Rec',
  startScreenBeginCheckText: 'Start video check',
  tooFarCaptionText: 'Too far',
  tooFarAltText:
    "Illustration of a person's face inside of an oval; there is a gap between the perimeter of the face and the boundaries of the oval.",
  waitingCameraPermissionText: 'Waiting for you to allow camera permission.',
  ...defaultErrorDisplayText,
};

export interface LivenessDisplayText
  extends HintDisplayText,
    CameraDisplayText,
    InstructionDisplayText,
    ErrorDisplayText,
    StreamDisplayText {}
