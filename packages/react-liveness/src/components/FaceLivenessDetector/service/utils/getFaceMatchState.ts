import {
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

  if (intersection > intersectionThreshold) {
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
