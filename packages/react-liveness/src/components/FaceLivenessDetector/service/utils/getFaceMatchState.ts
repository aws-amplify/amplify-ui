import {
  Coordinate,
  LivenessOvalDetails,
  Face,
  FaceMatchState,
  BoundingBox,
} from '../types';
import { SessionInformation } from '@aws-sdk/client-rekognitionstreaming';
import {
  generateBboxFromLandmarks,
  getIntersectionOverUnion,
  getOvalBoundingBox,
} from './liveness';

// Calculate the angle between three points using trigonometry
function calculateAngle(
  point1: Coordinate,
  center: Coordinate,
  point2: Coordinate
) {
  const dx1 = -(point1[0] - center[0]);
  const dy1 = point1[1] - center[1];
  const dx2 = -(point2[0] - center[0]);
  const dy2 = point2[1] - center[1];
  const angle = Math.atan2(dx1 * dy2 - dy1 * dx2, dx1 * dx2 + dy1 * dy2);
  return angle * (180 / Math.PI);
}

// Function to calculate the angle between two eyes and nose.
function calculateFaceAngle(face: Face) {
  const { leftEye, rightEye, nose } = face;
  return calculateAngle(leftEye, nose, rightEye);
}

/**
 * Returns the state of the provided face with respect to the provided liveness oval.
 */
// eslint-disable-next-line max-params
export function getFaceMatchStateInLivenessOval(
  face: Face,
  ovalDetails: LivenessOvalDetails,
  initialFaceIntersection: number,
  sessionInformation: SessionInformation
): {
  faceMatchState: FaceMatchState;
  faceMatchPercentage: number;
} {
  let faceMatchState: FaceMatchState;

  const challengeConfig =
    sessionInformation?.Challenge?.FaceMovementAndLightChallenge
      ?.ChallengeConfig;
  if (
    !challengeConfig ||
    !challengeConfig.OvalIouThreshold ||
    !challengeConfig.OvalIouHeightThreshold ||
    !challengeConfig.OvalIouWidthThreshold ||
    !challengeConfig.FaceIouHeightThreshold ||
    !challengeConfig.FaceIouWidthThreshold
  ) {
    throw new Error(
      'Challenge information not returned from session information.'
    );
  }

  const { OvalIouThreshold, FaceIouHeightThreshold, FaceIouWidthThreshold } =
    challengeConfig;

  const faceBoundingBox: BoundingBox = generateBboxFromLandmarks(
    face,
    ovalDetails
  );
  const minFaceX = faceBoundingBox.left;
  const maxFaceX = faceBoundingBox.right;
  const minFaceY = faceBoundingBox.top;
  const maxFaceY = faceBoundingBox.bottom;

  const { ovalBoundingBox, minOvalX, minOvalY, maxOvalX, maxOvalY } =
    getOvalBoundingBox(ovalDetails);

  const intersection = getIntersectionOverUnion(
    faceBoundingBox,
    ovalBoundingBox
  );

  const intersectionThreshold = OvalIouThreshold;
  const faceDetectionWidthThreshold = ovalDetails.width * FaceIouWidthThreshold;
  const faceDetectionHeightThreshold =
    ovalDetails.height * FaceIouHeightThreshold;

  /** From Science
   * p=max(min(1,0.75∗(si−s0)/(st−s0)+0.25)),0)
   */
  const faceMatchPercentage =
    Math.max(
      Math.min(
        1,
        (0.75 * (intersection - initialFaceIntersection)) /
          (intersectionThreshold - initialFaceIntersection) +
          0.25
      ),
      0
    ) * 100;

  //  if the angle is too large or too small, it indicates the face is not framed well
  // (e.g turned left/right/up/down)
  const angle = calculateFaceAngle(face);

  if (65 >= angle || angle > 120) {
    faceMatchState = FaceMatchState.FRAME_YOUR_FACE;
  } else if (intersection > intersectionThreshold) {
    faceMatchState = FaceMatchState.MATCHED;
  } else if (
    minOvalY - minFaceY > faceDetectionHeightThreshold ||
    maxFaceY - maxOvalY > faceDetectionHeightThreshold ||
    (minOvalX - minFaceX > faceDetectionWidthThreshold &&
      maxFaceX - maxOvalX > faceDetectionWidthThreshold)
  ) {
    faceMatchState = FaceMatchState.MATCHED;
  } else {
    faceMatchState = FaceMatchState.TOO_FAR;
  }

  return { faceMatchState, faceMatchPercentage };
}
