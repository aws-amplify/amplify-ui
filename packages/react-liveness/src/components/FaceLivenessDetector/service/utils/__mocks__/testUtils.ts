import { ActorRef } from 'xstate';
import {
  ColorSequence,
  SessionInformation,
} from '@aws-sdk/client-rekognitionstreaming';

import { STATIC_VIDEO_CONSTRAINTS } from '../../../utils/helpers';
import {
  FaceMatchState,
  Face,
  LivenessOvalDetails,
  IlluminationState,
  LivenessContext,
} from '../../types';
import { StreamRecorder } from '../StreamRecorder';

const MOCK_TIMESTAMP = 1640995200000;

const SEQUENCE_DEFAULTS = { DownscrollDuration: 300, FlatDisplayDuration: 100 };

const MOCK_COLOR_SEQUENCES: ColorSequence[] = [
  {
    FreshnessColor: {
      RGB: [0, 0, 0], // black
    },
    ...SEQUENCE_DEFAULTS,
  },
  {
    FreshnessColor: {
      RGB: [255, 255, 255], // white
    },
    ...SEQUENCE_DEFAULTS,
  },
  {
    FreshnessColor: {
      RGB: [255, 0, 0], // red
    },
    ...SEQUENCE_DEFAULTS,
  },
  {
    FreshnessColor: {
      RGB: [255, 255, 0], // yellow
    },
    ...SEQUENCE_DEFAULTS,
  },
  {
    FreshnessColor: {
      RGB: [0, 255, 0], // lime
    },
    ...SEQUENCE_DEFAULTS,
  },
  {
    FreshnessColor: {
      RGB: [0, 255, 255], // cyan
    },
    ...SEQUENCE_DEFAULTS,
  },
  {
    FreshnessColor: {
      RGB: [0, 0, 255], // blue,
    },
    ...SEQUENCE_DEFAULTS,
  },
  {
    FreshnessColor: {
      RGB: [255, 0, 255], // violet
    },
    ...SEQUENCE_DEFAULTS,
  },
];

export const mockBlazeFace: any = {
  modelLoadingPromise: Promise.resolve(),
  triggerModelLoading: jest.fn(),
  loadModels: jest.fn(),
  detectFaces: jest.fn(),
};

export const mockVideoConstraints: MediaTrackConstraints = {
  deviceId: 'some-device-id',
  ...STATIC_VIDEO_CONSTRAINTS,
};

export const mockCameraDevice: MediaDeviceInfo = {
  deviceId: 'some-device-id',
  groupId: 'some-group-id',
  kind: 'videoinput',
  label: 'some-label',
  toJSON: () => ({}),
};

const mockVideoTrack = {
  getSettings: () => ({
    width: 640,
    height: 480,
    deviceId: mockCameraDevice.deviceId,
    frameRate: 30,
  }),
  stop: jest.fn(),
} as any as MediaStreamTrack;

export const mockVideoMediaStream = {
  getTracks: () => [mockVideoTrack],
} as MediaStream;

export const mockStreamRecorder = {
  dispatchStreamEvent: jest.fn(),
  getChunksLength: jest.fn(),
  getVideoStream: jest.fn(),
  hasRecordingStarted: jest.fn(() => true),
  isRecording: jest.fn(() => true),
  getRecordingEndedTimestamp: () => Date.now(),
  getRecordingStartTimestamp: () => Date.now(),
  startRecording: jest.fn(),
  stopRecording: jest.fn().mockResolvedValue(undefined),
} as unknown as StreamRecorder;

export const mockOvalDetails: LivenessOvalDetails = {
  flippedCenterX: 320,
  centerX: 320,
  centerY: 240,
  width: 288,
  height: 465,
};

export const mockFace: Face = {
  height: 100,
  width: 100,
  left: 150,
  top: 200,
  timestampMs: MOCK_TIMESTAMP,
  rightEye: [200, 200],
  leftEye: [200, 200],
  mouth: [200, 200],
  nose: [200, 200],
  rightEar: [200, 200],
  leftEar: [200, 200],
};

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
        OvalIouThreshold: 0.6,
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

const mockResponseStreamActorRef: ActorRef<any> = {
  send: jest.fn(),
  id: 'mockactor',
  getSnapshot: jest.fn(),
  subscribe: jest.fn(),
  [Symbol.observable]: jest.fn(),
};

export const getMockContext = (): LivenessContext => ({
  challengeId: 'foobar',
  maxFailedAttempts: 3,
  failedAttempts: 0,
  componentProps: {
    sessionId: 'foobar',
    region: 'us-east-1',
    onAnalysisComplete: jest.fn(),
  },
  videoAssociatedParams: {
    videoConstraints: mockVideoConstraints,
    videoEl: document.createElement('video'),
    canvasEl: document.createElement('canvas'),
    videoMediaStream: mockVideoMediaStream,
    recordingStartTimestamp: 1,
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
  },
  freshnessColorAssociatedParams: {
    freshnessColorEl: document.createElement('canvas'),
    freshnessColors: [],
    freshnessColorsComplete: false,
  },
  colorSequenceDisplay: { startSequences: jest.fn() } as any,
  errorState: undefined,
  livenessStreamProvider: mockStreamRecorder,
  serverSessionInformation: mockSessionInformation,
  responseStreamActorRef: mockResponseStreamActorRef,
  shouldDisconnect: false,
  faceMatchStateBeforeStart: FaceMatchState.MATCHED,
  isFaceFarEnoughBeforeRecording: true,
  isRecordingStopped: false,
});
