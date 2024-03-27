import { FaceMatchAssociatedParams, OvalAssociatedParams } from '../../types';
import {
  createColorDisplayEvent,
  createSessionEndEvent,
  createSessionStartEvent,
  getTrackDimensions,
} from '../clientSessionEvent';

const ovalAssociatedParams = {
  initialFace: { left: 123, width: 1000, top: 1260, height: 1300 },
  ovalDetails: { height: 120, width: 360, centerX: 12, centerY: 45 },
} as OvalAssociatedParams;

describe('getTrackDimensions', () => {
  it('returns the expected values in the happy path', () => {
    const trackDimensions = { height: 1000, width: 676 };
    const mediaStream = {
      getVideoTracks: () => [{ getSettings: () => trackDimensions }],
    } as MediaStream;
    const output = getTrackDimensions(mediaStream);
    expect(output).toStrictEqual({ trackHeight: 1000, trackWidth: 676 });
  });

  it('throws if height is missing in the returned track dimensions', () => {
    const trackDimensions = { height: undefined, width: 676 };
    const mediaStream = {
      getVideoTracks: () => [{ getSettings: () => trackDimensions }],
    } as MediaStream;
    expect(() => getTrackDimensions(mediaStream)).toThrowError(
      'Invalid Track Dimensions. height: undefined, width: 676'
    );
  });

  it('throws if width is missing in the returned track dimensions', () => {
    const trackDimensions = { height: 1000, width: undefined };
    const mediaStream = {
      getVideoTracks: () => [{ getSettings: () => trackDimensions }],
    } as MediaStream;
    expect(() => getTrackDimensions(mediaStream)).toThrowError(
      'Invalid Track Dimensions. height: 1000, width: undefined'
    );
  });
});

describe('createColorDisplayEvent', () => {
  it('contructs a valid ClientSessionInformationEvent', () => {
    const output = createColorDisplayEvent({
      challengeId: 'challengeId',
      sequenceColor: 'rgb(0,0,0)',
      prevSequenceColor: 'rgb(0,255,0)',
      sequenceIndex: 1,
      sequenceStartTime: 1000,
    });

    expect(output).toStrictEqual({
      Challenge: {
        FaceMovementAndLightChallenge: {
          ChallengeId: 'challengeId',
          ColorDisplayed: {
            CurrentColor: { RGB: [0, 0, 0] },
            CurrentColorStartTimestamp: 1000,
            PreviousColor: { RGB: [0, 255, 0] },
            SequenceNumber: 1,
          },
        },
      },
    });
  });
});

describe('createSessionStartEvent', () => {
  const output = createSessionStartEvent({
    challengeId: 'challengeId',

    ovalAssociatedParams,
    recordingStartedTimestamp: 82918281982,
    trackHeight: 121212,
    trackWidth: 37288,
  });

  expect(output).toStrictEqual({
    Challenge: {
      FaceMovementAndLightChallenge: {
        ChallengeId: 'challengeId',
        InitialFace: {
          BoundingBox: {
            Height: 0.010725010725010725,
            Left: 0.9698830723020812,
            Top: 0.010395010395010396,
            Width: 0.026818279339197598,
          },
          InitialFaceDetectedTimestamp: undefined,
        },
        VideoStartTimestamp: 82918281982,
      },
    },
  });
});

describe('createSessionEndEvent', () => {
  it('contructs a valid ClientSessionInformationEvent', () => {
    const output = createSessionEndEvent({
      challengeId: 'challengeId',
      faceMatchAssociatedParams: {
        endFace: { timestampMs: 1600 },
        startFace: { timestampMs: 1200 },
      } as FaceMatchAssociatedParams,
      ovalAssociatedParams,
      trackHeight: 1670,
      trackWidth: 1345,
      recordingEndedTimestamp: 8392839239,
    });

    expect(output).toStrictEqual({
      Challenge: {
        FaceMovementAndLightChallenge: {
          ChallengeId: 'challengeId',
          InitialFace: {
            BoundingBox: {
              Height: 0.7784431137724551,
              Left: 0.16505576208178438,
              Top: 0.7544910179640718,
              Width: 0.7434944237918215,
            },
            InitialFaceDetectedTimestamp: undefined,
          },
          TargetFace: {
            BoundingBox: {
              Height: 0.0718562874251497,
              Left: -0.12490706319702602,
              Top: -0.008982035928143712,
              Width: 0.26765799256505574,
            },
            FaceDetectedInTargetPositionEndTimestamp: 1600,
            FaceDetectedInTargetPositionStartTimestamp: 1200,
          },
          VideoEndTimestamp: 8392839239,
        },
      },
    });
  });
});
