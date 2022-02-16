import { interpret } from 'xstate';

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
  const mockVideoRecorder: any = {
    start: jest.fn(),
    stop: jest.fn(),
    getBlob: jest.fn(),
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
    clientActionDocument:
      '{"ovalScaleFactor":{"width":0.99128836,"centerX":0.6928889,"centerY":0.35304242}}',
    onGetLivenessDetection: jest.fn(),
    onError: jest.fn(),
    onExit: jest.fn(),
    onSuccess: jest.fn(),
    onUserCancel: jest.fn(),
    onUserPermissionDeined: jest.fn(),
    onUserTimeout: jest.fn(),
  };

  const videoEl = document.createElement('video');
  const canvasEl = document.createElement('canvas');
  const videoMediaStream = {
    getTracks: () => [{ getSettings: () => ({ width: 640, height: 480 }) }],
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

  function transitionToRecording(service) {
    service.start();
    service.send('BEGIN');
    service.send('PERMISSION_GRANTED');
    service.send({
      type: 'START_RECORDING',
      data: {
        videoEl,
        canvasEl,
        videoMediaStream,
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
    transitionToRecording(service);
    await flushPromises(); // checkFaceDetected
    jest.advanceTimersToNextTimer(); // ovalMatching
    await flushPromises(); // checkMatch
    await advanceMinFaceMatches();
    jest.advanceTimersToNextTimer(); // upload-pending
  }

  beforeEach(() => {
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
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it('should be in the idle state', () => {
    const service = interpret(machine).start();
    expect(service.state.value).toBe('start');
  });

  it('should reach userCancel state on CANCEL', () => {
    const service = interpret(machine).start();
    service.send('CANCEL');

    expect(service.state.value).toBe('userCancel');
    expect(mockFlowProps.onUserCancel).toHaveBeenCalledTimes(1);
  });

  it('should reach permissionCheck state on BEGIN from start', () => {
    const service = interpret(machine).start();
    service.send('BEGIN');

    expect(service.state.value).toBe('permissionCheck');
    expect(
      service.state.context.ovalAssociatedParams.faceDetector
    ).toBeDefined();
  });

  it('should reach permissionDenied state on PERMISSION_DENIED from permissionCheck', () => {
    const service = interpret(machine).start();
    service.send('BEGIN');
    service.send('PERMISSION_DENIED');

    expect(service.state.value).toBe('permissionDenied');
    expect(mockFlowProps.onUserPermissionDeined).toHaveBeenCalledTimes(1);
  });

  it('should reach notRecording state on PERMISSION_GRANTED from permissionCheck', () => {
    const service = interpret(machine).start();
    service.send('BEGIN');
    service.send('PERMISSION_GRANTED');

    expect(service.state.value).toBe('notRecording');
  });

  describe('recording', () => {
    it('should reach ovalDrawing state on START_RECORDING and respect ovalDrawingTimeout', () => {
      const service = interpret(machine);
      transitionToRecording(service);

      expect(service.state.value).toEqual({ recording: 'ovalDrawing' });
      expect(service.state.context.videoAssociatedParams.videoEl).toBe(videoEl);
      expect(service.state.context.videoAssociatedParams.canvasEl).toBe(
        canvasEl
      );
      expect(service.state.context.videoAssociatedParams.videoMediaStream).toBe(
        videoMediaStream
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
      const service = interpret(machine);
      transitionToRecording(service);

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

      service.stop();
    });

    it('should reach checkFaceDetected again if no face is detected', async () => {
      mockBlazeFace.detectFaces.mockResolvedValue([]);
      mockedHelpers.estimateIllumination.mockImplementation(
        () => IlluminationState.BRIGHT
      );

      const service = interpret(machine);
      transitionToRecording(service);

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

      service.stop();
    });

    it('should reach error state after detectInitialFaceAndDrawOval error', async () => {
      const error = new Error('some-error');
      mockBlazeFace.detectFaces.mockRejectedValue(error);

      const service = interpret(machine);
      transitionToRecording(service);

      await flushPromises();
      expect(service.state.value).toEqual('error');
      expect(service.state.context.errorState).toBe(
        LivenessErrorState.RUNTIME_ERROR
      );
      expect(mockFlowProps.onError).toHaveBeenCalledTimes(1);
      expect(mockFlowProps.onError).toHaveBeenCalledWith(error);
    });

    it('should reach uploading-pending state after detectFaceAndMatchOval success', async () => {
      const service = interpret(machine);
      transitionToRecording(service);
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

      const service = interpret(machine);
      transitionToRecording(service);
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

      const service = interpret(machine);
      await transitionToUploading(service);

      await flushPromises();
      expect(service.state.value).toEqual('checkSucceeded');
      expect(mockVideoRecorder.getBlob).toHaveBeenCalledTimes(1);
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

      const service = interpret(machine);
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

      const service = interpret(machine);
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
