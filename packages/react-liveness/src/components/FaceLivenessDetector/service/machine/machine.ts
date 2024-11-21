import {
  LivenessResponseStream,
  SessionInformation as ServerSessionInformation,
} from '@aws-sdk/client-rekognitionstreaming';
import { nanoid } from 'nanoid';
import { createMachine, assign, actions, spawn } from 'xstate';

import {
  getColorsSequencesFromSessionInformation,
  getFaceMatchState,
  getIntersectionOverUnion,
  getOvalBoundingBox,
  getStaticLivenessOvalDetails,
  isFaceDistanceBelowThreshold,
  generateBboxFromLandmarks,
  fillOverlayCanvasFractional,
} from '../utils/liveness';

import {
  ErrorState,
  Face,
  FaceMatchAssociatedParams,
  FaceMatchState,
  FreshnessColorAssociatedParams,
  IlluminationState,
  LivenessContext,
  LivenessError,
  LivenessErrorState,
  LivenessEvent,
  OvalAssociatedParams,
  StreamActorCallback,
  VideoAssociatedParams,
} from '../types';
import {
  BlazeFaceFaceDetection,
  createSessionInfoFromServerSessionInformation,
  drawLivenessOvalInCanvas,
  getFaceMatchStateInLivenessOval,
  getOvalDetailsFromSessionInformation,
  StreamRecorder,
  estimateIllumination,
  isCameraDeviceVirtual,
  ColorSequenceDisplay,
  createSessionStartEvent,
  createColorDisplayEvent,
  createSessionEndEvent,
  getTrackDimensions,
} from '../utils';

import {
  isConnectionTimeoutError,
  isDisconnectionEvent,
  isInternalServerExceptionEvent,
  isInvalidSignatureRegionException,
  isServerSessionInformationEvent,
  isServiceQuotaExceededExceptionEvent,
  isThrottlingExceptionEvent,
  isValidationExceptionEvent,
} from '../utils/responseStreamEvent';

import { STATIC_VIDEO_CONSTRAINTS } from '../../utils/helpers';
import {
  FACE_MOVEMENT_CHALLENGE,
  FACE_MOVEMENT_AND_LIGHT_CHALLENGE,
  WS_CLOSURE_CODE,
} from '../utils/constants';
import { getLivenessUserAgent } from '../../utils/platform';

const CAMERA_ID_KEY = 'AmplifyLivenessCameraId';
const DEFAULT_FACE_FIT_TIMEOUT = 7000;

let cameraCheckTimeStamp: number;
let recordingStartTimestampActual: number;
let recordingEndTimestamp: number;
let freshnessColorStartTimestamp: number;
let freshnessColorEndTimestamp: number;
let videoSettingsBeforeStopping: MediaTrackSettings;

let responseStream: Promise<AsyncIterable<LivenessResponseStream>>;
const responseStreamActor = async (callback: StreamActorCallback) => {
  try {
    const stream = await responseStream;
    for await (const event of stream) {
      if (isServerSessionInformationEvent(event)) {
        callback({
          type: 'SET_SESSION_INFO',
          data: {
            serverSessionInformation:
              event.ServerSessionInformationEvent.SessionInformation,
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
    if (isInvalidSignatureRegionException(error)) {
      callback({
        type: 'SERVER_ERROR',
        data: {
          error: new Error(
            'Invalid region in FaceLivenessDetector or credentials are scoped to the wrong region.'
          ),
        },
      });
    } else if (error instanceof Error) {
      callback({
        type: isConnectionTimeoutError(error)
          ? 'CONNECTION_TIMEOUT'
          : 'SERVER_ERROR',
        data: { error },
      });
    }
  }
};

function setLastSelectedCameraId(deviceId: string) {
  localStorage.setItem(CAMERA_ID_KEY, deviceId);
}

export const livenessMachine = createMachine<LivenessContext, LivenessEvent>(
  {
    id: 'livenessMachine',
    initial: 'initCamera',
    predictableActionArguments: true,
    context: {
      challengeId: nanoid(),
      maxFailedAttempts: 0, // Set to 0 for now as we are not allowing front end based retries for streaming
      failedAttempts: 0,
      componentProps: undefined,
      parsedSessionInformation: undefined,
      videoAssociatedParams: {
        videoConstraints: STATIC_VIDEO_CONSTRAINTS,
        selectableDevices: [],
      },
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
      },
      freshnessColorAssociatedParams: {
        freshnessColorEl: undefined,
        freshnessColors: [],
        freshnessColorsComplete: false,
      },
      colorSequenceDisplay: undefined,
      errorState: undefined,
      livenessStreamProvider: undefined,
      responseStreamActorRef: undefined,
      shouldDisconnect: true,
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
      SET_SESSION_INFO: { internal: true, actions: 'updateSessionInfo' },
      DISCONNECT_EVENT: { internal: true, actions: 'updateShouldDisconnect' },
      SET_DOM_AND_CAMERA_DETAILS: { actions: 'setDOMAndCameraDetails' },
      UPDATE_DEVICE_AND_STREAM: {
        actions: 'updateDeviceAndStream',
        target: 'start',
      },
      SERVER_ERROR: {
        target: 'error',
        actions: 'updateErrorStateForServer',
      },
      CONNECTION_TIMEOUT: {
        target: 'error',
        actions: 'updateErrorStateForConnectionTimeout',
      },
      RUNTIME_ERROR: { target: 'error' },
      MOBILE_LANDSCAPE_WARNING: {
        target: 'mobileLandscapeWarning',
        actions: 'updateErrorStateForServer',
      },
    },
    states: {
      initCamera: {
        initial: 'cameraCheck',
        on: {
          SET_DOM_AND_CAMERA_DETAILS: {
            actions: 'setDOMAndCameraDetails',
            target: '#livenessMachine.initWebsocket',
          },
        },
        states: {
          cameraCheck: {
            entry: 'resetErrorState',
            invoke: {
              src: 'checkVirtualCameraAndGetStream',
              onDone: {
                target: 'waitForDOMAndCameraDetails',
                actions: 'updateVideoMediaStream',
              },
              onError: {
                target: '#livenessMachine.permissionDenied',
              },
            },
          },
          waitForDOMAndCameraDetails: {},
        },
      },
      initWebsocket: {
        initial: 'initializeLivenessStream',
        states: {
          initializeLivenessStream: {
            invoke: {
              src: 'openLivenessStreamConnection',
              onDone: {
                target: 'waitForSessionInfo',
                actions: [
                  'updateSessionInfo',
                  'updateLivenessStreamProvider',
                  // 'spawnResponseStreamActor',
                ],
              },
            },
          },
          waitForSessionInfo: {
            after: {
              0: {
                target: '#livenessMachine.start',
                cond: 'hasParsedSessionInfo',
              },
              100: { target: 'waitForSessionInfo' },
            },
          },
        },
      },
      start: {
        entry: ['initializeFaceDetector'],
        always: [
          {
            target: 'detectFaceBeforeStart',
            cond: 'shouldSkipStartScreen',
          },
        ],
        on: {
          BEGIN: 'detectFaceBeforeStart',
        },
      },
      detectFaceBeforeStart: {
        invoke: {
          src: 'detectFace',
          onDone: {
            target: 'checkFaceDetectedBeforeStart',
            actions: 'updateFaceMatchBeforeStartDetails',
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
            actions: 'updateFaceDistanceBeforeRecording',
          },
        },
      },
      checkFaceDistanceBeforeRecording: {
        after: {
          0: {
            target: 'recording',
            cond: 'hasEnoughFaceDistanceBeforeRecording',
          },
          100: { target: 'detectFaceDistanceBeforeRecording' },
        },
      },
      recording: {
        entry: ['clearErrorState', 'startRecording'],
        initial: 'ovalDrawing',
        states: {
          ovalDrawing: {
            entry: 'sendTimeoutAfterOvalDrawingDelay',
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
                actions: 'updateRecordingStartTimestamp',
              },
              100: { target: 'checkRecordingStarted' },
            },
          },
          // Evaluates face match and moves to checkMatch
          // which continually checks for match until either timeout or face match
          ovalMatching: {
            entry: 'cancelOvalDrawingTimeout',
            invoke: {
              src: 'detectFaceAndMatchOval',
              onDone: {
                target: 'checkMatch',
                actions: 'updateFaceDetailsPostMatch',
              },
            },
          },
          // If `hasFaceMatchedInOval` is true, then move to `delayBeforeFlash`, which pauses
          // for one second to show "Hold still" text before moving to `flashFreshnessColors`.
          // If not, move back to ovalMatching and re-evaluate match state
          checkMatch: {
            after: {
              0: {
                target: 'handleChallenge',
                cond: 'hasFaceMatchedInOval',
                actions: [
                  'setFaceMatchTimeAndStartFace',
                  'updateEndFaceMatch',
                  'setColorDisplay',
                  'cancelOvalMatchTimeout',
                  'cancelOvalDrawingTimeout',
                ],
              },
              1: { target: 'ovalMatching' },
            },
          },
          handleChallenge: {
            always: [
              {
                target: 'delayBeforeFlash',
                cond: 'isFaceMovementAndLightChallenge',
              },
              {
                target: 'success',
                cond: 'isFaceMovementChallenge',
              },
            ],
          },
          delayBeforeFlash: {
            after: { 1000: 'flashFreshnessColors' },
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
            entry: 'stopRecording',
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
                cond: 'getShouldDisconnect',
                target: 'getLivenessResult',
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
          { target: 'start' },
        ],
      },
      permissionDenied: {
        entry: 'callUserPermissionDeniedCallback',
        on: { RETRY_CAMERA_CHECK: 'initCamera' },
      },
      mobileLandscapeWarning: {
        entry: 'callMobileLandscapeWarningCallback',
        always: { target: 'error' },
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
        always: { target: 'initCamera' },
      },
    },
  },
  {
    actions: {
      spawnResponseStreamActor: assign({
        responseStreamActorRef: () => spawn(responseStreamActor),
      }),
      updateFailedAttempts: assign({
        failedAttempts: (context) => context.failedAttempts! + 1,
      }),
      updateVideoMediaStream: assign({
        videoAssociatedParams: (context, event) => ({
          ...context.videoAssociatedParams,
          videoMediaStream: event.data
            ?.stream as VideoAssociatedParams['videoMediaStream'],
          selectedDeviceId: event.data
            ?.selectedDeviceId as VideoAssociatedParams['selectedDeviceId'],
          selectableDevices: event.data
            ?.selectableDevices as VideoAssociatedParams['selectableDevices'],
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

          return { ...context.ovalAssociatedParams, faceDetector };
        },
      }),
      updateLivenessStreamProvider: assign({
        livenessStreamProvider: (context, event) =>
          event.data?.livenessStreamProvider as StreamRecorder,
      }),
      setDOMAndCameraDetails: assign({
        videoAssociatedParams: (context, event) => ({
          ...context.videoAssociatedParams,
          videoEl: event.data?.videoEl as VideoAssociatedParams['videoEl'],
          canvasEl: event.data?.canvasEl as VideoAssociatedParams['canvasEl'],
          isMobile: event.data?.isMobile as VideoAssociatedParams['isMobile'],
        }),
        freshnessColorAssociatedParams: (context, event) => ({
          ...context.freshnessColorAssociatedParams,
          freshnessColorEl: event.data
            ?.freshnessColorEl as FreshnessColorAssociatedParams['freshnessColorEl'],
        }),
      }),
      updateDeviceAndStream: assign({
        videoAssociatedParams: (context, event) => {
          setLastSelectedCameraId(event.data?.newDeviceId as string);
          context.livenessStreamProvider?.setNewVideoStream(
            event.data?.newStream as MediaStream
          );

          return {
            ...context.videoAssociatedParams,
            selectedDeviceId: event.data
              ?.newDeviceId as VideoAssociatedParams['selectedDeviceId'],
            videoMediaStream: event.data
              ?.newStream as VideoAssociatedParams['videoMediaStream'],
          };
        },
      }),
      updateRecordingStartTimestamp: assign({
        videoAssociatedParams: (context) => {
          const {
            challengeId,
            ovalAssociatedParams,
            videoAssociatedParams,
            livenessStreamProvider,
            parsedSessionInformation,
          } = context;
          const { videoMediaStream } = videoAssociatedParams!;

          const recordingStartedTimestamp =
            livenessStreamProvider!.getRecordingStartTimestamp();

          context.livenessStreamProvider!.dispatchStreamEvent({
            type: 'sessionInfo',
            data: createSessionStartEvent({
              parsedSessionInformation: parsedSessionInformation!,
              ...getTrackDimensions(videoMediaStream!),
              challengeId: challengeId!,
              ovalAssociatedParams: ovalAssociatedParams!,
              recordingStartedTimestamp,
            }),
          });

          return {
            ...context.videoAssociatedParams,
            recordingStartedTimestamp,
          };
        },
      }),
      startRecording: assign({
        videoAssociatedParams: (context) => {
          if (
            context.livenessStreamProvider &&
            !context.livenessStreamProvider.isRecording()
          ) {
            context.livenessStreamProvider.startRecording();
            recordingStartTimestampActual = Date.now();
          }

          return { ...context.videoAssociatedParams };
        },
      }),
      stopRecording: () => {
        freshnessColorEndTimestamp = Date.now();
      },
      updateFaceMatchBeforeStartDetails: assign({
        faceMatchStateBeforeStart: (_, event) =>
          event.data!.faceMatchState as FaceMatchState,
      }),
      updateFaceDistanceBeforeRecording: assign({
        isFaceFarEnoughBeforeRecording: (_, event) =>
          !!event.data!.isFaceFarEnoughBeforeRecording,
      }),
      updateFaceDistanceWhileLoading: assign({
        isFaceFarEnoughBeforeRecording: (_, event) =>
          !!event.data!.isFaceFarEnoughBeforeRecording,
        errorState: (_, event) => event.data?.error as ErrorState,
      }),
      updateOvalAndFaceDetailsPostDraw: assign({
        ovalAssociatedParams: (context, event) => ({
          ...context.ovalAssociatedParams,
          initialFace: event.data!
            .initialFace as OvalAssociatedParams['initialFace'],
          ovalDetails: event.data!
            .ovalDetails as OvalAssociatedParams['ovalDetails'],
          scaleFactor: event.data!
            .scaleFactor as OvalAssociatedParams['scaleFactor'],
        }),
        faceMatchAssociatedParams: (context, event) => ({
          ...context.faceMatchAssociatedParams,
          faceMatchState: event.data!
            .faceMatchState as FaceMatchAssociatedParams['faceMatchState'],
          illuminationState: event.data!
            .illuminationState as FaceMatchAssociatedParams['illuminationState'],
        }),
      }),
      updateFaceDetailsPostMatch: assign({
        faceMatchAssociatedParams: (context, event) => ({
          ...context.faceMatchAssociatedParams,
          faceMatchState: event.data!
            .faceMatchState as FaceMatchAssociatedParams['faceMatchState'],
          faceMatchPercentage: event.data!
            .faceMatchPercentage as FaceMatchAssociatedParams['faceMatchPercentage'],
          illuminationState: event.data!
            .illuminationState as FaceMatchAssociatedParams['illuminationState'],
          currentDetectedFace: event.data!
            .detectedFace as FaceMatchAssociatedParams['currentDetectedFace'],
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
          };
        },
      }),
      resetErrorState: assign({ errorState: (_) => undefined }),
      updateErrorStateForConnectionTimeout: assign({
        errorState: (_) => LivenessErrorState.CONNECTION_TIMEOUT,
      }),
      updateErrorStateForTimeout: assign({
        errorState: (_, event) =>
          (event.data?.errorState as ErrorState) || LivenessErrorState.TIMEOUT,
      }),
      updateErrorStateForRuntime: assign({
        errorState: (_, event) =>
          (event.data?.errorState as ErrorState) ||
          LivenessErrorState.RUNTIME_ERROR,
      }),
      updateErrorStateForServer: assign({
        errorState: (_) => LivenessErrorState.SERVER_ERROR,
      }),
      clearErrorState: assign({ errorState: (_) => undefined }),
      updateSessionInfo: assign({
        parsedSessionInformation: (_, event) => {
          const { serverSessionInformation } = event.data! as {
            serverSessionInformation: ServerSessionInformation;
          };
          return createSessionInfoFromServerSessionInformation(
            serverSessionInformation
          );
        },
      }),
      updateShouldDisconnect: assign({ shouldDisconnect: () => true }),
      updateFreshnessDetails: assign({
        freshnessColorAssociatedParams: (context, event) => {
          return {
            ...context.freshnessColorAssociatedParams,
            freshnessColorsComplete: event.data!
              .freshnessColorsComplete as FreshnessColorAssociatedParams['freshnessColorsComplete'],
          };
        },
      }),
      setColorDisplay: assign({
        colorSequenceDisplay: ({ parsedSessionInformation }) =>
          new ColorSequenceDisplay(
            getColorsSequencesFromSessionInformation(parsedSessionInformation!)
          ),
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
          delay: (context) => {
            return (
              context.parsedSessionInformation!.Challenge!.ChallengeConfig
                ?.OvalFitTimeout ?? DEFAULT_FACE_FIT_TIMEOUT
            );
          },
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
          data: new Error(
            'Avoid moving closer during countdown and ensure only one face is in front of camera.'
          ),
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
          let errorState: ErrorState;

          if ((event.data!.message as string).includes('15 fps')) {
            errorState = LivenessErrorState.CAMERA_FRAMERATE_ERROR;
          } else {
            errorState = LivenessErrorState.CAMERA_ACCESS_ERROR;
          }

          const errorMessage =
            (event.data!.message as ErrorState) || event.data!.Message;
          const error = new Error(errorMessage);

          const livenessError: LivenessError = {
            state: errorState,
            error: error,
          };
          context.componentProps!.onError?.(livenessError);

          return errorState;
        },
      }),
      callMobileLandscapeWarningCallback: assign({
        errorState: () => LivenessErrorState.MOBILE_LANDSCAPE_ERROR,
      }),
      callUserCancelCallback: (context) => {
        context.componentProps!.onUserCancel?.();
      },
      callUserTimeoutCallback: (context) => {
        const error = new Error('Client Timeout');
        error.name = context.errorState!;
        const livenessError: LivenessError = {
          state: context.errorState!,
          error: error,
        };
        context.componentProps!.onError?.(livenessError);
      },
      callErrorCallback: (context, event) => {
        const livenessError: LivenessError = {
          state: context.errorState!,
          error: (event.data?.error as Error) || event.data,
        };
        context.componentProps!.onError?.(livenessError);
      },
      cleanUpResources: (context) => {
        const { freshnessColorEl } = context.freshnessColorAssociatedParams!;
        if (freshnessColorEl) {
          freshnessColorEl.style.display = 'none';
        }

        let closeCode = WS_CLOSURE_CODE.DEFAULT_ERROR_CODE;
        if (context.errorState === LivenessErrorState.TIMEOUT) {
          closeCode = WS_CLOSURE_CODE.FACE_FIT_TIMEOUT;
        } else if (context.errorState === LivenessErrorState.RUNTIME_ERROR) {
          closeCode = WS_CLOSURE_CODE.RUNTIME_ERROR;
        } else if (
          context.errorState === LivenessErrorState.FACE_DISTANCE_ERROR ||
          context.errorState === LivenessErrorState.MULTIPLE_FACES_ERROR
        ) {
          closeCode = WS_CLOSURE_CODE.USER_ERROR_DURING_CONNECTION;
        } else if (context.errorState === undefined) {
          closeCode = WS_CLOSURE_CODE.USER_CANCEL;
        }

        context.livenessStreamProvider?.stopRecording().then(() => {
          context.livenessStreamProvider?.dispatchStreamEvent({
            type: 'closeCode',
            data: { closeCode },
          });
        });
      },
      freezeStream: (context) => {
        const { videoMediaStream, videoEl } = context.videoAssociatedParams!;
        context.isRecordingStopped = true;
        videoEl?.pause();
        videoMediaStream?.getTracks().forEach(function (track) {
          track.stop();
        });
      },
      pauseVideoStream: (context) => {
        const { videoEl } = context.videoAssociatedParams!;
        context.isRecordingStopped = true;
        videoEl!.pause();
      },
      resetContext: assign({
        challengeId: nanoid(),
        maxFailedAttempts: 0, // Set to 0 for now as we are not allowing front end based retries for streaming
        failedAttempts: 0,
        componentProps: (context) => context.componentProps,
        parsedSessionInformation: (_) => undefined,
        videoAssociatedParams: (_) => {
          return {
            videoConstraints: STATIC_VIDEO_CONSTRAINTS,
          };
        },
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
      hasFaceMatchedInOval: (context) => {
        return (
          context.faceMatchAssociatedParams!.faceMatchState ===
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
      hasFreshnessColorShown: (context) =>
        context.freshnessColorAssociatedParams!.freshnessColorsComplete!,
      hasParsedSessionInfo: (context) => {
        return context.parsedSessionInformation !== undefined;
      },
      hasDOMAndCameraDetails: (context) => {
        return (
          context.videoAssociatedParams!.videoEl !== undefined &&
          context.videoAssociatedParams!.canvasEl !== undefined &&
          context.freshnessColorAssociatedParams!.freshnessColorEl !== undefined
        );
      },
      isFaceMovementChallenge: (context) => {
        return (
          context.parsedSessionInformation?.Challenge?.Name ===
          FACE_MOVEMENT_CHALLENGE.type
        );
      },
      isFaceMovementAndLightChallenge: (context) => {
        return (
          context.parsedSessionInformation?.Challenge?.Name ===
          FACE_MOVEMENT_AND_LIGHT_CHALLENGE.type
        );
      },
      getShouldDisconnect: (context) => {
        return !!context.shouldDisconnect;
      },
      hasRecordingStarted: (context) => {
        return context.livenessStreamProvider!.hasRecordingStarted();
      },
      shouldSkipStartScreen: (context) => {
        return !!context.componentProps?.disableStartScreen;
      },
    },
    services: {
      async checkVirtualCameraAndGetStream(context) {
        const { videoConstraints } = context.videoAssociatedParams!;

        cameraCheckTimeStamp = Date.now();

        // Get initial stream to enumerate devices with non-empty labels
        const initialStream = await navigator.mediaDevices.getUserMedia({
          video: {
            ...videoConstraints,
          },
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

        const deviceId = isInitialStreamFromRealDevice
          ? initialStreamDeviceId
          : realVideoDevices[0].deviceId;

        let realVideoDeviceStream = initialStream;
        if (!isInitialStreamFromRealDevice) {
          realVideoDeviceStream = await navigator.mediaDevices.getUserMedia({
            video: {
              ...videoConstraints,
              deviceId: { exact: deviceId },
            },
            audio: false,
          });
        }
        setLastSelectedCameraId(deviceId!);

        return {
          stream: realVideoDeviceStream,
          selectedDeviceId: initialStreamDeviceId,
          selectableDevices: realVideoDevices,
        };
      },
      // eslint-disable-next-line @typescript-eslint/require-await
      async openLivenessStreamConnection(context) {
        const { config } = context.componentProps!;

        const { videoHeight, videoWidth } =
          context.videoAssociatedParams!.videoEl!;

        const livenessStreamProvider = new StreamRecorder(
          context.videoAssociatedParams!.videoMediaStream!
        );

        const serverSessionInformation =
          config?.serverSessionInformationProvider?.(videoWidth, videoHeight);

        return { livenessStreamProvider, serverSessionInformation };
      },
      async detectFace(context) {
        const { videoEl } = context.videoAssociatedParams!;
        const { faceDetector } = context.ovalAssociatedParams!;

        // initialize models
        try {
          await faceDetector!.modelLoadingPromise;
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log({ err });
        }

        // detect face
        const faceMatchState = await getFaceMatchState(faceDetector!, videoEl!);

        return { faceMatchState };
      },
      async detectFaceDistance(context) {
        const {
          parsedSessionInformation,
          isFaceFarEnoughBeforeRecording: faceDistanceCheckBeforeRecording,
        } = context;
        const { videoEl, videoMediaStream } = context.videoAssociatedParams!;
        const { faceDetector } = context.ovalAssociatedParams!;

        const { width, height } = videoMediaStream!
          .getTracks()[0]
          .getSettings();

        const challengeConfig =
          parsedSessionInformation!.Challenge!.ChallengeConfig;

        const ovalDetails = getStaticLivenessOvalDetails({
          width: width!,
          height: height!,
          ovalHeightWidthRatio: challengeConfig!.OvalHeightWidthRatio!,
        });

        const { isDistanceBelowThreshold: isFaceFarEnoughBeforeRecording } =
          await isFaceDistanceBelowThreshold({
            parsedSessionInformation: parsedSessionInformation!,
            faceDetector: faceDetector!,
            videoEl: videoEl!,
            ovalDetails,
            reduceThreshold: faceDistanceCheckBeforeRecording, // if this is the second face distance check reduce the threshold
          });

        return { isFaceFarEnoughBeforeRecording };
      },
      async detectInitialFaceAndDrawOval(context) {
        const { parsedSessionInformation } = context;
        const { videoEl, canvasEl, isMobile } = context.videoAssociatedParams!;
        const { faceDetector } = context.ovalAssociatedParams!;

        // initialize models
        try {
          await faceDetector!.modelLoadingPromise;
        } catch (err) {
          // eslint-disable-next-line no-console
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
          parsedSessionInformation: parsedSessionInformation!,
          videoWidth: videoEl!.width,
        });

        const challengeConfig =
          parsedSessionInformation!.Challenge!.ChallengeConfig;

        // renormalize initial face
        const renormalizedFace = generateBboxFromLandmarks({
          ovalHeightWidthRatio: challengeConfig!.OvalHeightWidthRatio,
          face: initialFace,
          oval: ovalDetails,
          frameHeight: videoEl!.videoHeight,
        });
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

        return {
          faceMatchState,
          ovalDetails,
          scaleFactor,
          initialFace,
        };
      },
      async detectFaceAndMatchOval(context) {
        const { parsedSessionInformation } = context;
        const { videoEl } = context.videoAssociatedParams!;
        const { faceDetector, ovalDetails, initialFace } =
          context.ovalAssociatedParams!;

        // detect face
        const detectedFaces = await faceDetector!.detectFaces(videoEl!);
        let faceMatchState: FaceMatchState;
        let faceMatchPercentage: number = 0;
        let detectedFace: Face | undefined;
        let illuminationState: IlluminationState | undefined;

        const challengeConfig =
          parsedSessionInformation!.Challenge!.ChallengeConfig;

        const initialFaceBoundingBox = generateBboxFromLandmarks({
          ovalHeightWidthRatio: challengeConfig!.OvalHeightWidthRatio,
          face: initialFace!,
          oval: ovalDetails!,
          frameHeight: videoEl!.videoHeight,
        });

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
            } = getFaceMatchStateInLivenessOval({
              face: detectedFace,
              ovalDetails: ovalDetails!,
              initialFaceIntersection,
              parsedSessionInformation: parsedSessionInformation!,
              frameHeight: videoEl!.videoHeight,
            });

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
      async flashColors({
        challengeId,
        colorSequenceDisplay,
        freshnessColorAssociatedParams,
        livenessStreamProvider,
        ovalAssociatedParams,
        videoAssociatedParams,
      }) {
        const { freshnessColorsComplete, freshnessColorEl } =
          freshnessColorAssociatedParams!;
        if (freshnessColorsComplete) {
          return;
        }
        if (!freshnessColorStartTimestamp) {
          freshnessColorStartTimestamp = Date.now();
        }

        const { ovalDetails, scaleFactor } = ovalAssociatedParams!;
        const { videoEl } = videoAssociatedParams!;

        const completed = await colorSequenceDisplay!.startSequences({
          onSequenceColorChange: ({
            sequenceColor,
            prevSequenceColor,
            heightFraction,
          }) => {
            fillOverlayCanvasFractional({
              heightFraction,
              overlayCanvas: freshnessColorEl!,
              ovalDetails: ovalDetails!,
              nextColor: sequenceColor,
              prevColor: prevSequenceColor,
              scaleFactor: scaleFactor!,
              videoEl: videoEl!,
            });
          },
          onSequenceStart: () => {
            freshnessColorEl!.style.display = 'block';
          },
          onSequencesComplete: () => {
            freshnessColorEl!.style.display = 'none';
          },
          onSequenceChange: (params) => {
            livenessStreamProvider!.dispatchStreamEvent({
              type: 'sessionInfo',
              data: createColorDisplayEvent({
                ...params,
                challengeId: challengeId!,
              }),
            });
          },
        });

        return { freshnessColorsComplete: completed };
      },
      async stopVideo(context) {
        const {
          challengeId,
          parsedSessionInformation,
          faceMatchAssociatedParams,
          ovalAssociatedParams,
          livenessStreamProvider,
          videoAssociatedParams,
        } = context;
        const { videoMediaStream } = videoAssociatedParams!;

        videoSettingsBeforeStopping = videoMediaStream!
          .getTracks()[0]
          .getSettings();

        // if not awaited, `getRecordingEndTimestamp` will throw
        await livenessStreamProvider!.stopRecording();

        if (livenessStreamProvider!.getChunksLength() === 0) {
          throw new Error('Video chunks not recorded successfully.');
        }

        livenessStreamProvider!.dispatchStreamEvent({
          type: 'sessionInfo',
          data: createSessionEndEvent({
            ...getTrackDimensions(videoMediaStream!),
            parsedSessionInformation: parsedSessionInformation!,
            challengeId: challengeId!,
            faceMatchAssociatedParams: faceMatchAssociatedParams!,
            ovalAssociatedParams: ovalAssociatedParams!,
            recordingEndedTimestamp:
              livenessStreamProvider!.getRecordingEndedTimestamp(),
          }),
        });

        recordingEndTimestamp = Date.now();

        livenessStreamProvider!.dispatchStreamEvent({ type: 'streamStop' });
      },
      // eslint-disable-next-line @typescript-eslint/require-await
      async getLiveness(context) {
        const { onAnalysisComplete } = context.componentProps!;
        const {
          videoConstraints,
          videoEl,
          selectableDevices,
          selectedDeviceId,
          videoMediaStream,
        } = context.videoAssociatedParams!;
        const { initialFace, ovalDetails } = context.ovalAssociatedParams!;
        const { startFace, endFace } = context.faceMatchAssociatedParams!;

        const chunks = context.livenessStreamProvider?.getChunks();
        const recordingStartedTimestamp =
          context.livenessStreamProvider!.getRecordingStartTimestamp();

        const blobData = new Blob(chunks, { type: 'video/webm' });

        const freshnessColorSignals = context.livenessStreamProvider
          ?.getClientSessionInfoEvents()
          .map((info) => {
            return info.Challenge?.FaceMovementAndLightChallenge
              ?.ColorDisplayed;
          })
          .filter(Boolean);

        const userCamera = selectableDevices?.find(
          (device) => device.deviceId === selectedDeviceId
        );

        // eslint-disable-next-line  @typescript-eslint/no-unsafe-call
        const deviceMetadata: { [key: string]: any } = {
          application: {
            clientVersion: getLivenessUserAgent(),
            userAgent: window.navigator.userAgent,
            facingMode: videoConstraints?.facingMode,
            window: {
              height: window.innerHeight,
              width: window.innerWidth,
            },
          },
          device: {
            camera: userCamera,
            screen: window.screen,
            capabilities: videoMediaStream!.getTracks()[0]?.getCapabilities(),
          },
          media: {
            calculatedStartTimestamp: recordingStartedTimestamp,
            recordingStartTimestamp: recordingStartTimestampActual,
            recordingEndTimestamp,
            video: {
              videoConstraints,
              width: videoEl?.width,
              height: videoEl?.height,
              quality: videoEl?.getVideoPlaybackQuality(),
              settings: videoSettingsBeforeStopping,
            },
          },
          challenge: {
            initialFace,
            startFace,
            endFace,
            ovalDetails,
            cameraCheckTimeStamp,
            freshnessColorStartTimestamp,
            freshnessColorEndTimestamp,
            freshnessColorSignals: freshnessColorSignals,
          },
        };

        // Get liveness result
        onAnalysisComplete({ videoBlob: blobData, deviceMetadata });
      },
    },
  }
);
