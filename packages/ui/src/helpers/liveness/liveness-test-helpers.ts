import { PassThrough } from 'stream';
import { ActorRef } from 'xstate';
import { ClientSessionInformationEvent } from '@aws-sdk/client-rekognitionstreaming';
import {
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
  destroy: jest.fn(),
  recorderStartTimestamp: Date.now(),
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
  centerX: 50,
  centerY: 50,
};
export const mockLivenessStreamProvider: any = {
  sendClientInfo: jest.fn(),
  endStream: jest.fn(),
  stopVideo: jest.fn(),
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
      onGetLivenessDetection: jest.fn(),
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
    },
    faceMatchAssociatedParams: {
      illuminationState: IlluminationState.NORMAL,
      faceMatchState: FaceMatchState.MATCHED,
      currentDetectedFace: mockFace,
      startFace: mockFace,
      endFace: mockFace,
      initialFaceMatchTime: Date.now(),
    },
    freshnessColorAssociatedParams: {
      freshnessColorEl: document.createElement('canvas'),
      freshnessColors: [],
      freshnessColorsComplete: false,
      freshnessColorDisplay: mockFreshnessColorDisplay,
    },
    errorState: null,
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
      OvalScaleFactors: {
        Width: 1,
        CenterX: 2,
        CenterY: 3,
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
      OvalScaleFactors: {
        Width: 1,
        CenterX: 2,
        CenterY: 3,
      },
      LightChallengeType: 'SEQUENTIAL',
      ColorSequences: MOCK_NO_FLAT_COLOR_SEQUENCES,
    },
  },
};

export const mockClientSessionInformationEvent: ClientSessionInformationEvent =
  {
    DeviceInformation: undefined,
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
