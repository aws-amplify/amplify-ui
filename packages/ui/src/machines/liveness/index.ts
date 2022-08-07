import { createMachine, assign, actions } from 'xstate';
import adapter from 'webrtc-adapter';
import {
  fillOverlayCanvasFractional,
  shouldChangeColorStage,
} from '../../helpers/liveness/liveness';
import {
  ColorArr,
  getShortCp2Permutations,
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
  ChallengeType,
  LivenessActionDocument,
} from '../../types/liveness/liveness-service-types';
import {
  BlazeFaceFaceDetection,
  drawLivenessOvalInCanvas,
  getFaceMatchStateInLivenessOval,
  getRandomLivenessOvalDetails,
  LivenessStreamProvider,
  LivenessPredictionsProvider,
  VideoRecorder,
  estimateIllumination,
  recordLivenessAnalyticsEvent,
  LIVENESS_EVENT_LIVENESS_CHECK_SCREEN,
  isCameraDeviceVirtual,
} from '../../helpers';
import { v4 } from 'uuid';

export const MIN_FACE_MATCH_COUNT = 5;

// timer metrics variables
let faceDetectedTimestamp: number;
let ovalDrawnTimestamp: number;
let freshnessColorFlashedTimestamp: number;

export const livenessMachine = createMachine<LivenessContext, LivenessEvent>(
  {
    id: 'livenessMachine',
    initial: 'start',
    context: {
      challengeId: v4(),
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
      freshnessColorAssociatedParams: undefined,
      errorState: null,
      livenessStreamProvider: undefined,
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
          BEGIN: 'cameraCheck',
        },
      },
      cameraCheck: {
        entry: ['setVideoConstraints', 'initializeFaceDetector'],
        invoke: {
          src: 'checkVirtualCameraAndGetStream',
          onDone: {
            target: 'notRecording',
            actions: [
              'updateVideoMediaStream',
              'initializeLivenessStreamProvider',
            ],
          },
          onError: {
            target: 'permissionDenied',
          },
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
                target: 'flashFreshnessColors',
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
          flashFreshnessColors: {
            entry: ['cancelOvalMatchTimeout'],
            invoke: {
              src: 'flashColors',
              onDone: {
                target: 'success',
                actions: 'setFreshnessColorsSuccess',
              },
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
        failedAttempts: (context) => {
          recordLivenessAnalyticsEvent(context.flowProps, {
            event: LIVENESS_EVENT_LIVENESS_CHECK_SCREEN,
            attributes: { action: 'Timeout' },
            metrics: { count: 1 },
          });

          return context.failedAttempts + 1;
        },
      }),
      setVideoConstraints: assign({
        videoAssociatedParams: (context, event) => ({
          ...context.videoAssociatedParams,
          videoConstraints: event.data?.videoConstraints,
        }),
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
      initializeLivenessStreamProvider: assign({
        livenessStreamProvider: (context) => {
          return new LivenessStreamProvider(
            context.flowProps.sessionId,
            context.videoAssociatedParams.videoMediaStream
          );
        },
      }),
      setDOMAndCameraDetails: assign({
        videoAssociatedParams: (context, event) => ({
          ...context.videoAssociatedParams,
          videoEl: event.data?.videoEl,
          canvasEl: event.data?.canvasEl,
        }),
        freshnessColorAssociatedParams: (context, event) => ({
          ...context.freshnessColorAssociatedParams,
          freshnessColorEl: event.data?.freshnessColorEl,
        }),
      }),
      startRecording: assign({
        videoAssociatedParams: (context) => {
          recordLivenessAnalyticsEvent(context.flowProps, {
            event: LIVENESS_EVENT_LIVENESS_CHECK_SCREEN,
            attributes: { action: 'AttemptLivenessCheck' },
            metrics: { count: 1 },
          });

          context.videoAssociatedParams.videoRecorder?.destroy();
          const recorder = new VideoRecorder(
            context.videoAssociatedParams.videoMediaStream
          );
          recorder.start(100);

          if (
            context.livenessStreamProvider.videoRecorder &&
            context.livenessStreamProvider.videoRecorder.getState() !==
              'recording'
          ) {
            context.livenessStreamProvider.videoRecorder.start(100);
            context.livenessStreamProvider.streamLivenessVideo();
          }

          return {
            ...context.videoAssociatedParams,
            videoRecorder: recorder,
            recordingStartTimestampMs: Date.now(),
          };
        },
      }),
      stopRecording: (context) => {
        recordLivenessAnalyticsEvent(context.flowProps, {
          event: LIVENESS_EVENT_LIVENESS_CHECK_SCREEN,
          attributes: { action: 'Success' },
          metrics: { count: 1 },
        });

        context.videoAssociatedParams.videoRecorder.stop();
        context.livenessStreamProvider.videoRecorder.stop();
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
      setFreshnessColorsSuccess: assign({
        freshnessColorAssociatedParams: (context) => ({
          ...context.freshnessColorAssociatedParams,
          freshnessColorsShown: true,
        }),
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
        recordLivenessAnalyticsEvent(context.flowProps, {
          event: LIVENESS_EVENT_LIVENESS_CHECK_SCREEN,
          attributes: { action: 'PermissionDenied' },
          metrics: { count: 1 },
        });

        context.flowProps.onUserPermissionDeined?.();
      },
      callUserCancelCallback: (context) => {
        context.flowProps.onUserCancel?.();
      },
      callUserTimeoutCallback: (context) => {
        recordLivenessAnalyticsEvent(context.flowProps, {
          event: LIVENESS_EVENT_LIVENESS_CHECK_SCREEN,
          attributes: { action: 'FailedWithTimeout' },
          metrics: { count: 1 },
        });

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
        const hasMatched =
          faceMatchState === FaceMatchState.MATCHED &&
          faceMatchCount >= MIN_FACE_MATCH_COUNT;

        if (hasMatched) {
          recordLivenessAnalyticsEvent(context.flowProps, {
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
      hasLivenessCheckSucceeded: (_, __, meta) => meta.state.event.data.isLive,
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
          recordLivenessAnalyticsEvent(context.flowProps, {
            event: LIVENESS_EVENT_LIVENESS_CHECK_SCREEN,
            attributes: { action: 'NoRealDeviceFound' },
            metrics: { count: 1 },
          });
          throw new Error('No real video devices found');
        }

        // If the initial stream is of real camera, use it otherwise use the first real camera
        const initialStreamDeviceId = initialStream
          .getTracks()[0]
          .getSettings().deviceId;
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

      async detectInitialFaceAndDrawOval(context) {
        const {
          videoAssociatedParams: {
            videoEl,
            canvasEl,
            videoMediaStream,
            videoRecorder,
            recordingStartTimestampMs,
          },
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
        const startDetectTime = Date.now();
        const detectedFaces = await faceDetector.detectFaces(videoEl);
        let initialFace: Face;
        let faceMatchState: FaceMatchState;
        let illuminationState: IlluminationState;

        switch (detectedFaces.length) {
          case 0: {
            // no face detected;
            recordLivenessAnalyticsEvent(context.flowProps, {
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
            recordLivenessAnalyticsEvent(context.flowProps, {
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
        ovalDrawnTimestamp = Date.now();
        recordLivenessAnalyticsEvent(context.flowProps, {
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
          challenges: [
            {
              type: ChallengeType.FACE_MOVEMENT,
              faceMovementChallenge: {
                initialFacePosition: {
                  height: initialFace.height,
                  width: initialFace.width,
                  top: initialFace.top,
                  left: flippedInitialFaceLeft,
                },
                targetFacePosition: {
                  height: ovalDetails.height,
                  width: ovalDetails.width,
                  top: ovalDetails.centerY - ovalDetails.height / 2,
                  left: ovalDetails.centerX - ovalDetails.width / 2,
                },
                recordingTimestamps: {
                  videoStart: recordingStartTimestampMs,
                  initialFaceDetected: initialFace.timestampMs,
                },
              },
            },
          ],
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
          challengeId,
          livenessStreamProvider,
          freshnessColorAssociatedParams: { freshnessColorEl },
          ovalAssociatedParams: { ovalDetails },
          videoAssociatedParams: { canvasEl },
        } = context;

        freshnessColorEl.hidden = false;

        await new Promise((resolve) => {
          const colorStages = getShortCp2Permutations(ColorArr);

          const tickRate = 10; // ms -- the rate at which we will render/check colors
          const flatDuration = 100; // ms -- the length of time to show a flat color
          const scrollingDuration = 300; // ms -- the length of time it should take for a color to scroll down

          let colorStageIndex = 0; // stage of the color permutation
          let prevColorStageIndex = undefined; // previous stage
          let timeLastColorIndChanged = Date.now();
          let expectedCallTime = Date.now() + tickRate;

          const selfAdjustingInterval = () => {
            const tickStartTime = Date.now();
            const drift = tickStartTime - expectedCallTime;
            const timeSinceLastColorChange =
              tickStartTime - timeLastColorIndChanged;

            // Every 10 ms tick we will check if we have reached the threshold for showing a color
            // If we have we will increment the color stage
            if (
              shouldChangeColorStage(
                timeSinceLastColorChange,
                colorStages[colorStageIndex],
                flatDuration,
                scrollingDuration
              )
            ) {
              colorStageIndex += 1;
              timeLastColorIndChanged = Date.now();
            }

            // Continue looping until we have completed colorStages
            if (colorStageIndex < colorStages.length) {
              const [prevColorIdx, scrollingColorIdx] =
                colorStages[colorStageIndex];
              const hp = timeSinceLastColorChange / scrollingDuration;

              const currentScrollingColor = ColorArr[scrollingColorIdx];

              fillOverlayCanvasFractional({
                overlayCanvas: freshnessColorEl,
                prevColor: ColorArr[prevColorIdx],
                nextColor: currentScrollingColor,
                ovalCanvas: canvasEl,
                ovalDetails,
                heightFraction: hp,
              });

              // Send clientInfo when a new color starts appears
              if (colorStageIndex !== prevColorStageIndex) {
                prevColorStageIndex = colorStageIndex;
                livenessStreamProvider.sendClientInfo({
                  challenges: [
                    {
                      challengeId,
                      faceMovementChallenge: {
                        colorSequence: {
                          colorTimestampList: [
                            {
                              color: currentScrollingColor,
                              tickStartTime,
                            },
                          ],
                        },
                      },
                    },
                  ],
                });
              }

              expectedCallTime += tickRate;
              setTimeout(
                selfAdjustingInterval,
                Math.min(tickRate, tickRate - drift)
              );
            } else {
              freshnessColorEl.hidden = true;
              resolve(true);
            }
          };
          setTimeout(selfAdjustingInterval, tickRate); // initial call
        });
      },
      async putLivenessVideo(context) {
        const startPutLivenessVideoTime = Date.now();
        const {
          challengeId,
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

        const flippedInitialFaceLeft =
          width - initialFace.left - initialFace.width;
        const livenessActionDocument: LivenessActionDocument = {
          deviceInformation: {
            videoHeight: height,
            videoWidth: width,
          },
          challenges: [
            {
              type: ChallengeType.FACE_MOVEMENT,
              faceMovementChallenge: {
                challengeId,
                initialFacePosition: {
                  height: initialFace.height,
                  width: initialFace.width,
                  top: initialFace.top,
                  left: flippedInitialFaceLeft,
                },
                targetFacePosition: {
                  height: ovalDetails.height,
                  width: ovalDetails.width,
                  top: ovalDetails.centerY - ovalDetails.height / 2,
                  left: ovalDetails.centerX - ovalDetails.width / 2,
                },
                recordingTimestamps: {
                  videoStart: recordingStartTimestampMs,
                  initialFaceDetected: initialFace.timestampMs,
                  faceDetectedInTargetPositionStart: startFace.timestampMs,
                  faceDetectedInTargetPositionEnd: endFace.timestampMs,
                },
                colorSequence: {
                  colorTimestampList: [],
                },
              },
            },
          ],
        };

        context.livenessStreamProvider.sendClientInfo(livenessActionDocument);

        context.livenessStreamProvider.endStream();

        // Put liveness video
        const provider = new LivenessPredictionsProvider();
        try {
          await provider.putLivenessVideo({
            sessionId,
            videoBlob,
            livenessActionDocument: JSON.stringify(livenessActionDocument),
          });
        } catch (e) {
          console.log(e);
        }

        const endPutLivenessVideoTime = Date.now();
        recordLivenessAnalyticsEvent(context.flowProps, {
          event: LIVENESS_EVENT_LIVENESS_CHECK_SCREEN,
          attributes: { action: 'putLivenessVideo' },
          metrics: {
            duration: endPutLivenessVideoTime - startPutLivenessVideoTime,
          },
        });

        // Get liveness result
        const { isLive } = await onGetLivenessDetection(sessionId);
        recordLivenessAnalyticsEvent(context.flowProps, {
          event: LIVENESS_EVENT_LIVENESS_CHECK_SCREEN,
          attributes: { action: 'getLivenessDetection' },
          metrics: {
            duration: Date.now() - endPutLivenessVideoTime,
          },
        });

        return { isLive };
      },
    },
  }
);
