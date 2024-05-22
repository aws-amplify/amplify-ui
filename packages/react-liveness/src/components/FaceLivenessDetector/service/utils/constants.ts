// Face distance is calculated as pupilDistance / ovalWidth.
// The further away you are from the camera the distance between your pupils will decrease, thus lowering the threshold values.
// Constants from science team to determine ocular distance (space between eyes)
export const PUPIL_DISTANCE_WEIGHT = 2.0;
export const FACE_HEIGHT_WEIGHT = 1.8;

// Constants from science team to find face match percentage
export const FACE_MATCH_RANGE_MIN = 0;
export const FACE_MATCH_RANGE_MAX = 1;
export const FACE_MATCH_WEIGHT_MIN = 0.25;
export const FACE_MATCH_WEIGHT_MAX = 0.75;

export const OVAL_HEIGHT_WIDTH_RATIO = 1.618;

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

interface ChallengeType {
  Type: string;
  Version: string;
}

export const FACE_MOVEMENT_AND_LIGHT_CHALLENGE: ChallengeType = {
  Type: 'FaceMovementAndLightChallenge',
  Version: '1.0.0',
};

export const FACE_MOVEMENT_CHALLENGE: ChallengeType = {
  Type: 'FaceMovementChallenge',
  Version: '1.0.0',
};

export const SUPPORTED_CHALLENGES: ChallengeType[] = [
  FACE_MOVEMENT_AND_LIGHT_CHALLENGE,
  FACE_MOVEMENT_CHALLENGE,
];

export const DEFAULT_WS_CONNECTION_TIMEOUT_MS = 2000;
