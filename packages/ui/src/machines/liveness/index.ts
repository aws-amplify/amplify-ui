import { createMachine, assign } from 'xstate';
import { LivenessContext, LivenessEvent, FaceMatchState } from '../../types';
import {
  BlazeFaceFaceDetection,
  drawLivenessOvalInCanvas,
  getFaceMatchStateInLivenessOval,
  getRandomLivenessOvalDetails,
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
    },
    on: {
      CANCEL: 'userExit',
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
        entry: ['setDOMAndCameraDetails', 'startRecording'],
        initial: 'ovalDrawing',
        states: {
          ovalDrawing: {
            invoke: {
              src: 'detectInitialFaceAndDrawOval',
              onDone: {
                target: 'ovalMatching',
                actions: 'updateOvalAssociatedParams',
              },
            },
          },
          ovalMatching: {
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
            entry: ['stopRecording'],
            type: 'final',
          },
        },
        onDone: 'uploading',
        on: {
          TIMEOUT: 'timeout',
        },
      },
      uploading: {
        on: {
          ERROR: 'permissionCheck',
          CHECK_FAILED: 'checkFailed',
          CHECK_SUCCEEDED: 'end',
        },
      },
      checkFailed: {
        entry: 'updateFailedAttempts',
        always: [
          {
            target: 'timeout',
            cond: 'shouldTimeoutOnFailedAttempts',
          },
          { target: 'permissionCheck' },
        ],
      },
      permissionDenied: {
        type: 'final',
      },
      userExit: {
        entry: 'callExitFlow',
        type: 'final',
      },
      timeout: {
        type: 'final',
      },
      end: {
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
          initialFace: event.data.initialFace,
          ovalDetails: event.data.ovalDetails,
        }),
      }),
      updateFaceMatchState: assign({
        faceMatchState: (_, event) => event.data.faceMatchState,
      }),
      callExitFlow: (context) => {
        context.flowProps.onUserExit();
      },
    },
    guards: {
      shouldTimeoutOnFailedAttempts: (context) =>
        context.failedAttempts >= context.maxFailedAttempts,
      hasFaceMatchedInOval: (context) =>
        context.faceMatchState === FaceMatchState.MATCHED,
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
        const initialFace = detectedFaces[0];

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

        return { initialFace, ovalDetails };
      },
      async detectFaceAndMatchOval(context) {
        const {
          videoAssociatedParams: { videoEl },
          ovalAssociatedParams: { faceDetector, ovalDetails },
        } = context;

        // detect face
        const detectedFaces = await faceDetector.detectFaces(videoEl);
        const face = detectedFaces[0];

        // match face with oval
        const faceMatchState = getFaceMatchStateInLivenessOval(
          face,
          ovalDetails
        );

        return { faceMatchState };
      },
    },
  }
);
