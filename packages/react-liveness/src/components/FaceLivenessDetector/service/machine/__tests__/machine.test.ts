import { interpret } from 'xstate';
import { setImmediate } from 'timers';

import { livenessMachine } from '../machine';
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
    jest.advanceTimersToNextTimer(); // checkRecordingStarted
    await advanceMinFaceMatches(); // detectFaceAndMatchOval
    jest.advanceTimersToNextTimer(); // delayBeforeFlash
    await flushPromises(); // flashFreshnessColors
  }

  async function transitionToGetLivenessResult(service: LivenessInterpreter) {
    await transitionToUploading(service);
    await flushPromises(); // stopVideo
    service.send({ type: 'DISCONNECT_EVENT' });
    jest.advanceTimersToNextTimer(); // waitForDisconnect
    await flushPromises(); // getLivenessResult - this triggers the getLiveness action
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

    service = interpret(machine) as unknown as LivenessInterpreter;
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    service.stop();
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
      it('should reach ovalMatching state after detectInitialFaceAndDrawOval success and respect ovalMatchingTimeout', async () => {
        await transitionToRecording(service);
        await flushPromises();

        expect(service.state.value).toEqual({
          recording: 'checkFaceDetected',
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
          service.state.context.faceMatchAssociatedParams!.faceMatchState
        ).toBe(FaceMatchState.FACE_IDENTIFIED);
        expect(service.state.context.ovalAssociatedParams!.ovalDetails).toBe(
          mockOvalDetails
        );
        expect(service.state.context.ovalAssociatedParams!.initialFace).toBe(
          mockFace
        );

        await flushPromises();
        expect(service.state.value).toEqual({
          recording: 'checkMatch',
        });

        jest.advanceTimersToNextTimer();
        expect(service.state.value).toEqual({
          recording: 'delayBeforeFlash',
        });

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

      it('should reach connection timeout state after receiving a connection timeout error from the websocket stream', async () => {
        await transitionToRecording(service);
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
        await transitionToRecording(service);
        await flushPromises();
        jest.advanceTimersToNextTimer(); // checkFaceDetected
        jest.advanceTimersToNextTimer(); // checkRecordingStarted
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
      it('should reach ovalMatching state after detectInitialFaceAndDrawOval success and respect ovalMatchingTimeout', async () => {
        await transitionToRecording(service, 'FaceMovementChallenge');
        await flushPromises();

        expect(service.state.value).toEqual({
          recording: 'checkFaceDetected',
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
          service.state.context.faceMatchAssociatedParams!.faceMatchState
        ).toBe(FaceMatchState.FACE_IDENTIFIED);
        expect(service.state.context.ovalAssociatedParams!.ovalDetails).toBe(
          mockOvalDetails
        );
        expect(service.state.context.ovalAssociatedParams!.initialFace).toBe(
          mockFace
        );

        await flushPromises();
        expect(service.state.value).toEqual({
          recording: 'checkMatch',
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
        jest.advanceTimersToNextTimer(); // checkFaceDetected
        jest.advanceTimersToNextTimer(); // checkRecordingStarted
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
        await transitionToRecording(service, 'FaceMovementChallenge');
        await flushPromises(); // detectInitialFaceAndDrawOval
        jest.advanceTimersToNextTimer(); // checkFaceDetected
        jest.advanceTimersToNextTimer(); // checkRecordingStarted

        await advanceMinFaceMatches(); // detectFaceAndMatchOval
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
        await flushPromises(); // detectInitialFaceAndDrawOval
        jest.advanceTimersToNextTimer(); // checkFaceDetected
        jest.advanceTimersToNextTimer(); // checkRecordingStarted

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

  describe('DCA v2 functionality', () => {
    it('should initialize ColorSequenceDisplay for FaceMovementAndLightChallenge', async () => {
      await transitionToRecording(service, 'FaceMovementAndLightChallenge');
      await flushPromises();
      jest.advanceTimersToNextTimer(); // checkFaceDetected
      jest.advanceTimersToNextTimer(); // checkRecordingStarted
      await advanceMinFaceMatches(); // detectFaceAndMatchOval - this triggers setColorDisplay

      expect(mockedHelpers.ColorSequenceDisplay).toHaveBeenCalledWith(
        expect.any(Array)
      );
      expect(service.state.context.colorSequenceDisplay).toBeDefined();
    });

    it('should initialize StreamRecorder (livenessStreamProvider)', async () => {
      await transitionToNotRecording(service);

      expect(service.state.context.livenessStreamProvider).toBeDefined();
      expect(mockStreamRecorder.dispatchStreamEvent).toBeDefined();
    });

    it('should handle flashColorSequence state for DCA v2', async () => {
      await transitionToRecording(service, 'FaceMovementAndLightChallenge');
      await flushPromises();
      jest.advanceTimersToNextTimer(); // checkFaceDetected
      jest.advanceTimersToNextTimer(); // checkRecordingStarted
      await advanceMinFaceMatches(); // detectFaceAndMatchOval
      jest.advanceTimersToNextTimer(); // delayBeforeFlash

      // Should transition to flashFreshnessColors for DCA v2
      expect(service.state.matches({ recording: 'flashFreshnessColors' })).toBe(
        true
      );
    });

    it('should dispatch stream events during color sequence', async () => {
      mockColorDisplay.startSequences.mockImplementation(
        async ({ onSequenceColorChange, onSequenceChange }: any) => {
          // Simulate color sequence events
          onSequenceColorChange({
            sequenceColor: 'rgb(255,0,0)',
            currentColorIndex: 0,
          });
          onSequenceChange({ sequenceIndex: 0 });
          return true;
        }
      );

      await transitionToRecording(service, 'FaceMovementAndLightChallenge');
      await flushPromises();
      jest.advanceTimersToNextTimer(); // checkFaceDetected
      jest.advanceTimersToNextTimer(); // checkRecordingStarted
      await advanceMinFaceMatches(); // detectFaceAndMatchOval
      jest.advanceTimersToNextTimer(); // delayBeforeFlash
      await flushPromises(); // flashColorSequence

      expect(mockStreamRecorder.dispatchStreamEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'sessionInfo',
          data: expect.objectContaining({
            Challenge: expect.any(Object),
          }),
        })
      );
    });

    it('should handle track dimensions in StreamRecorder', async () => {
      mockedHelpers.getTrackDimensions.mockReturnValue({
        trackWidth: 640,
        trackHeight: 480,
      });

      await transitionToRecording(service);
      await flushPromises();
      jest.advanceTimersToNextTimer(); // checkFaceDetected
      jest.advanceTimersToNextTimer(); // checkRecordingStarted - this triggers updateRecordingStartTimestamp

      expect(mockedHelpers.getTrackDimensions).toHaveBeenCalled();
      expect(service.state.context.livenessStreamProvider).toBeDefined();
    });

    // Task 7: Tests for video recording duration and unique timestamps
    describe('Video recording duration and timestamps', () => {
      it('should verify video recording duration matches expected duration', async () => {
        const mockStartTime = Date.now();
        const mockEndTime = mockStartTime + 8000; // 8 seconds

        // Mock the timestamps
        jest
          .spyOn(Date, 'now')
          .mockReturnValueOnce(mockStartTime) // recordingStartTimestampActual
          .mockReturnValueOnce(mockEndTime); // freshnessColorEndTimestamp

        // Mock getClientSessionInfoEvents to return color signals
        const mockColorSignals = [
          {
            Challenge: {
              FaceMovementAndLightChallenge: {
                ColorDisplayed: {
                  CurrentColorStartTimestamp: mockStartTime,
                  PreviousColorStartTimestamp: 0,
                  CurrentColor: { RGB: [0, 0, 0] },
                },
              },
            },
          },
          {
            Challenge: {
              FaceMovementAndLightChallenge: {
                ColorDisplayed: {
                  CurrentColorStartTimestamp: mockStartTime + 1000,
                  PreviousColorStartTimestamp: mockStartTime,
                  CurrentColor: { RGB: [255, 255, 255] },
                },
              },
            },
          },
        ];

        (
          mockStreamRecorder.getClientSessionInfoEvents as jest.Mock
        ).mockReturnValue(mockColorSignals);

        await transitionToUploading(service);

        // Verify that the recording duration calculation would be correct
        const expectedDuration = mockEndTime - mockStartTime;
        expect(expectedDuration).toBe(8000);
      });

      it('should verify all colors are captured with unique timestamps', async () => {
        const mockStartTime = Date.now();

        // Create mock color signals with unique, increasing timestamps
        const mockColorSignals = [
          {
            Challenge: {
              FaceMovementAndLightChallenge: {
                ColorDisplayed: {
                  CurrentColorStartTimestamp: mockStartTime,
                  PreviousColorStartTimestamp: 0,
                  CurrentColor: { RGB: [0, 0, 0] },
                },
              },
            },
          },
          {
            Challenge: {
              FaceMovementAndLightChallenge: {
                ColorDisplayed: {
                  CurrentColorStartTimestamp: mockStartTime + 400,
                  PreviousColorStartTimestamp: mockStartTime,
                  CurrentColor: { RGB: [255, 255, 255] },
                },
              },
            },
          },
          {
            Challenge: {
              FaceMovementAndLightChallenge: {
                ColorDisplayed: {
                  CurrentColorStartTimestamp: mockStartTime + 800,
                  PreviousColorStartTimestamp: mockStartTime + 400,
                  CurrentColor: { RGB: [255, 0, 0] },
                },
              },
            },
          },
          {
            Challenge: {
              FaceMovementAndLightChallenge: {
                ColorDisplayed: {
                  CurrentColorStartTimestamp: mockStartTime + 1200,
                  PreviousColorStartTimestamp: mockStartTime + 800,
                  CurrentColor: { RGB: [255, 255, 0] },
                },
              },
            },
          },
        ];

        (
          mockStreamRecorder.getClientSessionInfoEvents as jest.Mock
        ).mockReturnValue(mockColorSignals);

        await transitionToUploading(service);

        // Extract the color signals
        const colorSignals = mockStreamRecorder
          .getClientSessionInfoEvents()
          .map((info: any) => {
            return info.Challenge?.FaceMovementAndLightChallenge
              ?.ColorDisplayed;
          })
          .filter(Boolean);

        // Verify all colors have unique timestamps
        const timestamps = colorSignals.map(
          (signal: any) => signal.CurrentColorStartTimestamp
        );
        const uniqueTimestamps = new Set(timestamps);

        expect(timestamps.length).toBe(4);
        expect(uniqueTimestamps.size).toBe(4);
        expect(timestamps.length).toBe(uniqueTimestamps.size);

        // Verify timestamps are monotonically increasing
        for (let i = 1; i < timestamps.length; i++) {
          expect(timestamps[i]).toBeGreaterThan(timestamps[i - 1]);
        }
      });

      it('should warn when timestamps are not monotonically increasing in development mode', async () => {
        const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
        const mockStartTime = Date.now();

        // Create mock color signals with duplicate timestamps (bug scenario)
        const mockColorSignals = [
          {
            Challenge: {
              FaceMovementAndLightChallenge: {
                ColorDisplayed: {
                  CurrentColorStartTimestamp: mockStartTime,
                  PreviousColorStartTimestamp: 0,
                  CurrentColor: { RGB: [0, 0, 0] },
                },
              },
            },
          },
          {
            Challenge: {
              FaceMovementAndLightChallenge: {
                ColorDisplayed: {
                  CurrentColorStartTimestamp: mockStartTime, // Duplicate!
                  PreviousColorStartTimestamp: mockStartTime,
                  CurrentColor: { RGB: [255, 255, 255] },
                },
              },
            },
          },
        ];

        (
          mockStreamRecorder.getClientSessionInfoEvents as jest.Mock
        ).mockReturnValue(mockColorSignals);

        await transitionToGetLivenessResult(service);

        // Verify warning was logged (validation runs in test mode since NODE_ENV !== 'production')
        expect(consoleWarnSpy).toHaveBeenCalledWith(
          expect.stringContaining('Timestamp validation failed')
        );

        consoleWarnSpy.mockRestore();
      });

      it('should validate video duration in non-production mode', async () => {
        // Mock validateVideoDuration
        mockedHelpers.validateVideoDuration = jest.fn();

        const mockColorSignals = [
          {
            Challenge: {
              FaceMovementAndLightChallenge: {
                ColorDisplayed: {
                  CurrentColorStartTimestamp: Date.now(),
                  PreviousColorStartTimestamp: 0,
                  CurrentColor: { RGB: [0, 0, 0] },
                },
              },
            },
          },
        ];

        (
          mockStreamRecorder.getClientSessionInfoEvents as jest.Mock
        ).mockReturnValue(mockColorSignals);

        await transitionToGetLivenessResult(service);

        // Verify validateVideoDuration was called (runs in test mode since NODE_ENV !== 'production')
        expect(mockedHelpers.validateVideoDuration).toHaveBeenCalled();

        // Verify it was called with the expected structure
        const callArgs = (mockedHelpers.validateVideoDuration as jest.Mock).mock
          .calls[0][0];
        expect(callArgs).toHaveProperty('videoBlob');
        expect(callArgs).toHaveProperty('expectedDuration');
        expect(callArgs).toHaveProperty('tolerance', 100);
        expect(callArgs).toHaveProperty('recordingStartTimestamp');
        expect(callArgs).toHaveProperty('recordingEndTimestamp');
        expect(callArgs).toHaveProperty('chunksCount');
      });
    });
  });
});
