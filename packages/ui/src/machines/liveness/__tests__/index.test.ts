import { interpret } from 'xstate';
import { LivenessInterpreter } from '@aws-amplify/ui';
import { setImmediate } from 'timers';

import { livenessMachine, MIN_FACE_MATCH_COUNT } from '../';
import {
  LivenessFlowProps,
  FaceMatchState,
  Face,
  LivenessErrorState,
  LivenessOvalDetails,
  IlluminationState,
} from '../../../types';
import * as helpers from '../../../helpers';

jest.useFakeTimers();
jest.mock('../../../helpers');

const mockedHelpers = helpers as jest.Mocked<typeof helpers>;
const flushPromises = () => new Promise(setImmediate);
const testTimestampMs = 1640995200000;

describe('Liveness Machine', () => {
  const mockNavigatorMediaDevices: any = {
    getUserMedia: jest.fn(),
    enumerateDevices: jest.fn(),
  };
  const mockVideoRecorder: any = {
    start: jest.fn(),
    stop: jest.fn(),
    getBlob: jest.fn(),
    destroy: jest.fn(),
  };
  const mockBlazeFace: any = {
    modelLoadingPromise: Promise.resolve(),
    triggerModelLoading: jest.fn(),
    loadModels: jest.fn(),
    detectFaces: jest.fn(),
  };
  const mockLivenessPredictionsProvider: any = {
    putLivenessVideo: jest.fn(),
  };

  const mockFlowProps: LivenessFlowProps = {
    sessionId: 'some-sessionId',
    sessionInformation:
      '{"challenge":{"faceMovementAndLightChallenge":{"ovalScaleFactors":{"width":0.24718577,"centerX":0.98700607,"centerY":0.7975547}}}}',
    onGetLivenessDetection: jest.fn(),
    onError: jest.fn(),
    onSuccess: jest.fn(),
    onUserCancel: jest.fn(),
    onUserPermissionDenied: jest.fn(),
    onUserTimeout: jest.fn(),
  };

  const mockVideoConstaints: MediaTrackConstraints = {
    width: { min: 320, ideal: 640, max: 1920 },
    height: { min: 240, ideal: 480, max: 1080 },
    facingMode: 'user',
  };
  const mockCameraDevice: MediaDeviceInfo = {
    deviceId: 'some-device-id',
    groupId: 'some-group-id',
    kind: 'videoinput',
    label: 'some-label',
    toJSON: () => ({}),
  };
  const mockVideoEl = document.createElement('video');
  const mockCanvasEl = document.createElement('canvas');
  const mockVideoMediaStream = {
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
  const mockFace: Face = {
    height: 100,
    width: 100,
    left: 150,
    top: 200,
    timestampMs: testTimestampMs,
  };
  const mockOvalDetails: LivenessOvalDetails = {
    height: 100,
    width: 100,
    centerX: 50,
    centerY: 50,
  };

  const machine = livenessMachine.withContext({
    ...livenessMachine.context,
    flowProps: mockFlowProps,
    maxFailedAttempts: 1,
  });

  let service: LivenessInterpreter;

  function transitionToCameraCheck(service) {
    service.start();
    service.send({
      type: 'BEGIN',
      data: { videoConstraints: mockVideoConstaints },
    });
  }

  async function transitionToRecording(service) {
    transitionToCameraCheck(service);
    await flushPromises(); // notRecording
    service.send({
      type: 'START_RECORDING',
      data: {
        videoEl: mockVideoEl,
        canvasEl: mockCanvasEl,
      },
    });
  }

  async function advanceMinFaceMatches() {
    for (let i = 0; i <= MIN_FACE_MATCH_COUNT; i++) {
      await flushPromises();
      jest.advanceTimersToNextTimer();
    }
  }

  async function transitionToUploading(service) {
    await transitionToRecording(service);
    await flushPromises(); // checkFaceDetected
    jest.advanceTimersToNextTimer(); // ovalMatching
    await flushPromises(); // checkMatch
    await advanceMinFaceMatches();
    jest.advanceTimersToNextTimer(); // upload-pending
  }

  beforeEach(() => {
    Object.defineProperty(global.navigator, 'mediaDevices', {
      value: mockNavigatorMediaDevices,
    });
    mockNavigatorMediaDevices.getUserMedia.mockResolvedValue(
      mockVideoMediaStream
    );
    mockNavigatorMediaDevices.enumerateDevices.mockResolvedValue([
      mockCameraDevice,
    ]);

    mockedHelpers.isCameraDeviceVirtual.mockImplementation(() => false);
    mockedHelpers.VideoRecorder.mockImplementation(() => mockVideoRecorder);
    mockedHelpers.BlazeFaceFaceDetection.mockImplementation(
      () => mockBlazeFace
    );
    mockedHelpers.LivenessPredictionsProvider.mockImplementation(
      () => mockLivenessPredictionsProvider
    );
    mockedHelpers.drawLivenessOvalInCanvas.mockImplementation(() => {});
    mockedHelpers.estimateIllumination.mockImplementation(
      () => IlluminationState.NORMAL
    );
    mockedHelpers.getRandomLivenessOvalDetails.mockImplementation(
      () => mockOvalDetails
    );
    mockedHelpers.getFaceMatchStateInLivenessOval.mockImplementation(
      () => FaceMatchState.MATCHED
    );

    mockBlazeFace.detectFaces.mockResolvedValue([mockFace]);
    mockLivenessPredictionsProvider.putLivenessVideo.mockResolvedValue({});

    service = interpret(machine) as unknown as LivenessInterpreter;
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    service.stop();
  });

  it('should be in the idle state', () => {
    service.start();
    expect(service.state.value).toBe('start');
  });

  it('should reach userCancel state on CANCEL', () => {
    service.start();
    service.send('CANCEL');

    expect(service.state.value).toBe('userCancel');
    expect(mockFlowProps.onUserCancel).toHaveBeenCalledTimes(1);
  });

  it('should reach cameraCheck state on BEGIN from start', () => {
    transitionToCameraCheck(service);

    expect(service.state.value).toBe('cameraCheck');
    expect(
      service.state.context.videoAssociatedParams.videoConstraints
    ).toEqual(mockVideoConstaints);
    expect(
      service.state.context.ovalAssociatedParams.faceDetector
    ).toBeDefined();
  });

  describe('cameraCheck', () => {
    it('should reach notRecording state on checkVirtualCameraAndGetStream success', async () => {
      transitionToCameraCheck(service);

      await flushPromises();
      expect(service.state.value).toBe('notRecording');
      expect(
        service.state.context.videoAssociatedParams.videoMediaStream
      ).toEqual(mockVideoMediaStream);
      expect(mockNavigatorMediaDevices.getUserMedia).toHaveBeenCalledWith({
        video: mockVideoConstaints,
        audio: false,
      });
      expect(mockNavigatorMediaDevices.enumerateDevices).toHaveBeenCalledTimes(
        1
      );
      expect(mockedHelpers.isCameraDeviceVirtual).toHaveBeenCalled();
    });

    it('should reach notRecording state on checkVirtualCameraAndGetStream success when initialStream is not from real device', async () => {
      const mockVirtualMediaStream = {
        getTracks: () => [
          {
            getSettings: () => ({
              width: 640,
              height: 480,
              deviceId: 'virtual-device-id',
            }),
          },
        ],
      } as MediaStream;
      mockNavigatorMediaDevices.getUserMedia
        .mockResolvedValueOnce(mockVirtualMediaStream)
        .mockResolvedValueOnce(mockVideoMediaStream);

      transitionToCameraCheck(service);

      await flushPromises();
      expect(service.state.value).toBe('notRecording');
      expect(
        service.state.context.videoAssociatedParams.videoMediaStream
      ).toEqual(mockVideoMediaStream);
      expect(mockNavigatorMediaDevices.getUserMedia).toHaveBeenNthCalledWith(
        1,
        {
          video: mockVideoConstaints,
          audio: false,
        }
      );
      expect(mockNavigatorMediaDevices.getUserMedia).toHaveBeenNthCalledWith(
        2,
        {
          video: {
            ...mockVideoConstaints,
            deviceId: { exact: mockCameraDevice.deviceId },
          },
          audio: false,
        }
      );
    });

    it('should reach permissionDenied state on checkVirtualCameraAndGetStream failure due to no real device', async () => {
      mockedHelpers.isCameraDeviceVirtual.mockImplementation(() => true);
      transitionToCameraCheck(service);

      await flushPromises();
      expect(service.state.value).toBe('permissionDenied');
    });

    it('should reach permissionDenied state on checkVirtualCameraAndGetStream failure due to getUserMedia error', async () => {
      mockNavigatorMediaDevices.getUserMedia.mockRejectedValue(
        new Error('some-error')
      );
      transitionToCameraCheck(service);

      await flushPromises();
      expect(service.state.value).toBe('permissionDenied');
    });
  });

  describe('notRecording', () => {
    it('should reach recording state on START_RECORDING', async () => {
      transitionToCameraCheck(service);
      await flushPromises(); // notRecording

      service.send({ type: 'START_RECORDING' });

      expect(service.state.value).toEqual({ recording: 'ovalDrawing' });
    });
  });

  describe('recording', () => {
    it('should reach ovalDrawing state as initial state and respect ovalDrawingTimeout', async () => {
      await transitionToRecording(service);

      expect(service.state.value).toEqual({ recording: 'ovalDrawing' });
      expect(service.state.context.videoAssociatedParams.videoEl).toBe(
        mockVideoEl
      );
      expect(service.state.context.videoAssociatedParams.canvasEl).toBe(
        mockCanvasEl
      );
      expect(service.state.context.videoAssociatedParams.videoMediaStream).toBe(
        mockVideoMediaStream
      );
      expect(
        service.state.context.videoAssociatedParams.videoRecorder
      ).toBeDefined();
      expect(
        service.state.context.videoAssociatedParams.recordingStartTimestampMs
      ).toBeDefined();
      expect(mockVideoRecorder.start).toHaveBeenCalledTimes(1);
      expect(service.state.context.errorState).toBeNull();

      jest.advanceTimersToNextTimer();
      expect(service.state.value).toEqual('timeout');
      expect(service.state.context.errorState).toBe(LivenessErrorState.TIMEOUT);
      expect(mockFlowProps.onUserTimeout).toHaveBeenCalledTimes(1);
    });

    it('should reach ovalMatching state after detectInitialFaceAndDrawOval success and respect ovalMatchingTimeout', async () => {
      await transitionToRecording(service);

      await flushPromises();
      expect(service.state.value).toEqual({ recording: 'checkFaceDetected' });

      jest.advanceTimersToNextTimer();
      expect(service.state.value).toEqual({ recording: 'ovalMatching' });
      expect(
        service.state.context.faceMatchAssociatedParams.faceMatchState
      ).toBe(FaceMatchState.FACE_IDENTIFIED);
      expect(service.state.context.ovalAssociatedParams.ovalDetails).toBe(
        mockOvalDetails
      );
      expect(service.state.context.ovalAssociatedParams.initialFace).toBe(
        mockFace
      );

      jest.advanceTimersToNextTimer();
      expect(service.state.value).toEqual('timeout');
      expect(service.state.context.errorState).toBe(LivenessErrorState.TIMEOUT);
      expect(mockFlowProps.onUserTimeout).toHaveBeenCalledTimes(1);
    });

    it('should reach checkFaceDetected again if no face is detected', async () => {
      mockBlazeFace.detectFaces.mockResolvedValue([]);
      mockedHelpers.estimateIllumination.mockImplementation(
        () => IlluminationState.BRIGHT
      );

      await transitionToRecording(service);

      await flushPromises();
      expect(service.state.value).toEqual({ recording: 'checkFaceDetected' });

      jest.advanceTimersToNextTimer();
      expect(service.state.value).toEqual({ recording: 'checkFaceDetected' });
      expect(
        service.state.context.faceMatchAssociatedParams.faceMatchState
      ).toBe(FaceMatchState.CANT_IDENTIFY);
      expect(
        service.state.context.faceMatchAssociatedParams.illuminationState
      ).toBe(IlluminationState.BRIGHT);
    });

    it('should reach error state after detectInitialFaceAndDrawOval error', async () => {
      const error = new Error('some-error');
      mockBlazeFace.detectFaces.mockRejectedValue(error);

      await transitionToRecording(service);

      await flushPromises();
      expect(service.state.value).toEqual('error');
      expect(service.state.context.errorState).toBe(
        LivenessErrorState.RUNTIME_ERROR
      );
      expect(mockFlowProps.onError).toHaveBeenCalledTimes(1);
      expect(mockFlowProps.onError).toHaveBeenCalledWith(error);
    });

    it('should reach uploading-pending state after detectFaceAndMatchOval success', async () => {
      await transitionToRecording(service);
      await flushPromises(); // checkFaceDetected
      jest.advanceTimersToNextTimer(); // ovalMatching

      await advanceMinFaceMatches();

      expect(service.state.value).toEqual({ uploading: 'pending' });
      expect(
        service.state.context.faceMatchAssociatedParams.faceMatchState
      ).toBe(FaceMatchState.MATCHED);
      expect(service.state.context.faceMatchAssociatedParams.startFace).toBe(
        mockFace
      );
      expect(service.state.context.faceMatchAssociatedParams.endFace).toBe(
        mockFace
      );
      expect(mockVideoRecorder.stop).toHaveBeenCalledTimes(1);
    });

    it('should reach checkMatch state after detectFaceAndMatchOval does not match', async () => {
      mockedHelpers.getFaceMatchStateInLivenessOval.mockImplementation(
        () => FaceMatchState.TOO_CLOSE
      );

      await transitionToRecording(service);
      await flushPromises(); // checkFaceDetected
      jest.advanceTimersToNextTimer(); // ovalMatching

      await flushPromises();
      expect(service.state.value).toEqual({ recording: 'checkMatch' });

      jest.advanceTimersToNextTimer();
      expect(service.state.value).toEqual({ recording: 'checkMatch' });
      expect(
        service.state.context.faceMatchAssociatedParams.faceMatchState
      ).toBe(FaceMatchState.TOO_CLOSE);
      expect(
        service.state.context.faceMatchAssociatedParams.faceMatchCount
      ).toBe(0);
    });
  });

  describe('uploading', () => {
    it('should reach checkSucceeded state after putLivenessVideo success and check success', async () => {
      Date.now = jest.fn(() => testTimestampMs);
      (mockFlowProps.onGetLivenessDetection as jest.Mock).mockResolvedValue({
        isLive: true,
      });

      await transitionToUploading(service);

      await flushPromises();
      expect(service.state.value).toEqual('checkSucceeded');
      expect(mockVideoRecorder.getBlob).toHaveBeenCalledTimes(1);
      expect(mockVideoRecorder.destroy).toHaveBeenCalledTimes(1);
      expect(mockFlowProps.onSuccess).toHaveBeenCalledTimes(1);
      expect(
        mockLivenessPredictionsProvider.putLivenessVideo
      ).toHaveBeenCalledWith({
        livenessActionDocument:
          '{"deviceInformation":{"videoHeight":480,"videoWidth":640},"challenges":[{"type":"FACE_MOVEMENT","faceMovementChallenge":{"initialFacePosition":{"height":100,"width":100,"top":200,"left":390},"targetFacePosition":{"height":100,"width":100,"top":0,"left":0},"recordingTimestamps":{"videoStart":1640995200000,"initialFaceDetected":1640995200000,"faceDetectedInTargetPositionStart":1640995200000,"faceDetectedInTargetPositionEnd":1640995200000}}}]}',
        sessionId: 'some-sessionId',
        videoBlob: undefined,
      });
    });

    it('should reach checkFailed state after putLivenessVideo success and check fail', async () => {
      (mockFlowProps.onGetLivenessDetection as jest.Mock).mockResolvedValue({
        isLive: false,
      });

      await transitionToUploading(service);

      await flushPromises();
      expect(service.state.value).toEqual('checkFailed');
      expect(mockVideoRecorder.getBlob).toHaveBeenCalledTimes(1);
    });

    it('should reach checkSucceeded state after putLivenessVideo success and check success', async () => {
      const error = new Error('another-error');
      (mockFlowProps.onGetLivenessDetection as jest.Mock).mockRejectedValue(
        error
      );

      await transitionToUploading(service);

      await flushPromises();
      expect(service.state.value).toEqual('error');
      expect(service.state.context.errorState).toBe(
        LivenessErrorState.RUNTIME_ERROR
      );
      expect(mockFlowProps.onError).toHaveBeenCalledTimes(1);
      expect(mockFlowProps.onError).toHaveBeenCalledWith(error);
    });
  });
});
