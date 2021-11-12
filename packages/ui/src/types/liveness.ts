/**
 * The props for the LivenessFlow
 */
export interface LivenessFlowProps {
  /**
   * The sessionId as returned by StartLivenessDetection API
   */
  sessionId: string;

  /**
   * The clientActionDocument as returned by StartLivenessDetection API
   */
  clientActionDocument: string;

  /**
   * Callback called when the API request to Liveness for GetLivenessDetection
   * is to be made. This callback is required to be passed to
   * proxy the call to Liveness through their backend to encapsulate business
   * logic on confidence scores and not expose the score on client
   *
   */
  onGetLivenessDetection: (
    sessionId: string
  ) => Promise<GetLivenessDetectionCallbackResponse>;

  /**
   * Callback called when the user denies any required permissions
   */
  onUserPermissionDeined?: () => void;

  /**
   * Callback called when the flow times out after retry attempts
   */
  onUserTimeout?: () => void;

  /**
   * Callback called when the user exists out of the flow
   */
  onUserExit?: () => void;

  /**
   * Callback called when there is error occured on any step
   */
  onError?: (error: Error) => void;

  /**
   * Callback called when the flow completes successfully
   */
  onSuccess?: () => void;
}

export enum LivenessStatus {
  SUCCESS,
  FAILURE,
}

/**
 * The object to be returned as part of the onGetLivenessDetection callback
 */
export interface GetLivenessDetectionCallbackResponse {
  isLive: LivenessStatus;
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
export enum Illumination {
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
}
