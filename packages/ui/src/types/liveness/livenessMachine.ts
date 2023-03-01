import { ActorRef, Interpreter, State } from 'xstate';

import {
  FaceLivenessDetectorProps,
  FaceMatchState,
  LivenessErrorState,
  LivenessOvalDetails,
  IlluminationState,
} from './liveness';
import {
  VideoRecorder,
  LivenessStreamProvider,
  FreshnessColorDisplay,
} from '../../helpers';
import { Face, FaceDetection } from './faceDetection';
import { SessionInformation } from '@aws-sdk/client-rekognitionstreaming';

export interface LivenessContext {
  maxFailedAttempts: number;
  failedAttempts: number;
  componentProps: FaceLivenessDetectorProps;
  serverSessionInformation: SessionInformation;
  challengeId: string;
  videoAssociatedParams: {
    videoConstraints: MediaTrackConstraints;
    videoEl: HTMLVideoElement;
    canvasEl: HTMLCanvasElement;
    videoMediaStream: MediaStream;
    videoRecorder: VideoRecorder;
    recordingStartTimestampMs: number;
    isMobile: boolean | undefined;
  };
  ovalAssociatedParams: {
    faceDetector: FaceDetection;
    initialFace: Face;
    ovalDetails: LivenessOvalDetails;
    scaleFactor: number;
  };
  faceMatchAssociatedParams: {
    illuminationState: IlluminationState;
    faceMatchState: FaceMatchState;
    currentDetectedFace: Face;
    startFace: Face;
    endFace: Face;
    initialFaceMatchTime: number;
  };
  freshnessColorAssociatedParams: {
    freshnessColorEl: HTMLCanvasElement;
    freshnessColors: string[];
    freshnessColorsComplete: boolean;
    freshnessColorDisplay: FreshnessColorDisplay;
  };
  errorState: LivenessErrorState | null;
  livenessStreamProvider: LivenessStreamProvider;
  responseStreamActorRef: ActorRef<any>;
  shouldDisconnect: boolean | undefined;
  faceMatchStateBeforeStart: FaceMatchState;
  isFaceFarEnoughBeforeRecording: boolean;
  isRecordingStopped: boolean;
}

export type LivenessEventTypes =
  | 'BEGIN'
  | 'START_RECORDING'
  | 'TIMEOUT'
  | 'ERROR'
  | 'CANCEL'
  | 'SET_SESSION_INFO'
  | 'DISCONNECT_EVENT'
  | 'SET_DOM_AND_CAMERA_DETAILS'
  | 'SERVER_ERROR'
  | 'RETRY_CAMERA_CHECK'
  | 'MOBILE_LANDSCAPE_WARNING';

export type LivenessEventData = Record<PropertyKey, any>; // TODO: this should be typed further

export interface LivenessEvent {
  type: LivenessEventTypes;
  data?: LivenessEventData;
}

export type LivenessMachineState = State<LivenessContext, LivenessEvent>;

export type LivenessInterpreter = Interpreter<
  LivenessContext,
  any,
  LivenessEvent,
  any,
  any
>;
