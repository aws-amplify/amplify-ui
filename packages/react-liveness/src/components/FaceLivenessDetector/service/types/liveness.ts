/**
 * The props for the FaceLivenessDetector
 */
export interface FaceLivenessDetectorProps {
  /**
   * The sessionId as returned by CreateStreamingLivenessSession API
   */
  sessionId: string;

  /**
   * Callback that signals when the liveness session has completed analysis.
   * At this point a request can be made to GetFaceLivenessSessionResults.
   */
  onAnalysisComplete: () => Promise<void>;

  /**
   * The AWS region to stream the video to, for current regional support see the documentation here: FIXME LINK
   */
  region: string;

  /**
   * Callback called when the user cancels the flow
   */
  onUserCancel?: () => void;

  /**
   * Callback called when there is error occured on any step
   */
  onError?: (error: Error) => void;

  /**
   * Optional parameter for the disabling the Start/Get Ready Screen, default: false
   */
  disableInstructionScreen?: boolean;

  /**
   * Optional parameter for advanced options for the component
   */
  config?: FaceLivenessDetectorConfig;
}

export interface FaceLivenessDetectorConfig {
  /**
   * overrides the Wasm backend binary CDN path
   * default is https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@3.11.0/dist/.
   * When overriding this path ensure that the wasm version matches the version of @tensorflow/tfjs-backend-wasm installed by npm
   */
  binaryPath?: string;

  /**
   * overrides the Blazeface model and weights bin CDN URL
   * default is https://tfhub.dev/tensorflow/tfjs-model/blazeface/1/default/1/model.json?tfjs-format=file
   */
  faceModelUrl?: string;
}

/**
 * The coordiates of any bounding box
 */
export interface BoundingBox {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

/**
 * The details of the generated liveness oval
 */
export interface LivenessOvalDetails {
  flippedCenterX: number;
  centerX: number;
  centerY: number;
  width: number;
  height: number;
}

/**
 * The illumination states
 */
export enum IlluminationState {
  DARK = 'dark',
  BRIGHT = 'bright',
  NORMAL = 'normal',
}

/**
 * The detected face states with respect to the liveness oval
 */
export enum FaceMatchState {
  MATCHED = 'MATCHED',
  TOO_FAR = 'TOO FAR',
  TOO_CLOSE = 'TOO CLOSE',
  CANT_IDENTIFY = 'CANNOT IDENTIFY',
  FACE_IDENTIFIED = 'ONE FACE IDENTIFIED',
  TOO_MANY = 'TOO MANY FACES',
}
