import { interpret } from 'xstate';
import { setImmediate } from 'timers';
import { when, resetAllWhenMocks } from 'jest-when';

import {
  FaceLivenessDetectorProps,
  FaceMatchState,
  IlluminationState,
  LivenessErrorState,
  LivenessInterpreter,
} from '../../types';
import * as helpers from '../../utils';
import {
  mockBlazeFace,
  mockCameraDevice,
  mockFace,
  mockFaceMovementSessionInfo,
  mockFaceMovementServerSessionInfo,
  mockFaceMovementAndLightSessionInfo,
  mockFaceMovementAndLightServerSessionInfo,
  mockOvalDetails,
  mockStreamRecorder,
  mockVideoConstraints,
  mockVideoMediaStream,
} from '../../utils/__mocks__/testUtils';

import { livenessMachine } from '../machine';

jest.useFakeTimers();
jest.mock('../../utils');

const mockedHelpers = helpers as jest.Mocked<typeof helpers>;
const flushPromises = () => new Promise(setImmediate);

// Helper function to wait for async callbacks with fake timers
const waitForCallback = async (mockFn: jest.Mock, timeoutMs = 5000) => {
  const maxAttempts = 100; // Prevent infinite loops
  let attempts = 0;

  while (mockFn.mock.calls.length === 0 && attempts < maxAttempts) {
    // Advance any pending timers
    if (jest.getTimerCount() > 0) {
      jest.advanceTimersToNextTimer();
    }
    // Allow promises to resolve
    await flushPromises();
    attempts++;
  }

  if (mockFn.mock.calls.length === 0) {
    throw new Error(`Callback was not called within ${maxAttempts} attempts`);
  }
};

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

async function transitionToNotRecording(
  service: LivenessInterpreter,
  challengeType: string = 'FaceMovementAndLightChallenge'
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
  jest.advanceTimersToNextTimer(); // initializeLivenessStream
  await flushPromises();

  service.send({
    type: 'SET_SESSION_INFO',
    data: {
      serverSessionInformation:
        challengeType === 'FaceMovementAndLightChallenge'
          ? mockFaceMovementAndLightServerSessionInfo
          : mockFaceMovementServerSessionInfo,
    },
  });
  jest.advanceTimersToNextTimer(); // detectFaceBeforeStart
}

async function transitionToRecording(
  service: LivenessInterpreter,
  challengeType: string = 'FaceMovementAndLightChallenge'
) {
  await transitionToNotRecording(service, challengeType);
  service.send({
    type: 'BEGIN',
  });
  await flushPromises(); // checkFaceDetectedBeforeStart
  jest.advanceTimersToNextTimer(); // detectFaceDistanceBeforeRecording
  await flushPromises(); // checkFaceDistanceBeforeRecording
  jest.advanceTimersToNextTimer(); // initializeLivenessStream
  await flushPromises(); // notRecording: 'waitForSessionInfo'
}

async function advanceMinFaceMatches() {
  await flushPromises();
  jest.advanceTimersToNextTimer();
}

async function transitionToUploading(service: LivenessInterpreter) {
  await transitionToRecording(service);
  await flushPromises(); // detectInitialFaceAndDrawOval
  jest.advanceTimersToNextTimer(); // checkFaceDetected
  jest.advanceTimersToNextTimer(); // cancelOvalDrawingTimeout
  jest.advanceTimersToNextTimer(); // checkRecordingStarted
  await advanceMinFaceMatches(); // detectFaceAndMatchOval
  jest.advanceTimersToNextTimer(); // delayBeforeFlash
  await flushPromises(); // flashFreshnessColors
}

describe('Liveness Machine', () => {
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

    mockedHelpers.createSessionInfoFromServerSessionInformation.mockReturnValue(
      mockFaceMovementAndLightSessionInfo
    );

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

    service = interpret(machine);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    resetAllWhenMocks();
    service.stop();

    // Clear localStorage to prevent state leakage between tests
    localStorage.clear();

    // Reset navigator mocks to default state
    mockNavigatorMediaDevices.getUserMedia.mockResolvedValue(
      mockVideoMediaStream
    );
    mockNavigatorMediaDevices.enumerateDevices.mockResolvedValue([
      mockCameraDevice,
    ]);
  });

  it('should be in the cameraCheck state', () => {
    service.start();
    expect(service.state.value).toStrictEqual({ initCamera: 'cameraCheck' });
  });

  it('should reach start state on CANCEL', async () => {
    service.start();
    service.send('CANCEL');
    await flushPromises();

    expect(service.state.value).toStrictEqual({
      initCamera: 'waitForDOMAndCameraDetails',
    });
    expect(mockComponentProps.onUserCancel).toHaveBeenCalledTimes(1);
  });

  describe('cameraCheck', () => {
    it('should reach waitForDOMAndCameraDetails state on checkVirtualCameraAndGetStream success', async () => {
      transitionToCameraCheck(service);

      await flushPromises();
      expect(service.state.value).toStrictEqual({
        initCamera: 'waitForDOMAndCameraDetails',
      });
      expect(
        service.state.context.videoAssociatedParams!.videoMediaStream
      ).toEqual(mockVideoMediaStream);
      expect(mockNavigatorMediaDevices.getUserMedia).toHaveBeenCalledWith({
        video: mockVideoConstraints,
        // video: {
        //   ...mockVideoConstraints,
        //   deviceId: { exact: 'some-device-id' },
        // },
        audio: false,
      });
      expect(mockNavigatorMediaDevices.enumerateDevices).toHaveBeenCalledTimes(
        1
      );
      expect(mockedHelpers.isCameraDeviceVirtual).toHaveBeenCalled();
    });

    it('should select provided default deviceId when available', async () => {
      const defaultDeviceId = 'my-device-id';
      const mockStreamFromDefault = {
        getTracks: () => [
          {
            getSettings: () => ({
              width: 640,
              height: 480,
              deviceId: defaultDeviceId,
              frameRate: 30,
            }),
          },
        ],
      } as unknown as MediaStream;

      // Override machine context to pass deviceId via component props
      const machineWithDefault = livenessMachine.withContext({
        ...livenessMachine.context,
        componentProps: { ...mockComponentProps, deviceId: defaultDeviceId },
      });
      const localService = interpret(machineWithDefault);

      // getUserMedia should be called once with exact deviceId and succeed
      mockNavigatorMediaDevices.getUserMedia.mockResolvedValueOnce(
        mockStreamFromDefault
      );
      mockNavigatorMediaDevices.enumerateDevices.mockResolvedValueOnce([
        { ...mockCameraDevice, deviceId: defaultDeviceId },
      ]);

      // Begin
      localService.start();
      localService.send({ type: 'BEGIN' });

      await flushPromises();

      expect(localService.state.value).toStrictEqual({
        initCamera: 'waitForDOMAndCameraDetails',
      });
      // Verify constraints include exact deviceId
      expect(mockNavigatorMediaDevices.getUserMedia).toHaveBeenCalledWith({
        video: {
          ...mockVideoConstraints,
          deviceId: { exact: defaultDeviceId },
        },
        audio: false,
      });
      // Selected device in context should be the default deviceId
      expect(
        localService.state.context.videoAssociatedParams?.selectedDeviceId
      ).toBe(defaultDeviceId);

      localService.stop();
    });

    it('should set DEFAULT_CAMERA_NOT_FOUND_ERROR when provided deviceId is not found', async () => {
      const missingDeviceId = 'missing-device-id';

      const machineWithMissing = livenessMachine.withContext({
        ...livenessMachine.context,
        componentProps: { ...mockComponentProps, deviceId: missingDeviceId },
      });
      const localService = interpret(machineWithMissing);

      // First call rejects due to OverconstrainedError for the specified device
      const overconstrainedErr = new DOMException(
        'Constraints unsatisfied',
        'OverconstrainedError'
      );
      mockNavigatorMediaDevices.getUserMedia
        .mockRejectedValueOnce(overconstrainedErr)
        // Fallback succeeds without deviceId constraint
        .mockResolvedValueOnce({
          getTracks: () => [
            {
              getSettings: () => ({
                deviceId: 'fallback-device',
                frameRate: 30,
              }),
            },
          ],
        } as unknown as MediaStream);

      mockNavigatorMediaDevices.enumerateDevices.mockResolvedValueOnce([
        { ...mockCameraDevice, deviceId: 'fallback-device' },
      ]);

      localService.start();
      localService.send({ type: 'BEGIN' });

      await flushPromises();

      // Should transition to permissionDenied and call error callback with DEFAULT_CAMERA_NOT_FOUND_ERROR
      expect(localService.state.value).toBe('permissionDenied');
      expect(localService.state.context.errorState).toBe(
        LivenessErrorState.DEFAULT_CAMERA_NOT_FOUND_ERROR
      );
      expect(mockComponentProps.onError).toHaveBeenCalledTimes(1);
      const reportedError = (mockComponentProps.onError as jest.Mock).mock
        .calls[0][0];
      expect(reportedError.state).toBe(
        LivenessErrorState.DEFAULT_CAMERA_NOT_FOUND_ERROR
      );

      localService.stop();
    });

    it('should reach waitForDOMAndCameraDetails state on checkVirtualCameraAndGetStream success when initialStream is not from real device', async () => {
      // Reset mocks to ensure test isolation
      jest.clearAllMocks();

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
      mockNavigatorMediaDevices.enumerateDevices.mockResolvedValue([
        mockCameraDevice,
      ]);

      transitionToCameraCheck(service);

      await flushPromises();
      expect(service.state.value).toStrictEqual({
        initCamera: 'waitForDOMAndCameraDetails',
      });
      expect(
        service.state.context.videoAssociatedParams!.videoMediaStream?.getTracks
      ).toBeDefined();
      expect(mockNavigatorMediaDevices.getUserMedia).toHaveBeenNthCalledWith(
        1,
        {
          video: mockVideoConstraints,
          // video: {
          //   ...mockVideoConstraints,
          //   deviceId: { exact: 'some-device-id' },
          // },
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
      expect(service.state.value).toStrictEqual({ initCamera: 'cameraCheck' });
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

      expect(service.state.value).toStrictEqual({
        initWebsocket: 'initializeLivenessStream',
      });
    });
  });

  describe('detectFaceBeforeStart', () => {
    it('should reach detectFaceBeforeStart on begin button press', async () => {
      await transitionToNotRecording(service);

      service.send({ type: 'BEGIN' });

      expect(service.state.value).toEqual('detectFaceBeforeStart');
    });

    it('should reach recording state after detecting face with FaceMovementAndLight challenge', async () => {
      await transitionToNotRecording(service);

      service.send({ type: 'BEGIN' });
      await flushPromises(); // checkFaceDetectedBeforeStart
      expect(service.state.value).toBe('checkFaceDetectedBeforeStart');
      jest.advanceTimersToNextTimer(); // detectFaceDistanceBeforeRecording
      expect(service.state.value).toBe('detectFaceDistanceBeforeRecording');
      await flushPromises(); // checkFaceDistanceBeforeRecording
      expect(service.state.value).toBe('checkFaceDistanceBeforeRecording');
      jest.advanceTimersToNextTimer(); // initializeLivenessStream
      expect(service.state.value).toEqual({
        recording: 'ovalDrawing',
      });
    });

    it('should reach recording state after detecting face with FaceMovement challenge', async () => {
      mockedHelpers.createSessionInfoFromServerSessionInformation.mockReturnValue(
        mockFaceMovementSessionInfo
      );
      await transitionToNotRecording(service, 'FaceMovementChallenge');

      service.send({ type: 'BEGIN' });
      await flushPromises(); // checkFaceDetectedBeforeStart
      expect(service.state.value).toBe('checkFaceDetectedBeforeStart');
      jest.advanceTimersToNextTimer(); // detectFaceDistanceBeforeRecording
      expect(service.state.value).toBe('detectFaceDistanceBeforeRecording');
      await flushPromises(); // checkFaceDistanceBeforeRecording
      expect(service.state.value).toBe('checkFaceDistanceBeforeRecording');
      jest.advanceTimersToNextTimer(); // initializeLivenessStream
      expect(service.state.value).toEqual({ recording: 'ovalDrawing' });
    });
  });

  describe('notRecording', () => {
    it('should reach recording state on START_RECORDING', async () => {
      await transitionToNotRecording(service);
      await flushPromises(); // notRecording: 'waitForSessionInfo'

      expect(service.state.value).toEqual('start');
    });
  });

  describe('recording', () => {
    describe('FaceMovementAndLightChallenge', () => {
      it('should handle timeout during recording as expected', async () => {
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
      expect(service.state.value).toEqual('error');
      expect(service.state.context.errorState).toBe(
        LivenessErrorState.RUNTIME_ERROR
      );
      await flushPromises();
      expect(mockcomponentProps.onError).toHaveBeenCalledTimes(1);
    });

    it('should reach ovalMatching state after detectInitialFaceAndDrawOval success and respect ovalMatchingTimeout', async () => {
      // Set up the machine with proper timeout callback
      const mockOnUserTimeout = jest.fn();
      const testMachine = livenessMachine.withContext({
        ...livenessMachine.context,
        componentProps: {
          ...mockcomponentProps,
          onUserTimeout: mockOnUserTimeout,
        },
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
          freshnessColorDisplay: mockFreshnessColorDisplay,
        },
      });
      const testService = interpret(
        testMachine
      ) as unknown as LivenessInterpreter;

      await transitionToRecording(testService);
      await flushPromises();

      expect(testService.state.value).toEqual({
        recording: 'checkFaceDetected',
      });

      jest.advanceTimersToNextTimer(); // checkFaceDetected
      jest.advanceTimersToNextTimer(); // cancelOvalDrawingTimeout
      jest.advanceTimersToNextTimer(); // checkRecordingStarted
      expect(testService.state.value).toEqual({
        recording: 'ovalMatching',
      });
      expect(
        testService.state.context.faceMatchAssociatedParams!.faceMatchState
      ).toBe(FaceMatchState.FACE_IDENTIFIED);
      expect(testService.state.context.ovalAssociatedParams!.ovalDetails).toBe(
        mockOvalDetails
      );
      expect(testService.state.context.ovalAssociatedParams!.initialFace).toBe(
        mockFace
      );

      jest.advanceTimersToNextTimer(12000);
      expect(testService.state.value).toEqual('timeout');
      expect(testService.state.context.errorState).toBe(
        LivenessErrorState.TIMEOUT
      );
      await flushPromises();
      expect(mockOnUserTimeout).toHaveBeenCalledTimes(1);

      testService.stop();
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
        expect(service.state.value).toEqual({
          recording: 'checkFaceDetected',
        });

        jest.advanceTimersToNextTimer();
        expect(service.state.value).toEqual({
          recording: 'checkFaceDetected',
        });
        expect(
          service.state.context.faceMatchAssociatedParams!.faceMatchState
        ).toBe(FaceMatchState.CANT_IDENTIFY);
        expect(
          service.state.context.faceMatchAssociatedParams!.illuminationState
        ).toBe(IlluminationState.BRIGHT);
      });

    it('should reach error state after detectInitialFaceAndDrawOval error', async () => {
      // const error = new Error();
      const error = {
        state: LivenessErrorState.RUNTIME_ERROR,
        message: 'Simulated runtime error',
      };

      // error.name = LivenessErrorState.RUNTIME_ERROR;
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
      expect(livenessError.message).toContain(
        'Unknown error occurred during liveness check'
      );
    });

      it('should reach error state after receiving a server error from the websocket stream', async () => {
        await transitionToRecording(service);

      const livenessError = {
        state: LivenessErrorState.SERVER_ERROR,
        error: new Error('test'),
      };
      service.send({
        type: 'SERVER_ERROR',
        data: { error: livenessError },
      });
      await flushPromises();
      jest.advanceTimersToNextTimer();
      expect(service.state.value).toEqual('error');
      expect(service.state.context.errorState).toBe(
        LivenessErrorState.SERVER_ERROR
      );
      expect(mockcomponentProps.onError).toHaveBeenCalledTimes(1);
      const receivedError = (mockcomponentProps.onError as jest.Mock).mock
        .calls[0][0];
      expect(receivedError.state).toBe(LivenessErrorState.SERVER_ERROR);
    });

    it('should reach connection timeout state after receiving a connection timeout error from the websocket stream', async () => {
      await transitionToRecording(service);
      const errorMessage = 'Websocket connection timeout';
      const livenessError = {
        state: LivenessErrorState.CONNECTION_TIMEOUT,
        error: new Error(errorMessage),
      };
      service.send({
        type: 'CONNECTION_TIMEOUT',
        data: { error: livenessError },
      });
      await flushPromises();
      jest.advanceTimersToNextTimer();
      expect(service.state.value).toEqual('error');
      expect(service.state.context.errorState).toBe(
        LivenessErrorState.CONNECTION_TIMEOUT
      );
      expect(mockcomponentProps.onError).toHaveBeenCalledTimes(1);
      const receivedError = (mockcomponentProps.onError as jest.Mock).mock
        .calls[0][0];
      expect(receivedError.error.message).toContain(errorMessage);
      expect(receivedError.state).toBe(LivenessErrorState.CONNECTION_TIMEOUT);
    });

      it('should reach ovalMatching state and send client sessionInformation', async () => {
        await transitionToRecording(service);
        await flushPromises();
        jest.advanceTimersToNextTimer(); // cancelOvalDrawingTimeout
        jest.advanceTimersToNextTimer(); // checkRecordingStarted
        jest.advanceTimersToNextTimer(); // ovalMatching

        expect(
          expect(mockStreamRecorder.dispatchStreamEvent).toHaveBeenCalledTimes(
            1
          )
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

        // resolve detectFaceAndMatchOval
        await flushPromises();
        expect(service.state.value).toEqual({ recording: 'checkMatch' });

        jest.advanceTimersByTime(0);
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

      it('should reach delayBeforeFlash and flashFreshnessColors states after detectFaceAndMatchOval resolves successfully', async () => {
        service.start();
        service.send({ type: 'BEGIN' });

        expect(service.state.value).toEqual({ initCamera: 'cameraCheck' });

        // resolve checkVirtualCameraAndGetStream
        await flushPromises();

        expect(service.state.value).toEqual({
          initCamera: 'waitForDOMAndCameraDetails',
        });

        service.send({
          type: 'SET_DOM_AND_CAMERA_DETAILS',
          data: {
            videoEl: mockVideoEl,
            canvasEl: mockCanvasEl,
            freshnessColorEl: mockFreshnessColorEl,
          },
        });

        expect(service.state.value).toEqual({
          initWebsocket: 'initializeLivenessStream',
        });

        // resolve openLivenessStreamConnection
        await flushPromises();
        expect(service.state.value).toEqual({
          initWebsocket: 'waitForSessionInfo',
        });

        service.send({
          type: 'SET_SESSION_INFO',
          data: {
            serverSessionInformation: mockFaceMovementAndLightServerSessionInfo,
          },
        });

        jest.advanceTimersByTime(100);
        expect(service.state.value).toEqual('start');

        service.send({ type: 'BEGIN' });

        expect(service.state.value).toEqual('detectFaceBeforeStart');

        // resolve detectFace
        await flushPromises();
        expect(service.state.value).toEqual('checkFaceDetectedBeforeStart');

        jest.advanceTimersByTime(0);
        expect(service.state.value).toEqual(
          'detectFaceDistanceBeforeRecording'
        );

        // resolve detectFaceDistance
        await flushPromises();
        expect(service.state.value).toEqual('checkFaceDistanceBeforeRecording');

        jest.advanceTimersByTime(0);
        expect(service.state.value).toEqual({ recording: 'ovalDrawing' });

        // resolve detectInitialFaceAndDrawOval
        await flushPromises();
        expect(service.state.value).toEqual({
          recording: 'checkFaceDetected',
        });

        jest.advanceTimersByTime(0);
        expect(service.state.value).toEqual({
          recording: 'cancelOvalDrawingTimeout',
        });

        jest.advanceTimersByTime(100);
        expect(service.state.value).toEqual({
          recording: 'ovalMatching',
        });

        // resolve detectFaceAndMatchOval
        await flushPromises();
        expect(service.state.value).toEqual({ recording: 'checkMatch' });

        jest.advanceTimersByTime(0);
        expect(service.state.value).toEqual({ recording: 'delayBeforeFlash' });

        jest.advanceTimersByTime(1000);
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
        await transitionToRecording(service); // checkFaceDetected
        jest.advanceTimersToNextTimer(); // cancelOvalDrawingTimeout
        jest.advanceTimersToNextTimer(); // checkRecordingStarted

        jest.advanceTimersToNextTimer(); // ovalMatching
        await flushPromises(); // checkMatch
        jest.advanceTimersToNextTimer(); // delayBeforeFlash
        jest.advanceTimersByTime(1000); // flashFreshnessColors
        jest.advanceTimersToNextTimer(); // flashFreshnessColors

        // resolve flashColors
        await flushPromises();

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
        await flushPromises();
        expect(service.state.value).toEqual({
          recording: 'checkFaceDetected',
        });

        jest.advanceTimersToNextTimer();
        expect(service.state.value).toEqual({
          recording: 'cancelOvalDrawingTimeout',
        });

        jest.advanceTimersToNextTimer();
        expect(service.state.value).toEqual({
          recording: 'checkRecordingStarted',
        });

        jest.advanceTimersToNextTimer();
        expect(service.state.value).toEqual({
          recording: 'ovalMatching',
        });

        await flushPromises();
        expect(service.state.value).toEqual({
          recording: 'checkMatch',
        });

        jest.advanceTimersToNextTimer();
        expect(service.state.value).toEqual({
          recording: 'checkMatch',
        });

        expect(
          service.state.context.faceMatchAssociatedParams!.faceMatchState
        ).toBe(FaceMatchState.OFF_CENTER);
      });
    });

    describe('FaceMovementChallenge', () => {
      beforeEach(() => {
        mockedHelpers.createSessionInfoFromServerSessionInformation.mockReturnValue(
          mockFaceMovementSessionInfo
        );
      });

      it('should handle timeout during recording as expected', async () => {
        await transitionToRecording(service, 'FaceMovementChallenge');

        jest.runAllTimers();
        expect(service.state.value).toEqual('timeout');

        expect(service.state.context.errorState).toBe(
          LivenessErrorState.TIMEOUT
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
        await transitionToRecording(service, 'FaceMovementChallenge');

        await flushPromises();
        expect(service.state.value).toEqual({
          recording: 'checkFaceDetected',
        });

        jest.advanceTimersToNextTimer();
        expect(service.state.value).toEqual({
          recording: 'checkFaceDetected',
        });
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

        await transitionToRecording(service, 'FaceMovementChallenge');

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
        await transitionToRecording(service, 'FaceMovementChallenge');

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

      it('should reach connection timeout state after receiving a connection timeout error from the websocket stream', async () => {
        await transitionToRecording(service, 'FaceMovementChallenge');
        const errorMessage = 'Websocket connection timeout';
        const error = new Error(errorMessage);
        service.send({
          type: 'CONNECTION_TIMEOUT',
          data: { error },
        });
        await flushPromises();
        jest.advanceTimersToNextTimer();
        expect(service.state.value).toEqual('error');
        expect(service.state.context.errorState).toBe(
          LivenessErrorState.CONNECTION_TIMEOUT
        );
        expect(mockComponentProps.onError).toHaveBeenCalledTimes(1);
        const livenessError = (mockComponentProps.onError as jest.Mock).mock
          .calls[0][0];
        expect(livenessError.error.message).toContain(errorMessage);
        expect(livenessError.state).toBe(LivenessErrorState.CONNECTION_TIMEOUT);
      });

      it('should reach ovalMatching state and send client sessionInformation', async () => {
        mockedHelpers.createSessionStartEvent.mockReturnValue({
          Challenge: {
            FaceMovementChallenge: {
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
        await transitionToRecording(service, 'FaceMovementChallenge');
        await flushPromises();

        jest.advanceTimersToNextTimer();
        expect(service.state.value).toEqual({
          recording: 'cancelOvalDrawingTimeout',
        });

        jest.advanceTimersToNextTimer();
        expect(service.state.value).toEqual({
          recording: 'checkRecordingStarted',
        });

        jest.advanceTimersToNextTimer();
        expect(service.state.value).toEqual({
          recording: 'ovalMatching',
        });

        expect(
          expect(mockStreamRecorder.dispatchStreamEvent).toHaveBeenCalledTimes(
            1
          )
        );
        const clientInfo = (mockStreamRecorder.dispatchStreamEvent as jest.Mock)
          .mock.calls[0][0];

        const videoEl = service.state.context.videoAssociatedParams?.videoEl!;
        Object.defineProperty(videoEl, 'videoHeight', { value: 100 });
        expect(
          expect(
            clientInfo.data.Challenge.FaceMovementChallenge.InitialFace
              .BoundingBox
          ).toStrictEqual({
            Height: -0.4166666666666667,
            Left: 0.6875,
            Top: 0.4166666666666667,
            Width: 0,
          })
        );
      });

      it('should reach waitForDisconnect after detectFaceAndMatchOval success', async () => {
        service.start();
        service.send({ type: 'BEGIN' });

        expect(service.state.value).toEqual({ initCamera: 'cameraCheck' });

        // resolve checkVirtualCameraAndGetStream
        await flushPromises();

        expect(service.state.value).toEqual({
          initCamera: 'waitForDOMAndCameraDetails',
        });

        service.send({
          type: 'SET_DOM_AND_CAMERA_DETAILS',
          data: {
            videoEl: mockVideoEl,
            canvasEl: mockCanvasEl,
            freshnessColorEl: mockFreshnessColorEl,
          },
        });

        expect(service.state.value).toEqual({
          initWebsocket: 'initializeLivenessStream',
        });

        // resolve openLivenessStreamConnection
        await flushPromises();
        expect(service.state.value).toEqual({
          initWebsocket: 'waitForSessionInfo',
        });

        service.send({
          type: 'SET_SESSION_INFO',
          data: {
            serverSessionInformation: mockFaceMovementServerSessionInfo,
          },
        });

        jest.advanceTimersByTime(100);
        expect(service.state.value).toEqual('start');

        service.send({ type: 'BEGIN' });

        expect(service.state.value).toEqual('detectFaceBeforeStart');

        // resolve detectFace
        await flushPromises();
        expect(service.state.value).toEqual('checkFaceDetectedBeforeStart');

        jest.advanceTimersByTime(0);
        expect(service.state.value).toEqual(
          'detectFaceDistanceBeforeRecording'
        );

        // resolve detectFaceDistance
        await flushPromises();
        expect(service.state.value).toEqual('checkFaceDistanceBeforeRecording');

        jest.advanceTimersByTime(0);
        expect(service.state.value).toEqual({ recording: 'ovalDrawing' });

        // resolve detectInitialFaceAndDrawOval
        await flushPromises();
        expect(service.state.value).toEqual({
          recording: 'checkFaceDetected',
        });

        jest.advanceTimersByTime(0);
        expect(service.state.value).toEqual({
          recording: 'cancelOvalDrawingTimeout',
        });

        jest.advanceTimersByTime(100);
        expect(service.state.value).toEqual({
          recording: 'ovalMatching',
        });

        // resolve detectFaceAndMatchOval
        await flushPromises();
        expect(service.state.value).toEqual({ recording: 'checkMatch' });

        jest.advanceTimersByTime(100);
        expect(service.state.value).toEqual({ uploading: 'pending' });

        // resolve stopVideo
        await flushPromises();

        expect(service.state.value).toEqual({
          uploading: 'waitForDisconnectEvent',
        });
        expect(
          service.state.context.faceMatchAssociatedParams!.faceMatchState
        ).toBe(FaceMatchState.MATCHED);
        expect(service.state.context.faceMatchAssociatedParams!.endFace).toBe(
          mockFace
        );
      });

      it('should reach checkMatch state after detectFaceAndMatchOval does not match', async () => {
        mockedHelpers.getFaceMatchStateInLivenessOval.mockImplementation(() => {
          const faceMatchState = FaceMatchState.OFF_CENTER;
          const faceMatchPercentage = 0;
          return { faceMatchState, faceMatchPercentage };
        });

        await transitionToRecording(service, 'FaceMovementChallenge');

        jest.advanceTimersToNextTimer(); // cancelOvalDrawingTimeout
        jest.advanceTimersToNextTimer(); // checkRecordingStarted
        jest.advanceTimersToNextTimer(); // checkMatch

        await flushPromises();

        jest.advanceTimersToNextTimer();
        expect(service.state.value).toEqual({ recording: 'checkMatch' });
        expect(
          service.state.context.faceMatchAssociatedParams!.faceMatchState
        ).toBe(FaceMatchState.OFF_CENTER);
      });
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

    it('should reach timeout state on recording start failure', async () => {
      await transitionToRecording(service);
      await flushPromises(); // detectInitialFaceAndDrawOval
      jest.advanceTimersToNextTimer(); // checkFaceDetected
      jest.advanceTimersToNextTimer(); // cancelOvalDrawingTimeout
      jest.advanceTimersToNextTimer(6000);
      expect(service.state.value).toEqual('timeout');
      expect(service.state.context.errorState).toBe(LivenessErrorState.TIMEOUT);
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
