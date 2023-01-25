import { createMachine, assign, actions, send, spawn } from 'xstate';
import {
  getColorsSequencesFromSessionInformation,
  getFaceMatchState,
  getBoundingBox,
  isFaceDistanceBelowThreshold,
} from '../../helpers/liveness/liveness';

import {
  Face,
  LivenessContext,
  LivenessEvent,
  FaceMatchState,
  LivenessErrorState,
  IlluminationState,
} from '../../types';
import {
  BlazeFaceFaceDetection,
  drawLivenessOvalInCanvas,
  getFaceMatchStateInLivenessOval,
  getRandomLivenessOvalDetails,
  LivenessStreamProvider,
  estimateIllumination,
  recordLivenessAnalyticsEvent,
  LIVENESS_EVENT_LIVENESS_CHECK_SCREEN,
  isCameraDeviceVirtual,
  FreshnessColorDisplay,
} from '../../helpers';
import { nanoid } from 'nanoid';
import {
  getStaticLivenessOvalDetails,
  LivenessErrorStateStringMap,
} from '../../helpers/liveness/liveness';
import {
  isThrottlingExceptionEvent,
  isServiceQuotaExceededExceptionEvent,
  isValidationExceptionEvent,
  isInternalServerExceptionEvent,
  isServerSesssionInformationEvent,
  isDisconnectionEvent,
} from '../../helpers/liveness/liveness-event-utils';
import {
  ClientSessionInformationEvent,
  LivenessResponseStream,
} from '@aws-sdk/client-rekognitionstreaming';

export const MIN_FACE_MATCH_COUNT = 5;

// timer metrics variables
let faceDetectedTimestamp: number;
let ovalDrawnTimestamp: number;
let streamConnectionOpenTimestamp: number;

let responseStream: Promise<AsyncIterable<LivenessResponseStream>> = undefined;

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
        faceMatchCount: 0,
        currentDetectedFace: undefined,
        startFace: undefined,
        endFace: undefined,
      },
      freshnessColorAssociatedParams: {
        freshnessColorEl: undefined,
        freshnessColors: [],
        freshnessColorsComplete: false,
        freshnessColorDisplay: undefined,
      },
      errorState: null,
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
            target: 'waitForSessionInfo',
            actions: [
              'updateLivenessStreamProvider',
              'spawnResponseStreamActor',
            ],
          },
        },
      },
      waitForSessionInfo: {
        after: {
          0: {
            target: 'notRecording',
            cond: 'hasServerSessionInfo',
          },
          100: { target: 'waitForSessionInfo' },
        },
      },
      notRecording: {
        on: {
          START_RECORDING: 'recording', // if countdown completes while face is far enough, start recording
        },
        initial: 'detectFaceDistanceDuringCountdown',
        states: {
          detectFaceDistanceDuringCountdown: {
            invoke: {
              src: 'detectFaceDistance',
              onDone: {
                target: 'checkFaceDistanceDuringCountdown',
                actions: ['updateFaceDistanceBeforeRecording'],
              },
            },
          },
          checkFaceDistanceDuringCountdown: {
            after: {
              0: {
                target: 'failure',
                cond: 'hasNotEnoughFaceDistanceBeforeRecording',
              },
              200: {
                target: 'detectFaceDistanceDuringCountdown',
              },
            },
          },
          failure: {
            entry: 'sendTimeoutAfterFaceDistanceDelay',
            type: 'final',
          },
        },
      },
      recording: {
        entry: [
          'startRecording',
          'clearErrorState',
          'sendTimeoutAfterOvalDrawingDelay',
        ],
        initial: 'startRecording',
        states: {
          startRecording: {
            invoke: {
              src: 'startRecording',
              onDone: {
                target: 'checkRecordingStarted',
              },
            },
          },
          checkRecordingStarted: {
            after: {
              0: {
                target: 'ovalDrawing',
                cond: 'hasRecordingStarted',
                actions: ['updateRecordingStartTimestampMs'],
              },
              100: { target: 'checkRecordingStarted' },
            },
          },
          ovalDrawing: {
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
                target: 'ovalMatching',
                cond: 'hasSingleFace',
              },
              100: { target: 'ovalDrawing' },
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
                cond: 'hasFaceMatchedInOvalWithMinCount',
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
                actions: 'increaseFaceMatchCountAndStartFace',
              },
              100: {
                target: 'ovalMatching',
                actions: 'resetFaceMatchCountAndStartFace',
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
              // onError: {
              //   target: 'flashFreshnessColorError',
              // },
            },
          },
          flashFreshnessColorError: {
            entry: ['updateErrorStateForFreshnessTimeout'],
            always: [{ target: '#livenessMachine.timeout' }],
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
              onDone: 'checking',
              onError: {
                target: '#livenessMachine.error',
                actions: 'updateErrorStateForServer',
              },
            },
          },
          checking: {
            always: [
              {
                target: '#livenessMachine.checkSucceeded',
                cond: 'hasLivenessCheckSucceeded',
              },
              { target: '#livenessMachine.checkFailed' },
            ],
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
      checkFailed: {
        entry: 'callFailureCallback',
      },
      checkSucceeded: {
        entry: 'callSuccessCallback',
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
          recordLivenessAnalyticsEvent(context.componentProps, {
            event: LIVENESS_EVENT_LIVENESS_CHECK_SCREEN,
            attributes: { action: 'Timeout' },
            metrics: { count: 1 },
          });

          return context.failedAttempts + 1;
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
          const faceDetector = new BlazeFaceFaceDetection();
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
          return {
            ...context.videoAssociatedParams,
            recordingStartTimestampMs:
              context.livenessStreamProvider.videoRecorder.firstChunkTimestamp,
          };
        },
      }),
      stopRecording: (context) => {
        recordLivenessAnalyticsEvent(context.componentProps, {
          event: LIVENESS_EVENT_LIVENESS_CHECK_SCREEN,
          attributes: { action: 'Success' },
          metrics: { count: 1 },
        });
      },
      updateFaceMatchBeforeStartDetails: assign({
        faceMatchStateBeforeStart: (_, event) => {
          return event.data.faceMatchState;
        },
      }),
      updateFaceDistanceBeforeRecording: assign({
        isFaceFarEnoughBeforeRecording: (_, event) => {
          return event.data.isFaceFarEnoughBeforeRecording;
        },
      }),
      updateOvalAndFaceDetailsPostDraw: assign({
        ovalAssociatedParams: (context, event) => ({
          ...context.ovalAssociatedParams,
          initialFace: event.data.initialFace,
          ovalDetails: event.data.ovalDetails,
        }),
        faceMatchAssociatedParams: (context, event) => ({
          ...context.faceMatchAssociatedParams,
          faceMatchState: event.data.faceMatchState,
          illuminationState: event.data.illuminationState,
        }),
      }),
      updateFaceDetailsPostMatch: assign({
        faceMatchAssociatedParams: (context, event) => ({
          ...context.faceMatchAssociatedParams,
          faceMatchState: event.data.faceMatchState,
          illuminationState: event.data.illuminationState,
          currentDetectedFace: event.data.detectedFace,
        }),
      }),
      updateEndFaceMatch: assign({
        faceMatchAssociatedParams: (context) => ({
          ...context.faceMatchAssociatedParams,
          endFace: context.faceMatchAssociatedParams.currentDetectedFace,
        }),
      }),
      increaseFaceMatchCountAndStartFace: assign({
        faceMatchAssociatedParams: (context) => ({
          ...context.faceMatchAssociatedParams,
          faceMatchCount: context.faceMatchAssociatedParams.faceMatchCount + 1,
          startFace:
            context.faceMatchAssociatedParams.faceMatchCount === 0
              ? context.faceMatchAssociatedParams.currentDetectedFace
              : context.faceMatchAssociatedParams.startFace,
        }),
      }),
      resetFaceMatchCountAndStartFace: assign({
        faceMatchAssociatedParams: (context) => ({
          ...context.faceMatchAssociatedParams,
          faceMatchCount: 0,
          startFace: undefined,
          endFace: undefined,
        }),
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
        errorState: (_) => LivenessErrorState.RUNTIME_ERROR,
      }),
      updateErrorStateForServer: assign({
        errorState: (_) => LivenessErrorState.SERVER_ERROR,
      }),
      clearErrorState: assign({
        errorState: (_) => null,
      }),
      updateSessionInfo: assign({
        serverSessionInformation: (context, event) => {
          recordLivenessAnalyticsEvent(context.componentProps, {
            event: LIVENESS_EVENT_LIVENESS_CHECK_SCREEN,
            attributes: { action: 'receivedSessionInfoEvent' },
            metrics: {
              duration: Date.now() - streamConnectionOpenTimestamp,
            },
          });

          return event.data.sessionInfo;
        },
      }),
      updateShouldDisconnect: assign({
        shouldDisconnect: (context) => {
          recordLivenessAnalyticsEvent(context.componentProps, {
            event: LIVENESS_EVENT_LIVENESS_CHECK_SCREEN,
            attributes: { action: 'receivedDisconnectEvent' },
            metrics: {
              duration: Date.now() - streamConnectionOpenTimestamp,
            },
          });

          return true;
        },
      }),
      updateFreshnessDetails: assign({
        freshnessColorAssociatedParams: (context, event) => {
          return {
            ...context.freshnessColorAssociatedParams,
            freshnessColorsComplete: event.data.freshnessColorsComplete,
          };
        },
      }),
      updateErrorStateForFreshnessTimeout: assign({
        errorState: (context) => {
          const {
            freshnessColorAssociatedParams: { freshnessColorEl },
          } = context;
          freshnessColorEl.style.display = 'none';
          return LivenessErrorState.FRESHNESS_TIMEOUT;
        },
      }),
      setupFlashFreshnessColors: assign({
        freshnessColorAssociatedParams: (context) => {
          const { serverSessionInformation } = context;
          const freshnessColors = getColorsSequencesFromSessionInformation(
            serverSessionInformation
          );
          const freshnessColorDisplay = new FreshnessColorDisplay(
            context,
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
          delay: 5000,
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
          type: 'TIMEOUT',
          data: { errorState: LivenessErrorState.FACE_DISTANCE_ERROR },
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
          recordLivenessAnalyticsEvent(context.componentProps, {
            event: LIVENESS_EVENT_LIVENESS_CHECK_SCREEN,
            attributes: { action: 'PermissionDenied' },
            metrics: { count: 1 },
          });

          context.componentProps.onUserPermissionDenied?.(
            new Error(event.data.message)
          );

          if ((event.data.message as string).includes('15 fps')) {
            return LivenessErrorState.CAMERA_FRAMERATE_ERROR;
          } else {
            return LivenessErrorState.CAMERA_ACCESS_ERROR;
          }
        },
      }),
      callUserCancelCallback: async (context) => {
        context.componentProps.onUserCancel?.();
      },
      callUserTimeoutCallback: async (context) => {
        recordLivenessAnalyticsEvent(context.componentProps, {
          event: LIVENESS_EVENT_LIVENESS_CHECK_SCREEN,
          attributes: { action: 'FailedWithTimeout' },
          metrics: { count: 1 },
        });
        const error = new Error(
          LivenessErrorStateStringMap[context.errorState]
        );
        error.name = context.errorState;
        context.componentProps.onError?.(error);
      },
      callSuccessCallback: (context) => {
        context.componentProps.onSuccess?.();
      },
      callFailureCallback: (context) => {
        context.componentProps.onFailure?.();
      },
      callErrorCallback: async (context, event) => {
        const errorMessage =
          event.data.error?.message || event.data.error?.Message;
        const error = new Error(errorMessage);
        error.name = context.errorState;
        context.componentProps.onError?.(error);
      },
      cleanUpResources: async (context) => {
        const {
          freshnessColorAssociatedParams: { freshnessColorEl },
        } = context;
        if (freshnessColorEl) {
          freshnessColorEl.style.display = 'none';
        }
        await context.livenessStreamProvider?.endStream();
      },
      freezeStream: async (context) => {
        const {
          videoAssociatedParams: { videoMediaStream, videoEl },
        } = context;
        context.isRecordingStopped = true;
        videoEl.pause();
        videoMediaStream.getTracks().forEach(function (track) {
          track.stop();
        });
      },
      pauseVideoStream: async (context) => {
        const {
          videoAssociatedParams: { videoEl },
        } = context;
        context.isRecordingStopped = true;
        videoEl.pause();
      },
      resetContext: assign({
        challengeId: nanoid(),
        maxFailedAttempts: 0, // Set to 0 for now as we are not allowing front end based retries for streaming
        failedAttempts: 0,
        componentProps: (context) => context.componentProps,
        serverSessionInformation: (_) => undefined,
        videoAssociatedParams: (_) => undefined,
        ovalAssociatedParams: (_) => undefined,
        errorState: (_) => null,
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
        context.failedAttempts >= context.maxFailedAttempts,
      hasFaceMatchedInOvalWithMinCount: (context) => {
        const { faceMatchState, faceMatchCount } =
          context.faceMatchAssociatedParams;
        const hasMatched =
          faceMatchState === FaceMatchState.MATCHED &&
          faceMatchCount >= MIN_FACE_MATCH_COUNT;

        if (hasMatched) {
          recordLivenessAnalyticsEvent(context.componentProps, {
            event: LIVENESS_EVENT_LIVENESS_CHECK_SCREEN,
            attributes: { action: 'FaceMatched' },
            metrics: {
              duration: Date.now() - ovalDrawnTimestamp,
            },
          });
        }

        return hasMatched;
      },
      hasFaceMatchedInOval: (context) => {
        return (
          context.faceMatchAssociatedParams.faceMatchState ===
          FaceMatchState.MATCHED
        );
      },
      hasSingleFace: (context) => {
        return (
          context.faceMatchAssociatedParams.faceMatchState ===
          FaceMatchState.FACE_IDENTIFIED
        );
      },
      hasSingleFaceBeforeStart: (context) => {
        return (
          context.faceMatchStateBeforeStart === FaceMatchState.FACE_IDENTIFIED
        );
      },
      hasEnoughFaceDistanceBeforeRecording: (context) => {
        return context.isFaceFarEnoughBeforeRecording;
      },
      hasNotEnoughFaceDistanceBeforeRecording: (context) => {
        return !context.isFaceFarEnoughBeforeRecording;
      },
      hasLivenessCheckSucceeded: (_, __, meta) => meta.state.event.data.isLive,
      hasFreshnessColorShown: (context) =>
        context.freshnessColorAssociatedParams.freshnessColorsComplete,
      hasServerSessionInfo: (context) => {
        return context.serverSessionInformation !== undefined;
      },
      hasDOMAndCameraDetails: (context) => {
        return (
          context.videoAssociatedParams.videoEl !== undefined &&
          context.videoAssociatedParams.canvasEl !== undefined &&
          context.freshnessColorAssociatedParams.freshnessColorEl !== undefined
        );
      },
      getShouldDisconnect: (context) => {
        return !!context.shouldDisconnect;
      },
      hasRecordingStarted: (context) => {
        return (
          context.livenessStreamProvider.videoRecorder.firstChunkTimestamp !==
          undefined
        );
      },
    },
    services: {
      async checkVirtualCameraAndGetStream(context) {
        const { videoConstraints } = context.videoAssociatedParams;

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
          recordLivenessAnalyticsEvent(context.componentProps, {
            event: LIVENESS_EVENT_LIVENESS_CHECK_SCREEN,
            attributes: { action: 'NoRealDeviceFound' },
            metrics: { count: 1 },
          });
          throw new Error('No real video devices found');
        }

        // Ensure that at least one of the cameras is capable of at least 15 fps
        const tracksWithMoreThan15Fps = initialStream
          .getTracks()
          .filter((track) => {
            const settings = track.getSettings();
            return settings.frameRate >= 15;
          });

        if (tracksWithMoreThan15Fps.length < 1) {
          recordLivenessAnalyticsEvent(context.componentProps, {
            event: LIVENESS_EVENT_LIVENESS_CHECK_SCREEN,
            attributes: { action: 'NoDeviceWithSufficientFrameRate' },
            metrics: { count: 1 },
          });
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
        const livenessStreamProvider = new LivenessStreamProvider(
          context.componentProps.sessionId,
          context.videoAssociatedParams.videoMediaStream
        );

        streamConnectionOpenTimestamp = Date.now();
        recordLivenessAnalyticsEvent(context.componentProps, {
          event: LIVENESS_EVENT_LIVENESS_CHECK_SCREEN,
          attributes: { action: 'openLivenessStreamConnection' },
          metrics: {
            count: 1,
          },
        });

        responseStream = livenessStreamProvider.getResponseStream();
        return { livenessStreamProvider };
      },
      async startRecording(context) {
        recordLivenessAnalyticsEvent(context.componentProps, {
          event: LIVENESS_EVENT_LIVENESS_CHECK_SCREEN,
          attributes: { action: 'AttemptLivenessCheck' },
          metrics: { count: 1 },
        });

        if (!context.serverSessionInformation) {
          throw new Error(
            'Session information was not received from response stream'
          );
        }
        if (
          context.livenessStreamProvider.videoRecorder &&
          context.livenessStreamProvider.videoRecorder.getState() !==
            'recording'
        ) {
          context.livenessStreamProvider.startRecordingLivenessVideo();
        }
      },
      async detectFace(context) {
        const {
          videoAssociatedParams: { videoEl },
          ovalAssociatedParams: { faceDetector },
        } = context;

        // initialize models
        try {
          await faceDetector.modelLoadingPromise;
        } catch (err) {
          console.log({ err });
        }

        // detect face
        const faceMatchState = await getFaceMatchState(faceDetector, videoEl);

        return { faceMatchState };
      },
      async detectFaceDistance(context) {
        const {
          videoAssociatedParams: { videoEl, videoMediaStream, isMobile },
          ovalAssociatedParams: { faceDetector },
          isFaceFarEnoughBeforeRecording: faceDistanceCheckBeforeRecording,
        } = context;

        // const { width, height } = videoMediaStream.getTracks()[0].getSettings();
        const height = videoEl.height;
        const width = videoEl.width;
        const ovalDetails = getStaticLivenessOvalDetails({
          width,
          height,
        });

        const isFaceFarEnoughBeforeRecording =
          await isFaceDistanceBelowThreshold({
            faceDetector,
            videoEl,
            ovalDetails,
            reduceThreshold: faceDistanceCheckBeforeRecording, // if this is the second face distance check reduce the threshold
            isMobile,
          });

        return { isFaceFarEnoughBeforeRecording };
      },
      async detectInitialFaceAndDrawOval(context) {
        const {
          challengeId,
          videoAssociatedParams: {
            videoEl,
            canvasEl,
            videoMediaStream,
            recordingStartTimestampMs,
          },
          faceMatchAssociatedParams: { startFace },
          ovalAssociatedParams: { faceDetector },
          serverSessionInformation,
        } = context;

        // initialize models
        try {
          await faceDetector.modelLoadingPromise;
        } catch (err) {
          console.log({ err });
        }

        // detect face
        const startDetectTime = Date.now();
        const detectedFaces = await faceDetector.detectFaces(videoEl);
        let initialFace: Face;
        let faceMatchState: FaceMatchState;
        let illuminationState: IlluminationState;

        switch (detectedFaces.length) {
          case 0: {
            // no face detected;
            recordLivenessAnalyticsEvent(context.componentProps, {
              event: LIVENESS_EVENT_LIVENESS_CHECK_SCREEN,
              attributes: { action: 'NoFaceDetected' },
              metrics: { count: 1 },
            });

            faceMatchState = FaceMatchState.CANT_IDENTIFY;
            illuminationState = estimateIllumination(videoEl);
            break;
          }
          case 1: {
            //exactly one face detected;
            faceDetectedTimestamp = Date.now();
            recordLivenessAnalyticsEvent(context.componentProps, {
              event: LIVENESS_EVENT_LIVENESS_CHECK_SCREEN,
              attributes: { action: 'FaceDetected' },
              metrics: {
                duration: faceDetectedTimestamp - startDetectTime,
              },
            });

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

        if (!initialFace) {
          return { faceMatchState, illuminationState };
        }

        // generate oval details from initialFace and video dimensions
        const height = videoEl.height;
        const width = videoEl.width;
        const ovalDetails = getRandomLivenessOvalDetails({
          width: videoEl.width,
          height: videoEl.height,
          sessionInformation: serverSessionInformation,
        });

        // draw oval on canvas
        canvasEl.width = videoEl.width;
        canvasEl.height = videoEl.height;
        drawLivenessOvalInCanvas(canvasEl, ovalDetails);
        ovalDrawnTimestamp = Date.now();
        recordLivenessAnalyticsEvent(context.componentProps, {
          event: LIVENESS_EVENT_LIVENESS_CHECK_SCREEN,
          attributes: { action: 'RenderOval' },
          metrics: {
            duration: ovalDrawnTimestamp - faceDetectedTimestamp,
          },
        });

        // Send client info for initial face position
        const flippedInitialFaceLeft =
          width - initialFace.left - initialFace.width;
        context.livenessStreamProvider.sendClientInfo({
          DeviceInformation: {
            ClientSDKVersion: '1.0.0',
            VideoHeight: height,
            VideoWidth: width,
          },
          Challenge: {
            FaceMovementAndLightChallenge: {
              ChallengeId: challengeId,
              VideoStartTimestamp: recordingStartTimestampMs,
              InitialFace: {
                InitialFaceDetectedTimestamp: initialFace.timestampMs,
                BoundingBox: getBoundingBox({
                  deviceHeight: height,
                  deviceWidth: width,
                  height: initialFace.height,
                  width: initialFace.width,
                  top: initialFace.top,
                  left: flippedInitialFaceLeft,
                }),
              },
            },
          },
        });

        return { faceMatchState, ovalDetails, initialFace };
      },
      async detectFaceAndMatchOval(context) {
        const {
          videoAssociatedParams: { videoEl },
          ovalAssociatedParams: { faceDetector, ovalDetails },
        } = context;

        // detect face
        const detectedFaces = await faceDetector.detectFaces(videoEl);
        let faceMatchState: FaceMatchState;
        let detectedFace: Face;
        let illuminationState: IlluminationState;

        switch (detectedFaces.length) {
          case 0: {
            //no face detected;
            faceMatchState = FaceMatchState.CANT_IDENTIFY;
            illuminationState = estimateIllumination(videoEl);
            break;
          }
          case 1: {
            //exactly one face detected, match face with oval;
            detectedFace = detectedFaces[0];
            faceMatchState = getFaceMatchStateInLivenessOval(
              detectedFace,
              ovalDetails
            );
            break;
          }
          default: {
            //more than one face detected ;
            faceMatchState = FaceMatchState.TOO_MANY;
            break;
          }
        }

        return { faceMatchState, illuminationState, detectedFace };
      },
      async flashColors(context) {
        const {
          freshnessColorAssociatedParams: {
            freshnessColorsComplete,
            freshnessColorDisplay,
          },
        } = context;

        if (freshnessColorsComplete) {
          return;
        }

        const completed = await freshnessColorDisplay.displayColorTick();

        return { freshnessColorsComplete: completed };
      },
      async stopVideo(context) {
        const {
          challengeId,
          videoAssociatedParams: {
            videoMediaStream,
            recordingStartTimestampMs,
            videoEl,
          },
          ovalAssociatedParams: { initialFace, ovalDetails },
          faceMatchAssociatedParams: { startFace, endFace },
          livenessStreamProvider,
        } = context;

        // const { width, height } = videoMediaStream.getTracks()[0].getSettings();
        const height = videoEl.height;
        const width = videoEl.width;

        const flippedInitialFaceLeft =
          width - initialFace.left - initialFace.width;
        const livenessActionDocument: ClientSessionInformationEvent = {
          DeviceInformation: {
            ClientSDKVersion: '1.0.0',
            VideoHeight: height,
            VideoWidth: width,
          },
          Challenge: {
            FaceMovementAndLightChallenge: {
              ChallengeId: challengeId,
              InitialFace: {
                InitialFaceDetectedTimestamp: initialFace.timestampMs,
                BoundingBox: getBoundingBox({
                  deviceHeight: height,
                  deviceWidth: width,
                  height: initialFace.height,
                  width: initialFace.width,
                  top: initialFace.top,
                  left: flippedInitialFaceLeft,
                }),
              },
              TargetFace: {
                FaceDetectedInTargetPositionStartTimestamp:
                  startFace.timestampMs,
                FaceDetectedInTargetPositionEndTimestamp: endFace.timestampMs,
                BoundingBox: getBoundingBox({
                  deviceHeight: height,
                  deviceWidth: width,
                  height: ovalDetails.height,
                  width: ovalDetails.width,
                  top: ovalDetails.centerY - ovalDetails.height / 2,
                  left: ovalDetails.centerX - ovalDetails.width / 2,
                }),
              },
            },
          },
        };

        livenessStreamProvider.sendClientInfo(livenessActionDocument);

        await livenessStreamProvider.stopVideo();

        const endStreamLivenessVideoTime = Date.now();
        recordLivenessAnalyticsEvent(context.componentProps, {
          event: LIVENESS_EVENT_LIVENESS_CHECK_SCREEN,
          attributes: { action: 'streamLivenessVideoEnd' },
          metrics: {
            duration: endStreamLivenessVideoTime - recordingStartTimestampMs,
          },
        });
      },
      async getLiveness(context) {
        const {
          componentProps: { sessionId, onGetLivenessDetection },
          livenessStreamProvider,
        } = context;

        livenessStreamProvider.endStream();

        // Get liveness result
        const { isLive } = await onGetLivenessDetection(sessionId);
        recordLivenessAnalyticsEvent(context.componentProps, {
          event: LIVENESS_EVENT_LIVENESS_CHECK_SCREEN,
          attributes: { action: 'getLivenessDetection' },
          metrics: {
            duration: Date.now(),
          },
        });

        return { isLive };
      },
    },
  }
);

const responseStreamActor = async (callback) => {
  const stream = await responseStream;
  try {
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
  } catch (error) {
    callback({
      type: 'SERVER_ERROR',
      data: { error },
    });
  }
};
