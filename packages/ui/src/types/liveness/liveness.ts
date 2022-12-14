/**
 * The props for the FaceLivenessDetector
 */
export interface FaceLivenessDetectorProps {
  /**
   * The sessionId as returned by CreateStreamingLivenessSession API
   */
  sessionId: string;

  /**
   * Callback called when the API request to Liveness for GetStreamingLivenessSessionResults
   * is to be made. This callback is required to be passed to
   * proxy the call to Liveness through their backend to encapsulate business
   * logic on confidence scores and not expose the score on client
   *
   */
  onGetLivenessDetection: (sessionId: string) => Promise<GetLivenessResult>;

  /**
   * Callback called when the user denies any required permissions
   */
  onUserPermissionDenied?: (error: Error) => void;

  /**
   * Callback called when the flow times out after retry attempts
   */
  onUserTimeout?: () => void;

  /**
   * Callback called when the user cancels the flow
   */
  onUserCancel?: (event?: CustomEvent) => void;

  /**
   * Callback called when there is error occured on any step
   */
  onError?: (error: Error) => void;

  /**
   * Callback called when the flow completes successfully
   */
  onSuccess?: () => void;

  /**
   * Enable analytical events for the flow via Amplify Analytics
   * NOTE: The Amplify Analytics category needs to be configured for this to work
   * read more here: https://docs.amplify.aws/lib/analytics/getting-started/q/platform/js/
   *
   * @default false
   */
  enableAnalytics?: boolean;

  /**
   * Optional parameter for the disabling the Start/Get Ready Screen, default: false
   */
  disableStartScreen?: boolean;
}

/**
 * The object to be returned as part of the onGetLivenessDetection callback
 */
export interface GetLivenessResult {
  isLive: boolean;
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
  TOO_LEFT = 'TOO LEFT',
  TOO_RIGHT = 'TOO RIGHT',
  TOO_FAR = 'TOO FAR',
  TOO_CLOSE = 'TOO CLOSE',
  CANT_IDENTIFY = 'CANNOT IDENTIFY',
  FACE_IDENTIFIED = 'ONE FACE IDENTIFIED',
  TOO_MANY = 'TOO MANY FACES',
}

/**
 * The liveness error states
 */
export enum LivenessErrorState {
  TIMEOUT = 'TIMEOUT',
  RUNTIME_ERROR = 'RUNTIME_ERROR',
  FRESHNESS_TIMEOUT = 'FRESHNESS_TIMEOUT',
  SERVER_ERROR = 'SERVER_ERROR',
  CAMERA_FRAMERATE_ERROR = 'CAMERA_FRAMERATE_ERROR',
  CAMERA_ACCESS_ERROR = 'CAMERA_ACCESS_ERROR',
  FACE_DISTANCE_TIMEOUT = 'FACE_DISTANCE_TIMEOUT',
}
