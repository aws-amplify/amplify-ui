export const FACE_LIVENESS_DETECTOR_PARAMETERS = [
  {
    name: `sessionID`,
    description: 'The sessionID as returned by CreateFaceLivenessSession API.',
    type: `String`,
  },
  {
    name: `region`,
    description:
      'The AWS region to stream the video to, this should match the region you called the CreateFaceLivenessSession API in.',
    type: `String`,
  },
  {
    name: `credentialsProvider`,
    description: 'An optional paramter that provides AWS Credentials',
    type: `AWSCredentialsProvider?`,
  },
  {
    name: `disableStartView`,
    description:
      'Optional parameter for the disabling the intial view with instructions, default = false.',
    type: `Boolean`,
  },
  {
    name: `onComplete`,
    description:
      'Callback that signals when the liveness session has completed.',
    type: 'Action; equivalent to () -> Void',
  },
  {
    name: `onError`,
    description:
      'Callback that signals when the liveness session has returned an error.',
    type: 'Consumer<FaceLivenessDetectionException>; equivalent to (Exception) -> Void',
  },
];

export const FACE_LIVENESS_DETECTOR_ERROR_STATES = [
  {
    name: `FaceLivenessDetectionException`,
    description: 'An unknown error occurred, retry the face liveness check.',
    type: `Error`,
  },
  {
    name: `FaceLivenessDetectionException.SessionNotFoundException`,
    description: 'Session not found.',
    type: `Error`,
  },
  {
    name: `FaceLivenessDetectionException.AccessDeniedException`,
    description: 'Not authorized to perform a face liveness check.',
    type: `Error`,
  },
  {
    name: `FaceLivenessDetectionException.CameraPermissionDeniedException`,
    description: 'The camera permission has not been granted.',
    type: `Error`,
  },
  {
    name: `FaceLivenessDetectionException.SessionTimedOutException`,
    description:
      'The session timed out and did not receive response from server within the time limit.',
    type: `Error`,
  },
  {
    name: `FaceLivenessDetectionException.UserCancelledException`,
    description: 'The user cancelled the face liveness check.',
    type: `Error`,
  },
];
