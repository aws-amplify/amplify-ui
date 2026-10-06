/**
 * The liveness error states
 */

export const LivenessErrorState = {
  CONNECTION_TIMEOUT: 'CONNECTION_TIMEOUT',
  TIMEOUT: 'TIMEOUT',
  RUNTIME_ERROR: 'RUNTIME_ERROR',
  FRESHNESS_TIMEOUT: 'FRESHNESS_TIMEOUT',
  SERVER_ERROR: 'SERVER_ERROR',
  CAMERA_FRAMERATE_ERROR: 'CAMERA_FRAMERATE_ERROR',
  CAMERA_ACCESS_ERROR: 'CAMERA_ACCESS_ERROR',
  FACE_DISTANCE_ERROR: 'FACE_DISTANCE_ERROR',
  /**
   * @deprecated No longer emitted. Mobile landscape orientation is supported,
   * so a check is never failed for being in landscape. Retained so that
   * consumers switching on `ErrorState` keep compiling.
   */
  MOBILE_LANDSCAPE_ERROR: 'MOBILE_LANDSCAPE_ERROR',
  MULTIPLE_FACES_ERROR: 'MULTIPLE_FACES_ERROR',
  DEFAULT_CAMERA_NOT_FOUND_ERROR: 'DEFAULT_CAMERA_NOT_FOUND_ERROR',
} as const;

export type ErrorState = keyof typeof LivenessErrorState;
