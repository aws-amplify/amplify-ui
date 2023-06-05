export const FACE_LIVENESS_DETECTOR_PROPS = [
  {
    name: `sessionId`,
    description: 'The sessionId as returned by CreateFaceLivenessSession API.',
    type: `string`,
  },
  {
    name: `onAnalysisComplete`,
    description:
      'Callback that signals when the liveness session has completed analysis. At this point a request can be made to GetFaceLivenessSessionResults.',
    type: `() => Promise<void>`,
  },
  {
    name: `region`,
    description:
      'The AWS region to stream the video to, this should match the region you called the CreateFaceLivenessSession API in.',
    type: `string`,
  },
  {
    name: `onUserCancel?`,
    description: 'Callback called when the user cancels the flow.',
    type: `() => void`,
  },
  {
    name: `onError?`,
    description: 'Callback called when there is error occured on any step.',
    type: `(error: Error) => void`,
  },
  {
    name: `disableInstructionScreen?`,
    description:
      'Optional parameter for the disabling the Start/Get Ready Screen, default: false.',
    type: `boolean`,
  },
  {
    name: `components?`,
    description: 'Optional object for overriding some UI components.',
    type: 'FaceLivenessDetectorComponents',
  },
  {
    name: `displayText?`,
    description: 'Optional object for internationalizing strings.',
    type: 'LivenessDisplayText',
  },
  {
    name: `config?`,
    description: 'Optional parameter for advanced options for the component.',
    type: 'FaceLivenessDetectorConfig',
  },
];

export const FACE_LIVENESS_DETECTOR_COMPONENTS = [
  {
    name: `Header?`,
    description: 'Overrides the rendered component in the header section.',
    type: `React.ComponentType`,
  },
  {
    name: `PhotosensitiveWarning?`,
    description:
      'Overrides the rendered component for the photosensitivity warning.',
    type: `React.ComponentType`,
  },
  {
    name: `Instructions?`,
    description:
      'Overrides the rendered component for the instruction section.',
    type: `React.ComponentType`,
  },
  {
    name: `ErrorView?`,
    description: 'Overrides the rendered component for error view.',
    type: `React.ComponentType`,
  },
];

export const FACE_LIVENESS_DETECTOR_CONFIG = [
  {
    name: `binaryPath?`,
    description:
      'Overrides the WASM backend binary CDN path, the default is https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@3.11.0/dist/. When overriding this path ensure that the wasm version matches the version of @tensorflow/tfjs-backend-wasm installed by npm.',
    type: `string`,
  },
  {
    name: `faceModelUrl?`,
    description:
      'Overrides the Blazeface model and weights bin CDN URL default is https://tfhub.dev/tensorflow/tfjs-model/blazeface/1/default/1/model.json?tfjs-format=file.',
    type: `string`,
  },
];

export const FACE_LIVENESS_DETECTOR_ERROR_STATES = [
  {
    name: `RUNTIME_ERROR`,
    description: 'Indicates an error that occurs in the component runtime.',
    type: `Error`,
  },
  {
    name: `SERVER_ERROR`,
    description:
      'Indicates an error occurred from the Rekognition streaming API or in the onAnalysisComplete callback.',
    type: `Error`,
  },
  {
    name: `TIMEOUT`,
    description:
      'Indicates a timeout occurred when user attempted a liveness check.',
    type: `Error`,
  },
  {
    name: `FACE_DISTANCE_ERROR`,
    description:
      'Indicates that the user moved their face too close to the camera before the check started.',
    type: `Error`,
  },
  {
    name: `CAMERA_ACCESS_ERROR`,
    description:
      "Indicates that an error occurred when attempting to access the user's camera, this could be because they did not allow camera permissions in the browser.",
    type: `Error`,
  },
  {
    name: `CAMERA_FRAMERATE_ERROR`,
    description:
      'Indicates that the provided camera does not meet the minimum framerate requirements for a liveness check.',
    type: `Error`,
  },
  {
    name: `FRESHNESS_TIMEOUT`,
    description:
      'Indicates that the component timed out when attempting attempting to determine freshness of the video via colors flashing on the screen.',
    type: `Error`,
  },
  {
    name: `MOBILE_LANDSCAPE_ERROR`,
    description:
      'Indicates that the user attempted to switch to using landscape mode which is not supported.',
    type: `Error`,
  },
];
