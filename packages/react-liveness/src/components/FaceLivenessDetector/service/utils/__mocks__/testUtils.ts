/* eslint-disable */
import { PassThrough } from 'stream';
import { ActorRef } from 'xstate';
import {
  ClientSessionInformationEvent,
  ColorSequence,
  SessionInformation,
} from '@aws-sdk/client-rekognitionstreaming';
import {
  FaceMatchState,
  Face,
  LivenessOvalDetails,
  IlluminationState,
  LivenessContext,
} from '../../types';

const mockedStream = new PassThrough(); // TODO: a following PR after PR634 will be made to have the stream emit the proper mock data.

export const testTimestampMs = 1640995200000;

export const mockBlazeFace: any = {
  modelLoadingPromise: Promise.resolve(),
  triggerModelLoading: jest.fn(),
  loadModels: jest.fn(),
  detectFaces: jest.fn(),
};
export const mockVideoConstaints: MediaTrackConstraints = {
  width: { min: 320, ideal: 640, max: 1920 },
  height: { min: 240, ideal: 480, max: 1080 },
  facingMode: 'user',
};
export const mockCameraDevice: MediaDeviceInfo = {
  deviceId: 'some-device-id',
  groupId: 'some-group-id',
  kind: 'videoinput',
  label: 'some-label',
  toJSON: () => ({}),
};
export const mockVideoMediaStream = {
  getTracks: () => [
    {
      getSettings: () => ({
        width: 640,
        height: 480,
        deviceId: mockCameraDevice.deviceId,
      }),
    },
  ],
} as MediaStream;
export const mockVideoRecorder: any = {
  start: jest.fn(),
  stop: jest.fn(),
  getBlob: jest.fn(),
  recordingStartApiTimestamp: Date.now(),
  recorderStartTimestamp: Date.now(),
  recorderEndTimestamp: Date.now(),
  firstChunkTimestamp: Date.now(),
  getState: () => 'idle',
};
export const mockFace: Face = {
  height: 100,
  width: 100,
  left: 150,
  top: 200,
  timestampMs: testTimestampMs,
  rightEye: [200, 200],
  leftEye: [200, 200],
  mouth: [200, 200],
  nose: [200, 200],
};
export const mockOvalDetails: LivenessOvalDetails = {
  height: 100,
  width: 100,
  flippedCenterX: 50,
  centerX: 50,
  centerY: 50,
};
export const mockLivenessStreamProvider: any = {
  sendClientInfo: jest.fn(),
  endStream: jest.fn(),
  stopVideo: jest.fn(),
  dispatchStopVideoEvent: jest.fn(),
  getResponseStream: jest.fn().mockResolvedValue([mockedStream]), // TODO: a following PR after PR634 will be made to have the stream emit the proper mock data.
  startRecordingLivenessVideo: jest.fn(),
  videoRecorder: mockVideoRecorder,
};
export const mockFreshnessColorDisplay: any = {
  displayColorTick: () => true,
};
export const mockResponseStreamActorRef: ActorRef<any> = {
  send: jest.fn(),
  id: 'mockactor',
  getSnapshot: jest.fn(),
  subscribe: jest.fn(),
  [Symbol.observable]: jest.fn(),
};

export const mockContext = (): LivenessContext => {
  return {
    challengeId: 'foobar',
    maxFailedAttempts: 3,
    failedAttempts: 0,
    componentProps: {
      sessionId: 'foobar',
      region: 'us-east-1',
      onAnalysisComplete: jest.fn(),
    },
    videoAssociatedParams: {
      videoConstraints: mockVideoConstaints,
      videoEl: document.createElement('video'),
      canvasEl: document.createElement('canvas'),
      videoMediaStream: mockVideoMediaStream,
      videoRecorder: mockVideoRecorder,
      recordingStartTimestampMs: 1,
      isMobile: false,
    },
    ovalAssociatedParams: {
      faceDetector: mockBlazeFace,
      initialFace: mockFace,
      ovalDetails: mockOvalDetails,
      scaleFactor: 1,
    },
    faceMatchAssociatedParams: {
      illuminationState: IlluminationState.NORMAL,
      faceMatchState: FaceMatchState.MATCHED,
      faceMatchPercentage: 100,
      currentDetectedFace: mockFace,
      startFace: mockFace,
      endFace: mockFace,
      initialFaceMatchTime: Date.now() - 1000,
    },
    freshnessColorAssociatedParams: {
      freshnessColorEl: document.createElement('canvas'),
      freshnessColors: [],
      freshnessColorsComplete: false,
      freshnessColorDisplay: mockFreshnessColorDisplay,
    },
    errorState: undefined,
    livenessStreamProvider: mockLivenessStreamProvider,
    serverSessionInformation: mockSessionInformation,
    responseStreamActorRef: mockResponseStreamActorRef,
    shouldDisconnect: false,
    faceMatchStateBeforeStart: FaceMatchState.MATCHED,
    isFaceFarEnoughBeforeRecording: true,
    isRecordingStopped: false,
  };
};

export const MOCK_COLOR_SEQUENCES: ColorSequence[] = [
  {
    FreshnessColor: {
      RGB: [0, 0, 0], // black
    },
    DownscrollDuration: 300,
    FlatDisplayDuration: 100,
  },
  {
    FreshnessColor: {
      RGB: [255, 255, 255], // white
    },
    DownscrollDuration: 300,
    FlatDisplayDuration: 100,
  },
  {
    FreshnessColor: {
      RGB: [255, 0, 0], // red
    },
    DownscrollDuration: 300,
    FlatDisplayDuration: 100,
  },
  {
    FreshnessColor: {
      RGB: [255, 255, 0], // yellow
    },
    DownscrollDuration: 300,
    FlatDisplayDuration: 100,
  },
  {
    FreshnessColor: {
      RGB: [0, 255, 0], // lime
    },
    DownscrollDuration: 300,
    FlatDisplayDuration: 100,
  },
  {
    FreshnessColor: {
      RGB: [0, 255, 255], // cyan
    },
    DownscrollDuration: 300,
    FlatDisplayDuration: 100,
  },
  {
    FreshnessColor: {
      RGB: [0, 0, 255], // blue,
    },
    DownscrollDuration: 300,
    FlatDisplayDuration: 100,
  },
  {
    FreshnessColor: {
      RGB: [255, 0, 255], // violet
    },
    DownscrollDuration: 300,
    FlatDisplayDuration: 100,
  },
];

export const mockSessionInformation: SessionInformation = {
  Challenge: {
    FaceMovementAndLightChallenge: {
      ChallengeConfig: {
        BlazeFaceDetectionThreshold: 0.75,
        FaceDistanceThreshold: 0.4000000059604645,
        FaceDistanceThresholdMax: 0,
        FaceDistanceThresholdMin: 0.4000000059604645,
        FaceIouHeightThreshold: 0.15000000596046448,
        FaceIouWidthThreshold: 0.15000000596046448,
        OvalHeightWidthRatio: 1.6180000305175781,
        OvalIouHeightThreshold: 0.25,
        OvalIouThreshold: 0.699999988079071,
        OvalIouWidthThreshold: 0.25,
      },
      OvalParameters: {
        Width: 1,
        Height: 2,
        CenterX: 3,
        CenterY: 4,
      },
      LightChallengeType: 'SEQUENTIAL',
      ColorSequences: MOCK_COLOR_SEQUENCES,
    },
  },
};

export const MOCK_NO_FLAT_COLOR_SEQUENCES: ColorSequence[] = [
  {
    FreshnessColor: {
      RGB: [0, 0, 0], // black
    },
    DownscrollDuration: 300,
    FlatDisplayDuration: 0,
  },
  {
    FreshnessColor: {
      RGB: [255, 255, 255], // white
    },
    DownscrollDuration: 300,
    FlatDisplayDuration: 0,
  },
  {
    FreshnessColor: {
      RGB: [255, 0, 0], // red
    },
    DownscrollDuration: 300,
    FlatDisplayDuration: 0,
  },
  {
    FreshnessColor: {
      RGB: [255, 255, 0], // yellow
    },
    DownscrollDuration: 300,
    FlatDisplayDuration: 0,
  },
  {
    FreshnessColor: {
      RGB: [0, 255, 0], // lime
    },
    DownscrollDuration: 300,
    FlatDisplayDuration: 0,
  },
  {
    FreshnessColor: {
      RGB: [0, 255, 255], // cyan
    },
    DownscrollDuration: 300,
    FlatDisplayDuration: 0,
  },
  {
    FreshnessColor: {
      RGB: [0, 0, 255], // blue,
    },
    DownscrollDuration: 300,
    FlatDisplayDuration: 0,
  },
  {
    FreshnessColor: {
      RGB: [255, 0, 255], // violet
    },
    DownscrollDuration: 300,
    FlatDisplayDuration: 0,
  },
];

export const mockSessionInformationNoFlatColors: SessionInformation = {
  Challenge: {
    FaceMovementAndLightChallenge: {
      ChallengeConfig: {
        BlazeFaceDetectionThreshold: 0.75,
        FaceDistanceThreshold: 0.4000000059604645,
        FaceDistanceThresholdMax: 0,
        FaceDistanceThresholdMin: 0.4000000059604645,
        FaceIouHeightThreshold: 0.15000000596046448,
        FaceIouWidthThreshold: 0.15000000596046448,
        OvalHeightWidthRatio: 1.6180000305175781,
        OvalIouHeightThreshold: 0.25,
        OvalIouThreshold: 0.699999988079071,
        OvalIouWidthThreshold: 0.25,
      },
      OvalParameters: {
        Width: 1,
        Height: 2,
        CenterX: 3,
        CenterY: 4,
      },
      LightChallengeType: 'SEQUENTIAL',
      ColorSequences: MOCK_NO_FLAT_COLOR_SEQUENCES,
    },
  },
};

export const mockClientSessionInformationEvent: ClientSessionInformationEvent =
  {
    Challenge: {
      FaceMovementAndLightChallenge: {
        ChallengeId: 'challengeId',
        ColorDisplayed: {
          CurrentColor: { RGB: [0, 0, 0] },
          PreviousColor: { RGB: [0, 0, 0] },
          SequenceNumber: 1,
          CurrentColorStartTimestamp: Date.now(),
        },
      },
    },
  };
