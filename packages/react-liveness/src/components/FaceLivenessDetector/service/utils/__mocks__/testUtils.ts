import { PassThrough } from 'stream';
import { ActorRef } from 'xstate';
import {
  ClientSessionInformationEvent,
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
import { VideoRecorder } from '../videoRecorder';

const MOCK_TIMESTAMP = 1640995200000;

const SEQUENCE_DEFAULTS = { DownscrollDuration: 300, FlatDisplayDuration: 100 };
export const MOCK_COLOR_SEQUENCES: ColorSequence[] = [
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

export const mockVideoRecorder = {
  start: jest.fn(),
  stop: jest.fn(),
  recordingStartApiTimestamp: Date.now(),
  recorderStartTimestamp: Date.now(),
  recorderEndTimestamp: Date.now(),
  firstChunkTimestamp: Date.now(),
  getVideoChunkSize: jest.fn(),
  getState: () => 'idle',
  dispatch: jest.fn(),
} as unknown as VideoRecorder;

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

export const mockFaceAboveThreshold: Face = {
  height: 215,
  left: 200,
  leftEar: [420, 155],
  leftEye: [360, 110],
  mouth: [310, 200],
  nose: [310, 140],
  probability: 90,
  rightEar: [215, 170],
  rightEye: [260, 115],
  timestampMs: 1710783006566,
  top: 70,
  width: 215,
};

export const mockMatchedFace: Face = {
  height: 317.5821685791015,
  left: 165.49339294433594,
  leftEar: [445, 264.4227600097656],
  leftEye: [384.70985412597656, 247.56172180175784],
  mouth: [327.9991149902344, 393.5927200317383],
  nose: [325.2409362792969, 333.89575958251953],
  probability: 90,
  rightEar: [199.34513092041016, 272.49412536621094],
  rightEye: [261.6714286804199, 250.6684875488281],
  timestampMs: MOCK_TIMESTAMP,
  top: 155.82656860351565,
  width: 317.60498046875,
};

export const mockMatchedFaceCenterX = 323.19064140319824;
export const mockMatchedFaceOcularWidth = 253.17949214956178;

export const mockTooFarFace: Face = {
  top: 230,
  left: 275,
  width: 135,
  height: 100,
  timestampMs: MOCK_TIMESTAMP,
  probability: 0.9974300265312195,
  rightEye: [372.5564064979553, 258.19776356220245],
  leftEye: [318.5161700248718, 253.94269466400146],
  mouth: [339.64158596098423, 298.5959941148758],
  nose: [342.7122294306755, 277.0021167397499],
  rightEar: [400.5564064979553, 258.19776356220245],
  leftEar: [300.5161700248718, 253.94269466400146],
};

export const mockCloselyMatchedFace: Face = {
  top: 46.751117706298814,
  left: -5.630989074707031,
  width: 572.6491546630859,
  height: 572.7001762390136,
  timestampMs: MOCK_TIMESTAMP,
  probability: 90,
  rightEye: [187.4885559082032, 218.63224029541013],
  leftEye: [433.75030517578125, 227.35191345214847],
  mouth: [313.39622497558594, 485.65040588378895],
  nose: [330.15281677246094, 371.40689849853516],
  rightEar: [28.786602020263672, 237.78337478637698],
  leftEar: [515.0150299072266, 262.62935638427734],
};

export const mockOffCenterFace: Face = {
  top: 200,
  left: 360,
  width: 200,
  height: 200,
  timestampMs: MOCK_TIMESTAMP,
  probability: 90,
  rightEye: [400, 300],
  leftEye: [500, 250],
  mouth: [470, 330],
  nose: [470, 300],
  rightEar: [370, 300],
  leftEar: [540, 300],
};

export const mockOvalDetails: LivenessOvalDetails = {
  flippedCenterX: 320,
  centerX: 320,
  centerY: 240,
  width: 288,
  height: 465,
};

export const mockLivenessStreamProvider: any = {
  sendClientInfo: jest.fn(),
  endStreamWithCode: jest.fn(),
  stopVideo: jest.fn(),
  dispatchStopVideoEvent: jest.fn(),
  getResponseStream: jest.fn().mockResolvedValue([new PassThrough()]),
  startRecordingLivenessVideo: jest.fn(),
  videoRecorder: mockVideoRecorder,
};

export const mockFreshnessColorDisplay: any = {
  displayColorTick: () => true,
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
    videoRecorder: mockVideoRecorder,
    recordingStartTimestampMs: 1,
    isMobile: false,
  },
  ovalAssociatedParams: {
    faceDetector: mockBlazeFace,
    initialFace: mockOffCenterFace,
    ovalDetails: mockOvalDetails,
    scaleFactor: 1,
  },
  faceMatchAssociatedParams: {
    illuminationState: IlluminationState.NORMAL,
    faceMatchState: FaceMatchState.MATCHED,
    faceMatchPercentage: 100,
    currentDetectedFace: mockOffCenterFace,
    startFace: mockOffCenterFace,
    endFace: mockOffCenterFace,
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
});

const MOCK_NO_FLAT_COLOR_SEQUENCES: ColorSequence[] = [
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

export const mockMediaRecorder = {
  start: jest.fn(),
  ondataavailable: jest.fn(),
  onerror: jest.fn(),
  state: '',
  stop: jest.fn(),
  addEventListener: jest.fn(),
  pause: jest.fn(),
  dispatchEvent: jest.fn(),
};
