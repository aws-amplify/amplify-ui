// Face distance is calculated as pupilDistance / ovalWidth.
// The further away you are from the camera the distance between your pupils will decrease, thus lowering the threshold values.
// These FACE_DISTANCE_THRESHOLD values are determined by the science team and should only be changed with their approval.
// We want to ensure at the start of a  check that the user's pupilDistance/ovalWidth is below FACE_DISTANCE_THRESHOLD to ensure that they are starting
//  a certain distance away from the camera.
export const FACE_DISTANCE_THRESHOLD = 0.32;
export const REDUCED_THRESHOLD = 0.4;
export const REDUCED_THRESHOLD_MOBILE = 0.37;

// Constants from science team to determine ocular distance (space between eyes)
export const PUPIL_DISTANCE_WEIGHT = 2.0;
export const FACE_HEIGHT_WEIGHT = 1.8;

// Constants from science team to find face match percentage
export const FACE_MATCH_RANGE_MIN = 0;
export const FACE_MATCH_RANGE_MAX = 1;
export const FACE_MATCH_WEIGHT_MIN = 0.25;
export const FACE_MATCH_WEIGHT_MAX = 0.75;

export const WS_CLOSURE_CODE = {
  SUCCESS_CODE: 1000,
  DEFAULT_ERROR_CODE: 4000,
  FACE_FIT_TIMEOUT: 4001,
  USER_CANCEL: 4003,
  RUNTIME_ERROR: 4005,
  USER_ERROR_DURING_CONNECTION: 4007,
};

// number in milliseconds to record into each video chunk.
// see https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/start#timeslice
export const TIME_SLICE = 1000;

// in MS, the rate at which colors are rendered/checked
export const TICK_RATE = 10;

/**
 * The number of seconds before the presigned URL expires.
 * Used to override aws sdk default value of 60
 */
export const REQUEST_EXPIRY = 299;

/**
 * The maximum time in milliseconds that the connection phase of a request
 * may take before the connection attempt is abandoned.
 */
export const CONNECTION_TIMEOUT = 10_000;

/**
 * Indicates connection success
 */
export const SUCCESS_STATUS_CODE = 200;

export const FACE_MOVEMENT_CHALLENGE_NAME =
  'FaceMovementAndLightChallenge_1.0.0';

export const DEFAULT_WS_CONNECTION_TIMEOUT_MS = 2000;
