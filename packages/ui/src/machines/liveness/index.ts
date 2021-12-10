import { createMachine, assign, actions } from 'xstate';

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
  LivenessPredictionsProvider,
  VideoRecorder,
  estimateIllumination,
} from '../../helpers';

interface LivenessActionDocument {
  deviceInformation: {
    videoHeight: number;
    videoWidth: number;
  };
  challenge: {
    type: string;
    challengeParameters: {
      initialFacePosition: {
        height: number;
        width: number;
        top: number;
        left: number;
      };
      targetFacePosition: {
        height: number;
        width: number;
        top: number;
        left: number;
      };
      recordingTimestamps: {
        videoStartTimestamp: number;
        initialFaceDetectedTimestamp: number;
        faceMatchedInOvalStartTimestamp: number;
        faceMatchedInOvalEndTimestamp: number;
      };
    };
  };
}

export const MIN_FACE_MATCH_COUNT = 5;

export const livenessMachine = createMachine<LivenessContext, LivenessEvent>(
  {
    id: 'livenessMachine',
    initial: 'start',
    context: {
      maxFailedAttempts: 3,
      failedAttempts: 0,
      flowProps: undefined,
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
      errorState: null,
    },
    on: {
      CANCEL: 'userCancel',
      TIMEOUT: {
        target: 'retryableTimeout',
        actions: 'updateErrorStateForTimeout',
      },
    },
    states: {
      start: {
        on: {
          BEGIN: 'permissionCheck',
        },
      },
      permissionCheck: {
        entry: ['initializeFaceDetector'],
        on: {
          PERMISSION_GRANTED: 'notRecording',
          PERMISSION_DENIED: 'permissionDenied',
        },
      },
      notRecording: {
        on: {
          START_RECORDING: 'recording',
        },
      },
      recording: {
        entry: [
          'setDOMAndCameraDetails',
          'startRecording',
          'clearErrorState',
          'sendTimeoutAfterOvalDrawingDelay',
        ],
        initial: 'ovalDrawing',
        states: {
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
            entry: 'cancelOvalDrawingTimeout',
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
                target: 'success',
                cond: 'hasFaceMatchedInOvalWithMinCount',
                actions: 'updateEndFaceMatch',
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
          success: {
            entry: ['stopRecording', 'cancelOvalMatchTimeout'],
            type: 'final',
          },
        },
        onDone: 'uploading',
      },
      uploading: {
        initial: 'pending',
        states: {
          pending: {
            invoke: {
              src: 'putLivenessVideo',
              onDone: 'checking',
              onError: {
                target: '#livenessMachine.error',
                actions: 'updateErrorStateForRuntime',
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
      },
      timeout: {
        entry: 'callUserTimeoutCallback',
      },
      error: {
        entry: 'callErrorCallback',
      },
      checkFailed: {},
      checkSucceeded: {
        entry: 'callSuccessCallback',
      },
      userCancel: {
        entry: 'callUserCancelCallback',
        type: 'final',
      },
    },
  },
  {
    actions: {
      updateFailedAttempts: assign({
        failedAttempts: (context) => context.failedAttempts + 1,
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
      setDOMAndCameraDetails: assign({
        videoAssociatedParams: (context, event) => ({
          ...context.videoAssociatedParams,
          videoEl: event.data?.videoEl,
          canvasEl: event.data?.canvasEl,
          videoMediaStream: event.data?.videoMediaStream,
        }),
      }),
      startRecording: assign({
        videoAssociatedParams: (context) => {
          const recorder = new VideoRecorder(
            context.videoAssociatedParams.videoMediaStream
          );
          recorder.start();

          return {
            ...context.videoAssociatedParams,
            videoRecorder: recorder,
            recordingStartTimestampMs: Date.now(),
          };
        },
      }),
      stopRecording: (context) => {
        context.videoAssociatedParams.videoRecorder.stop();
      },
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
      updateErrorStateForTimeout: assign({
        errorState: (_) => LivenessErrorState.TIMEOUT,
      }),
      updateErrorStateForRuntime: assign({
        errorState: (_) => LivenessErrorState.RUNTIME_ERROR,
      }),
      clearErrorState: assign({
        errorState: (_) => null,
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

      // callbacks
      callUserPermissionDeniedCallback: (context) => {
        context.flowProps.onUserPermissionDeined?.();
      },
      callUserCancelCallback: (context) => {
        context.flowProps.onUserCancel?.();
      },
      callUserTimeoutCallback: (context) => {
        context.flowProps.onUserTimeout?.();
      },
      callSuccessCallback: (context) => {
        context.flowProps.onSuccess?.();
      },
      callErrorCallback: (context, event) => {
        context.flowProps.onError?.(event.data as Error);
      },
    },
    guards: {
      shouldTimeoutOnFailedAttempts: (context) =>
        context.failedAttempts >= context.maxFailedAttempts,
      hasFaceMatchedInOvalWithMinCount: (context) => {
        const { faceMatchState, faceMatchCount } =
          context.faceMatchAssociatedParams;
        return (
          faceMatchState === FaceMatchState.MATCHED &&
          faceMatchCount >= MIN_FACE_MATCH_COUNT
        );
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
      hasLivenessCheckSucceeded: (_, __, meta) => meta.state.event.data.isLive,
    },
    services: {
      async detectInitialFaceAndDrawOval(context) {
        const {
          videoAssociatedParams: { videoEl, canvasEl, videoMediaStream },
          ovalAssociatedParams: { faceDetector },
          flowProps: { clientActionDocument },
        } = context;

        // initialize models
        try {
          await faceDetector.modelLoadingPromise;
        } catch (err) {
          console.log({ err });
        }

        // detect face
        const detectedFaces = await faceDetector.detectFaces(videoEl);
        let initialFace: Face;
        let faceMatchState: FaceMatchState;
        let illuminationState: IlluminationState;

        switch (detectedFaces.length) {
          case 0: {
            // no face detected;
            faceMatchState = FaceMatchState.CANT_IDENTIFY;
            illuminationState = estimateIllumination(videoEl);
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

        if (!initialFace) {
          return { faceMatchState, illuminationState };
        }

        // generate oval details from initialFace and video dimensions
        const { width, height } = videoMediaStream.getTracks()[0].getSettings();
        const ovalDetails = getRandomLivenessOvalDetails({
          width,
          height,
          initialFace,
          clientActionDocument,
        });

        // draw oval on canvas
        canvasEl.width = width;
        canvasEl.height = height;
        drawLivenessOvalInCanvas(canvasEl, ovalDetails);

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
      async putLivenessVideo(context) {
        const {
          flowProps: { sessionId, onGetLivenessDetection },
          videoAssociatedParams: {
            videoRecorder,
            videoMediaStream,
            recordingStartTimestampMs,
          },
          ovalAssociatedParams: { initialFace, ovalDetails },
          faceMatchAssociatedParams: { startFace, endFace },
        } = context;

        const videoBlob = await videoRecorder.getBlob();
        const { width, height } = videoMediaStream.getTracks()[0].getSettings();

        const livenessActionDocument: LivenessActionDocument = {
          deviceInformation: {
            videoHeight: height,
            videoWidth: width,
          },
          challenge: {
            type: 'OVAL',
            challengeParameters: {
              initialFacePosition: {
                height: initialFace.height,
                width: initialFace.width,
                top: initialFace.top,
                left: initialFace.left,
              },
              targetFacePosition: {
                height: ovalDetails.height,
                width: ovalDetails.width,
                top: ovalDetails.centerY - ovalDetails.height / 2,
                left: ovalDetails.centerX - ovalDetails.width / 2,
              },
              recordingTimestamps: {
                videoStartTimestamp: recordingStartTimestampMs,
                initialFaceDetectedTimestamp: initialFace.timestampMs,
                faceMatchedInOvalStartTimestamp: startFace.timestampMs,
                faceMatchedInOvalEndTimestamp: endFace.timestampMs,
              },
            },
          },
        };

        // Put liveness video
        const provider = new LivenessPredictionsProvider();
        await provider.putLivenessVideo({
          sessionId,
          videoBlob,
          livenessActionDocument: JSON.stringify(livenessActionDocument),
        });

        // Get liveness result
        const { isLive } = await onGetLivenessDetection(sessionId);

        return { isLive };
      },
    },
  }
);
