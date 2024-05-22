import {
  BoundingBox,
  ClientSessionInformationEvent,
  FaceMovementAndLightClientChallenge,
  FaceMovementClientChallenge,
  VideoEvent,
} from '@aws-sdk/client-rekognitionstreaming';
import { isUndefined } from '@aws-amplify/ui';
import {
  isFaceMovementAndLightChallenge,
  isFaceMovementChallenge,
} from '../sessionInformation';
import {
  Face,
  LivenessOvalDetails,
  LivenessContext,
  SessionInformation,
} from '../../types';
import {
  SequenceChangeParams,
  SequenceColorValue,
} from '../ColorSequenceDisplay';
import { StreamResult } from '../types';

interface TrackDimensions {
  trackHeight: number;
  trackWidth: number;
}

type GetBoundingBoxParams = TrackDimensions & {
  [K in keyof BoundingBox as `${Lowercase<K>}`]: NonNullable<BoundingBox[K]>;
};

export const createVideoEvent = async (
  result: Exclude<StreamResult, StreamResult<'sessionInfo'>>
): Promise<VideoEvent> => {
  const { data, type } = result;
  return {
    VideoChunk: new Uint8Array(
      // server expects an empty chunk on 'stopStream' event
      type === 'streamVideo' ? await data.arrayBuffer() : []
    ),
    // @ts-expect-error for 'closeCode' event, `data` is an object which is
    // unexpected by `VideoEvent` but is expected by the streaming service
    TimestampMillis: type === 'closeCode' ? data : Date.now(),
  };
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

type ClientChallenge =
  | FaceMovementAndLightClientChallenge
  | FaceMovementClientChallenge;
interface CreateClientSessionInformationEventParams {
  sessionInformation: SessionInformation;
  clientChallenge: ClientChallenge;
}

function createClientSessionInformationEvent({
  sessionInformation,
  clientChallenge,
}: CreateClientSessionInformationEventParams): ClientSessionInformationEvent {
  if (isFaceMovementChallenge(sessionInformation)) {
    return {
      Challenge: {
        FaceMovementChallenge: clientChallenge,
      },
    };
  } else if (isFaceMovementAndLightChallenge(sessionInformation)) {
    return {
      Challenge: {
        FaceMovementAndLightChallenge: clientChallenge,
      },
    };
  }
  throw new Error('Unable to create ClientSessionInformationEvent');
}

interface CreateSessionEndEventParams extends TrackDimensions {
  sessionInformation: SessionInformation;
  challengeId: NonNullable<LivenessContext['challengeId']>;
  faceMatchAssociatedParams: NonNullable<
    LivenessContext['faceMatchAssociatedParams']
  >;
  ovalAssociatedParams: NonNullable<LivenessContext['ovalAssociatedParams']>;
  recordingEndedTimestamp: number;
}
export function createSessionEndEvent({
  sessionInformation,
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

  const clientChallenge: ClientChallenge = {
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
  };
  return createClientSessionInformationEvent({
    sessionInformation,
    clientChallenge,
  });
}
interface CreateSessionStartEventParams extends TrackDimensions {
  sessionInformation: SessionInformation;
  challengeId: NonNullable<LivenessContext['challengeId']>;
  ovalAssociatedParams: NonNullable<LivenessContext['ovalAssociatedParams']>;
  recordingStartedTimestamp: number;
}
export function createSessionStartEvent({
  sessionInformation,
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
  const clientChallenge: ClientChallenge = {
    ChallengeId: challengeId,
    VideoStartTimestamp: recordingStartedTimestamp,
    InitialFace: {
      InitialFaceDetectedTimestamp: initialFace!.timestampMs,
      BoundingBox: initialFaceBoundingBox,
    },
  };

  return createClientSessionInformationEvent({
    sessionInformation,
    clientChallenge,
  });
}

interface CreateColorDisplayEventParams extends SequenceChangeParams {
  challengeId: string;
}

/**
 * Translates provided sequence color string to an RGB array
 *
 * @param {SequenceColorValue} color
 * @returns {number[]}
 */
const colorToRgb = (color: SequenceColorValue): number[] => {
  return color
    .slice(color.indexOf('(') + 1, color.indexOf(')'))
    .split(',')
    .map((str) => parseInt(str));
};

export function createColorDisplayEvent({
  challengeId,
  sequenceStartTime,
  sequenceIndex,
  sequenceColor,
  prevSequenceColor,
}: CreateColorDisplayEventParams): ClientSessionInformationEvent {
  const CurrentColor = { RGB: colorToRgb(sequenceColor) };
  const PreviousColor = {
    RGB: colorToRgb(prevSequenceColor),
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
