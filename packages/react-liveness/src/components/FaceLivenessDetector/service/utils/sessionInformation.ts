import {
  FaceMovementServerChallenge,
  FaceMovementAndLightServerChallenge,
  ServerChallenge,
  SessionInformation as ServerSessionInformation,
} from '@aws-sdk/client-rekognitionstreaming';
import {
  FaceMovementAndLightChallenge,
  FaceMovementChallenge,
  SessionInformation,
} from '../types';
import {
  FACE_MOVEMENT_CHALLENGE,
  FACE_MOVEMENT_AND_LIGHT_CHALLENGE,
} from './constants';

export const isFaceMovementAndLightChallenge = (
  value: unknown
): value is FaceMovementAndLightChallenge => {
  return (
    (value as SessionInformation)?.Challenge?.name ===
    'FaceMovementAndLightChallenge'
  );
};

export const isFaceMovementChallenge = (
  value: unknown
): value is FaceMovementChallenge => {
  return (
    (value as SessionInformation)?.Challenge?.name === 'FaceMovementChallenge'
  );
};

export const isFaceMovementAndLightServerChallenge = (
  value: unknown
): value is FaceMovementAndLightServerChallenge => {
  return !!(value as ServerChallenge.FaceMovementAndLightChallengeMember)
    ?.FaceMovementAndLightChallenge;
};

export const isFaceMovementServerChallenge = (
  value: unknown
): value is FaceMovementServerChallenge => {
  return !!(value as ServerChallenge.FaceMovementChallengeMember)
    ?.FaceMovementChallenge;
};

export const createSessionInfoFromServerSessionInformation = (
  serverSessionInformation: ServerSessionInformation
): SessionInformation => {
  let challenge: FaceMovementAndLightChallenge | FaceMovementChallenge;
  if (
    isFaceMovementAndLightServerChallenge(serverSessionInformation.Challenge)
  ) {
    challenge = {
      ...serverSessionInformation.Challenge.FaceMovementAndLightChallenge,
      name: FACE_MOVEMENT_AND_LIGHT_CHALLENGE.Type,
    } as FaceMovementAndLightChallenge;
  } else if (
    isFaceMovementServerChallenge(serverSessionInformation.Challenge)
  ) {
    challenge = {
      ...serverSessionInformation.Challenge.FaceMovementChallenge,
      name: FACE_MOVEMENT_CHALLENGE.Type,
    } as FaceMovementChallenge;
  } else {
    throw new Error(
      'Unsupported challenge type returned from session information.'
    );
  }

  if (
    !challenge.ChallengeConfig ||
    !challenge.ChallengeConfig.FaceDistanceThreshold ||
    !challenge.ChallengeConfig.FaceDistanceThresholdMin ||
    !challenge.ChallengeConfig.OvalHeightWidthRatio
  ) {
    throw new Error('Challenge config not returned from session information.');
  }
  return { ...serverSessionInformation, Challenge: challenge };
};
