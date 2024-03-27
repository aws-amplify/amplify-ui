import { interpret } from 'xstate';
import { setImmediate } from 'timers';

import { livenessMachine } from '../machine';
import {
  FaceLivenessDetectorProps,
  FaceMatchState,
  LivenessErrorState,
  LivenessInterpreter,
  IlluminationState,
} from '../../types';
import * as helpers from '../../utils';
import {
  mockSessionInformation,
  mockBlazeFace,
  mockVideoConstraints,
  mockCameraDevice,
  mockFace,
  mockVideoMediaStream,
  mockOvalDetails,
  mockStreamRecorder,
} from '../../utils/__mocks__/testUtils';

jest.useFakeTimers();
jest.mock('../../utils');

const mockedHelpers = helpers as jest.Mocked<typeof helpers>;
const flushPromises = () => new Promise(setImmediate);

describe('Liveness Machine', () => {
  const mockNavigatorMediaDevices: any = {
    getUserMedia: jest.fn(),
    enumerateDevices: jest.fn(),
  };

  const mockColorDisplay: any = {
    startSequences: jest.fn().mockResolvedValue(true),
  };

  const mockComponentProps: FaceLivenessDetectorProps = {
    sessionId: 'some-sessionId',
    region: 'us-east-1',
    onAnalysisComplete: jest.fn(),
    onError: jest.fn(),
    onUserCancel: jest.fn(),
    config: {},
  };

  const mockVideoEl = document.createElement('video');
  const mockCanvasEl = document.createElement('canvas');
  const mockFreshnessColorEl = document.createElement('canvas');
  window.HTMLMediaElement.prototype.pause = () => jest.fn();

  const machine = livenessMachine.withContext({
    ...livenessMachine.context,
    colorSequenceDisplay: mockColorDisplay,
    componentProps: mockComponentProps,
    maxFailedAttempts: 1,
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
    shouldDisconnect: false,
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
    jest.advanceTimersToNextTimer(); // delayBeforeFlash
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

    mockedHelpers.createStreamingClient.mockResolvedValue({
      getResponseStream: jest.fn().mockResolvedValue([
        {
          options: {
            messageStream: {
              options: {
                inputStream: {},
                decoder: {
                  headerMarshaller: {},
                  messageBuffer: [],
                  isEndOfStream: false,
                },
              },
            },
          },
        },
      ]),
    });

    mockedHelpers.createRequestStreamGenerator.mockReturnValue({
      getRequestStream: jest.fn(),
    });

    (mockStreamRecorder.getChunksLength as jest.Mock).mockReturnValue(10);
    mockedHelpers.createSessionStartEvent.mockReturnValue({
      Challenge: {
        FaceMovementAndLightChallenge: {
          ChallengeId: 'challengeId',
          VideoStartTimestamp: 7289129192,
          InitialFace: {
            InitialFaceDetectedTimestamp: 7182891982012,
            BoundingBox: {
              Height: -0.4166666666666667,
              Left: 0.6875,
              Top: 0.4166666666666667,
              Width: 0,
            },
          },
        },
      },
    });
    mockedHelpers.BlazeFaceFaceDetection.mockImplementation(
      () => mockBlazeFace
    );
    mockedHelpers.StreamRecorder.mockImplementation(() => mockStreamRecorder);
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

    mockedHelpers.ColorSequenceDisplay.mockImplementation(
      () => mockColorDisplay
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
    expect(mockComponentProps.onUserCancel).toHaveBeenCalledTimes(1);
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
        video: mockVideoConstraints,
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
          video: mockVideoConstraints,
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

      service.send({ type: 'BEGIN' });

      expect(service.state.value).toEqual('detectFaceBeforeStart');
      await flushPromises(); // checkFaceDetectedBeforeStart
      expect(service.state.value).toBe('checkFaceDetectedBeforeStart');
      jest.advanceTimersToNextTimer(); // detectFaceDistanceBeforeRecording
      expect(service.state.value).toBe('detectFaceDistanceBeforeRecording');
      await flushPromises(); // checkFaceDistanceBeforeRecording
      expect(service.state.value).toBe('checkFaceDistanceBeforeRecording');
      jest.advanceTimersToNextTimer(); // initializeLivenessStream
      expect(service.state.value).toBe('initializeLivenessStream');
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
      expect(service.state.context.errorState).toBeUndefined();

      jest.advanceTimersToNextTimer();
      expect(service.state.value).toEqual('timeout');
      expect(service.state.context.errorState).toBe(LivenessErrorState.TIMEOUT);
      await flushPromises();
      expect(mockComponentProps.onError).toHaveBeenCalledTimes(1);
    });

    it('should reach ovalMatching state after detectInitialFaceAndDrawOval success and timeout', async () => {
      await transitionToRecording(service);
      await flushPromises();

      expect(service.state.value).toEqual({ recording: 'checkFaceDetected' });

      jest.advanceTimersToNextTimer();
      expect(service.state.value).toEqual({
        recording: 'checkRecordingStarted',
      });
      jest.advanceTimersToNextTimer();
      expect(service.state.value).toEqual({ recording: 'ovalMatching' });

      expect(
        service.state.context.faceMatchAssociatedParams!.faceMatchState
      ).toBe(FaceMatchState.FACE_IDENTIFIED);
      expect(service.state.context.ovalAssociatedParams!.ovalDetails).toBe(
        mockOvalDetails
      );
      expect(service.state.context.ovalAssociatedParams!.initialFace).toBe(
        mockFace
      );

      await flushPromises();
      expect(service.state.value).toEqual({ recording: 'checkMatch' });

      jest.advanceTimersToNextTimer();
      expect(service.state.value).toEqual({ recording: 'delayBeforeFlash' });

      jest.runAllTimers();
      expect(service.state.value).toEqual({
        recording: 'flashFreshnessColors',
      });

      jest.advanceTimersToNextTimer();
      await flushPromises();
      expect(service.state.value).toEqual({
        uploading: 'waitForDisconnectEvent',
      });

      jest.runAllTimers();
      expect(service.state.value).toEqual('timeout');

      expect(service.state.context.errorState).toBe(
        LivenessErrorState.SERVER_ERROR
      );
      await flushPromises();
      expect(mockComponentProps.onError).toHaveBeenCalledTimes(1);
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
      expect(mockComponentProps.onError).toHaveBeenCalledTimes(1);
      const livenessError = (mockComponentProps.onError as jest.Mock).mock
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
      expect(mockComponentProps.onError).toHaveBeenCalledTimes(1);
      const livenessError = (mockComponentProps.onError as jest.Mock).mock
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
        expect(mockStreamRecorder.dispatchStreamEvent).toHaveBeenCalledTimes(1)
      );
      const clientInfo = (mockStreamRecorder.dispatchStreamEvent as jest.Mock)
        .mock.calls[0][0];

      const videoEl = service.state.context.videoAssociatedParams?.videoEl!;
      Object.defineProperty(videoEl, 'videoHeight', { value: 100 });
      expect(
        expect(
          clientInfo.data.Challenge.FaceMovementAndLightChallenge.InitialFace
            .BoundingBox
        ).toStrictEqual({
          Height: -0.4166666666666667,
          Left: 0.6875,
          Top: 0.4166666666666667,
          Width: 0,
        })
      );
    });

    it('should reach delayBeforeFlash state after detectFaceAndMatchOval success', async () => {
      await transitionToRecording(service);
      await flushPromises(); // detectInitialFaceAndDrawOval
      jest.advanceTimersToNextTimer(); // checkFaceDetected
      jest.advanceTimersToNextTimer(); // checkRecordingStarted

      await advanceMinFaceMatches(); // detectFaceAndMatchOval

      expect(service.state.value).toEqual({
        recording: 'delayBeforeFlash',
      });
      expect(
        service.state.context.faceMatchAssociatedParams!.faceMatchState
      ).toBe(FaceMatchState.MATCHED);
      expect(service.state.context.faceMatchAssociatedParams!.endFace).toBe(
        mockFace
      );
    });

    it('should reach flashFreshnessColors state after detectFaceAndMatchOval success and delayBeforeFlash', async () => {
      await transitionToRecording(service);
      await flushPromises(); // detectInitialFaceAndDrawOval
      jest.advanceTimersToNextTimer(); // checkFaceDetected
      jest.advanceTimersToNextTimer(); // checkRecordingStarted

      await advanceMinFaceMatches(); // detectFaceAndMatchOval
      jest.advanceTimersToNextTimer(); // delayBeforeFlash

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
      jest.advanceTimersToNextTimer(); // delayBeforeFlash
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
      expect(mockStreamRecorder.dispatchStreamEvent).toHaveBeenCalledTimes(3);
    });

    it('should reach checkMatch state after detectFaceAndMatchOval does not match', async () => {
      mockedHelpers.getFaceMatchStateInLivenessOval.mockImplementation(() => {
        const faceMatchState = FaceMatchState.OFF_CENTER;
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
      ).toBe(FaceMatchState.OFF_CENTER);
    });
  });

  describe('uploading', () => {
    it('should reach waitForDisconnectEvent state after stopping video', async () => {
      (mockComponentProps.onAnalysisComplete as jest.Mock).mockResolvedValue({
        isLive: true,
      });

      await transitionToUploading(service);

      await flushPromises(); // stopVideo
      expect(service.state.value).toEqual({
        uploading: 'waitForDisconnectEvent',
      });
      expect(mockStreamRecorder.stopRecording).toHaveBeenCalledTimes(1);
      expect(mockStreamRecorder.dispatchStreamEvent).toHaveBeenCalledTimes(3);
    });

    it('should reach getLivenessResult state after receiving disconnect event', async () => {
      (mockComponentProps.onAnalysisComplete as jest.Mock).mockResolvedValue({
        isLive: true,
      });

      await transitionToUploading(service);

      await flushPromises(); // stopVideo
      service.send({ type: 'DISCONNECT_EVENT' });
      jest.advanceTimersToNextTimer(); // waitForDisconnect
      expect(service.state.value).toEqual({
        uploading: 'getLivenessResult',
      });

      expect(mockStreamRecorder.stopRecording).toHaveBeenCalledTimes(1);
      expect(mockStreamRecorder.dispatchStreamEvent).toHaveBeenCalledTimes(3);
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
      expect(mockComponentProps.onError).toHaveBeenCalledTimes(1);
    });

    it('should reach error state after getLiveness returns error', async () => {
      const error = new Error();
      error.name = LivenessErrorState.SERVER_ERROR;
      (mockComponentProps.onAnalysisComplete as jest.Mock).mockRejectedValue(
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
      expect(mockComponentProps.onError).toHaveBeenCalledTimes(1);
      const livenessError = (mockComponentProps.onError as jest.Mock).mock
        .calls[0][0];
      expect(livenessError.state).toBe(LivenessErrorState.SERVER_ERROR);
    });

    it('should reach error state if no chunks are recorded', async () => {
      const error = new Error('Video chunks not recorded successfully.');
      error.name = LivenessErrorState.RUNTIME_ERROR;

      (mockStreamRecorder.getChunksLength as jest.Mock).mockReturnValue(0);
      await transitionToUploading(service);

      await flushPromises(); // stopVideo

      expect(service.state.value).toEqual('error');
      expect(service.state.context.errorState).toBe(
        LivenessErrorState.RUNTIME_ERROR
      );
      expect(mockComponentProps.onError).toHaveBeenCalledTimes(1);
      expect(mockComponentProps.onError).toHaveBeenCalledWith({
        state: LivenessErrorState.RUNTIME_ERROR,
        error,
      });
    });
  });
});
