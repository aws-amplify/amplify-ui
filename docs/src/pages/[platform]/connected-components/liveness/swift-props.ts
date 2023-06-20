export const FACE_LIVENESS_DETECTOR_PARAMETERS = [
  {
    name: `sessionID`,
    description: 'The sessionID as returned by CreateFaceLivenessSession API.',
    type: `String`,
  },
  {
    name: `credentialsProvider`,
    description: 'An optional paramter that provides AWS Credentials',
    type: `AWSCredentialsProvider`,
  },
  {
    name: `region`,
    description:
      'The AWS region to stream the video to, this should match the region you called the CreateFaceLivenessSession API in.',
    type: `String`,
  },
  {
    name: `disableStartView`,
    description:
      'Optional parameter for the disabling the intial view with instructions, default: false.',
    type: `Bool`,
  },
  {
    name: `isPresented`,
    description:
      'A Binding parameter for whether the LivenessDetectorView is presented.',
    type: 'Binding<Bool>',
  },
  {
    name: `onCompletion`,
    description:
      'Callback that signals when the liveness session has completed and if a error occurred.',
    type: '(Result<Void, FaceLivenessDetectionError>) -> Void',
  },
];

export const FACE_LIVENESS_DETECTOR_ERROR_STATES = [
  {
    name: `.unknown`,
    description: 'An unknown error occurred.',
    type: `Error`,
  },
  {
    name: `.sessionNotFound`,
    description: 'Session not found.',
    type: `Error`,
  },
  {
    name: `.sessionTimedOut`,
    description:
      'The session timed out and did not receive response from server within the time limit.',
    type: `Error`,
  },
  {
    name: `.faceInOvalMatchExceededTimeLimitError`,
    description:
      'The face did not match within oval in the required time limit.',
    type: `Error`,
  },
  {
    name: `.accessDenied`,
    description: 'Not authorized to perform a face liveness check.',
    type: `Error`,
  },
  {
    name: `.cameraPermissionDenied`,
    description: 'The camera permission has not been granted.',
    type: `Error`,
  },
  {
    name: `.userCancelled`,
    description: 'The user cancelled the face liveness check.',
    type: `Error`,
  },
  {
    name: `.socketClosed`,
    description: 'The web socket connection unexpectedly closed.',
    type: `Error`,
  },
  {
    name: `.invalidRegion`,
    description: 'The region provided is invalid.',
    type: `Error`,
  },
  {
    name: `.validation`,
    description:
      'The input fails to satisfy the constraints specified by the service.',
    type: `Error`,
  },
  {
    name: `.internalServer`,
    description:
      'An Unexpected error during processing of the request by the service.',
    type: `Error`,
  },
  {
    name: `.throttling`,
    description:
      'A request was denied due to request throttling by the service.',
    type: `Error`,
  },
  {
    name: `.serviceQuotaExceeded`,
    description:
      'This error cccurs when a request would cause a service quota to be exceeded.',
    type: `Error`,
  },
  {
    name: `.serviceUnavailable`,
    description:
      'Service-wide throttling to recover from an operational event or service is not able to scale.',
    type: `Error`,
  },
];
