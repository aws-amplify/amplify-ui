import type { DisplayTextTemplate } from '@aws-amplify/ui';

export type HintDisplayText = {
  hintMoveFaceFrontOfCameraText?: string;
  hintTooManyFacesText?: string;
  hintFaceDetectedText?: string;
  hintCanNotIdentifyText?: string;
  hintTooCloseText?: string;
  hintTooFarText?: string;
  hintConnectingText?: string;
  hintVerifyingText?: string;
  hintCheckCompleteText?: string;
  hintIlluminationTooBrightText?: string;
  hintIlluminationTooDarkText?: string;
  hintIlluminationNormalText?: string;
  hintHoldFaceForFreshnessText?: string;
  hintCenterFaceText?: string;
  hintCenterFaceInstructionText?: string;
  hintFaceOffCenterText?: string;
  hintMatchIndicatorText?: string;
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
  startScreenBeginCheckText?: string;
  tooFarCaptionText?: string;
  tooFarAltText?: string;

  // TODO remove this typo in next MV bump
  /**
   * @deprecated `photosensitivyWarningBodyText` has been replaced with `photosensitivityWarningBodyText` amd will be removed in a future major version of `@aws-amplify/ui-react-liveness`
   */
  photosensitivyWarningBodyText?: string;
  /**
   * @deprecated `photosensitivyWarningHeadingText` has been replaced with `photosensitivityWarningHeadingText` amd will be removed in a future major version of `@aws-amplify/ui-react-liveness`
   */
  photosensitivyWarningHeadingText?: string;
  /**
   * @deprecated `photosensitivyWarningInfoText` has been replaced with `photosensitivityWarningInfoText` amd will be removed in a future major version of `@aws-amplify/ui-react-liveness`
   */
  photosensitivyWarningInfoText?: string;
  /**
   * @deprecated `photosensitivyWarningLabelText` has been replaced with `photosensitivityWarningLabelText` amd will be removed in a future major version of `@aws-amplify/ui-react-liveness`
   */
  photosensitivyWarningLabelText?: string;
};

export type StreamDisplayText = {
  recordingIndicatorText?: string;
  cancelLivenessCheckText?: string;
};

export const defaultErrorDisplayText = {
  errorLabelText: 'Error',
  connectionTimeoutHeaderText: 'Connection time out',
  connectionTimeoutMessageText: 'Connection has timed out.',
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

export type ErrorDisplayText = Partial<typeof defaultErrorDisplayText>;

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
  hintCenterFaceInstructionText:
    'Instruction: Before starting the check, make sure your camera is at the center top of your screen and center your face to the camera. When the check starts an oval will show up in the center. You will be prompted to move forward into the oval and then prompted to hold still. After holding still for a few seconds, you should hear check complete.',
  hintFaceOffCenterText:
    'Face is not in the oval, center your face to the camera.',
  hintMoveFaceFrontOfCameraText: 'Move face in front of camera',
  hintTooManyFacesText: 'Ensure only one face is in front of camera',
  hintFaceDetectedText: 'Face detected',
  hintCanNotIdentifyText: 'Move face in front of camera',
  hintTooCloseText: 'Move back',
  hintTooFarText: 'Move closer',
  hintConnectingText: 'Connecting...',
  hintVerifyingText: 'Verifying...',
  hintCheckCompleteText: 'Check complete',
  hintIlluminationTooBrightText: 'Move to dimmer area',
  hintIlluminationTooDarkText: 'Move to brighter area',
  hintIlluminationNormalText: 'Lighting conditions normal',
  hintHoldFaceForFreshnessText: 'Hold still',
  hintMatchIndicatorText: '50% completed. Keep moving closer.',
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

export type LivenessDisplayText = DisplayTextTemplate<
  HintDisplayText &
    CameraDisplayText &
    InstructionDisplayText &
    ErrorDisplayText &
    StreamDisplayText
>;
