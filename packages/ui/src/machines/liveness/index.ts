import { createMachine, assign, actions } from 'xstate';

import {
  Face,
  LivenessContext,
  LivenessEvent,
  FaceMatchState,
  LivenessErrorState,
  LivenessStatus,
} from '../../types';
import {
  BlazeFaceFaceDetection,
  drawLivenessOvalInCanvas,
  getFaceMatchStateInLivenessOval,
  getRandomLivenessOvalDetails,
  LivenessPredictionsProvider,
  VideoRecorder,
} from '../../helpers';

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
      faceMatchState: FaceMatchState.CANT_IDENTIFY,
      errorState: null,
    },
    on: {
      CANCEL: 'userExit',
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
        on: {
          PERMISSION_GRANTED: 'notRecording',
          PERMISSION_DENIED: 'permissionDenied',
        },
      },
      notRecording: {
        entry: ['initializeFaceDetector'],
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
                  'updateFaceMatchState',
                  'updateOvalAssociatedParams',
                  'sendTimeoutAfterOvalMatchDelay',
                ],
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
                actions: 'updateFaceMatchState',
              },
            },
          },
          checkMatch: {
            after: {
              0: {
                target: 'success',
                cond: 'hasFaceMatchedInOval',
              },
              100: { target: 'ovalMatching' },
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
                target: '#livenessMachine.retryableTimeout',
                actions: 'updateErrorStateForRuntime',
              },
            },
          },
          checking: {
            always: [
              {
                target: '#livenessMachine.end',
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
        type: 'final',
      },
      userExit: {
        entry: 'callUserExitCallback',
        type: 'final',
      },
      timeout: {
        entry: 'callUserTimeoutCallback',
        type: 'final',
      },
      checkFailed: {
        type: 'final',
      },
      end: {
        entry: 'callSuccessCallback',
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
          };
        },
      }),
      stopRecording: (context) => {
        context.videoAssociatedParams.videoRecorder.stop();
      },
      updateOvalAssociatedParams: assign({
        ovalAssociatedParams: (context, event) => ({
          ...context.ovalAssociatedParams,
          initialFace: event.data.ovalDetails
            ? event.data.ovalDetails.initialFace
            : null,
          ovalDetails: event.data.ovalDetails,
        }),
      }),
      updateFaceMatchState: assign({
        faceMatchState: (_, event) => event.data.faceMatchState,
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
      callUserExitCallback: (context) => {
        context.flowProps.onUserExit?.();
      },
      callUserTimeoutCallback: (context) => {
        context.flowProps.onUserTimeout?.();
      },
      callSuccessCallback: (context) => {
        context.flowProps.onSuccess?.();
      },
    },
    guards: {
      shouldTimeoutOnFailedAttempts: (context) =>
        context.failedAttempts >= context.maxFailedAttempts,
      hasFaceMatchedInOval: (context) =>
        context.faceMatchState === FaceMatchState.MATCHED,
      hasLivenessCheckSucceeded: (_, __, meta) =>
        meta.state.event.data.isLive === LivenessStatus.SUCCESS,
      hasSingleFace: (context) =>
        context.faceMatchState === FaceMatchState.FACE_IDENTIFIED,
    },
    services: {
      async detectInitialFaceAndDrawOval(context) {
        const {
          videoAssociatedParams: { videoEl, canvasEl, videoMediaStream },
          ovalAssociatedParams: { faceDetector },
          flowProps: { livenessSeed },
        } = context;

        // initialize models
        await faceDetector.modelLoadingPromise;

        // detect face
        const detectedFaces = await faceDetector.detectFaces(videoEl);
        let initialFace: Face;
        let faceMatchState: FaceMatchState;
        switch (detectedFaces.length) {
          case 0: {
            // no face detected;
            // TODO: put illumination related code here to
            // provide feedback for lighting conditions
            faceMatchState = FaceMatchState.CANT_IDENTIFY;
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
          return { faceMatchState };
        }

        // generate oval details from initialFace and video dimensions
        const { width, height } = videoMediaStream.getTracks()[0].getSettings();
        const ovalDetails = getRandomLivenessOvalDetails({
          width,
          height,
          initialFace,
          livenessSeed,
        });

        // draw oval on canvas
        canvasEl.width = width;
        canvasEl.height = height;
        drawLivenessOvalInCanvas(canvasEl, ovalDetails);

        return { faceMatchState, ovalDetails };
      },
      async detectFaceAndMatchOval(context) {
        const {
          videoAssociatedParams: { videoEl },
          ovalAssociatedParams: { faceDetector, ovalDetails },
        } = context;

        // detect face
        const detectedFaces = await faceDetector.detectFaces(videoEl);
        let faceMatchState: FaceMatchState;

        switch (detectedFaces.length) {
          case 0: {
            //no face detected;
            faceMatchState = FaceMatchState.CANT_IDENTIFY;
            // TODO: put illumination related code here to
            // provide feedback for lighting conditions
            break;
          }
          case 1: {
            //exactly one face detected, match face with oval;
            faceMatchState = getFaceMatchStateInLivenessOval(
              detectedFaces[0],
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

        return { faceMatchState };
      },
      async putLivenessVideo(context) {
        const {
          flowProps: { sessionId, onGetLivenessDetection },
          videoAssociatedParams: { videoRecorder },
        } = context;

        const provider = new LivenessPredictionsProvider();

        await new Promise((resolve) => setTimeout(resolve, 500));
        const videoBlob = videoRecorder.getBlob();

        // Put liveness video
        await provider.putLivenessVideo({
          sessionId,
          videoBlob,
        });

        // Get liveness result
        const { isLive } = await onGetLivenessDetection(sessionId);

        return { isLive };
      },
    },
  }
);
