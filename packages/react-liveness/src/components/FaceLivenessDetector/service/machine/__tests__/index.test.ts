/* eslint-disable */
import { interpret } from 'xstate';
import { setImmediate } from 'timers';

import { livenessMachine } from '..';
import {
  FaceLivenessDetectorProps,
  FaceMatchState,
  Face,
  LivenessErrorState,
  LivenessInterpreter,
  LivenessOvalDetails,
  IlluminationState,
} from '../../types';
import * as helpers from '../../utils';
import {
  mockLivenessStreamProvider,
  mockSessionInformation,
  mockVideoRecorder,
} from '../../utils/__mocks__/testUtils';
import { STATIC_VIDEO_CONSTRAINTS } from '../../../utils/helpers';

jest.useFakeTimers();
jest.mock('../../utils');

const mockedHelpers = helpers as jest.Mocked<typeof helpers>;
const flushPromises = () => new Promise(setImmediate);
const testTimestampMs = 1640995200000;

describe('Liveness Machine', () => {
  const mockNavigatorMediaDevices: any = {
    getUserMedia: jest.fn(),
    enumerateDevices: jest.fn(),
  };
  const mockBlazeFace: any = {
    modelLoadingPromise: Promise.resolve(),
    triggerModelLoading: jest.fn(),
    loadModels: jest.fn(),
    detectFaces: jest.fn(),
  };
  const mockFreshnessColorDisplay: any = {
    displayColorTick: () => true,
  };

  const mockcomponentProps: FaceLivenessDetectorProps = {
    sessionId: 'some-sessionId',
    region: 'us-east-1',
    onAnalysisComplete: jest.fn(),
    onError: jest.fn(),
    onUserCancel: jest.fn(),
    config: {},
  };

  const mockVideoConstaints: MediaTrackConstraints = {
    deviceId: 'some-device-id',
    ...STATIC_VIDEO_CONSTRAINTS,
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
  const mockFreshnessColorEl = document.createElement('canvas');
  window.HTMLMediaElement.prototype.pause = () => jest.fn();

  const mockVideoTrack = {
    getSettings: () => ({
      width: 640,
      height: 480,
      deviceId: mockCameraDevice.deviceId,
      frameRate: 30,
    }),
    stop: jest.fn(),
  } as any as MediaStreamTrack;

  const mockVideoMediaStream = {
    getTracks: () => [mockVideoTrack],
  } as MediaStream;

  const mockFace: Face = {
    height: 100,
    width: 100,
    left: 150,
    top: 200,
    timestampMs: testTimestampMs,
    rightEye: [200, 200],
    leftEye: [200, 200],
    mouth: [200, 200],
    nose: [200, 200],
    rightEar: [200, 200],
    leftEar: [200, 200],
  };
  const mockOvalDetails: LivenessOvalDetails = {
    height: 100,
    width: 100,
    flippedCenterX: 50,
    centerX: 50,
    centerY: 50,
  };

  const machine = livenessMachine.withContext({
    ...livenessMachine.context,
    componentProps: mockcomponentProps,
    maxFailedAttempts: 1,
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
  });

  let service: LivenessInterpreter;

  function transitionToCameraCheck(service: LivenessInterpreter) {
    service.start();
    service.send({
      type: 'BEGIN',
    });
  }

  async function transitionToInitializeLivenessStream(
    service: LivenessInterpreter
  ) {
    transitionToCameraCheck(service);
    await flushPromises(); // waitForDOMAndCameraDetails

    service.send({
      type: 'SET_DOM_AND_CAMERA_DETAILS',
      data: {
        videoEl: mockVideoEl,
        canvasEl: mockCanvasEl,
        freshnessColorEl: mockFreshnessColorEl,
      },
    });
    jest.advanceTimersToNextTimer(); // start

    service.send({
      type: 'BEGIN',
    });
    await flushPromises(); // checkFaceDetectedBeforeStart
    jest.advanceTimersToNextTimer(); // detectFaceDistanceBeforeRecording
    await flushPromises(); // checkFaceDistanceBeforeRecording
    jest.advanceTimersToNextTimer(); // initializeLivenessStream
  }
  async function transitionToRecording(service: LivenessInterpreter) {
    await transitionToInitializeLivenessStream(service);
    await flushPromises(); // notRecording: 'waitForSessionInfo'

    service.send({
      type: 'SET_SESSION_INFO',
      data: {
        sessionInfo: mockSessionInformation,
      },
    });
    jest.advanceTimersToNextTimer(); // "recording": "ovalDrawing",
  }

  async function advanceMinFaceMatches() {
    await flushPromises();
    jest.advanceTimersToNextTimer();
  }

  async function transitionToUploading(service: LivenessInterpreter) {
    await transitionToRecording(service);
    await flushPromises(); // detectInitialFaceAndDrawOval
    jest.advanceTimersToNextTimer(); // checkFaceDetected
    jest.advanceTimersToNextTimer(); // checkRecordingStarted
    await advanceMinFaceMatches(); // detectFaceAndMatchOval
    await flushPromises(); // flashFreshnessColors
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
    (mockVideoRecorder.getVideoChunkSize as jest.Mock).mockReturnValue(10);
    mockedHelpers.BlazeFaceFaceDetection.mockImplementation(
      () => mockBlazeFace
    );
    mockedHelpers.LivenessStreamProvider.mockImplementation(
      () => mockLivenessStreamProvider
    );
    mockedHelpers.drawLivenessOvalInCanvas.mockImplementation(() => {});
    mockedHelpers.estimateIllumination.mockImplementation(
      () => IlluminationState.NORMAL
    );
    mockedHelpers.getOvalDetailsFromSessionInformation.mockImplementation(
      () => mockOvalDetails
    );
    mockedHelpers.getFaceMatchStateInLivenessOval.mockImplementation(() => {
      const faceMatchState = FaceMatchState.MATCHED;
      const faceMatchPercentage = 100;
      return { faceMatchState, faceMatchPercentage };
    });

    mockedHelpers.FreshnessColorDisplay.mockImplementation(
      () => mockFreshnessColorDisplay
    );

    mockBlazeFace.detectFaces.mockResolvedValue([mockFace]);

    service = interpret(machine) as unknown as LivenessInterpreter;
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    service.stop();
  });

  it('should be in the cameraCheck state', () => {
    service.start();
    expect(service.state.value).toBe('cameraCheck');
  });

  it('should reach start state on CANCEL', async () => {
    service.start();
    service.send('CANCEL');
    await flushPromises();

    expect(service.state.value).toBe('waitForDOMAndCameraDetails');
    expect(mockcomponentProps.onUserCancel).toHaveBeenCalledTimes(1);
  });

  describe('cameraCheck', () => {
    it('should reach waitForDOMAndCameraDetails state on checkVirtualCameraAndGetStream success', async () => {
      transitionToCameraCheck(service);

      await flushPromises();
      expect(service.state.value).toBe('waitForDOMAndCameraDetails');
      expect(
        service.state.context.videoAssociatedParams!.videoMediaStream
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

    it('should reach waitForDOMAndCameraDetails state on checkVirtualCameraAndGetStream success when initialStream is not from real device', async () => {
      const mockVirtualMediaStream = {
        getTracks: () => [
          {
            getSettings: () => ({
              width: 640,
              height: 480,
              deviceId: 'some-device-id',
              frameRate: 30,
            }),
          },
        ],
      } as MediaStream;
      mockNavigatorMediaDevices.getUserMedia
        .mockResolvedValueOnce(mockVirtualMediaStream)
        .mockResolvedValueOnce(mockVideoMediaStream);

      transitionToCameraCheck(service);

      await flushPromises();
      expect(service.state.value).toBe('waitForDOMAndCameraDetails');
      expect(
        service.state.context.videoAssociatedParams!.videoMediaStream?.getTracks
      ).toBeDefined();
      expect(mockNavigatorMediaDevices.getUserMedia).toHaveBeenNthCalledWith(
        1,
        {
          video: mockVideoConstaints,
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

    it('should reach permissionDenied state on checkVirtualCameraAndGetStream failure due to no device with 15 fps', async () => {
      mockNavigatorMediaDevices.getUserMedia.mockResolvedValueOnce({
        getTracks: () => [
          {
            getSettings: () => ({
              width: 640,
              height: 480,
              deviceId: mockCameraDevice.deviceId,
              frameRate: 10,
            }),
          },
        ],
      } as MediaStream);
      transitionToCameraCheck(service);

      await flushPromises();
      expect(service.state.value).toBe('permissionDenied');
    });

    it('should reach cameraCheck state after retrying from the permissionDenied state', async () => {
      mockNavigatorMediaDevices.getUserMedia.mockResolvedValueOnce({
        getTracks: () => [
          {
            getSettings: () => ({
              width: 640,
              height: 480,
              deviceId: mockCameraDevice.deviceId,
              frameRate: 10,
            }),
          },
        ],
      } as MediaStream);
      transitionToCameraCheck(service);

      await flushPromises();
      expect(service.state.value).toBe('permissionDenied');

      service.send({
        type: 'RETRY_CAMERA_CHECK',
      });
      expect(service.state.value).toBe('cameraCheck');
    });
  });

  describe('waitForDOMAndCameraDetails', () => {
    it('should reach waitForDOMAndCameraDetails state on after camera check', async () => {
      transitionToCameraCheck(service);
      await flushPromises(); // waitForDOMAndCameraDetails

      service.send({
        type: 'SET_DOM_AND_CAMERA_DETAILS',
        data: {
          videoEl: mockVideoEl,
          canvasEl: mockCanvasEl,
          freshnessColorEl: mockFreshnessColorEl,
        },
      });
      jest.advanceTimersToNextTimer();

      expect(service.state.value).toEqual('start');
    });
  });

  describe('detectFaceBeforeStart', () => {
    it('should reach detectFaceBeforeStart on begin button press', async () => {
      transitionToCameraCheck(service);
      await flushPromises(); // waitForDOMAndCameraDetails

      service.send({
        type: 'SET_DOM_AND_CAMERA_DETAILS',
        data: {
          videoEl: mockVideoEl,
          canvasEl: mockCanvasEl,
          freshnessColorEl: mockFreshnessColorEl,
        },
      });
      jest.advanceTimersToNextTimer(); // start

      service.send({
        type: 'BEGIN',
      });

      expect(service.state.value).toEqual('detectFaceBeforeStart');
    });

    it('should reach detectFaceBeforeStart on begin button press', async () => {
      transitionToCameraCheck(service);
      await flushPromises(); // waitForDOMAndCameraDetails

      service.send({
        type: 'SET_DOM_AND_CAMERA_DETAILS',
        data: {
          videoEl: mockVideoEl,
          canvasEl: mockCanvasEl,
          freshnessColorEl: mockFreshnessColorEl,
        },
      });
      jest.advanceTimersToNextTimer(); // start

      service.send({
        type: 'BEGIN',
      });
      await flushPromises(); // checkFaceDetectedBeforeStart
      jest.advanceTimersToNextTimer(); // detectFaceDistanceBeforeRecording
      await flushPromises(); // checkFaceDistanceBeforeRecording
      jest.advanceTimersToNextTimer(); // initializeLivenessStream
      await flushPromises(); // notRecording

      expect(service.state.value).toEqual({
        notRecording: 'waitForSessionInfo',
      });
    });
  });

  describe('notRecording', () => {
    it('should reach recording state on START_RECORDING', async () => {
      await transitionToInitializeLivenessStream(service);
      await flushPromises(); // notRecording: 'waitForSessionInfo'

      service.send({
        type: 'SET_SESSION_INFO',
        data: {
          sessionInfo: mockSessionInformation,
        },
      });
      jest.advanceTimersToNextTimer(); // "recording": "ovalDrawing",

      expect(service.state.value).toEqual({ recording: 'ovalDrawing' });
    });
  });

  describe('recording', () => {
    it('should reach ovalDrawing state as initial state and respect ovalDrawingTimeout', async () => {
      await transitionToRecording(service);

      expect(service.state.value).toEqual({ recording: 'ovalDrawing' });
      expect(service.state.context.videoAssociatedParams!.videoEl).toBe(
        mockVideoEl
      );
      expect(service.state.context.videoAssociatedParams!.canvasEl).toBe(
        mockCanvasEl
      );
      expect(
        service.state.context.videoAssociatedParams!.videoMediaStream
      ).toBe(mockVideoMediaStream);
      expect(
        service.state.context.livenessStreamProvider!.getResponseStream
      ).toHaveBeenCalledTimes(1);
      expect(service.state.context.errorState).toBeUndefined();

      jest.advanceTimersToNextTimer();
      expect(service.state.value).toEqual('timeout');
      expect(service.state.context.errorState).toBe(LivenessErrorState.TIMEOUT);
      await flushPromises();
      expect(mockcomponentProps.onError).toHaveBeenCalledTimes(1);
    });

    it('should reach ovalMatching state after detectInitialFaceAndDrawOval success and respect ovalMatchingTimeout', async () => {
      await transitionToRecording(service);
      await flushPromises();

      expect(service.state.value).toEqual({ recording: 'checkFaceDetected' });

      jest.advanceTimersToNextTimer(); // checkFaceDetected
      jest.advanceTimersToNextTimer(); // checkRecordingStarted
      expect(service.state.value).toEqual({
        recording: 'ovalMatching',
      });
      expect(
        service.state.context.faceMatchAssociatedParams!.faceMatchState
      ).toBe(FaceMatchState.FACE_IDENTIFIED);
      expect(service.state.context.ovalAssociatedParams!.ovalDetails).toBe(
        mockOvalDetails
      );
      expect(service.state.context.ovalAssociatedParams!.initialFace).toBe(
        mockFace
      );

      jest.advanceTimersToNextTimer();
      expect(service.state.value).toEqual('timeout');
      expect(service.state.context.errorState).toBe(LivenessErrorState.TIMEOUT);
      await flushPromises();
      expect(mockcomponentProps.onError).toHaveBeenCalledTimes(1);
    });

    it('should reach checkFaceDetected again if no face is detected', async () => {
      mockBlazeFace.detectFaces
        .mockResolvedValue([mockFace])
        .mockResolvedValueOnce([mockFace]) // first to pass detecting face before start
        .mockResolvedValueOnce([mockFace]) // second to pass face distance before start
        .mockResolvedValueOnce([]); // not having face in view when recording begins
      mockedHelpers.estimateIllumination.mockImplementation(
        () => IlluminationState.BRIGHT
      );
      await transitionToRecording(service);

      await flushPromises();
      expect(service.state.value).toEqual({ recording: 'checkFaceDetected' });

      jest.advanceTimersToNextTimer();
      expect(service.state.value).toEqual({ recording: 'checkFaceDetected' });
      expect(
        service.state.context.faceMatchAssociatedParams!.faceMatchState
      ).toBe(FaceMatchState.CANT_IDENTIFY);
      expect(
        service.state.context.faceMatchAssociatedParams!.illuminationState
      ).toBe(IlluminationState.BRIGHT);
    });

    it('should reach error state after detectInitialFaceAndDrawOval error', async () => {
      const error = new Error();
      error.name = LivenessErrorState.RUNTIME_ERROR;
      mockBlazeFace.detectFaces
        .mockResolvedValue([mockFace])
        .mockResolvedValueOnce([mockFace]) // first to pass detecting face before start
        .mockResolvedValueOnce([mockFace]) // second to pass face distance before start
        .mockRejectedValue(error);

      await transitionToRecording(service);

      await flushPromises();
      expect(service.state.value).toEqual('error');
      expect(service.state.context.errorState).toBe(
        LivenessErrorState.RUNTIME_ERROR
      );
      expect(mockcomponentProps.onError).toHaveBeenCalledTimes(1);
      const livenessError = (mockcomponentProps.onError as jest.Mock).mock
        .calls[0][0];
      expect(livenessError.state).toBe(LivenessErrorState.RUNTIME_ERROR);
    });

    it('should reach error state after receiving a server error from the websocket stream', async () => {
      await transitionToRecording(service);

      const error = new Error('test');
      service.send({
        type: 'SERVER_ERROR',
        data: { error },
      });
      await flushPromises();
      jest.advanceTimersToNextTimer();
      expect(service.state.value).toEqual('error');
      expect(service.state.context.errorState).toBe(
        LivenessErrorState.SERVER_ERROR
      );
      expect(mockcomponentProps.onError).toHaveBeenCalledTimes(1);
      const livenessError = (mockcomponentProps.onError as jest.Mock).mock
        .calls[0][0];
      expect(livenessError.state).toBe(LivenessErrorState.SERVER_ERROR);
    });

    it('should reach ovalMatching state and send client sessionInformation', async () => {
      await transitionToRecording(service);
      await flushPromises();
      jest.advanceTimersToNextTimer(); // checkFaceDetected
      jest.advanceTimersToNextTimer(); // checkRecordingStarted
      expect(service.state.value).toEqual({ recording: 'ovalMatching' });
      expect(
        expect(mockLivenessStreamProvider.sendClientInfo).toHaveBeenCalledTimes(
          1
        )
      );
      const clientInfo =
        mockLivenessStreamProvider.sendClientInfo.mock.calls[0][0];

      expect(
        expect(
          clientInfo.Challenge.FaceMovementAndLightChallenge.InitialFace
            .BoundingBox
        ).toStrictEqual({
          Height: 0,
          Left: 0.6875,
          Top: 0.625,
          Width: 0,
        })
      );
    });

    it('should reach flashFreshnessColors state after detectFaceAndMatchOval success', async () => {
      await transitionToRecording(service);
      await flushPromises(); // detectInitialFaceAndDrawOval
      jest.advanceTimersToNextTimer(); // checkFaceDetected
      jest.advanceTimersToNextTimer(); // checkRecordingStarted

      await advanceMinFaceMatches(); // detectFaceAndMatchOval

      expect(service.state.value).toEqual({
        recording: 'flashFreshnessColors',
      });
      expect(
        service.state.context.faceMatchAssociatedParams!.faceMatchState
      ).toBe(FaceMatchState.MATCHED);
      expect(service.state.context.faceMatchAssociatedParams!.endFace).toBe(
        mockFace
      );
    });

    it('should reach waitForDisconnect state after flashFreshnessColors', async () => {
      await transitionToRecording(service);
      await flushPromises(); // detectInitialFaceAndDrawOval
      jest.advanceTimersToNextTimer(); // checkFaceDetected
      jest.advanceTimersToNextTimer(); // checkRecordingStarted
      await advanceMinFaceMatches(); // detectFaceAndMatchOval
      await flushPromises(); // flashFreshnessColors

      expect(service.state.value).toEqual({
        uploading: 'waitForDisconnectEvent',
      });
      expect(
        service.state.context.faceMatchAssociatedParams!.faceMatchState
      ).toBe(FaceMatchState.MATCHED);
      expect(service.state.context.faceMatchAssociatedParams!.startFace).toBe(
        mockFace
      );
      expect(service.state.context.faceMatchAssociatedParams!.endFace).toBe(
        mockFace
      );
      expect(mockLivenessStreamProvider.sendClientInfo).toHaveBeenCalledTimes(
        2
      );
    });

    it('should reach checkMatch state after detectFaceAndMatchOval does not match', async () => {
      mockedHelpers.getFaceMatchStateInLivenessOval.mockImplementation(() => {
        const faceMatchState = FaceMatchState.TOO_CLOSE;
        const faceMatchPercentage = 0;
        return { faceMatchState, faceMatchPercentage };
      });

      await transitionToRecording(service);
      await flushPromises(); // detectInitialFaceAndDrawOval
      jest.advanceTimersToNextTimer(); // checkFaceDetected
      jest.advanceTimersToNextTimer(); // checkRecordingStarted

      await flushPromises();
      expect(service.state.value).toEqual({ recording: 'checkMatch' });

      jest.advanceTimersToNextTimer();
      expect(service.state.value).toEqual({ recording: 'checkMatch' });
      expect(
        service.state.context.faceMatchAssociatedParams!.faceMatchState
      ).toBe(FaceMatchState.TOO_CLOSE);
    });
  });

  describe('uploading', () => {
    it('should reach waitForDisconnectEvent state after stopping video', async () => {
      (mockcomponentProps.onAnalysisComplete as jest.Mock).mockResolvedValue({
        isLive: true,
      });

      await transitionToUploading(service);

      await flushPromises(); // stopVideo
      expect(service.state.value).toEqual({
        uploading: 'waitForDisconnectEvent',
      });
      expect(mockLivenessStreamProvider.stopVideo).toHaveBeenCalledTimes(1);
      expect(
        mockLivenessStreamProvider.dispatchStopVideoEvent
      ).toHaveBeenCalledTimes(1);
      expect(mockLivenessStreamProvider.sendClientInfo).toHaveBeenCalledTimes(
        2
      );
    });

    it('should reach getLivenessResult state after receiving disconnect event', async () => {
      (mockcomponentProps.onAnalysisComplete as jest.Mock).mockResolvedValue({
        isLive: true,
      });

      await transitionToUploading(service);

      await flushPromises(); // stopVideo
      service.send({ type: 'DISCONNECT_EVENT' });
      jest.advanceTimersToNextTimer(); // waitForDisconnect
      expect(service.state.value).toEqual({
        uploading: 'getLivenessResult',
      });

      expect(mockLivenessStreamProvider.stopVideo).toHaveBeenCalledTimes(1);
      expect(mockLivenessStreamProvider.sendClientInfo).toHaveBeenCalledTimes(
        2
      );
    });

    it('should reach timeout state if disconnect event never arrives', async () => {
      await transitionToUploading(service);
      await flushPromises(); // stopVideo
      jest.advanceTimersToNextTimer(30000); // waitForDisconnect
      expect(service.state.value).toEqual('timeout');
      expect(service.state.context.errorState).toBe(
        LivenessErrorState.SERVER_ERROR
      );
      await flushPromises();
      expect(mockcomponentProps.onError).toHaveBeenCalledTimes(1);
    });

    it('should reach error state after getLiveness returns error', async () => {
      const error = new Error();
      error.name = LivenessErrorState.SERVER_ERROR;
      (mockcomponentProps.onAnalysisComplete as jest.Mock).mockRejectedValue(
        error
      );

      await transitionToUploading(service);

      await flushPromises(); // stopVideo
      service.send({ type: 'DISCONNECT_EVENT' });
      jest.advanceTimersToNextTimer(); // waitForDisconnect
      await flushPromises(); // getLivenessResult

      expect(service.state.value).toEqual('error');
      expect(service.state.context.errorState).toBe(
        LivenessErrorState.SERVER_ERROR
      );
      expect(mockcomponentProps.onError).toHaveBeenCalledTimes(1);
      const livenessError = (mockcomponentProps.onError as jest.Mock).mock
        .calls[0][0];
      expect(livenessError.state).toBe(LivenessErrorState.SERVER_ERROR);
    });

    it('should reach error state if no chunks are recorded', async () => {
      const error = new Error('Video chunks not recorded successfully.');
      error.name = LivenessErrorState.RUNTIME_ERROR;

      (mockVideoRecorder.getVideoChunkSize as jest.Mock).mockReturnValue(0);
      await transitionToUploading(service);

      await flushPromises(); // stopVideo

      expect(service.state.value).toEqual('error');
      expect(service.state.context.errorState).toBe(
        LivenessErrorState.RUNTIME_ERROR
      );
      expect(mockcomponentProps.onError).toHaveBeenCalledTimes(1);
      expect(mockcomponentProps.onError).toHaveBeenCalledWith({
        state: LivenessErrorState.RUNTIME_ERROR,
        error,
      });
    });
  });
});
