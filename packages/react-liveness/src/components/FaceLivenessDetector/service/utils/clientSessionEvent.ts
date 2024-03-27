import {
  BoundingBox,
  ClientSessionInformationEvent,
} from '@aws-sdk/client-rekognitionstreaming';
import { isUndefined } from '@aws-amplify/ui';

import { Face, LivenessOvalDetails, LivenessContext } from '../types';
import { ColorSequenceDisplay } from './ColorSequenceDisplay';

interface TrackDimensions {
  trackHeight: number;
  trackWidth: number;
}

type GetBoundingBoxParams = TrackDimensions & {
  [K in keyof BoundingBox as `${Lowercase<K>}`]: NonNullable<BoundingBox[K]>;
};

export const getTrackDimensions = (stream: MediaStream): TrackDimensions => {
  const { height: trackHeight, width: trackWidth } = stream
    .getVideoTracks()[0]
    .getSettings();

  if (isUndefined(trackHeight) || isUndefined(trackWidth)) {
    throw new Error(
      `Invalid Track Dimensions. height: ${trackHeight}, width: ${trackWidth} `
    );
  }
  return { trackHeight, trackWidth };
};

function getBoundingBox({
  trackHeight,
  trackWidth,
  height,
  width,
  top,
  left,
}: GetBoundingBoxParams): BoundingBox {
  return {
    Height: height / trackHeight,
    Width: width / trackWidth,
    Top: top / trackHeight,
    Left: left / trackWidth,
  };
}

const getFlippedInitialFaceLeft = (
  trackWidth: number,
  faceLeft: number,
  faceWidth: number
): number => trackWidth - faceLeft - faceWidth;

type InitialFace = Pick<Face, 'top' | 'left' | 'width' | 'height'>;

const getInitialFaceBoundingBox = (
  params: Pick<GetBoundingBoxParams, 'trackHeight' | 'trackWidth'> & InitialFace
) => {
  const { trackWidth, left, width } = params;
  return getBoundingBox({
    ...params,
    left: getFlippedInitialFaceLeft(trackWidth, left, width),
  });
};

const getTargetFaceBoundingBox = (
  params: Pick<GetBoundingBoxParams, 'trackHeight' | 'trackWidth'> &
    LivenessOvalDetails
) => {
  const { height, width, centerX, centerY } = params;
  return getBoundingBox({
    ...params,
    top: centerY - height / 2,
    left: centerX - width / 2,
  });
};

interface CreateSessionEndEventParams extends TrackDimensions {
  challengeId: NonNullable<LivenessContext['challengeId']>;
  faceMatchAssociatedParams: NonNullable<
    LivenessContext['faceMatchAssociatedParams']
  >;
  ovalAssociatedParams: NonNullable<LivenessContext['ovalAssociatedParams']>;
  recordingEndedTimestamp: number;
}
export function createSessionEndEvent({
  challengeId,
  faceMatchAssociatedParams,
  ovalAssociatedParams,
  recordingEndedTimestamp,
  trackHeight,
  trackWidth,
}: CreateSessionEndEventParams): ClientSessionInformationEvent {
  const { initialFace, ovalDetails } = ovalAssociatedParams;
  const { startFace, endFace } = faceMatchAssociatedParams;

  const initialFaceBoundingBox = getInitialFaceBoundingBox({
    trackHeight,
    trackWidth,
    ...initialFace!,
  });

  const targetFaceBoundingBox = getTargetFaceBoundingBox({
    trackHeight,
    trackWidth,
    ...ovalDetails!,
  });

  return {
    Challenge: {
      FaceMovementAndLightChallenge: {
        ChallengeId: challengeId,
        InitialFace: {
          InitialFaceDetectedTimestamp: initialFace!.timestampMs,
          BoundingBox: initialFaceBoundingBox,
        },
        TargetFace: {
          FaceDetectedInTargetPositionStartTimestamp: startFace!.timestampMs,
          FaceDetectedInTargetPositionEndTimestamp: endFace!.timestampMs,
          BoundingBox: targetFaceBoundingBox,
        },
        VideoEndTimestamp: recordingEndedTimestamp,
      },
    },
  };
}

interface CreateSessionStartEventParams extends TrackDimensions {
  challengeId: NonNullable<LivenessContext['challengeId']>;

  ovalAssociatedParams: NonNullable<LivenessContext['ovalAssociatedParams']>;
  recordingStartedTimestamp: number;
}
export function createSessionStartEvent({
  challengeId,
  ovalAssociatedParams,
  recordingStartedTimestamp,
  trackHeight,
  trackWidth,
}: CreateSessionStartEventParams): ClientSessionInformationEvent {
  const { initialFace } = ovalAssociatedParams;

  const initialFaceBoundingBox = getInitialFaceBoundingBox({
    trackHeight,
    trackWidth,
    ...initialFace!,
  });

  return {
    Challenge: {
      FaceMovementAndLightChallenge: {
        ChallengeId: challengeId,
        VideoStartTimestamp: recordingStartedTimestamp,
        InitialFace: {
          InitialFaceDetectedTimestamp: initialFace!.timestampMs,
          BoundingBox: initialFaceBoundingBox,
        },
      },
    },
  };
}

interface CreateColorDisplayEventParams {
  challengeId: string;
  sequenceColor: string;
  sequenceIndex: number;
  sequenceStartTime: number;
  prevSequenceColor: string;
}
export function createColorDisplayEvent({
  challengeId,
  sequenceStartTime,
  sequenceIndex,
  sequenceColor,
  prevSequenceColor,
}: CreateColorDisplayEventParams): ClientSessionInformationEvent {
  const CurrentColor = { RGB: ColorSequenceDisplay.colorToRgb(sequenceColor) };
  const PreviousColor = {
    RGB: ColorSequenceDisplay.colorToRgb(prevSequenceColor),
  };

  return {
    Challenge: {
      FaceMovementAndLightChallenge: {
        ChallengeId: challengeId,
        ColorDisplayed: {
          CurrentColor,
          PreviousColor,
          SequenceNumber: sequenceIndex,
          CurrentColorStartTimestamp: sequenceStartTime,
        },
      },
    },
  };
}
