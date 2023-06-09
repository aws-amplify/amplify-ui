/* eslint-disable */
import { createMachine, assign, actions, spawn } from 'xstate';
import {
  getColorsSequencesFromSessionInformation,
  getFaceMatchState,
  getBoundingBox,
  getIntersectionOverUnion,
  getOvalBoundingBox,
  isFaceDistanceBelowThreshold,
  generateBboxFromLandmarks,
} from '../utils/liveness';

import {
  Face,
  LivenessContext,
  LivenessEvent,
  FaceMatchState,
  LivenessErrorState,
  IlluminationState,
  StreamActorCallback,
} from '../types';
import {
  BlazeFaceFaceDetection,
  drawLivenessOvalInCanvas,
  getFaceMatchStateInLivenessOval,
  getOvalDetailsFromSessionInformation,
  LivenessStreamProvider,
  estimateIllumination,
  isCameraDeviceVirtual,
  FreshnessColorDisplay,
} from '../utils';
import { nanoid } from 'nanoid';
import {
  getStaticLivenessOvalDetails,
  LivenessErrorStateStringMap,
} from '../utils/liveness';
import {
  isThrottlingExceptionEvent,
  isServiceQuotaExceededExceptionEvent,
  isValidationExceptionEvent,
  isInternalServerExceptionEvent,
  isServerSesssionInformationEvent,
  isDisconnectionEvent,
  isInvalidSignatureRegionException,
} from '../utils/eventUtils';
import {
  ClientSessionInformationEvent,
  LivenessResponseStream,
} from '@aws-sdk/client-rekognitionstreaming';

export const MIN_FACE_MATCH_TIME = 500;

// timer metrics variables
let faceDetectedTimestamp: number;
let ovalDrawnTimestamp: number;
let streamConnectionOpenTimestamp: number;

let responseStream: Promise<AsyncIterable<LivenessResponseStream>>;

export const livenessMachine = createMachine<LivenessContext, LivenessEvent>(
  {
    id: 'livenessMachine',
    initial: 'start',
    predictableActionArguments: true,
    context: {
      challengeId: nanoid(),
      maxFailedAttempts: 0, // Set to 0 for now as we are not allowing front end based retries for streaming
      failedAttempts: 0,
      componentProps: undefined,
      serverSessionInformation: undefined,
      videoAssociatedParams: undefined,
      ovalAssociatedParams: undefined,
      faceMatchAssociatedParams: {
        illuminationState: undefined,
        faceMatchState: undefined,
        /**
         * faceMatchPercentage is a starting point we set as a baseline
         * for what we want our progress bar to visually start at. This correlates
         * to the formula we use to calculate the faceMatchPercentage
         * in getFaceMatchStateInLivenessOval
         */
        faceMatchPercentage: 25,
        currentDetectedFace: undefined,
        startFace: undefined,
        endFace: undefined,
        initialFaceMatchTime: undefined,
      },
      freshnessColorAssociatedParams: {
        freshnessColorEl: undefined,
        freshnessColors: [],
        freshnessColorsComplete: false,
        freshnessColorDisplay: undefined,
      },
      errorState: undefined,
      livenessStreamProvider: undefined,
      responseStreamActorRef: undefined,
      shouldDisconnect: false,
      faceMatchStateBeforeStart: undefined,
      isFaceFarEnoughBeforeRecording: undefined,
      isRecordingStopped: false,
    },
    on: {
      CANCEL: 'userCancel',
      TIMEOUT: {
        target: 'retryableTimeout',
        actions: 'updateErrorStateForTimeout',
      },
      SET_SESSION_INFO: {
        internal: true,
        actions: 'updateSessionInfo',
      },
      DISCONNECT_EVENT: {
        internal: true,
        actions: 'updateShouldDisconnect',
      },
      SET_DOM_AND_CAMERA_DETAILS: {
        actions: 'setDOMAndCameraDetails',
      },
      SERVER_ERROR: {
        target: 'error',
        actions: 'updateErrorStateForServer',
      },
      RUNTIME_ERROR: {
        target: 'error',
      },
      MOBILE_LANDSCAPE_WARNING: {
        target: 'mobileLandscapeWarning',
        actions: 'updateErrorStateForServer',
      },
    },
    states: {
      start: {
        on: {
          BEGIN: 'cameraCheck',
        },
      },
      cameraCheck: {
        entry: [
          'resetErrorState',
          'setVideoConstraints',
          'initializeFaceDetector',
        ],
        invoke: {
          src: 'checkVirtualCameraAndGetStream',
          onDone: {
            target: 'waitForDOMAndCameraDetails',
            actions: ['updateVideoMediaStream'],
          },
          onError: {
            target: 'permissionDenied',
          },
        },
      },
      waitForDOMAndCameraDetails: {
        after: {
          0: {
            target: 'detectFaceBeforeStart',
            cond: 'hasDOMAndCameraDetails',
          },
          // setting this to check every 500 ms sometimes caused detectFaceBeforeStart to be called twice
          500: { target: 'waitForDOMAndCameraDetails' },
        },
      },
      detectFaceBeforeStart: {
        invoke: {
          src: 'detectFace',
          onDone: {
            target: 'checkFaceDetectedBeforeStart',
            actions: ['updateFaceMatchBeforeStartDetails'],
          },
        },
      },
      checkFaceDetectedBeforeStart: {
        after: {
          0: {
            target: 'detectFaceDistanceBeforeRecording',
            cond: 'hasSingleFaceBeforeStart',
          },
          100: { target: 'detectFaceBeforeStart' },
        },
      },
      detectFaceDistanceBeforeRecording: {
        invoke: {
          src: 'detectFaceDistance',
          onDone: {
            target: 'checkFaceDistanceBeforeRecording',
            actions: ['updateFaceDistanceBeforeRecording'],
          },
        },
      },
      checkFaceDistanceBeforeRecording: {
        after: {
          0: {
            target: 'initializeLivenessStream',
            cond: 'hasEnoughFaceDistanceBeforeRecording',
          },
          100: { target: 'detectFaceDistanceBeforeRecording' },
        },
      },
      initializeLivenessStream: {
        invoke: {
          src: 'openLivenessStreamConnection',
          onDone: {
            target: 'notRecording',
            actions: [
              'updateLivenessStreamProvider',
              'spawnResponseStreamActor',
            ],
          },
        },
      },
      notRecording: {
        on: {
          START_RECORDING: 'recording', // if countdown completes while face is far enough, start recording
        },
        initial: 'waitForSessionInfo',
        states: {
          waitForSessionInfo: {
            after: {
              0: {
                target: '#livenessMachine.recording',
                cond: 'hasServerSessionInfo',
              },
              100: { target: 'detectFaceDistanceDuringLoading' },
            },
          },
          detectFaceDistanceDuringLoading: {
            invoke: {
              src: 'detectFaceDistanceWhileLoading',
              onDone: {
                target: 'checkFaceDistanceDuringLoading',
                actions: ['updateFaceDistanceWhileLoading'],
              },
            },
          },
          checkFaceDistanceDuringLoading: {
            always: [
              {
                target: 'failure',
                cond: 'hasNotEnoughFaceDistanceBeforeRecording',
              },
              {
                target: 'waitForSessionInfo',
              },
            ],
          },
          failure: {
            entry: 'sendTimeoutAfterFaceDistanceDelay',
            type: 'final',
          },
        },
      },
      recording: {
        entry: ['clearErrorState', 'startRecording'],
        initial: 'ovalDrawing',
        states: {
          ovalDrawing: {
            entry: ['sendTimeoutAfterOvalDrawingDelay'],
            invoke: {
              src: 'detectInitialFaceAndDrawOval',
              onDone: {
                target: 'checkFaceDetected',
                actions: [
                  'updateOvalAndFaceDetailsPostDraw',
                  'sendTimeoutAfterOvalMatchDelay',
                ],
              },
              onError: {
                target: '#livenessMachine.error',
                actions: 'updateErrorStateForRuntime',
              },
            },
          },
          checkFaceDetected: {
            after: {
              0: {
                target: 'checkRecordingStarted',
                cond: 'hasSingleFace',
              },
              100: { target: 'ovalDrawing' },
            },
          },
          checkRecordingStarted: {
            after: {
              0: {
                target: 'ovalMatching',
                cond: 'hasRecordingStarted',
                actions: ['updateRecordingStartTimestampMs'],
              },
              100: { target: 'checkRecordingStarted' },
            },
          },
          ovalMatching: {
            entry: ['cancelOvalDrawingTimeout'],
            invoke: {
              src: 'detectFaceAndMatchOval',
              onDone: {
                target: 'checkMatch',
                actions: 'updateFaceDetailsPostMatch',
              },
            },
          },
          checkMatch: {
            after: {
              0: {
                target: 'flashFreshnessColors',
                cond: 'hasFaceMatchedInOvalWithMinTime',
                actions: [
                  'updateEndFaceMatch',
                  'setupFlashFreshnessColors',
                  'cancelOvalMatchTimeout',
                  'cancelOvalDrawingTimeout',
                ],
              },
              0.1: {
                target: 'ovalMatching',
                cond: 'hasFaceMatchedInOval',
                actions: 'setFaceMatchTimeAndStartFace',
              },
              1: {
                target: 'ovalMatching',
                cond: 'hasNotFaceMatchedInOval',
              },
            },
          },
          flashFreshnessColors: {
            invoke: {
              src: 'flashColors',
              onDone: [
                {
                  target: 'success',
                  cond: 'hasFreshnessColorShown',
                },
                {
                  target: 'flashFreshnessColors',
                  actions: 'updateFreshnessDetails',
                },
              ],
            },
          },
          success: {
            entry: ['stopRecording'],
            type: 'final',
          },
        },
        onDone: 'uploading',
      },
      uploading: {
        initial: 'pending',
        states: {
          pending: {
            entry: ['sendTimeoutAfterWaitingForDisconnect', 'pauseVideoStream'],
            invoke: {
              src: 'stopVideo',
              onDone: 'waitForDisconnectEvent',
              onError: {
                target: '#livenessMachine.error',
                actions: 'updateErrorStateForRuntime',
              },
            },
          },
          waitForDisconnectEvent: {
            after: {
              0: {
                target: 'getLivenessResult',
                cond: 'getShouldDisconnect',
              },
              100: { target: 'waitForDisconnectEvent' },
            },
          },
          getLivenessResult: {
            entry: ['cancelWaitForDisconnectTimeout', 'freezeStream'],
            invoke: {
              src: 'getLiveness',
              onError: {
                target: '#livenessMachine.error',
                actions: 'updateErrorStateForServer',
              },
            },
          },
        },
      },
      retryableTimeout: {
        entry: 'updateFailedAttempts',
        always: [
          {
            target: 'timeout',
            cond: 'shouldTimeoutOnFailedAttempts',
          },
          { target: 'notRecording' },
        ],
      },
      permissionDenied: {
        entry: 'callUserPermissionDeniedCallback',
        on: {
          RETRY_CAMERA_CHECK: 'cameraCheck',
        },
      },
      mobileLandscapeWarning: {
        entry: 'callMobileLandscapeWarningCallback',
        always: [{ target: 'error' }],
      },
      timeout: {
        entry: ['cleanUpResources', 'callUserTimeoutCallback', 'freezeStream'],
      },
      error: {
        entry: [
          'cleanUpResources',
          'callErrorCallback',
          'cancelOvalDrawingTimeout',
          'cancelWaitForDisconnectTimeout',
          'cancelOvalMatchTimeout',
          'freezeStream',
        ],
      },
      userCancel: {
        entry: ['cleanUpResources', 'callUserCancelCallback', 'resetContext'],
        always: [{ target: 'start' }],
      },
    },
  },
  {
    actions: {
      spawnResponseStreamActor: assign({
        responseStreamActorRef: () => spawn(responseStreamActor),
      }),
      updateFailedAttempts: assign({
        failedAttempts: (context) => {
          return context.failedAttempts! + 1;
        },
      }),
      setVideoConstraints: assign({
        videoAssociatedParams: (context, event) => {
          return {
            ...context.videoAssociatedParams,
            videoConstraints:
              event.data?.videoConstraints ||
              context.videoAssociatedParams?.videoConstraints,
          };
        },
      }),
      updateVideoMediaStream: assign({
        videoAssociatedParams: (context, event) => ({
          ...context.videoAssociatedParams,
          videoMediaStream: event.data?.stream,
        }),
      }),
      initializeFaceDetector: assign({
        ovalAssociatedParams: (context) => {
          const { componentProps } = context;
          const { faceModelUrl, binaryPath } = componentProps!.config!;

          const faceDetector = new BlazeFaceFaceDetection(
            binaryPath,
            faceModelUrl
          );
          faceDetector.triggerModelLoading();

          return {
            ...context.ovalAssociatedParams,
            faceDetector,
          };
        },
      }),
      updateLivenessStreamProvider: assign({
        livenessStreamProvider: (context, event) => {
          return event.data?.livenessStreamProvider;
        },
      }),
      setDOMAndCameraDetails: assign({
        videoAssociatedParams: (context, event) => {
          return {
            ...context.videoAssociatedParams,
            videoEl: event.data?.videoEl,
            canvasEl: event.data?.canvasEl,
            isMobile: event.data?.isMobile,
          };
        },
        freshnessColorAssociatedParams: (context, event) => ({
          ...context.freshnessColorAssociatedParams,
          freshnessColorEl: event.data?.freshnessColorEl,
        }),
      }),
      updateRecordingStartTimestampMs: assign({
        videoAssociatedParams: (context) => {
          const {
            challengeId,
            videoAssociatedParams,
            ovalAssociatedParams,
            livenessStreamProvider,
          } = context;
          const { recordingStartApiTimestamp, recorderStartTimestamp } =
            livenessStreamProvider!.videoRecorder;
          const { videoMediaStream } = videoAssociatedParams!;
          const { initialFace } = ovalAssociatedParams!;

          /**
           * This calculation is provided by Science team after doing analysis
           * of unreliable .onstart() (recorderStartTimestamp) timestamp that is
           * returned from mediaRecorder.
           */
          const timestamp = Math.round(
            0.73 * (recorderStartTimestamp! - recordingStartApiTimestamp!) +
              recordingStartApiTimestamp!
          );

          // Send client info for initial face position
          const { width, height } = videoMediaStream!
            .getTracks()[0]
            .getSettings();
          const flippedInitialFaceLeft =
            width! - initialFace!.left - initialFace!.width;

          context.livenessStreamProvider!.sendClientInfo({
            Challenge: {
              FaceMovementAndLightChallenge: {
                ChallengeId: challengeId,
                VideoStartTimestamp: timestamp,
                InitialFace: {
                  InitialFaceDetectedTimestamp: initialFace!.timestampMs,
                  BoundingBox: getBoundingBox({
                    deviceHeight: height!,
                    deviceWidth: width!,
                    height: initialFace!.height,
                    width: initialFace!.width,
                    top: initialFace!.top,
                    left: flippedInitialFaceLeft,
                  }),
                },
              },
            },
          });

          return {
            ...context.videoAssociatedParams,
            recordingStartTimestampMs: timestamp,
          };
        },
      }),
      startRecording: assign({
        videoAssociatedParams: (context) => {
          if (!context.serverSessionInformation) {
            throw new Error(
              'Session information was not received from response stream'
            );
          }
          if (
            context.livenessStreamProvider!.videoRecorder &&
            context.livenessStreamProvider!.videoRecorder.getState() !==
              'recording'
          ) {
            context.livenessStreamProvider!.startRecordingLivenessVideo();
          }

          return {
            ...context.videoAssociatedParams,
          };
        },
      }),
      stopRecording: (context) => {},
      updateFaceMatchBeforeStartDetails: assign({
        faceMatchStateBeforeStart: (_, event) => {
          return event.data!.faceMatchState;
        },
      }),
      updateFaceDistanceBeforeRecording: assign({
        isFaceFarEnoughBeforeRecording: (_, event) => {
          return event.data!.isFaceFarEnoughBeforeRecording;
        },
      }),
      updateFaceDistanceWhileLoading: assign({
        isFaceFarEnoughBeforeRecording: (_, event) => {
          return event.data!.isFaceFarEnoughBeforeRecording;
        },
        errorState: (_, event) => {
          return event.data?.error;
        },
      }),
      updateOvalAndFaceDetailsPostDraw: assign({
        ovalAssociatedParams: (context, event) => ({
          ...context.ovalAssociatedParams,
          initialFace: event.data!.initialFace,
          ovalDetails: event.data!.ovalDetails,
          scaleFactor: event.data!.scaleFactor,
        }),
        faceMatchAssociatedParams: (context, event) => ({
          ...context.faceMatchAssociatedParams,
          faceMatchState: event.data!.faceMatchState,
          illuminationState: event.data!.illuminationState,
        }),
      }),
      updateFaceDetailsPostMatch: assign({
        faceMatchAssociatedParams: (context, event) => ({
          ...context.faceMatchAssociatedParams,
          faceMatchState: event.data!.faceMatchState,
          faceMatchPercentage: event.data!.faceMatchPercentage,
          illuminationState: event.data!.illuminationState,
          currentDetectedFace: event.data!.detectedFace,
        }),
      }),
      updateEndFaceMatch: assign({
        faceMatchAssociatedParams: (context) => ({
          ...context.faceMatchAssociatedParams,
          endFace: context.faceMatchAssociatedParams!.currentDetectedFace,
        }),
      }),
      setFaceMatchTimeAndStartFace: assign({
        faceMatchAssociatedParams: (context) => {
          return {
            ...context.faceMatchAssociatedParams,
            startFace:
              context.faceMatchAssociatedParams!.startFace === undefined
                ? context.faceMatchAssociatedParams!.currentDetectedFace
                : context.faceMatchAssociatedParams!.startFace,
            initialFaceMatchTime:
              context.faceMatchAssociatedParams!.initialFaceMatchTime ===
              undefined
                ? Date.now()
                : context.faceMatchAssociatedParams!.initialFaceMatchTime,
          };
        },
      }),
      resetErrorState: assign({
        errorState: (_) => undefined,
      }),
      updateErrorStateForTimeout: assign({
        errorState: (_, event) => {
          return event.data?.errorState || LivenessErrorState.TIMEOUT;
        },
      }),
      updateErrorStateForRuntime: assign({
        errorState: (_, event) => {
          return event.data?.errorState || LivenessErrorState.RUNTIME_ERROR;
        },
      }),
      updateErrorStateForServer: assign({
        errorState: (_) => LivenessErrorState.SERVER_ERROR,
      }),
      clearErrorState: assign({
        errorState: (_) => undefined,
      }),
      updateSessionInfo: assign({
        serverSessionInformation: (context, event) => {
          return event.data!.sessionInfo;
        },
      }),
      updateShouldDisconnect: assign({
        shouldDisconnect: (context) => {
          return true;
        },
      }),
      updateFreshnessDetails: assign({
        freshnessColorAssociatedParams: (context, event) => {
          return {
            ...context.freshnessColorAssociatedParams,
            freshnessColorsComplete: event.data!.freshnessColorsComplete,
          };
        },
      }),
      setupFlashFreshnessColors: assign({
        freshnessColorAssociatedParams: (context) => {
          const { serverSessionInformation } = context;
          const freshnessColors = getColorsSequencesFromSessionInformation(
            serverSessionInformation!
          );
          const freshnessColorDisplay = new FreshnessColorDisplay(
            context as unknown as LivenessContext,
            freshnessColors
          );

          return {
            ...context.freshnessColorAssociatedParams,
            freshnessColorDisplay,
          };
        },
      }),

      // timeouts
      sendTimeoutAfterOvalDrawingDelay: actions.send(
        { type: 'TIMEOUT' },
        {
          delay: 5000,
          id: 'ovalDrawingTimeout',
        }
      ),
      cancelOvalDrawingTimeout: actions.cancel('ovalDrawingTimeout'),
      sendTimeoutAfterOvalMatchDelay: actions.send(
        { type: 'TIMEOUT' },
        {
          delay: 7000,
          id: 'ovalMatchTimeout',
        }
      ),
      cancelOvalMatchTimeout: actions.cancel('ovalMatchTimeout'),
      sendTimeoutAfterWaitingForDisconnect: actions.send(
        {
          type: 'TIMEOUT',
          data: { errorState: LivenessErrorState.SERVER_ERROR },
        },
        {
          delay: 20000,
          id: 'waitForDisconnectTimeout',
        }
      ),
      cancelWaitForDisconnectTimeout: actions.cancel(
        'waitForDisconnectTimeout'
      ),
      sendTimeoutAfterFaceDistanceDelay: actions.send(
        {
          type: 'RUNTIME_ERROR',
        },
        {
          delay: 0,
          id: 'faceDistanceTimeout',
        }
      ),
      cancelFaceDistanceTimeout: actions.cancel('faceDistanceTimeout'),

      // callbacks
      callUserPermissionDeniedCallback: assign({
        errorState: (context, event) => {
          let errorState: LivenessErrorState;

          if ((event.data!.message as string).includes('15 fps')) {
            errorState = LivenessErrorState.CAMERA_FRAMERATE_ERROR;
          } else {
            errorState = LivenessErrorState.CAMERA_ACCESS_ERROR;
          }

          const errorMessage = event.data!.message || event.data!.Message;
          const error = new Error(errorMessage);
          error.name = errorState;
          context.componentProps!.onError?.(error);

          return errorState;
        },
      }),
      callMobileLandscapeWarningCallback: assign({
        errorState: (context) => {
          return LivenessErrorState.MOBILE_LANDSCAPE_ERROR;
        },
      }),
      callUserCancelCallback: async (context) => {
        context.componentProps!.onUserCancel?.();
      },
      callUserTimeoutCallback: async (context) => {
        const error = new Error(
          LivenessErrorStateStringMap[context.errorState!]
        );
        error.name = context.errorState!;
        context.componentProps!.onError?.(error);
      },
      callErrorCallback: async (context, event) => {
        const errorMessage =
          event.data?.error?.message || event.data?.error?.Message;
        const error = new Error(errorMessage);
        error.name = context.errorState!;
        context.componentProps!.onError?.(error);
      },
      cleanUpResources: async (context) => {
        const { freshnessColorEl } = context.freshnessColorAssociatedParams!;
        if (freshnessColorEl) {
          freshnessColorEl.style.display = 'none';
        }
        await context.livenessStreamProvider?.endStream();
      },
      freezeStream: async (context) => {
        const { videoMediaStream, videoEl } = context.videoAssociatedParams!;
        context.isRecordingStopped = true;
        videoEl?.pause();
        videoMediaStream?.getTracks().forEach(function (track) {
          track.stop();
        });
      },
      pauseVideoStream: async (context) => {
        const { videoEl } = context.videoAssociatedParams!;
        context.isRecordingStopped = true;
        videoEl!.pause();
      },
      resetContext: assign({
        challengeId: nanoid(),
        maxFailedAttempts: 0, // Set to 0 for now as we are not allowing front end based retries for streaming
        failedAttempts: 0,
        componentProps: (context) => context.componentProps,
        serverSessionInformation: (_) => undefined,
        videoAssociatedParams: (_) => undefined,
        ovalAssociatedParams: (_) => undefined,
        errorState: (_) => undefined,
        livenessStreamProvider: (_) => undefined,
        responseStreamActorRef: (_) => undefined,
        shouldDisconnect: false,
        faceMatchStateBeforeStart: (_) => undefined,
        isFaceFarEnoughBeforeRecording: (_) => undefined,
        isRecordingStopped: false,
      }),
    },
    guards: {
      shouldTimeoutOnFailedAttempts: (context) =>
        context.failedAttempts! >= context.maxFailedAttempts!,
      hasFaceMatchedInOvalWithMinTime: (context) => {
        const { faceMatchState, initialFaceMatchTime } =
          context.faceMatchAssociatedParams!;
        const timeSinceInitialFaceMatch = Date.now() - initialFaceMatchTime!;
        const hasMatched =
          faceMatchState === FaceMatchState.MATCHED &&
          timeSinceInitialFaceMatch >= MIN_FACE_MATCH_TIME;

        return hasMatched;
      },
      hasFaceMatchedInOval: (context) => {
        return (
          context.faceMatchAssociatedParams!.faceMatchState ===
          FaceMatchState.MATCHED
        );
      },
      hasNotFaceMatchedInOval: (context) => {
        return (
          context.faceMatchAssociatedParams!.faceMatchState !==
          FaceMatchState.MATCHED
        );
      },
      hasSingleFace: (context) => {
        return (
          context.faceMatchAssociatedParams!.faceMatchState ===
          FaceMatchState.FACE_IDENTIFIED
        );
      },
      hasSingleFaceBeforeStart: (context) => {
        return (
          context.faceMatchStateBeforeStart === FaceMatchState.FACE_IDENTIFIED
        );
      },
      hasEnoughFaceDistanceBeforeRecording: (context) => {
        return context.isFaceFarEnoughBeforeRecording!;
      },
      hasNotEnoughFaceDistanceBeforeRecording: (context) => {
        return !context.isFaceFarEnoughBeforeRecording;
      },
      hasLivenessCheckSucceeded: (_, __, meta) => meta.state.event.data!.isLive,
      hasFreshnessColorShown: (context) =>
        context.freshnessColorAssociatedParams!.freshnessColorsComplete!,
      hasServerSessionInfo: (context) => {
        return context.serverSessionInformation !== undefined;
      },
      hasDOMAndCameraDetails: (context) => {
        return (
          context.videoAssociatedParams!.videoEl !== undefined &&
          context.videoAssociatedParams!.canvasEl !== undefined &&
          context.freshnessColorAssociatedParams!.freshnessColorEl !== undefined
        );
      },
      getShouldDisconnect: (context) => {
        return !!context.shouldDisconnect;
      },
      hasRecordingStarted: (context) => {
        return (
          context.livenessStreamProvider!.videoRecorder.firstChunkTimestamp !==
          undefined
        );
      },
    },
    services: {
      async checkVirtualCameraAndGetStream(context) {
        const { videoConstraints } = context.videoAssociatedParams!;

        // Get initial stream to enumerate devices with non-empty labels
        const initialStream = await navigator.mediaDevices.getUserMedia({
          video: videoConstraints,
          audio: false,
        });
        const devices = await navigator.mediaDevices.enumerateDevices();
        const realVideoDevices = devices
          .filter((device) => device.kind === 'videoinput')
          .filter((device) => !isCameraDeviceVirtual(device));

        if (!realVideoDevices.length) {
          throw new Error('No real video devices found');
        }

        // Ensure that at least one of the cameras is capable of at least 15 fps
        const tracksWithMoreThan15Fps = initialStream
          .getTracks()
          .filter((track) => {
            const settings = track.getSettings();
            return settings.frameRate! >= 15;
          });

        if (tracksWithMoreThan15Fps.length < 1) {
          throw new Error('No camera found with more than 15 fps');
        }

        // If the initial stream is of real camera, use it otherwise use the first real camera
        const initialStreamDeviceId =
          tracksWithMoreThan15Fps[0].getSettings().deviceId;
        const isInitialStreamFromRealDevice = realVideoDevices.some(
          (device) => device.deviceId === initialStreamDeviceId
        );

        let realVideoDeviceStream = initialStream;
        if (!isInitialStreamFromRealDevice) {
          realVideoDeviceStream = await navigator.mediaDevices.getUserMedia({
            video: {
              ...videoConstraints,
              deviceId: { exact: realVideoDevices[0].deviceId },
            },
            audio: false,
          });
        }

        return { stream: realVideoDeviceStream };
      },
      async openLivenessStreamConnection(context) {
        const { config } = context.componentProps!;
        const { credentialProvider } = config!;
        const livenessStreamProvider = new LivenessStreamProvider({
          sessionId: context.componentProps!.sessionId,
          region: context.componentProps!.region,
          stream: context.videoAssociatedParams!.videoMediaStream!,
          videoEl: context.videoAssociatedParams!.videoEl!,
          credentialProvider: credentialProvider,
        });

        streamConnectionOpenTimestamp = Date.now();

        responseStream = livenessStreamProvider.getResponseStream();
        return { livenessStreamProvider };
      },
      async detectFace(context) {
        const { videoEl } = context.videoAssociatedParams!;
        const { faceDetector } = context.ovalAssociatedParams!;

        // initialize models
        try {
          await faceDetector!.modelLoadingPromise;
        } catch (err) {
          console.log({ err });
        }

        // detect face
        const faceMatchState = await getFaceMatchState(faceDetector!, videoEl!);

        return { faceMatchState };
      },
      async detectFaceDistance(context) {
        const {
          isFaceFarEnoughBeforeRecording: faceDistanceCheckBeforeRecording,
        } = context;
        const { videoEl, videoMediaStream, isMobile } =
          context.videoAssociatedParams!;
        const { faceDetector } = context.ovalAssociatedParams!;

        const { width, height } = videoMediaStream!
          .getTracks()[0]
          .getSettings();

        const ovalDetails = getStaticLivenessOvalDetails({
          width: width!,
          height: height!,
        });

        const { isDistanceBelowThreshold: isFaceFarEnoughBeforeRecording } =
          await isFaceDistanceBelowThreshold({
            faceDetector: faceDetector!,
            videoEl: videoEl!,
            ovalDetails,
            reduceThreshold: faceDistanceCheckBeforeRecording, // if this is the second face distance check reduce the threshold
            isMobile,
          });

        return { isFaceFarEnoughBeforeRecording };
      },
      async detectFaceDistanceWhileLoading(context) {
        const {
          isFaceFarEnoughBeforeRecording: faceDistanceCheckBeforeRecording,
        } = context;
        const { videoEl, videoMediaStream, isMobile } =
          context.videoAssociatedParams!;
        const { faceDetector } = context.ovalAssociatedParams!;

        const { width, height } = videoMediaStream!
          .getTracks()[0]
          .getSettings();

        const ovalDetails = getStaticLivenessOvalDetails({
          width: width!,
          height: height!,
        });

        const {
          isDistanceBelowThreshold: isFaceFarEnoughBeforeRecording,
          error,
        } = await isFaceDistanceBelowThreshold({
          faceDetector: faceDetector!,
          videoEl: videoEl!,
          ovalDetails,
          reduceThreshold: faceDistanceCheckBeforeRecording, // if this is the second face distance check reduce the threshold
          isMobile,
        });

        return { isFaceFarEnoughBeforeRecording, error };
      },
      async detectInitialFaceAndDrawOval(context) {
        const { serverSessionInformation, livenessStreamProvider } = context;
        const { videoEl, canvasEl, isMobile } = context.videoAssociatedParams!;
        const { faceDetector } = context.ovalAssociatedParams!;

        // initialize models
        try {
          await faceDetector!.modelLoadingPromise;
          await livenessStreamProvider!.videoRecorder.recorderStarted;
        } catch (err) {
          console.log({ err });
        }

        // detect face
        const detectedFaces = await faceDetector!.detectFaces(videoEl!);
        let initialFace: Face;
        let faceMatchState: FaceMatchState;
        let illuminationState: IlluminationState | undefined;

        switch (detectedFaces.length) {
          case 0: {
            // no face detected;
            faceMatchState = FaceMatchState.CANT_IDENTIFY;
            illuminationState = estimateIllumination(videoEl!);
            break;
          }
          case 1: {
            //exactly one face detected;
            faceDetectedTimestamp = Date.now();
            faceMatchState = FaceMatchState.FACE_IDENTIFIED;
            initialFace = detectedFaces[0];
            break;
          }
          default: {
            //more than one face detected ;
            faceMatchState = FaceMatchState.TOO_MANY;
            break;
          }
        }

        if (!initialFace!) {
          return { faceMatchState, illuminationState };
        }

        // Get width/height of video element so we can compute scaleFactor
        // and set canvas width/height.
        const { width: videoScaledWidth, height: videoScaledHeight } =
          videoEl!.getBoundingClientRect();

        if (isMobile) {
          canvasEl!.width = window.innerWidth;
          canvasEl!.height = window.innerHeight;
        } else {
          canvasEl!.width = videoScaledWidth;
          canvasEl!.height = videoScaledHeight;
        }

        // Compute scaleFactor which is how much our video element is scaled
        // vs the intrinsic video resolution
        const scaleFactor = videoScaledWidth / videoEl!.videoWidth;

        // generate oval details from initialFace and video dimensions
        const ovalDetails = getOvalDetailsFromSessionInformation({
          sessionInformation: serverSessionInformation!,
          videoWidth: videoEl!.width,
        });

        // renormalize initial face
        const renormalizedFace = generateBboxFromLandmarks(
          initialFace,
          ovalDetails
        );
        initialFace.top = renormalizedFace.top;
        initialFace.left = renormalizedFace.left;
        initialFace.height = renormalizedFace.bottom - renormalizedFace.top;
        initialFace.width = renormalizedFace.right - renormalizedFace.left;

        // Draw oval in canvas using ovalDetails and scaleFactor
        drawLivenessOvalInCanvas({
          canvas: canvasEl!,
          oval: ovalDetails,
          scaleFactor,
          videoEl: videoEl!,
        });
        ovalDrawnTimestamp = Date.now();

        return {
          faceMatchState,
          ovalDetails,
          scaleFactor,
          initialFace,
        };
      },
      async detectFaceAndMatchOval(context) {
        const { serverSessionInformation } = context;
        const { videoEl } = context.videoAssociatedParams!;
        const { faceDetector, ovalDetails, initialFace } =
          context.ovalAssociatedParams!;

        // detect face
        const detectedFaces = await faceDetector!.detectFaces(videoEl!);
        let faceMatchState: FaceMatchState;
        let faceMatchPercentage: number = 0;
        let detectedFace: Face | undefined;
        let illuminationState: IlluminationState | undefined;

        const initialFaceBoundingBox = generateBboxFromLandmarks(
          initialFace!,
          ovalDetails!
        );

        const { ovalBoundingBox } = getOvalBoundingBox(ovalDetails!);

        const initialFaceIntersection = getIntersectionOverUnion(
          initialFaceBoundingBox,
          ovalBoundingBox
        );

        switch (detectedFaces.length) {
          case 0: {
            //no face detected;
            faceMatchState = FaceMatchState.CANT_IDENTIFY;
            illuminationState = estimateIllumination(videoEl!);
            break;
          }
          case 1: {
            //exactly one face detected, match face with oval;
            detectedFace = detectedFaces[0];
            const {
              faceMatchState: faceMatchStateInLivenessOval,
              faceMatchPercentage: faceMatchPercentageInLivenessOval,
            } = getFaceMatchStateInLivenessOval(
              detectedFace,
              ovalDetails!,
              initialFaceIntersection,
              serverSessionInformation!
            );

            faceMatchState = faceMatchStateInLivenessOval;
            faceMatchPercentage = faceMatchPercentageInLivenessOval;
            break;
          }
          default: {
            //more than one face detected ;
            faceMatchState = FaceMatchState.TOO_MANY;
            break;
          }
        }

        return {
          faceMatchState,
          faceMatchPercentage,
          illuminationState,
          detectedFace,
        };
      },
      async flashColors(context) {
        const { freshnessColorsComplete, freshnessColorDisplay } =
          context.freshnessColorAssociatedParams!;

        if (freshnessColorsComplete) {
          return;
        }

        const completed = await freshnessColorDisplay!.displayColorTick();

        return { freshnessColorsComplete: completed };
      },
      async stopVideo(context) {
        const { challengeId, livenessStreamProvider } = context;
        const { videoMediaStream } = context.videoAssociatedParams!;
        const { initialFace, ovalDetails } = context.ovalAssociatedParams!;
        const { startFace, endFace } = context.faceMatchAssociatedParams!;

        const { width, height } = videoMediaStream!
          .getTracks()[0]
          .getSettings();

        const flippedInitialFaceLeft =
          width! - initialFace!.left - initialFace!.width;

        await livenessStreamProvider!.stopVideo();

        const livenessActionDocument: ClientSessionInformationEvent = {
          Challenge: {
            FaceMovementAndLightChallenge: {
              ChallengeId: challengeId,
              InitialFace: {
                InitialFaceDetectedTimestamp: initialFace!.timestampMs,
                BoundingBox: getBoundingBox({
                  deviceHeight: height!,
                  deviceWidth: width!,
                  height: initialFace!.height,
                  width: initialFace!.width,
                  top: initialFace!.top,
                  left: flippedInitialFaceLeft,
                }),
              },
              TargetFace: {
                FaceDetectedInTargetPositionStartTimestamp:
                  startFace!.timestampMs,
                FaceDetectedInTargetPositionEndTimestamp: endFace!.timestampMs,
                BoundingBox: getBoundingBox({
                  deviceHeight: height!,
                  deviceWidth: width!,
                  height: ovalDetails!.height,
                  width: ovalDetails!.width,
                  top: ovalDetails!.centerY - ovalDetails!.height / 2,
                  left: ovalDetails!.centerX - ovalDetails!.width / 2,
                }),
              },
              VideoEndTimestamp:
                livenessStreamProvider!.videoRecorder.recorderEndTimestamp,
            },
          },
        };

        livenessStreamProvider!.sendClientInfo(livenessActionDocument);

        await livenessStreamProvider!.dispatchStopVideoEvent();
      },
      async getLiveness(context) {
        const { livenessStreamProvider } = context;
        const { onAnalysisComplete } = context.componentProps!;

        livenessStreamProvider!.endStream();

        // Get liveness result
        await onAnalysisComplete();
      },
    },
  }
);

const responseStreamActor = async (callback: StreamActorCallback) => {
  try {
    const stream = await responseStream;
    for await (const event of stream) {
      if (isServerSesssionInformationEvent(event)) {
        callback({
          type: 'SET_SESSION_INFO',
          data: {
            sessionInfo: event.ServerSessionInformationEvent.SessionInformation,
          },
        });
      } else if (isDisconnectionEvent(event)) {
        callback({ type: 'DISCONNECT_EVENT' });
      } else if (isValidationExceptionEvent(event)) {
        callback({
          type: 'SERVER_ERROR',
          data: { error: { ...event.ValidationException } },
        });
      } else if (isInternalServerExceptionEvent(event)) {
        callback({
          type: 'SERVER_ERROR',
          data: { error: { ...event.InternalServerException } },
        });
      } else if (isThrottlingExceptionEvent(event)) {
        callback({
          type: 'SERVER_ERROR',
          data: { error: { ...event.ThrottlingException } },
        });
      } else if (isServiceQuotaExceededExceptionEvent(event)) {
        callback({
          type: 'SERVER_ERROR',
          data: { error: { ...event.ServiceQuotaExceededException } },
        });
      }
    }
  } catch (error: unknown) {
    let returnedError = error;
    if (isInvalidSignatureRegionException(error)) {
      returnedError = new Error(
        'Invalid region in FaceLivenessDetector or credentials are scoped to the wrong region.'
      );
    }

    if (returnedError instanceof Error) {
      callback({
        type: 'SERVER_ERROR',
        data: { error: returnedError },
      });
    }
  }
};
