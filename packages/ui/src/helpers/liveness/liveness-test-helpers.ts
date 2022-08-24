import {
  FaceMatchState,
  Face,
  LivenessOvalDetails,
  IlluminationState,
  LivenessContext,
} from '../../types';

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
  getState: () => 'idle',
};
export const mockFace: Face = {
  height: 100,
  width: 100,
  left: 150,
  top: 200,
  timestampMs: testTimestampMs,
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
  streamLivenessVideo: jest.fn(),
  videoRecorder: mockVideoRecorder,
};
export const mockFreshnessColorDisplay: any = {
  displayColorTick: () => true,
};

export const mockContext = (): LivenessContext => {
  return {
    challengeId: 'foobar',
    maxFailedAttempts: 3,
    failedAttempts: 0,
    flowProps: {
      sessionId: 'foobar',
      sessionInformation: 'foobar',
      onGetLivenessDetection: jest.fn(),
    },
    videoAssociatedParams: {
      videoConstraints: mockVideoConstaints,
      videoEl: document.createElement('video'),
      canvasEl: document.createElement('canvas'),
      videoMediaStream: mockVideoMediaStream,
      videoRecorder: mockVideoRecorder,
      recordingStartTimestampMs: 1,
    },
    ovalAssociatedParams: {
      faceDetector: mockBlazeFace,
      initialFace: mockFace,
      ovalDetails: mockOvalDetails,
    },
    faceMatchAssociatedParams: {
      illuminationState: IlluminationState.NORMAL,
      faceMatchState: FaceMatchState.MATCHED,
      faceMatchCount: 0,
      currentDetectedFace: mockFace,
      startFace: mockFace,
      endFace: mockFace,
    },
    freshnessColorAssociatedParams: {
      freshnessColorEl: document.createElement('canvas'),
      freshnessColors: [],
      freshnessColorsComplete: false,
      freshnessColorDisplay: mockFreshnessColorDisplay,
    },
    errorState: null,
    livenessStreamProvider: mockLivenessStreamProvider,
  };
};
