export const defaultTexts = {
  // Get Ready Screen
  LIVENESS_BEGIN_CHECK: 'Begin check',
  LIVENESS_WARNING: 'Photosensitivity warning',
  LIVENESS_WARNING_CONTENT:
    'This check displays colored lights. Use caution if you are photosensitive.',
  LIVENESS_CHECK_DESCRIPTION: 'Follow the instructions to complete the check: ',
  LIVENESS_INSTRUCTION_COVER:
    'Make sure your face is not covered with sunglasses or a mask.',
  LIVENESS_INSTRUCTION_LIGHT:
    'Move to a well-lit place that is not in direct sunlight.',
  LIVENESS_INSTRUCTION_BRIGHTNESS:
    'Set your screen display to maximum brightness.',
  LIVENESS_INSTRUCTION_OVAL:
    'When an oval appears, completely fill the oval with your face within 8 seconds.',
  LIVENESS_WARNING_POPOVER:
    'A small percentage of individuals may experience epileptic seizures when exposed to colored lights. Use caution if you, or anyone in your family, have an epileptic condition.',

  // Camera Permissions
  LIVENESS_NO_CAMERA_DETECTED_DESCRIPTION:
    'Make sure camera is connected, and camera permissions allowed in system settings, before retrying.',
  LIVENESS_NO_CAMERA_DETECTED: 'Camera not accessible.',
  LIVENESS_NO_CAMERA_MIN_SPEC: 'Camera does not meet minimum specifications',
  LIVENESS_NO_CAMERA_MIN_SPEC_DESCRIPTION:
    'Camera must support at least 320*240 resolution and 15 frames per second.',
  LIVENESS_NO_CAMERA_CTA: 'Retry',

  // Liveness Flow
  LIVENESS_CHECK_CONNECTING: 'Connecting...',
  LIVENESS_HINT_NO_FACE_DETECTED: 'Move face in front of camera',
  LIVENESS_INSTRUCTION_FIT_OVAL: 'Hold face position during countdown',
  LIVENESS_INSTRUCTION_HOLD_OVAL: 'Hold still',
  LIVENESS_VERIFYING: 'Verifying...',
  LIVENESS_CHECK_FAILED: 'Check unsuccessful',
  LIVENESS_CHECK_SUCCEEDED: 'Check successful',
  LIVENESS_TRY_AGAIN: 'Try again',

  // Illumination State
  'Lighting conditions normal': 'Lighting conditions normal',
  LIVENESS_HINT_LIGHTING_BRIGHT: 'Move to dimmer area',
  LIVENESS_HINT_LIGHTING_DARK: 'Move to brighter area',

  // Face Match State
  LIVENESS_HINT_FACE_TOO_CLOSE: 'Move back',
  LIVENESS_HINT_FACE_TOO_FAR: 'Move closer',
  LIVENESS_HINT_FACE_TOO_LEFT: 'Move face right',
  LIVENESS_HINT_FACE_TOO_RIGHT: 'Move face left',
  LIVENESS_HINT_MOVE_FACE_INSTRUCTION: 'Move face to fit in oval',

  // Error messages
  LIVENESS_ERROR: 'Check encountered an error',
  LIVENESS_TIMEOUT:
    "Face didn't fill oval within time limit. Try again and completely fill oval with face within 8 seconds.",
  LIVENESS_FACE_DISTANCE_ERROR_TITLE: 'Check failed during countdown',
  LIVENESS_FACE_DISTANCE_ERROR:
    'Ensure only one face is in front of camera and avoid moving closer during countdown.',

  LIVENESS_HINT_MULTIPLE_FACES_DETECTED: 'Multiple faces detected',
  LIVENESS_ORIENTATION_ERROR_TITLE: 'Landscape orientation not supported',
  LIVENESS_ORIENTATION_LANDSCAPE:
    'Rotate your device to portrait (vertical) orientation',
  LIVENESS_ORIENTATION_PORTRAIT:
    "Ensure your device remains in portrait orientation for the check's duration",
};
